import { userRepository } from '../repositories/UserRepository.js';
import { courseRepository } from '../repositories/CourseRepository.js';
import {
    CourseProgress,
    ModuleProgress,
    LessonProgress,
    Achievement,
    NotFoundError,
} from '../types/index.js';
import { nanoid } from 'nanoid';

export class ProgressService {
    /**
     * Get user's learning statistics
     */
    async getLearningStats(userId: string) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User', userId);
        }

        // Count lessons across all enrolled courses
        let totalLessons = 0;
        let completedLessons = 0;

        for (const courseProgress of user.courseProgress) {
            for (const moduleProgress of courseProgress.moduleProgress) {
                totalLessons += moduleProgress.lessonProgress.length;
                completedLessons += moduleProgress.lessonProgress.filter(
                    (lp) => lp.completed
                ).length;
            }
        }

        return {
            totalCourses: user.enrolledCourses.length,
            completedCourses: user.completedCourses.length,
            inProgressCourses:
                user.enrolledCourses.length - user.completedCourses.length,
            totalLessons,
            completedLessons,
            totalLearningTime: user.totalLearningTime,
            certificatesEarned: user.achievements.filter(
                (a) => a.type === 'certificate'
            ).length,
            averageQuizScore: this.calculateAverageQuizScore(user),
            currentStreak: user.currentStreak,
            longestStreak: user.longestStreak,
        };
    }

    /**
     * Update lesson progress
     */
    async updateLessonProgress(
        userId: string,
        courseId: string,
        moduleId: string,
        lessonId: string,
        progressUpdate: Partial<LessonProgress>
    ): Promise<void> {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User', userId);
        }

        const courseProgress = user.courseProgress.find(
            (cp) => cp.courseId === courseId
        );
        if (!courseProgress) {
            throw new NotFoundError('Course enrollment', courseId);
        }

        const moduleProgress = courseProgress.moduleProgress.find(
            (mp) => mp.moduleId === moduleId
        );
        if (!moduleProgress) {
            throw new NotFoundError('Module progress', moduleId);
        }

        const lessonProgressIndex = moduleProgress.lessonProgress.findIndex(
            (lp) => lp.lessonId === lessonId
        );

        if (lessonProgressIndex >= 0) {
            moduleProgress.lessonProgress[lessonProgressIndex] = {
                ...moduleProgress.lessonProgress[lessonProgressIndex],
                ...progressUpdate,
                lessonId,
            };
        } else {
            moduleProgress.lessonProgress.push({
                lessonId,
                completed: false,
                timeSpent: 0,
                attempts: 0,
                ...progressUpdate,
            });
        }

        // Update module progress
        const allCompleted = moduleProgress.lessonProgress.every(
            (lp) => lp.completed
        );
        if (allCompleted && !moduleProgress.completed) {
            moduleProgress.completed = true;
            moduleProgress.completedAt = new Date();
        }

        // Update course overall progress
        const totalLessons = courseProgress.moduleProgress.reduce(
            (acc, mp) => acc + mp.lessonProgress.length,
            0
        );
        const completedLessons = courseProgress.moduleProgress.reduce(
            (acc, mp) =>
                acc +
                mp.lessonProgress.filter((lp) => lp.completed).length,
            0
        );
        courseProgress.overallProgress =
            totalLessons > 0
                ? Math.round((completedLessons / totalLessons) * 100)
                : 0;

        // Add time spent
        user.totalLearningTime +=
            (progressUpdate.timeSpent || 0) -
            (moduleProgress.lessonProgress[lessonProgressIndex]?.timeSpent || 0);

        // Update last active
        user.lastActiveDate = new Date();

        // Check if course is completed
        if (courseProgress.overallProgress === 100) {
            await this.completeCourse(user, courseId);
        }

        await userRepository.update(userId, user);
    }

    /**
     * Complete course and award certificate
     */
    async completeCourse(user: any, courseId: string): Promise<void> {
        const courseProgress = user.courseProgress.find(
            (cp: any) => cp.courseId === courseId
        );
        if (courseProgress && !courseProgress.certificateEarned) {
            courseProgress.certificateEarned = true;
            courseProgress.certificateEarnedAt = new Date();

            // Add to completed courses
            if (!user.completedCourses.includes(courseId)) {
                user.completedCourses.push(courseId);
            }

            // Award certificate achievement
            const course = await courseRepository.findById(courseId);
            if (course?.certificateOffered) {
                const achievement: Achievement = {
                    id: nanoid(),
                    type: 'certificate',
                    title: `Completed: ${course.title}`,
                    description: `Successfully completed the course "${course.title}"`,
                    icon: 'award',
                    earnedAt: new Date(),
                    courseId,
                };

                user.achievements.push(achievement);
            }
        }
    }

    /**
     * Calculate average quiz score
     */
    private calculateAverageQuizScore(user: any): number {
        let totalScore = 0;
        let quizCount = 0;

        for (const courseProgress of user.courseProgress) {
            for (const moduleProgress of courseProgress.moduleProgress) {
                for (const lessonProgress of moduleProgress.lessonProgress) {
                    if (
                        lessonProgress.quizScore !== undefined &&
                        lessonProgress.quizScore !== null
                    ) {
                        totalScore += lessonProgress.quizScore;
                        quizCount++;
                    }
                }
            }
        }

        return quizCount > 0 ? Math.round(totalScore / quizCount) : 0;
    }

    /**
     * Get course progress
     */
    async getCourseProgress(
        userId: string,
        courseId: string
    ): Promise<CourseProgress> {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User', userId);
        }

        const courseProgress = user.courseProgress.find(
            (cp) => cp.courseId === courseId
        );
        if (!courseProgress) {
            throw new NotFoundError(
                'Course enrollment for user',
                `${userId}/${courseId}`
            );
        }

        return courseProgress;
    }

    /**
     * Update streak
     */
    async updateStreak(userId: string): Promise<void> {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User', userId);
        }

        const today = new Date().toDateString();
        const lastActive = user.lastActiveDate
            ? new Date(user.lastActiveDate).toDateString()
            : null;

        if (lastActive === today) {
            return; // Already counted today
        }

        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (lastActive === yesterday) {
            // Streak continues
            user.currentStreak += 1;
            if (user.currentStreak > user.longestStreak) {
                user.longestStreak = user.currentStreak;
            }
        } else {
            // Streak resets
            user.currentStreak = 1;
        }

        user.lastActiveDate = new Date();
        await userRepository.update(userId, user);
    }
}

export const progressService = new ProgressService();
