/**
 * Training Portal Type Definitions
 * Comprehensive types for the personalized learning platform
 */

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

/**
 * Individual lesson within a module
 */
export interface Lesson {
    id: string;
    title: string;
    type: LessonType;
    duration: number; // in minutes
    content: LessonContent;
    order: number;
    isLocked?: boolean;
}

/**
 * Lesson content structure - adapts to lesson type
 */
export interface LessonContent {
    // Theory lessons
    theory?: {
        sections: {
            heading: string;
            content: string;
            codeExample?: CodeExample;
        }[];
        keyTakeaways: string[];
    };

    // Interactive assignments
    interactive?: {
        instructions: string;
        starterCode?: string;
        expectedOutput?: string;
        hints: string[];
        solution?: string;
    };

    // Challenges
    challenge?: {
        title: string;
        description: string;
        difficulty: 'easy' | 'medium' | 'hard';
        requirements: string[];
        testCases?: TestCase[];
        starterCode?: string;
    };

    // Projects
    project?: {
        brief: string;
        objectives: string[];
        specifications: string[];
        resources: Resource[];
        rubric: RubricItem[];
    };

    // Quizzes
    quiz?: {
        questions: QuizQuestion[];
        passingScore: number;
        timeLimit?: number; // in minutes
    };
}

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

/**
 * Module within a course
 */
export interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    order: number;
    estimatedDuration: number; // total minutes for module
}

/**
 * Complete course structure
 */
export interface Course {
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
    prerequisites: string[]; // course IDs
    learningOutcomes: string[];
    duration: number; // total hours
    rating?: number;
    enrollmentCount?: number;
    certificateOffered: boolean;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

/**
 * User's lesson progress
 */
export interface LessonProgress {
    lessonId: string;
    completed: boolean;
    completedAt?: Date;
    timeSpent: number; // in minutes
    quizScore?: number;
    attempts?: number;
}

/**
 * User's module progress
 */
export interface ModuleProgress {
    moduleId: string;
    lessonProgress: LessonProgress[];
    completed: boolean;
    completedAt?: Date;
}

/**
 * User's course progress
 */
export interface CourseProgress {
    courseId: string;
    enrolledAt: Date;
    lastAccessedAt: Date;
    moduleProgress: ModuleProgress[];
    overallProgress: number; // 0-100 percentage
    certificateEarned: boolean;
    certificateEarnedAt?: Date;
}

/**
 * User achievement/certificate
 */
export interface Achievement {
    id: string;
    type: 'certificate' | 'badge' | 'milestone';
    title: string;
    description: string;
    icon: string;
    earnedAt: Date;
    courseId?: string;
}

/**
 * User learning profile
 */
export interface UserProfile {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
    skillLevel: SkillLevel;
    interests: CourseCategory[];
    learningGoals: string[];
    enrolledCourses: string[]; // course IDs
    completedCourses: string[]; // course IDs
    courseProgress: CourseProgress[];
    achievements: Achievement[];
    totalLearningTime: number; // in minutes
    currentStreak: number; // days
    longestStreak: number; // days
    lastActiveDate: Date;
    preferences: {
        dailyGoalMinutes?: number;
        notificationsEnabled: boolean;
        preferredLearningTime?: 'morning' | 'afternoon' | 'evening';
    };
    createdAt: Date;
}

/**
 * Course recommendation
 */
export interface Recommendation {
    course: Course;
    reason: string;
    relevanceScore: number; // 0-100
    type: 'next-step' | 'similar' | 'trending' | 'personalized';
}

/**
 * Filter options for course browsing
 */
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

/**
 * Learning statistics
 */
export interface LearningStats {
    totalCourses: number;
    completedCourses: number;
    inProgressCourses: number;
    totalLessons: number;
    completedLessons: number;
    totalLearningTime: number; // minutes
    certificatesEarned: number;
    averageQuizScore: number;
    currentStreak: number;
    longestStreak: number;
}
