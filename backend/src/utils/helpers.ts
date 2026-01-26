export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const generateId = (prefix?: string): string => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    return `${prefix ? prefix + '_' : ''}${timestamp}${random}`;
};

export const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const calculateProgress = (
    completed: number,
    total: number
): number => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
};

export const getDateRange = (
    days: number
): { from: Date; to: Date } => {
    const to = new Date();
    const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);
    return { from, to };
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isProduction = (): boolean => {
    return process.env.NODE_ENV === 'production';
};

export const isDevelopment = (): boolean => {
    return process.env.NODE_ENV === 'development';
};
