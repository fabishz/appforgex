import { CourseModel, CourseDocument } from '../models/Course.js';
import { Course, CourseFilters, NotFoundError } from '../types/index.js';

export class CourseRepository {
    /**
     * Create a new course
     */
    async create(courseData: Partial<Course>): Promise<Course> {
        const course = new CourseModel(courseData);
        const savedCourse = await course.save();
        return this.toDTO(savedCourse);
    }

    /**
     * Find course by ID
     */
    async findById(courseId: string): Promise<Course | null> {
        const course = await CourseModel.findOne({ id: courseId });
        return course ? this.toDTO(course) : null;
    }

    /**
     * Find all courses with optional filters
     */
    async findAll(filters?: CourseFilters): Promise<Course[]> {
        const query: Record<string, any> = {};

        if (filters?.skillLevel && filters.skillLevel.length > 0) {
            query.skillLevel = { $in: filters.skillLevel };
        }

        if (filters?.category && filters.category.length > 0) {
            query.category = { $in: filters.category };
        }

        if (filters?.certificateOffered !== undefined) {
            query.certificateOffered = filters.certificateOffered;
        }

        if (filters?.duration?.min || filters?.duration?.max) {
            query.duration = {};
            if (filters.duration.min) {
                query.duration.$gte = filters.duration.min;
            }
            if (filters.duration.max) {
                query.duration.$lte = filters.duration.max;
            }
        }

        if (filters?.searchQuery) {
            query.$text = { $search: filters.searchQuery };
        }

        let courses = await CourseModel.find(query);

        // Sort
        switch (filters?.sortBy) {
            case 'popular':
                courses.sort(
                    (a, b) =>
                        (b.enrollmentCount || 0) - (a.enrollmentCount || 0)
                );
                break;
            case 'rating':
                courses.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'recent':
                courses.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );
                break;
            case 'duration':
                courses.sort((a, b) => a.duration - b.duration);
                break;
            default:
                break;
        }

        return courses.map((c) => this.toDTO(c));
    }

    /**
     * Get courses by IDs (for enrolled courses)
     */
    async findByIds(courseIds: string[]): Promise<Course[]> {
        const courses = await CourseModel.find({ id: { $in: courseIds } });
        return courses.map((c) => this.toDTO(c));
    }

    /**
     * Update course
     */
    async update(
        courseId: string,
        updateData: Partial<Course>
    ): Promise<Course> {
        const course = await CourseModel.findOneAndUpdate(
            { id: courseId },
            { ...updateData, updatedAt: new Date() },
            { new: true }
        );

        if (!course) {
            throw new NotFoundError('Course', courseId);
        }

        return this.toDTO(course);
    }

    /**
     * Delete course
     */
    async delete(courseId: string): Promise<void> {
        const result = await CourseModel.deleteOne({ id: courseId });
        if (result.deletedCount === 0) {
            throw new NotFoundError('Course', courseId);
        }
    }

    /**
     * List courses with pagination
     */
    async list(
        page: number = 1,
        limit: number = 10,
        filters?: CourseFilters
    ): Promise<{
        courses: Course[];
        total: number;
        hasMore: boolean;
    }> {
        const skip = (page - 1) * limit;
        const courses = await this.findAll(filters);
        const paginatedCourses = courses.slice(skip, skip + limit);

        return {
            courses: paginatedCourses,
            total: courses.length,
            hasMore: skip + limit < courses.length,
        };
    }

    /**
     * Increment enrollment count
     */
    async incrementEnrollmentCount(courseId: string): Promise<void> {
        await CourseModel.findOneAndUpdate(
            { id: courseId },
            { $inc: { enrollmentCount: 1 } }
        );
    }

    /**
     * Seed courses (for initial data loading)
     */
    async seedCourses(courses: Course[]): Promise<void> {
        // Check if courses already exist
        const existingCount = await CourseModel.countDocuments();
        if (existingCount > 0) {
            return; // Don't reseed if data already exists
        }

        await CourseModel.insertMany(courses);
    }

    /**
     * Convert CourseDocument to Course DTO
     */
    private toDTO(course: CourseDocument): Course {
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
