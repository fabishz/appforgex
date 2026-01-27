import { prisma } from '../config/database';
import { nanoid } from 'nanoid';
import { Course, NotFoundError } from '../types/index';

/**
 * Prisma-based Course Repository
 * Replaces MongoDB/Mongoose implementation with PostgreSQL/Prisma
 */
export class CourseRepository {
    /**
     * Create a new course
     */
    async create(courseData: Course): Promise<Course> {
        const course = await prisma.course.create({
            data: {
                id: courseData.id,
                title: courseData.title,
                shortDescription: courseData.shortDescription,
                fullDescription: courseData.fullDescription,
                skillLevel: courseData.skillLevel,
                category: courseData.category,
                thumbnail: courseData.thumbnail,
                instructor: courseData.instructor,
                duration: courseData.duration,
                rating: courseData.rating || 0,
                enrollmentCount: courseData.enrollmentCount || 0,
                certificateOffered: courseData.certificateOffered || false,
                tags: courseData.tags || [],
                prerequisites: courseData.prerequisites || [],
                learningOutcomes: courseData.learningOutcomes || [],
                modules: courseData.modules,
            },
        });

        return this.toDTO(course);
    }

    /**
     * Find course by ID
     */
    async findById(courseId: string): Promise<Course> {
        const course = await prisma.course.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            throw new NotFoundError('Course', courseId);
        }

        return this.toDTO(course);
    }

    /**
     * Get all courses with filtering and sorting
     */
    async findAll(filters?: {
        category?: string;
        skillLevel?: string;
        searchQuery?: string;
        duration?: number;
        sortBy?: 'popular' | 'rating' | 'recent' | 'duration';
    }): Promise<Course[]> {
        let where: any = {};

        if (filters?.category) {
            where.category = filters.category;
        }

        if (filters?.skillLevel) {
            where.skillLevel = filters.skillLevel;
        }

        if (filters?.duration) {
            where.duration = { lte: filters.duration };
        }

        if (filters?.searchQuery) {
            where.OR = [
                {
                    title: {
                        search: filters.searchQuery,
                    },
                },
                {
                    shortDescription: {
                        search: filters.searchQuery,
                    },
                },
            ];
        }

        let orderBy: any = { createdAt: 'desc' };

        switch (filters?.sortBy) {
            case 'popular':
                orderBy = { enrollmentCount: 'desc' };
                break;
            case 'rating':
                orderBy = { rating: 'desc' };
                break;
            case 'duration':
                orderBy = { duration: 'asc' };
                break;
            case 'recent':
                orderBy = { createdAt: 'desc' };
                break;
        }

        const courses = await prisma.course.findMany({
            where,
            orderBy,
        });

        return courses.map((c: any) => this.toDTO(c));
    }

    /**
     * Find courses by IDs
     */
    async findByIds(courseIds: string[]): Promise<Course[]> {
        const courses = await prisma.course.findMany({
            where: {
                id: { in: courseIds },
            },
        });

        return courses.map((c: any) => this.toDTO(c));
    }

    /**
     * Update course
     */
    async update(courseId: string, updates: Partial<Course>): Promise<Course> {
        const course = await prisma.course.update({
            where: { id: courseId },
            data: {
                ...(updates.title && { title: updates.title }),
                ...(updates.shortDescription && {
                    shortDescription: updates.shortDescription,
                }),
                ...(updates.fullDescription && {
                    fullDescription: updates.fullDescription,
                }),
                ...(updates.thumbnail && { thumbnail: updates.thumbnail }),
                ...(updates.rating !== undefined && { rating: updates.rating }),
                ...(updates.enrollmentCount !== undefined && {
                    enrollmentCount: updates.enrollmentCount,
                }),
            },
        });

        return this.toDTO(course);
    }

    /**
     * Delete course
     */
    async delete(courseId: string): Promise<void> {
        await prisma.course.delete({
            where: { id: courseId },
        });
    }

    /**
     * List courses with pagination
     */
    async list(skip: number = 0, limit: number = 10): Promise<{
        courses: Course[];
        total: number;
        hasMore: boolean;
    }> {
        const courses = await prisma.course.findMany({
            skip,
            take: limit,
        });

        const total = await prisma.course.count();

        return {
            courses: courses.map((c) => this.toDTO(c)),
            total,
            hasMore: skip + limit < total,
        };
    }

    /**
     * Increment course enrollment
     */
    async incrementEnrollment(courseId: string): Promise<void> {
        await prisma.course.update({
            where: { id: courseId },
            data: {
                enrollmentCount: {
                    increment: 1,
                },
            },
        });
    }

    /**
     * Seed courses into database
     */
    async seedCourses(courses: Course[]): Promise<void> {
        for (const course of courses) {
            const exists = await prisma.course.findUnique({
                where: { id: course.id },
            });

            if (!exists) {
                await this.create(course);
            }
        }
    }

    /**
     * Convert to Course DTO
     */
    private toDTO(course: any): Course {
        return {
            id: course.id,
            title: course.title,
            shortDescription: course.shortDescription,
            fullDescription: course.fullDescription,
            skillLevel: course.skillLevel,
            category: course.category,
            thumbnail: course.thumbnail,
            instructor: course.instructor,
            modules: course.modules,
            prerequisites: course.prerequisites,
            learningOutcomes: course.learningOutcomes,
            duration: course.duration,
            rating: course.rating,
            enrollmentCount: course.enrollmentCount,
            certificateOffered: course.certificateOffered,
            tags: course.tags,
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
        };
    }
}

export const courseRepository = new CourseRepository();
