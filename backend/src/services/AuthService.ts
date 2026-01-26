import { nanoid } from 'nanoid';
import { userRepository } from '../repositories/UserRepository.js';
import { courseRepository } from '../repositories/CourseRepository.js';
import { passwordUtils } from '../utils/password.js';
import { jwtUtils } from '../utils/jwt.js';
import {
    UserProfile,
    AuthTokens,
    RegisterRequest,
    LoginRequest,
    AuthenticationError,
    ValidationError,
    ConflictError,
} from '../types/index.js';

export class AuthService {
    /**
     * Register a new user
     */
    async register(request: RegisterRequest): Promise<{
        user: UserProfile;
        tokens: AuthTokens;
    }> {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(request.email)) {
            throw new ValidationError('Invalid email format');
        }

        // Check password strength
        const passwordValidation =
            passwordUtils.validatePasswordStrength(request.password);
        if (!passwordValidation.isValid) {
            throw new ValidationError(
                'Password does not meet security requirements',
                passwordValidation.errors.join('; ')
            );
        }

        // Check if user already exists
        const existingUser = await userRepository.findByEmail(request.email);
        if (existingUser) {
            throw new ConflictError(
                'User with this email already exists. Please login instead.'
            );
        }

        // Hash password
        const passwordHash = await passwordUtils.hashPassword(
            request.password
        );

        // Create user
        const user = await userRepository.create({
            id: nanoid(),
            name: request.name,
            email: request.email.toLowerCase(),
            password: passwordHash,
            skillLevel: request.skillLevel || 'beginner',
            role: 'student',
            enrolledCourses: [],
            completedCourses: [],
            courseProgress: [],
            achievements: [],
            totalLearningTime: 0,
            currentStreak: 0,
            longestStreak: 0,
            lastActiveDate: new Date(),
            isActive: true,
            preferences: {
                notificationsEnabled: true,
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        } as UserProfile);

        // Generate tokens
        const tokens = jwtUtils.generateTokens(user.id, user.email, user.role);

        return {
            user,
            tokens,
        };
    }

    /**
     * Login user
     */
    async login(request: LoginRequest): Promise<{
        user: UserProfile;
        tokens: AuthTokens;
    }> {
        // Find user by email with password
        const userWithPassword =
            await userRepository.findByEmailWithPassword(request.email);

        if (!userWithPassword) {
            throw new AuthenticationError(
                'Invalid email or password. Please try again.'
            );
        }

        // Compare passwords
        const isPasswordCorrect = await passwordUtils.comparePassword(
            request.password,
            userWithPassword.password
        );

        if (!isPasswordCorrect) {
            throw new AuthenticationError(
                'Invalid email or password. Please try again.'
            );
        }

        // Update last login date
        const user = await userRepository.update(userWithPassword.id, {
            lastLoginDate: new Date(),
        });

        // Generate tokens
        const tokens = jwtUtils.generateTokens(user.id, user.email, user.role);

        return {
            user,
            tokens,
        };
    }

    /**
     * Refresh access token
     */
    async refreshToken(refreshToken: string): Promise<AuthTokens> {
        try {
            const payload = jwtUtils.verifyRefreshToken(refreshToken);
            const user = await userRepository.findById(payload.userId);

            if (!user) {
                throw new AuthenticationError(
                    'User not found. Please login again.'
                );
            }

            return jwtUtils.generateTokens(user.id, user.email, user.role);
        } catch (error) {
            throw new AuthenticationError(
                'Failed to refresh token. Please login again.'
            );
        }
    }

    /**
     * Verify token
     */
    async verifyToken(token: string): Promise<UserProfile> {
        try {
            const payload = jwtUtils.verifyAccessToken(token);
            const user = await userRepository.findById(payload.userId);

            if (!user) {
                throw new AuthenticationError('User not found');
            }

            return user;
        } catch (error) {
            throw new AuthenticationError('Invalid token');
        }
    }
}

export const authService = new AuthService();
