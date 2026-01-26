/**
 * Backend Type Definitions
 * Comprehensive types for the training portal API
 */

// ============ Common Types ============
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type LessonType = 'theory' | 'interactive' | 'challenge' | 'project' | 'quiz';
export type CourseCategory =
    | 'web-development'
    | 'mobile-development'
    | 'data-science'
    | 'ai-ml'
    | 'devops'
    | 'design'
    | 'cybersecurity';

export type UserRole = 'student' | 'instructor' | 'admin';
export type AchievementType = 'certificate' | 'badge' | 'milestone';

// ============ API Response Types ============
export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: {
        code: string;
        details?: string;
    };
    timestamp: Date;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    };
}

// ============ Auth Types ============
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface JwtPayload {
    userId: string;
    email: string;
    role: UserRole;
    iat: number;
    exp: number;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    skillLevel?: SkillLevel;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

// ============ Course Types ============
export interface CodeExample {
    language: string;
    code: string;
    explanation?: string;
}

export interface TestCase {
    input: string;
    expectedOutput: string;
    description?: string;
}

export interface Resource {
    type: 'link' | 'file' | 'video';
    title: string;
    url: string;
}

export interface RubricItem {
    criterion: string;
    points: number;
    description: string;
}

export interface QuizQuestion {
    id: string;
    question: string;
    type: 'multiple-choice' | 'code';
    options?: string[];
    correctAnswer: string | number;
    explanation?: string;
}

export interface LessonContent {
    theory?: {
        sections: {
            heading: string;
            content: string;
            codeExample?: CodeExample;
        }[];
        keyTakeaways: string[];
    };
    interactive?: {
        instructions: string;
        starterCode?: string;
        expectedOutput?: string;
        hints: string[];
        solution?: string;
    };
    challenge?: {
        title: string;
        description: string;
        difficulty: 'easy' | 'medium' | 'hard';
        requirements: string[];
        testCases?: TestCase[];
        starterCode?: string;
    };
    project?: {
        brief: string;
        objectives: string[];
        specifications: string[];
        resources: Resource[];
        rubric: RubricItem[];
    };
    quiz?: {
        questions: QuizQuestion[];
        passingScore: number;
        timeLimit?: number;
    };
}

export interface Lesson {
    _id?: string;
    id: string;
    title: string;
    type: LessonType;
    duration: number;
    content: LessonContent;
    order: number;
    isLocked?: boolean;
}

export interface Module {
    _id?: string;
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    order: number;
    estimatedDuration: number;
}

export interface Course {
    _id?: string;
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    skillLevel: SkillLevel;
    category: CourseCategory;
    thumbnail: string;
    instructor: {
        name: string;
        title: string;
        avatar?: string;
    };
    modules: Module[];
    prerequisites: string[];
    learningOutcomes: string[];
    duration: number;
    rating?: number;
    enrollmentCount?: number;
    certificateOffered: boolean;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CourseFilters {
    skillLevel?: SkillLevel[];
    category?: CourseCategory[];
    duration?: {
        min?: number;
        max?: number;
    };
    certificateOffered?: boolean;
    searchQuery?: string;
    sortBy?: 'popular' | 'recent' | 'rating' | 'duration';
}

// ============ Progress Types ============
export interface LessonProgress {
    lessonId: string;
    completed: boolean;
    completedAt?: Date;
    timeSpent: number;
    quizScore?: number;
    attempts?: number;
}

export interface ModuleProgress {
    moduleId: string;
    lessonProgress: LessonProgress[];
    completed: boolean;
    completedAt?: Date;
}

export interface CourseProgress {
    courseId: string;
    enrolledAt: Date;
    lastAccessedAt: Date;
    moduleProgress: ModuleProgress[];
    overallProgress: number;
    certificateEarned: boolean;
    certificateEarnedAt?: Date;
}

// ============ Achievement Types ============
export interface Achievement {
    _id?: string;
    id: string;
    type: AchievementType;
    title: string;
    description: string;
    icon: string;
    earnedAt: Date;
    courseId?: string;
}

// ============ User Types ============
export interface UserProfile {
    _id?: string;
    id: string;
    name: string;
    email: string;
    password: string; // Hashed password (not returned in API responses)
    avatar?: string;
    role: UserRole;
    skillLevel: SkillLevel;
    interests: CourseCategory[];
    learningGoals: string[];
    enrolledCourses: string[];
    completedCourses: string[];
    courseProgress: CourseProgress[];
    achievements: Achievement[];
    totalLearningTime: number;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: Date;
    lastLoginDate?: Date;
    isActive: boolean;
    preferences: {
        dailyGoalMinutes?: number;
        notificationsEnabled: boolean;
        preferredLearningTime?: 'morning' | 'afternoon' | 'evening';
    };
    createdAt: Date;
    updatedAt: Date;
}

export type UserPublicProfile = Omit<UserProfile, 'password' | 'email'>;

// ============ Recommendation Types ============
export interface Recommendation {
    course: Course;
    reason: string;
    relevanceScore: number;
    type: 'next-step' | 'similar' | 'trending' | 'personalized';
}

// ============ Statistics Types ============
export interface LearningStats {
    totalCourses: number;
    completedCourses: number;
    inProgressCourses: number;
    totalLessons: number;
    completedLessons: number;
    totalLearningTime: number;
    certificatesEarned: number;
    averageQuizScore: number;
    currentStreak: number;
    longestStreak: number;
}

// ============ Error Types ============
export class AppError extends Error {
    constructor(
        public statusCode: number,
        public code: string,
        message: string,
        public details?: string
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export class ValidationError extends AppError {
    constructor(message: string, details?: string) {
        super(400, 'VALIDATION_ERROR', message, details);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

export class AuthenticationError extends AppError {
    constructor(message: string = 'Authentication failed') {
        super(401, 'AUTHENTICATION_ERROR', message);
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}

export class AuthorizationError extends AppError {
    constructor(message: string = 'Insufficient permissions') {
        super(403, 'AUTHORIZATION_ERROR', message);
        Object.setPrototypeOf(this, AuthorizationError.prototype);
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string, id?: string) {
        const message = `${resource}${id ? ` with ID ${id}` : ''} not found`;
        super(404, 'NOT_FOUND', message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(409, 'CONFLICT', message);
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
