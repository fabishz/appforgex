import mongoose from 'mongoose';
import logger from '../middleware/logger.js';
import { config } from './config.js';

export const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(config.database.mongoUrl, {
            maxPoolSize: config.database.maxPoolSize,
            minPoolSize: config.database.minPoolSize,
        });

        logger.info('MongoDB connected successfully');
    } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        logger.error('MongoDB connection failed:', { message: err.message });
        process.exit(1);
    }
};

export const disconnectDatabase = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        logger.info('MongoDB disconnected');
    } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        logger.error('MongoDB disconnection failed:', {
            message: err.message,
        });
    }
};
