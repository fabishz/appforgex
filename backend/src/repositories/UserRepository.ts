import { prisma } from '../config/database';
import { nanoid } from 'nanoid';
import {
    UserProfile,
    NotFoundError,
    CourseProgress,
} from '../types/index';

/**
 * Prisma-based User Repository
 * Replaces MongoDB/Mongoose implementation with PostgreSQL/Prisma
 */
export class UserRepository {
    /**
     * Create a new user
     */
    async create(userData: UserProfile): Promise<UserProfile> {
        const user = await prisma.user.create({
            data: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                password: userData.password,
                avatar: userData.avatar,
                role: userData.role,
                skillLevel: userData.skillLevel,
                interests: userData.interests || [],
                learningGoals: userData.learningGoals || [],
                enrolledCourses: userData.enrolledCourses || [],
                completedCourses: userData.completedCourses || [],
                totalLearningTime: userData.totalLearningTime || 0,
                currentStreak: userData.currentStreak || 0,
                longestStreak: userData.longestStreak || 0,
                lastActiveDate: userData.lastActiveDate || new Date(),
                isActive: userData.isActive !== false,
                notificationsEnabled:
                    userData.preferences?.notificationsEnabled !== false,
                dailyGoalMinutes: userData.preferences?.dailyGoalMinutes,
                preferredLearningTime:
                    userData.preferences?.preferredLearningTime,
            },
        });

        return this.toUserProfile(user);
    }

    /**
     * Find user by ID
     */
    async findById(userId: string): Promise<UserProfile | null> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                courseProgress: true,
                achievements: true,
            },
        });

        return user ? this.toUserProfile(user) : null;
    }

    /**
     * Find user by email
     */
    async findByEmail(email: string): Promise<UserProfile | null> {
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            include: {
                courseProgress: true,
                achievements: true,
            },
        });

        return user ? this.toUserProfile(user) : null;
    }

    /**
     * Find user by email with password (for authentication)
     * Used by AuthService for login verification
     */
    async findByEmailWithPassword(email: string): Promise<(UserProfile & { password: string }) | null> {
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            include: {
                courseProgress: true,
                achievements: true,
            },
        });

        if (!user) return null;

        return {
            ...this.toUserProfile(user),
            password: user.password,
        };
    }

    /**
     * Check if user exists by email
     */
    async existsByEmail(email: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        return !!user;
    }

    /**
     * Update user
     */
    async update(
        userId: string,
        updates: Partial<UserProfile>
    ): Promise<UserProfile> {
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(updates.name && { name: updates.name }),
                ...(updates.avatar && { avatar: updates.avatar }),
                ...(updates.skillLevel && { skillLevel: updates.skillLevel }),
                ...(updates.interests && { interests: updates.interests }),
                ...(updates.learningGoals && {
                    learningGoals: updates.learningGoals,
                }),
                ...(updates.enrolledCourses && {
                    enrolledCourses: updates.enrolledCourses,
                }),
                ...(updates.completedCourses && {
                    completedCourses: updates.completedCourses,
                }),
                ...(updates.totalLearningTime !== undefined && {
                    totalLearningTime: updates.totalLearningTime,
                }),
                ...(updates.lastActiveDate && {
                    lastActiveDate: updates.lastActiveDate,
                }),
                ...(updates.isActive !== undefined && {
                    isActive: updates.isActive,
                }),
            },
            include: {
                courseProgress: true,
                achievements: true,
            },
        });

        return this.toUserProfile(user);
    }

    /**
     * Update course progress
     */
    async updateProgress(
        userId: string,
        courseId: string,
        progressUpdate: any
    ): Promise<UserProfile> {
        const existing = await prisma.courseProgress.findUnique({
            where: {
                userId_courseId: { userId, courseId },
            },
        });

        if (existing) {
            await prisma.courseProgress.update({
                where: {
                    userId_courseId: { userId, courseId },
                },
                data: {
                    lessonsCompleted: progressUpdate.lessonsCompleted || existing.lessonsCompleted,
                    modulesCompleted: progressUpdate.modulesCompleted || existing.modulesCompleted,
                    quizScores: progressUpdate.quizScores || existing.quizScores,
                    overallProgress: progressUpdate.overallProgress || existing.overallProgress,
                    totalTimeSpent:
                        progressUpdate.totalTimeSpent ||
                        existing.totalTimeSpent,
                    lastAccessedAt: new Date(),
                },
            });
        } else {
            await prisma.courseProgress.create({
                data: {
                    id: nanoid(),
                    userId,
                    courseId,
                    enrolledAt: new Date(),
                    lastAccessedAt: new Date(),
                    lessonsCompleted: progressUpdate.lessonsCompleted || [],
                    modulesCompleted: progressUpdate.modulesCompleted || [],
                    quizScores: progressUpdate.quizScores || [],
                    overallProgress: progressUpdate.overallProgress || 0,
                    totalTimeSpent: progressUpdate.totalTimeSpent || 0,
                },
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                courseProgress: true,
                achievements: true,
            },
        });

        return user ? this.toUserProfile(user) : ({} as UserProfile);
    }

    /**
     * Enroll user in course
     */
    async enrollCourse(userId: string, courseId: string): Promise<UserProfile> {
        await prisma.user.update({
            where: { id: userId },
            data: {
                enrolledCourses: {
                    push: courseId,
                },
            },
        });

        // Create course progress record
        await this.updateProgress(userId, courseId, {
            enrolledAt: new Date(),
        } as any);

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                courseProgress: true,
                achievements: true,
            },
        });

        return user ? this.toUserProfile(user) : ({} as UserProfile);
    }

    /**
     * Delete user
     */
    async delete(userId: string): Promise<void> {
        await prisma.user.delete({
            where: { id: userId },
        });
    }

    /**
     * List users with pagination
     */
    async list(skip: number = 0, limit: number = 10): Promise<{
        users: UserProfile[];
        total: number;
        hasMore: boolean;
    }> {
        const users = await prisma.user.findMany({
            skip,
            take: limit,
            include: {
                courseProgress: true,
                achievements: true,
            },
        });

        const total = await prisma.user.count();

        return {
            users: users.map((u: any) => this.toUserProfile(u)),
            total,
            hasMore: skip + limit < total,
        };
    }

    /**
     * Convert database user to UserProfile
     */
    private toUserProfile(user: any): UserProfile {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: user.avatar,
            role: user.role,
            skillLevel: user.skillLevel,
            interests: user.interests || [],
            learningGoals: user.learningGoals || [],
            enrolledCourses: user.enrolledCourses || [],
            completedCourses: user.completedCourses || [],
            courseProgress: user.courseProgress || [],
            achievements: user.achievements || [],
            totalLearningTime: user.totalLearningTime || 0,
            currentStreak: user.currentStreak || 0,
            longestStreak: user.longestStreak || 0,
            lastActiveDate: user.lastActiveDate,
            lastLoginDate: user.lastLoginDate,
            isActive: user.isActive,
            preferences: {
                notificationsEnabled: user.notificationsEnabled,
                dailyGoalMinutes: user.dailyGoalMinutes,
                preferredLearningTime: user.preferredLearningTime,
            },
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}

export const userRepository = new UserRepository();
