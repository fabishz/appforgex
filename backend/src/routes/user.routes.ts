import { Router, Request, Response } from 'express';
import { userRepository } from '../repositories/UserRepository.js';
import { progressService } from '../services/ProgressService.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import { ApiResponse, NotFoundError } from '../types/index.js';

const router = Router();

/**
 * GET /api/users/:userId
 * Get user profile
 */
router.get(
    '/:userId',
    asyncHandler(async (req: Request, res: Response) => {
        const user = await userRepository.findById(req.params.userId);

        if (!user) {
            throw new NotFoundError('User', req.params.userId);
        }

        const response: ApiResponse<any> = {
            success: true,
            data: user,
            timestamp: new Date(),
        };

        res.json(response);
    })
);

/**
 * GET /api/users/:userId/stats
 * Get user learning statistics
 */
router.get(
    '/:userId/stats',
    asyncHandler(async (req: Request, res: Response) => {
        const stats = await progressService.getLearningStats(req.params.userId);

        const response: ApiResponse<any> = {
            success: true,
            data: stats,
            timestamp: new Date(),
        };

        res.json(response);
    })
);

/**
 * PUT /api/users/:userId
 * Update user profile
 */
router.put(
    '/:userId',
    requireAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const authReq = req as AuthRequest;
        
        // Ensure user can only update their own profile
        if (authReq.userId !== req.params.userId) {
            return res.status(403).json({
                success: false,
                error: {
                    code: 'AUTHORIZATION_ERROR',
                    details: 'You can only update your own profile',
                },
                timestamp: new Date(),
            });
        }

        const user = await userRepository.update(req.params.userId, req.body);

        const response: ApiResponse<any> = {
            success: true,
            message: 'Profile updated successfully',
            data: user,
            timestamp: new Date(),
        };

        res.json(response);
    })
);

/**
 * POST /api/users/:userId/progress/:courseId/:moduleId/:lessonId
 * Update lesson progress
 */
router.post(
    '/:userId/progress/:courseId/:moduleId/:lessonId',
    requireAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const authReq = req as AuthRequest;
        
        // Ensure user can only update their own progress
        if (authReq.userId !== req.params.userId) {
            return res.status(403).json({
                success: false,
                error: {
                    code: 'AUTHORIZATION_ERROR',
                    details: 'You can only update your own progress',
                },
                timestamp: new Date(),
            });
        }

        await progressService.updateLessonProgress(
            req.params.userId,
            req.params.courseId,
            req.params.moduleId,
            req.params.lessonId,
            req.body
        );

        const response: ApiResponse<any> = {
            success: true,
            message: 'Progress updated successfully',
            timestamp: new Date(),
        };

        res.json(response);
    })
);

/**
 * POST /api/users/:userId/streak
 * Update learning streak
 */
router.post(
    '/:userId/streak',
    requireAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const authReq = req as AuthRequest;
        
        if (authReq.userId !== req.params.userId) {
            return res.status(403).json({
                success: false,
                error: {
                    code: 'AUTHORIZATION_ERROR',
                    details: 'You can only update your own streak',
                },
                timestamp: new Date(),
            });
        }

        await progressService.updateStreak(req.params.userId);

        const response: ApiResponse<any> = {
            success: true,
            message: 'Streak updated successfully',
            timestamp: new Date(),
        };

        res.json(response);
    })
);

export default router;
