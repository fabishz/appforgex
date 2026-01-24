export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    skillLevel: SkillLevel;
    // Add other fields as needed, keeping it simple for now
    modules: any[]; // Using any for simplicity to avoid duplicating deep structures unless needed
    certificateOffered: boolean;
}

export interface UserProfile {
    id: string;
    name: string;
    skillLevel: SkillLevel;
    enrolledCourses: string[];
    completedCourses: string[];
    courseProgress: any[]; // Store the full progress object
    achievements: any[];
    totalLearningTime: number;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: Date;
}
