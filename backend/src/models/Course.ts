import mongoose, { Schema, Document } from 'mongoose';
import type { Course } from '../types/index';

// omit _id and id since Document already provides them
export interface CourseDocument extends Omit<Course, '_id' | 'id'>, Document {}

const CourseSchema = new Schema<CourseDocument>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            index: true,
        },
        shortDescription: String,
        fullDescription: String,
        skillLevel: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner',
        },
        category: {
            type: String,
            enum: [
                'web-development',
                'mobile-development',
                'data-science',
                'ai-ml',
                'devops',
                'design',
                'cybersecurity',
            ],
        },
        thumbnail: String,
        instructor: {
            name: String,
            title: String,
            avatar: String,
        },
        modules: [
            {
                id: String,
                title: String,
                description: String,
                lessons: [
                    {
                        id: String,
                        title: String,
                        type: String,
                        duration: Number,
                        order: Number,
                        isLocked: Boolean,
                        content: mongoose.Schema.Types.Mixed,
                    },
                ],
                order: Number,
                estimatedDuration: Number,
            },
        ],
        prerequisites: [String],
        learningOutcomes: [String],
        duration: Number,
        rating: Number,
        enrollmentCount: {
            type: Number,
            default: 0,
        },
        certificateOffered: {
            type: Boolean,
            default: false,
        },
        tags: [String],
        createdAt: {
            type: Date,
            default: () => new Date(),
            index: true,
        },
        updatedAt: {
            type: Date,
            default: () => new Date(),
        },
    },
    {
        timestamps: true,
        collection: 'courses',
    }
);

// Indexes for performance
CourseSchema.index({ category: 1, skillLevel: 1 });
CourseSchema.index({ title: 'text', shortDescription: 'text' });

CourseSchema.pre<CourseDocument>('save', function (next: (err?: Error) => void) {
    this.updatedAt = new Date();
    next();
});

export const CourseModel = mongoose.model<CourseDocument>(
    'Course',
    CourseSchema
);
