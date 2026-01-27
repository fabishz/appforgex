import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { config } from './config/config';
import { connectDatabase } from './config/database';
import logger from './middleware/logger';
import { sanitizeMiddleware } from './middleware/validation';
import {
    errorHandler,
    notFoundHandler,
} from './middleware/errorHandler';

import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/courses.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();
const PORT = config.app.port;

// ============ Security Middleware ============

// Helmet - Set security HTTP headers
app.use(helmet());

// CORS configuration
app.use(
    cors({
        origin: config.security.corsOrigin,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['X-Total-Count', 'X-Page-Number'],
        optionsSuccessStatus: 200,
    })
);

// Rate limiting
const limiter = rateLimit({
    windowMs: config.security.rateLimitWindowMs,
    max: config.security.rateLimitMaxRequests,
    message:
        'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', limiter);

// ============ Body Parsing Middleware ============
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ============ Input Sanitization ============
app.use(sanitizeMiddleware);

// ============ Request Logging ============
app.use((req, express, next) => {
    const start = Date.now();
    express.on('finish', () => {
        const duration = Date.now() - start;
        logger.http(
            `${req.method} ${req.path} - ${express.statusCode} - ${duration}ms`
        );
    });
    next();
});

// ============ Health Check ============
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date(),
        environment: config.app.nodeEnv,
        uptime: process.uptime(),
    });
});

// ============ API Routes ============
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);

// ============ Error Handling ============

// 404 handler - must be after all routes
app.use(notFoundHandler);

// Global error handler - must be last
app.use(errorHandler);

// ============ Server Startup ============
const startServer = async () => {
    try {
        // Connect to database
        await connectDatabase();
        logger.info('Database connected');

        // Start server
        app.listen(PORT, () => {
            logger.info(
                `Server running on port ${PORT} (${config.app.nodeEnv})`
            );
            logger.info(`CORS enabled for: ${config.security.corsOrigin.join(', ')}`);
        });
    } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        logger.error('Failed to start server:', { message: err.message });
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    process.exit(0);
});

// Start the server
startServer();

export default app;
