import { User, UserDocument } from '../models/User.js';
import { UserProfile, NotFoundError } from '../types/index.js';

export class UserRepository {
    /**
     * Create a new user
     */
    async create(userData: Partial<UserProfile>): Promise<UserProfile> {
        const user = new User(userData);
        const savedUser = await user.save();
        return this.toUserProfile(savedUser);
    }

    /**
     * Find user by ID
     */
    async findById(userId: string): Promise<UserProfile | null> {
        const user = await User.findOne({ id: userId });
        return user ? this.toUserProfile(user) : null;
    }

    /**
     * Find user by email
     */
    async findByEmail(email: string): Promise<UserProfile | null> {
        const user = await User.findOne({ email: email.toLowerCase() });
        return user ? this.toUserProfile(user) : null;
    }

    /**
     * Get user with password hash (for authentication)
     */
    async findByEmailWithPassword(
        email: string
    ): Promise<(UserProfile & { password: string }) | null> {
        const user = await User.findOne({
            email: email.toLowerCase(),
        }).select('+password');
        return user ? this.toUserProfileWithPassword(user) : null;
    }

    /**
     * Update user
     */
    async update(
        userId: string,
        updateData: Partial<UserProfile>
    ): Promise<UserProfile> {
        const user = await User.findOneAndUpdate(
            { id: userId },
            { ...updateData, updatedAt: new Date() },
            { new: true }
        );

        if (!user) {
            throw new NotFoundError('User', userId);
        }

        return this.toUserProfile(user);
    }

    /**
     * Update user progress
     */
    async updateProgress(
        userId: string,
        courseId: string,
        progressUpdate: any
    ): Promise<UserProfile> {
        const user = await User.findOne({ id: userId });
        if (!user) {
            throw new NotFoundError('User', userId);
        }

        const courseProgressIndex = user.courseProgress.findIndex(
            (p) => p.courseId === courseId
        );

        if (courseProgressIndex >= 0) {
            user.courseProgress[courseProgressIndex] = {
                ...user.courseProgress[courseProgressIndex],
                ...progressUpdate,
                lastAccessedAt: new Date(),
            };
        } else {
            user.courseProgress.push({
                courseId,
                enrolledAt: new Date(),
                lastAccessedAt: new Date(),
                ...progressUpdate,
            });
        }

        await user.save();
        return this.toUserProfile(user);
    }

    /**
     * Enroll user in course
     */
    async enrollCourse(userId: string, courseId: string): Promise<UserProfile> {
        const user = await User.findOne({ id: userId });
        if (!user) {
            throw new NotFoundError('User', userId);
        }

        if (!user.enrolledCourses.includes(courseId)) {
            user.enrolledCourses.push(courseId);
            user.courseProgress.push({
                courseId,
                enrolledAt: new Date(),
                lastAccessedAt: new Date(),
                moduleProgress: [],
                overallProgress: 0,
                certificateEarned: false,
            });
        }

        user.updatedAt = new Date();
        await user.save();
        return this.toUserProfile(user);
    }

    /**
     * Delete user
     */
    async delete(userId: string): Promise<void> {
        const result = await User.deleteOne({ id: userId });
        if (result.deletedCount === 0) {
            throw new NotFoundError('User', userId);
        }
    }

    /**
     * List users with pagination
     */
    async list(
        page: number = 1,
        limit: number = 10
    ): Promise<{
        users: UserProfile[];
        total: number;
        hasMore: boolean;
    }> {
        const skip = (page - 1) * limit;
        const users = await User.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments();

        return {
            users: users.map((u) => this.toUserProfile(u)),
            total,
            hasMore: skip + limit < total,
        };
    }

    /**
     * Convert UserDocument to UserProfile (remove password)
     */
    private toUserProfile(user: UserDocument): UserProfile {
        const obj = user.toObject();
        return {
            ...obj,
            password: '', // Never expose password
        } as UserProfile;
    }

    /**
     * Convert UserDocument to UserProfile with password (for auth only)
     */
    private toUserProfileWithPassword(
        user: UserDocument
    ): UserProfile & { password: string } {
        const obj = user.toObject();
        return {
            ...obj,
            password: user.password,
        } as UserProfile & { password: string };
    }
}

export const userRepository = new UserRepository();
