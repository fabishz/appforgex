import { Request, Response, NextFunction } from 'express';
import { jwtUtils } from '../utils/jwt.js';
import { AuthenticationError, AuthorizationError } from '../types/index.js';

export interface AuthRequest extends Request {
    userId?: string;
    userEmail?: string;
    userRole?: string;
}

/**
 * Verify JWT token and attach user info to request
 */
export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;
        const token = jwtUtils.extractToken(authHeader);

        if (!token) {
            throw new AuthenticationError(
                'No token provided. Please include Authorization header with Bearer token.'
            );
        }

        const payload = jwtUtils.verifyAccessToken(token);

        req.userId = payload.userId;
        req.userEmail = payload.email;
        req.userRole = payload.role;

        next();
    } catch (error) {
        if (error instanceof AuthenticationError) {
            res.status(error.statusCode).json({
                success: false,
                error: {
                    code: error.code,
                    details: error.message,
                },
                timestamp: new Date(),
            });
            return;
        }

        const err =
            error instanceof Error
                ? error
                : new Error('Token verification failed');

        if (
            err.message.includes('jwt expired') ||
            err.message.includes('JsonWebTokenError')
        ) {
            res.status(401).json({
                success: false,
                error: {
                    code: 'TOKEN_EXPIRED',
                    details: 'Your session has expired. Please login again.',
                },
                timestamp: new Date(),
            });
            return;
        }

        res.status(401).json({
            success: false,
            error: {
                code: 'INVALID_TOKEN',
                details: 'Invalid or malformed token.',
            },
            timestamp: new Date(),
        });
    }
};

/**
 * Verify user has required role
 */
export const requireRole = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.userRole) {
            res.status(401).json({
                success: false,
                error: {
                    code: 'AUTHENTICATION_ERROR',
                    details: 'User not authenticated',
                },
                timestamp: new Date(),
            });
            return;
        }

        if (!roles.includes(req.userRole)) {
            res.status(403).json({
                success: false,
                error: {
                    code: 'AUTHORIZATION_ERROR',
                    details: `Required role: ${roles.join(' or ')}`,
                },
                timestamp: new Date(),
            });
            return;
        }

        next();
    };
};

/**
 * Ensure user is authenticated
 */
export const requireAuth = authMiddleware;
