import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
        (info: any) =>
            `${info.timestamp} ${info.level}: ${info.message}`
    )
);

const transports = [
    // Console transport
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            format
        ),
    }),

    // Error file transport
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format,
    }),

    // Combined file transport
    new winston.transports.File({
        filename: 'logs/combined.log',
        format,
    }),
];

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    levels,
    format,
    transports,
});

export default logger;
