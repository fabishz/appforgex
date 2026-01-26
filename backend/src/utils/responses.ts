/**
 * API Response Helper Utilities
 * Provides consistent response formatting across the application
 */

import { Response } from 'express';
import { ApiResponse } from '../types/index.js';

/**
 * Send successful response
 */
export const sendSuccess = (
    res: Response,
    data: unknown,
    message: string = 'Success',
    statusCode: number = 200
): Response => {
    const response: ApiResponse<unknown> = {
        success: true,
        message,
        data,
        timestamp: new Date(),
    };
    return res.status(statusCode).json(response);
};

/**
 * Send paginated response
 */
export const sendPaginatedResponse = (
    res: Response,
    data: unknown,
    page: number,
    limit: number,
    total: number,
    message: string = 'Success'
): Response => {
    const hasMore = page * limit < total;
    const response = {
        success: true,
        message,
        data,
        pagination: {
            page,
            limit,
            total,
            hasMore,
        },
        timestamp: new Date(),
    };
    return res.json(response);
};

/**
 * Send error response
 */
export const sendError = (
    res: Response,
    statusCode: number,
    code: string,
    message: string,
    details?: string
): Response => {
    const response: ApiResponse<unknown> = {
        success: false,
        message,
        error: {
            code,
            details,
        },
        timestamp: new Date(),
    };
    return res.status(statusCode).json(response);
};

/**
 * Send created response (201)
 */
export const sendCreated = (
    res: Response,
    data: unknown,
    message: string = 'Created successfully'
): Response => {
    return sendSuccess(res, data, message, 201);
};

/**
 * Send accepted response (202)
 */
export const sendAccepted = (
    res: Response,
    data: unknown,
    message: string = 'Request accepted'
): Response => {
    return sendSuccess(res, data, message, 202);
};

/**
 * Send no content response (204)
 */
export const sendNoContent = (res: Response): Response => {
    return res.status(204).send();
};

/**
 * Send bad request response (400)
 */
export const sendBadRequest = (
    res: Response,
    message: string,
    details?: string
): Response => {
    return sendError(res, 400, 'VALIDATION_ERROR', message, details);
};

/**
 * Send unauthorized response (401)
 */
export const sendUnauthorized = (
    res: Response,
    message: string = 'Unauthorized'
): Response => {
    return sendError(
        res,
        401,
        'AUTHENTICATION_ERROR',
        message
    );
};

/**
 * Send forbidden response (403)
 */
export const sendForbidden = (
    res: Response,
    message: string = 'Forbidden'
): Response => {
    return sendError(res, 403, 'AUTHORIZATION_ERROR', message);
};

/**
 * Send not found response (404)
 */
export const sendNotFound = (
    res: Response,
    resource: string
): Response => {
    return sendError(
        res,
        404,
        'NOT_FOUND',
        `${resource} not found`
    );
};

/**
 * Send conflict response (409)
 */
export const sendConflict = (
    res: Response,
    message: string
): Response => {
    return sendError(res, 409, 'CONFLICT', message);
};

/**
 * Send internal server error response (500)
 */
export const sendInternalError = (
    res: Response,
    message: string = 'Internal server error'
): Response => {
    return sendError(
        res,
        500,
        'INTERNAL_SERVER_ERROR',
        message
    );
};
