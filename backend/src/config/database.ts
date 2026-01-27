import { PrismaClient } from '@prisma/client';
import logger from '../middleware/logger.js';

/**
 * Global Prisma Client instance
 * Using global to prevent multiple instances in development
 */
declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma =
    global.prisma ||
    new PrismaClient({
        log: [
            { emit: 'event', level: 'query' },
            { emit: 'event', level: 'error' },
            { emit: 'event', level: 'warn' },
        ],
    });

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

// Log queries in development
if (process.env.NODE_ENV === 'development') {
    (prisma as any).$on('query', (e: any) => {
        logger.debug(`Query: ${e.query}`);
        logger.debug(`Params: ${e.params}`);
        logger.debug(`Duration: ${e.duration}ms`);
    });
}

// Log errors and warnings
(prisma as any).$on('error', (e: any) => {
    logger.error(`Prisma Error: ${e.message}`);
});

(prisma as any).$on('warn', (e: any) => {
    logger.warn(`Prisma Warning: ${e.message}`);
});

/**
 * Connect to PostgreSQL database via Prisma/Neon
 */
export const connectDatabase = async (): Promise<void> => {
    try {
        logger.info('Connecting to PostgreSQL via Neon Serverless...');

        // Test the connection
        await prisma.$queryRaw`SELECT 1`;

        logger.info(
            '✓ Connected to PostgreSQL (Neon Serverless)'
        );

        // Graceful shutdown
        process.on('SIGINT', async () => {
            logger.info('Closing Prisma connection...');
            await prisma.$disconnect();
            process.exit(0);
        });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
        logger.error(`✗ PostgreSQL Connection Error: ${errorMessage}`);
        process.exit(1);
    }
};

/**
 * Disconnect from PostgreSQL
 */
export const disconnectDatabase = async (): Promise<void> => {
    try {
        await prisma.$disconnect();
        logger.info('✓ Disconnected from PostgreSQL');
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
        logger.error(`✗ PostgreSQL Disconnection Error: ${errorMessage}`);
    }
};
