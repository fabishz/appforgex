import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/index.js';
import logger from './logger.js';

/**
 * Global error handler middleware
 * Must be the last middleware registered
 */
export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error('Error:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                details: err.message,
            },
            timestamp: new Date(),
        });
    }

    // Unexpected error
    return res.status(500).json({
        success: false,
        error: {
            code: 'INTERNAL_SERVER_ERROR',
            details:
                process.env.NODE_ENV === 'development'
                    ? err.message
                    : 'An unexpected error occurred',
        },
        timestamp: new Date(),
    });
};

/**
 * Async handler wrapper for express route handlers
 * Catches async errors and passes to error handler
 */
export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

/**
 * 404 handler
 */
export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const error = new AppError(
        404,
        'NOT_FOUND',
        `Route ${req.method} ${req.path} not found`
    );
    next(error);
};
