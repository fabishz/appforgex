import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    UserProfile,
    CourseProgress,
    SkillLevel,
    CourseCategory,
    Achievement,
    LearningStats,
} from '@/types/training';
import { getCourseById } from '@/data/course-data';

interface TrainingStore {
    // User profile
    userProfile: UserProfile | null;
    isFirstVisit: boolean;

    // Active learning state
    activeCourseId: string | null;
    activeModuleId: string | null;
    activeLessonId: string | null;

    // Actions
    initializeUser: (name: string, skillLevel: SkillLevel, interests: CourseCategory[]) => void;
    updateSkillLevel: (level: SkillLevel) => void;
    enrollInCourse: (courseId: string) => void;
    unenrollFromCourse: (courseId: string) => void;
    startLesson: (courseId: string, moduleId: string, lessonId: string) => void;
    completeLesson: (courseId: string, moduleId: string, lessonId: string, timeSpent: number) => void;
    submitQuiz: (courseId: string, moduleId: string, lessonId: string, score: number) => void;
    updateLastActive: () => void;
    addAchievement: (achievement: Achievement) => void;
    getCourseProgress: (courseId: string) => CourseProgress | undefined;
    getLearningStats: () => LearningStats;
    resetProgress: () => void;
}

const DEFAULT_USER: UserProfile = {
    id: 'demo-user',
    name: 'Guest',
    skillLevel: 'beginner',
    interests: [],
    learningGoals: [],
    enrolledCourses: [],
    completedCourses: [],
    courseProgress: [],
    achievements: [],
    totalLearningTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: new Date(),
    preferences: {
        notificationsEnabled: false,
    },
    createdAt: new Date(),
};

export const useTrainingStore = create<TrainingStore>()(
    persist(
        (set, get) => ({
            userProfile: null,
            isFirstVisit: true,
            activeCourseId: null,
            activeModuleId: null,
            activeLessonId: null,

            initializeUser: (name, skillLevel, interests) => {
                set({
                    userProfile: {
                        ...DEFAULT_USER,
                        name,
                        skillLevel,
                        interests,
                    },
                    isFirstVisit: false,
                });
            },

            updateSkillLevel: (level) => {
                set((state) => ({
                    userProfile: state.userProfile
                        ? { ...state.userProfile, skillLevel: level }
                        : null,
                }));
            },

            enrollInCourse: (courseId) => {
                set((state) => {
                    if (!state.userProfile) return state;

                    const alreadyEnrolled = state.userProfile.enrolledCourses.includes(courseId);
                    if (alreadyEnrolled) return state;

                    const newProgress: CourseProgress = {
                        courseId,
                        enrolledAt: new Date(),
                        lastAccessedAt: new Date(),
                        moduleProgress: [],
                        overallProgress: 0,
                        certificateEarned: false,
                    };

                    return {
                        userProfile: {
                            ...state.userProfile,
                            enrolledCourses: [...state.userProfile.enrolledCourses, courseId],
                            courseProgress: [...state.userProfile.courseProgress, newProgress],
                        },
                    };
                });
            },

            unenrollFromCourse: (courseId) => {
                set((state) => {
                    if (!state.userProfile) return state;

                    return {
                        userProfile: {
                            ...state.userProfile,
                            enrolledCourses: state.userProfile.enrolledCourses.filter(
                                (id) => id !== courseId
                            ),
                            courseProgress: state.userProfile.courseProgress.filter(
                                (p) => p.courseId !== courseId
                            ),
                        },
                    };
                });
            },

            startLesson: (courseId, moduleId, lessonId) => {
                set((state) => {
                    if (!state.userProfile) return state;

                    const courseProgress = state.userProfile.courseProgress.find(
                        (p) => p.courseId === courseId
                    );

                    if (!courseProgress) return state;

                    // Update last accessed
                    const updatedProgress = state.userProfile.courseProgress.map((p) =>
                        p.courseId === courseId
                            ? { ...p, lastAccessedAt: new Date() }
                            : p
                    );

                    return {
                        activeCourseId: courseId,
                        activeModuleId: moduleId,
                        activeLessonId: lessonId,
                        userProfile: {
                            ...state.userProfile,
                            courseProgress: updatedProgress,
                            lastActiveDate: new Date(),
                        },
                    };
                });
            },

            completeLesson: (courseId, moduleId, lessonId, timeSpent) => {
                set((state) => {
                    if (!state.userProfile) return state;

                    const courseProgressIndex = state.userProfile.courseProgress.findIndex(
                        (p) => p.courseId === courseId
                    );

                    if (courseProgressIndex === -1) return state;

                    const courseProgress = state.userProfile.courseProgress[courseProgressIndex];
                    const moduleProgressIndex = courseProgress.moduleProgress.findIndex(
                        (m) => m.moduleId === moduleId
                    );

                    let updatedModuleProgress = [...courseProgress.moduleProgress];

                    if (moduleProgressIndex === -1) {
                        // Create new module progress
                        updatedModuleProgress.push({
                            moduleId,
                            lessonProgress: [
                                {
                                    lessonId,
                                    completed: true,
                                    completedAt: new Date(),
                                    timeSpent,
                                },
                            ],
                            completed: false,
                        });
                    } else {
                        // Update existing module progress
                        const moduleProgress = updatedModuleProgress[moduleProgressIndex];
                        const lessonProgressIndex = moduleProgress.lessonProgress.findIndex(
                            (l) => l.lessonId === lessonId
                        );

                        if (lessonProgressIndex === -1) {
                            moduleProgress.lessonProgress.push({
                                lessonId,
                                completed: true,
                                completedAt: new Date(),
                                timeSpent,
                            });
                        } else {
                            moduleProgress.lessonProgress[lessonProgressIndex] = {
                                ...moduleProgress.lessonProgress[lessonProgressIndex],
                                completed: true,
                                completedAt: new Date(),
                                timeSpent:
                                    moduleProgress.lessonProgress[lessonProgressIndex].timeSpent +
                                    timeSpent,
                            };
                        }
                    }

                    // Update course progress
                    const updatedCourseProgress = [...state.userProfile.courseProgress];

                    // Check for course completion
                    const course = getCourseById(courseId);
                    let isCourseCompleted = false;
                    let certificateEarned = false;
                    let newAchievements = [...state.userProfile.achievements];
                    let newCompletedCourses = [...state.userProfile.completedCourses];

                    if (course) {
                        const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
                        const currentCompletedLessons = updatedModuleProgress.reduce(
                            (sum, mod) => sum + mod.lessonProgress.filter((l) => l.completed).length,
                            0
                        );

                        // If we just completed the last lesson
                        if (currentCompletedLessons === totalLessons) {
                            isCourseCompleted = true;
                            if (!newCompletedCourses.includes(courseId)) {
                                newCompletedCourses.push(courseId);
                            }

                            if (course.certificateOffered) {
                                certificateEarned = true;
                                // Add certificate achievement if not already there
                                const hasCertificate = newAchievements.some(a => a.courseId === courseId && a.type === 'certificate');
                                if (!hasCertificate) {
                                    newAchievements.push({
                                        id: `cert-${courseId}-${Date.now()}`,
                                        type: 'certificate',
                                        title: `${course.title} Certificate`,
                                        description: `Completed ${course.title}`,
                                        icon: 'award',
                                        earnedAt: new Date(),
                                        courseId: courseId
                                    });
                                }
                            }
                        }
                    }

                    updatedCourseProgress[courseProgressIndex] = {
                        ...courseProgress,
                        moduleProgress: updatedModuleProgress,
                        lastAccessedAt: new Date(),
                        overallProgress: course ? Math.round((updatedModuleProgress.reduce((sum, mod) => sum + mod.lessonProgress.filter(l => l.completed).length, 0) / course.modules.reduce((sum, m) => sum + m.lessons.length, 0)) * 100) : 0,
                        certificateEarned: certificateEarned || courseProgress.certificateEarned,
                        certificateEarnedAt: certificateEarned ? new Date() : courseProgress.certificateEarnedAt
                    };

                    return {
                        userProfile: {
                            ...state.userProfile,
                            courseProgress: updatedCourseProgress,
                            completedCourses: newCompletedCourses,
                            achievements: newAchievements,
                            totalLearningTime: state.userProfile.totalLearningTime + timeSpent,
                            lastActiveDate: new Date(),
                        },
                    };
                });
            },

            submitQuiz: (courseId, moduleId, lessonId, score) => {
                set((state) => {
                    if (!state.userProfile) return state;

                    const courseProgressIndex = state.userProfile.courseProgress.findIndex(
                        (p) => p.courseId === courseId
                    );

                    if (courseProgressIndex === -1) return state;

                    const courseProgress = state.userProfile.courseProgress[courseProgressIndex];
                    const moduleProgress = courseProgress.moduleProgress.find(
                        (m) => m.moduleId === moduleId
                    );

                    if (!moduleProgress) return state;

                    const updatedLessonProgress = moduleProgress.lessonProgress.map((l) =>
                        l.lessonId === lessonId
                            ? {
                                ...l,
                                quizScore: score,
                                attempts: (l.attempts || 0) + 1,
                                completed: score >= 70, // Pass at 70%
                                completedAt: score >= 70 ? new Date() : l.completedAt,
                            }
                            : l
                    );

                    const updatedModuleProgress = courseProgress.moduleProgress.map((m) =>
                        m.moduleId === moduleId
                            ? { ...m, lessonProgress: updatedLessonProgress }
                            : m
                    );

                    const updatedCourseProgress = [...state.userProfile.courseProgress];
                    updatedCourseProgress[courseProgressIndex] = {
                        ...courseProgress,
                        moduleProgress: updatedModuleProgress,
                    };

                    return {
                        userProfile: {
                            ...state.userProfile,
                            courseProgress: updatedCourseProgress,
                        },
                    };
                });
            },

            updateLastActive: () => {
                set((state) => {
                    if (!state.userProfile) return state;

                    const today = new Date().toDateString();
                    const lastActive = new Date(state.userProfile.lastActiveDate).toDateString();

                    let newStreak = state.userProfile.currentStreak;

                    if (today !== lastActive) {
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        const yesterdayStr = yesterday.toDateString();

                        if (lastActive === yesterdayStr) {
                            // Continue streak
                            newStreak += 1;
                        } else {
                            // Reset streak
                            newStreak = 1;
                        }
                    }

                    return {
                        userProfile: {
                            ...state.userProfile,
                            lastActiveDate: new Date(),
                            currentStreak: newStreak,
                            longestStreak: Math.max(newStreak, state.userProfile.longestStreak),
                        },
                    };
                });
            },

            addAchievement: (achievement) => {
                set((state) => {
                    if (!state.userProfile) return state;

                    return {
                        userProfile: {
                            ...state.userProfile,
                            achievements: [...state.userProfile.achievements, achievement],
                        },
                    };
                });
            },

            getCourseProgress: (courseId) => {
                const state = get();
                return state.userProfile?.courseProgress.find((p) => p.courseId === courseId);
            },

            getLearningStats: () => {
                const state = get();
                if (!state.userProfile) {
                    return {
                        totalCourses: 0,
                        completedCourses: 0,
                        inProgressCourses: 0,
                        totalLessons: 0,
                        completedLessons: 0,
                        totalLearningTime: 0,
                        certificatesEarned: 0,
                        averageQuizScore: 0,
                        currentStreak: 0,
                        longestStreak: 0,
                    };
                }

                const profile = state.userProfile;
                const completedLessons = profile.courseProgress.reduce(
                    (sum, course) =>
                        sum +
                        course.moduleProgress.reduce(
                            (modSum, mod) => modSum + mod.lessonProgress.filter((l) => l.completed).length,
                            0
                        ),
                    0
                );

                const allQuizScores = profile.courseProgress.flatMap((course) =>
                    course.moduleProgress.flatMap((mod) =>
                        mod.lessonProgress
                            .filter((l) => l.quizScore !== undefined)
                            .map((l) => l.quizScore!)
                    )
                );

                const averageQuizScore =
                    allQuizScores.length > 0
                        ? allQuizScores.reduce((sum, score) => sum + score, 0) / allQuizScores.length
                        : 0;

                return {
                    totalCourses: profile.enrolledCourses.length,
                    completedCourses: profile.completedCourses.length,
                    inProgressCourses:
                        profile.enrolledCourses.length - profile.completedCourses.length,
                    totalLessons: 0, // Would need course data to calculate
                    completedLessons,
                    totalLearningTime: profile.totalLearningTime,
                    certificatesEarned: profile.achievements.filter((a) => a.type === 'certificate')
                        .length,
                    averageQuizScore,
                    currentStreak: profile.currentStreak,
                    longestStreak: profile.longestStreak,
                };
            },

            resetProgress: () => {
                set({
                    userProfile: null,
                    isFirstVisit: true,
                    activeCourseId: null,
                    activeModuleId: null,
                    activeLessonId: null,
                });
            },
        }),
        {
            name: 'training-portal-storage',
            version: 1,
        }
    )
);
