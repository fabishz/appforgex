import { Router, Request, Response } from 'express';
import { authService } from '../services/AuthService.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { requireAuth } from '../middleware/auth.js';
import { ApiResponse } from '../types/index.js';

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
    '/register',
    asyncHandler(async (req: Request, res: Response) => {
        const { user, tokens } = await authService.register(req.body);

        const response: ApiResponse<any> = {
            success: true,
            message: 'User registered successfully',
            data: {
                user,
                tokens,
            },
            timestamp: new Date(),
        };

        res.status(201).json(response);
    })
);

/**
 * POST /api/auth/login
 * Login user
 */
router.post(
    '/login',
    asyncHandler(async (req: Request, res: Response) => {
        const { user, tokens } = await authService.login(req.body);

        const response: ApiResponse<any> = {
            success: true,
            message: 'User logged in successfully',
            data: {
                user,
                tokens,
            },
            timestamp: new Date(),
        };

        res.json(response);
    })
);

/**
 * POST /api/auth/refresh
 * Refresh access token
 */
router.post(
    '/refresh',
    asyncHandler(async (req: Request, res: Response) => {
        const { refreshToken } = req.body;
        const tokens = await authService.refreshToken(refreshToken);

        const response: ApiResponse<any> = {
            success: true,
            message: 'Token refreshed successfully',
            data: tokens,
            timestamp: new Date(),
        };

        res.json(response);
    })
);

/**
 * GET /api/auth/verify
 * Verify current session
 */
router.get(
    '/verify',
    requireAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const user = await authService.verifyToken(
            req.headers.authorization?.split(' ')[1] || ''
        );

        const response: ApiResponse<any> = {
            success: true,
            message: 'Token is valid',
            data: user,
            timestamp: new Date(),
        };

        res.json(response);
    })
);

export default router;
