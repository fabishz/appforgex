import dotenv from 'dotenv';

dotenv.config();

export interface Config {
    app: {
        port: number;
        nodeEnv: 'development' | 'production' | 'test';
    };
    database: {
        mongoUrl: string;
        maxPoolSize: number;
        minPoolSize: number;
    };
    jwt: {
        accessSecret: string;
        refreshSecret: string;
        accessExpiry: string;
        refreshExpiry: string;
    };
    security: {
        corsOrigin: string[];
        rateLimitWindowMs: number;
        rateLimitMaxRequests: number;
        bcryptRounds: number;
    };
    logging: {
        level: 'error' | 'warn' | 'info' | 'http' | 'debug';
    };
}

const getConfig = (): Config => {
    const nodeEnv = (process.env.NODE_ENV ||
        'development') as 'development' | 'production' | 'test';

    return {
        app: {
            port: parseInt(process.env.PORT || '3001', 10),
            nodeEnv,
        },
        database: {
            mongoUrl:
                process.env.MONGODB_URL ||
                'mongodb://localhost:27017/training-portal',
            maxPoolSize: parseInt(
                process.env.DB_MAX_POOL_SIZE || '10',
                10
            ),
            minPoolSize: parseInt(
                process.env.DB_MIN_POOL_SIZE || '2',
                10
            ),
        },
        jwt: {
            accessSecret:
                process.env.JWT_ACCESS_SECRET || 'access-secret-key',
            refreshSecret:
                process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
            accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
            refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
        },
        security: {
            corsOrigin: (
                process.env.CORS_ORIGIN || 'http://localhost:5173'
            ).split(','),
            rateLimitWindowMs: parseInt(
                process.env.RATE_LIMIT_WINDOW_MS || '900000',
                10
            ),
            rateLimitMaxRequests: parseInt(
                process.env.RATE_LIMIT_MAX_REQUESTS || '100',
                10
            ),
            bcryptRounds: parseInt(
                process.env.BCRYPT_ROUNDS || '10',
                10
            ),
        },
        logging: {
            level: (process.env.LOG_LEVEL || 'info') as
                | 'error'
                | 'warn'
                | 'info'
                | 'http'
                | 'debug',
        },
    };
};

export const config = getConfig();
