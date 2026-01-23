import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTrainingStore } from '@/hooks/use-training-store';
import { getCourseById } from '@/data/course-data';

// Mock the persistence to avoid issues in tests
vi.mock('zustand/middleware', () => ({
    persist: (config: any) => (set: any, get: any, api: any) => config(set, get, api),
}));

describe('Training Portal User Flow', () => {
    beforeEach(() => {
        const store = useTrainingStore.getState();
        store.resetProgress();
        store.initializeUser('Test User', 'beginner', ['web-development']);
    });

    it('should allow a user to enroll in a course', () => {
        const store = useTrainingStore.getState();
        const courseId = 'web-dev-fundamentals'; // Assuming this ID exists in mock data

        store.enrollInCourse(courseId);

        const updatedStore = useTrainingStore.getState();
        expect(updatedStore.userProfile?.enrolledCourses).toContain(courseId);
        expect(updatedStore.getCourseProgress(courseId)).toBeDefined();
    });

    it('should track lesson progress', () => {
        const store = useTrainingStore.getState();
        const courseId = 'web-dev-fundamentals';
        store.enrollInCourse(courseId);

        const course = getCourseById(courseId);
        if (!course) throw new Error('Course not found');

        const moduleId = course.modules[0].id;
        const lessonId = course.modules[0].lessons[0].id;

        store.startLesson(courseId, moduleId, lessonId);
        store.completeLesson(courseId, moduleId, lessonId, 10);

        const updatedStore = useTrainingStore.getState();
        const progress = updatedStore.getCourseProgress(courseId);
        const moduleProgress = progress?.moduleProgress.find(m => m.moduleId === moduleId);
        const lessonProgress = moduleProgress?.lessonProgress.find(l => l.lessonId === lessonId);

        expect(lessonProgress?.completed).toBe(true);
    });

    it('should mark course as completed and award certificate when all lessons are finished', () => {
        const store = useTrainingStore.getState();
        // Use a simpler course if possible, or just complete all lessons for the first one
        const course = getCourseById('web-dev-fundamentals');
        if (!course) throw new Error('Course not found');

        const courseId = course.id;
        store.enrollInCourse(courseId);

        // Complete all lessons
        course.modules.forEach(module => {
            module.lessons.forEach(lesson => {
                store.completeLesson(courseId, module.id, lesson.id, 10);
            });
        });

        const updatedStore = useTrainingStore.getState();
        const progress = updatedStore.getCourseProgress(courseId);

        expect(updatedStore.userProfile?.completedCourses).toContain(courseId);

        if (course.certificateOffered) {
            expect(progress?.certificateEarned).toBe(true);
            expect(updatedStore.userProfile?.achievements.some(a => a.type === 'certificate' && a.courseId === courseId)).toBe(true);
        }
    });
});
