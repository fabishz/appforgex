import mongoose, { Schema, Document } from 'mongoose';
import type { UserProfile } from '../types/index';

// omit _id and id since Document already provides them
export interface UserDocument extends Omit<UserProfile, '_id' | 'id'>, Document {}

const UserSchema = new Schema<UserDocument>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
            select: false, // Don't return password by default
        },
        avatar: String,
        role: {
            type: String,
            enum: ['student', 'instructor', 'admin'],
            default: 'student',
        },
        skillLevel: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner',
        },
        interests: [String],
        learningGoals: [String],
        enrolledCourses: [String],
        completedCourses: [String],
        courseProgress: [
            {
                courseId: String,
                enrolledAt: Date,
                lastAccessedAt: Date,
                moduleProgress: [
                    {
                        moduleId: String,
                        lessonProgress: [
                            {
                                lessonId: String,
                                completed: Boolean,
                                completedAt: Date,
                                timeSpent: Number,
                                quizScore: Number,
                                attempts: Number,
                            },
                        ],
                        completed: Boolean,
                        completedAt: Date,
                    },
                ],
                overallProgress: Number,
                certificateEarned: Boolean,
                certificateEarnedAt: Date,
            },
        ],
        achievements: [
            {
                id: String,
                type: {
                    type: String,
                    enum: ['certificate', 'badge', 'milestone'],
                },
                title: String,
                description: String,
                icon: String,
                earnedAt: Date,
                courseId: String,
            },
        ],
        totalLearningTime: {
            type: Number,
            default: 0,
        },
        currentStreak: {
            type: Number,
            default: 0,
        },
        longestStreak: {
            type: Number,
            default: 0,
        },
        lastActiveDate: Date,
        lastLoginDate: Date,
        isActive: {
            type: Boolean,
            default: true,
        },
        preferences: {
            dailyGoalMinutes: Number,
            notificationsEnabled: {
                type: Boolean,
                default: true,
            },
            preferredLearningTime: String,
        },
        createdAt: {
            type: Date,
            default: () => new Date(),
        },
        updatedAt: {
            type: Date,
            default: () => new Date(),
        },
    },
    {
        timestamps: true,
        collection: 'users',
    }
);

// Indexes for common queries
UserSchema.index({ email: 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ enrolledCourses: 1 });

// Update updatedAt on save
UserSchema.pre<UserDocument>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const User = mongoose.model<UserDocument>('User', UserSchema);
