import jwt from 'jsonwebtoken';
import type { JwtPayload, AuthTokens } from '../types/index.js';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || 'your-secret-key';
const REFRESH_TOKEN_SECRET =
    process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';
const ACCESS_TOKEN_EXPIRY = process.env.JWT_ACCESS_EXPIRY || '15m';
const REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d';

export const jwtUtils = {
    /**
     * Generate both access and refresh tokens
     */
    generateTokens(userId: string, email: string, role: string): AuthTokens {
        const payload = {
            userId,
            email,
            role,
        };
        
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET as string, {
            expiresIn: ACCESS_TOKEN_EXPIRY,
        } as any);

        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET as string, {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        } as any);

        const decoded = jwt.decode(accessToken) as any;
        const expiresIn =
            decoded && decoded.exp
                ? Math.floor((decoded.exp * 1000 - Date.now()) / 1000)
                : 900;

        return {
            accessToken,
            refreshToken,
            expiresIn,
        };
    },

    /**
     * Verify access token
     */
    verifyAccessToken(token: string): JwtPayload {
        return jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
    },

    /**
     * Verify refresh token
     */
    verifyRefreshToken(token: string): JwtPayload {
        return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;
    },

    /**
     * Decode token without verification
     */
    decodeToken(token: string): JwtPayload | null {
        return jwt.decode(token) as JwtPayload | null;
    },

    /**
     * Extract token from Bearer header
     */
    extractToken(authHeader?: string): string | null {
        if (!authHeader) return null;

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return null;
        }

        return parts[1];
    },
};
