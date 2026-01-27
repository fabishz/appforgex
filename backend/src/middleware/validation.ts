import { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';
import { ValidationError } from '../types/index';

/**
 * Sanitize request body to prevent XSS attacks
 */
export const sanitizeMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.body && typeof req.body === 'object') {
        req.body = sanitizeObject(req.body);
    }
    next();
};

/**
 * Recursively sanitize object properties
 */
function sanitizeObject<T extends Record<string, any>>(obj: T): T {
    const sanitized = { ...obj };

    for (const key in sanitized) {
        if (Object.prototype.hasOwnProperty.call(sanitized, key)) {
            const value = sanitized[key];

            if (typeof value === 'string') {
                sanitized[key] = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                }) as T[Extract<keyof T, string>];
            } else if (
                value &&
                typeof value === 'object' &&
                !Array.isArray(value) &&
                Object.prototype.toString.call(value) !== '[object Date]'
            ) {
                sanitized[key] = sanitizeObject(value);
            } else if (Array.isArray(value)) {
                sanitized[key] = value.map((item: any) =>
                    typeof item === 'string'
                        ? sanitizeHtml(item, {
                              allowedTags: [],
                              allowedAttributes: {},
                          })
                        : item && typeof item === 'object'
                          ? sanitizeObject(item)
                          : item
                ) as T[Extract<keyof T, string>];
            }
        }
    }

    return sanitized;
}

/**
 * Validate request input against schema
 */
export const validateInput = (schema: Record<string, any>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const errors: Record<string, string> = {};

        for (const [key, validator] of Object.entries(schema)) {
            const value = req.body[key];

            if (validator.required && !value) {
                errors[key] = `${key} is required`;
                continue;
            }

            if (!value) continue;

            if (validator.type && typeof value !== validator.type) {
                errors[key] = `${key} must be of type ${validator.type}`;
            }

            if (
                validator.type === 'string' &&
                typeof value === 'string'
            ) {
                if (
                    validator.minLength &&
                    value.length < validator.minLength
                ) {
                    errors[key] = `${key} must be at least ${validator.minLength} characters`;
                }
                if (
                    validator.maxLength &&
                    value.length > validator.maxLength
                ) {
                    errors[key] = `${key} must not exceed ${validator.maxLength} characters`;
                }
                if (validator.pattern && !validator.pattern.test(value)) {
                    errors[key] = `${key} has invalid format`;
                }
            }

            if (validator.enum && !validator.enum.includes(value)) {
                errors[key] = `${key} must be one of: ${validator.enum.join(', ')}`;
            }
        }

        if (Object.keys(errors).length > 0) {
            res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    details: JSON.stringify(errors),
                },
                timestamp: new Date(),
            });
            return;
        }

        next();
    };
};
