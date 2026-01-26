import { Router, Request, Response } from 'express';
import { courseService } from '../services/CourseService.js';
import { progressService } from '../services/ProgressService.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { requireAuth } from '../middleware/auth.js';
import { CourseFilters, ApiResponse } from '../types/index.js';

const router = Router();

/**
 * GET /api/courses
 * Get all courses with optional filters
 */
router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const filters: CourseFilters = {
            skillLevel: (req.query.skillLevel as string)?.split(',') as any,
            category: (req.query.category as string)?.split(',') as any,
            searchQuery: req.query.search as string,
            sortBy: req.query.sortBy as any,
        };

        // Clean up undefined values
        Object.keys(filters).forEach(
            (key) => filters[key as keyof CourseFilters] === undefined && delete filters[key as keyof CourseFilters]
        );

        const result = await courseService.getAllCourses(
            filters,
            page,
            limit
        );

        const response: ApiResponse<any> = {
            success: true,
            data: {
                courses: result.courses,
                pagination: {
                    page,
                    limit,
                    total: result.total,
                    hasMore: result.hasMore,
                },
            },
            timestamp: new Date(),
        };

        res.json(response);
    })
);

/**
 * GET /api/courses/recommendations/:userId
 * Get recommended courses for user
 */
router.get(
    '/recommendations/:userId',
    asyncHandler(async (req: Request, res: Response) => {
        const limit = parseInt(req.query.limit as string) || 5;
        const recommendations = await courseService.getRecommendedCourses(
            req.params.userId,
            limit
        );

        const response: ApiResponse<any> = {
            success: true,
            data: recommendations,
            timestamp: new Date(),
        };

        res.json(response);
    })
);

/**
 * GET /api/courses/:courseId
 * Get course by ID
 */
router.get(
    '/:courseId',
    asyncHandler(async (req: Request, res: Response) => {
        const course = await courseService.getCourseById(req.params.courseId);

        const response: ApiResponse<any> = {
            success: true,
            data: course,
            timestamp: new Date(),
        };

        res.json(response);
    })
);

/**
 * POST /api/courses/:courseId/enroll
 * Enroll user in course
 */
router.post(
    '/:courseId/enroll',
    requireAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        const courseId = req.params.courseId;

        await courseService.enrollCourse(userId, courseId);

        const response: ApiResponse<any> = {
            success: true,
            message: 'Successfully enrolled in course',
            timestamp: new Date(),
        };

        res.json(response);
    })
);

/**
 * GET /api/courses/:courseId/progress/:userId
 * Get course progress for user
 */
router.get(
    '/:courseId/progress/:userId',
    requireAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const progress = await progressService.getCourseProgress(
            req.params.userId,
            req.params.courseId
        );

        const response: ApiResponse<any> = {
            success: true,
            data: progress,
            timestamp: new Date(),
        };

        res.json(response);
    })
);

export default router;
