import { Course, UserProfile, Recommendation, SkillLevel } from '@/types/training';
import { courses } from '@/data/course-data';

/**
 * Adaptive Course Recommendation Engine
 * Generates personalized course suggestions based on user profile and progress
 */

/**
 * Calculate relevance score for a course based on user profile
 */
function calculateRelevanceScore(
    course: Course,
    userProfile: UserProfile
): number {
    let score = 0;

    // Skill level match (40 points)
    if (course.skillLevel === userProfile.skillLevel) {
        score += 40;
    } else if (
        (userProfile.skillLevel === 'beginner' && course.skillLevel === 'intermediate') ||
        (userProfile.skillLevel === 'intermediate' && course.skillLevel === 'advanced') ||
        (userProfile.skillLevel === 'intermediate' && course.skillLevel === 'beginner')
    ) {
        score += 20; // Adjacent skill level
    }

    // Category interest match (30 points)
    if (userProfile.interests.includes(course.category)) {
        score += 30;
    }

    // Prerequisites met (20 points)
    const prerequisitesMet = course.prerequisites.every(prereqId =>
        userProfile.completedCourses.includes(prereqId)
    );
    if (prerequisitesMet) {
        score += 20;
    } else if (course.prerequisites.length === 0) {
        score += 20; // No prerequisites
    }

    // Popularity boost (10 points)
    if (course.enrollmentCount && course.enrollmentCount > 8000) {
        score += 10;
    } else if (course.enrollmentCount && course.enrollmentCount > 5000) {
        score += 5;
    }

    return score;
}

/**
 * Get personalized course recommendations
 */
export function getPersonalizedRecommendations(
    userProfile: UserProfile,
    limit: number = 6
): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Filter out already enrolled or completed courses
    const availableCourses = courses.filter(
        course =>
            !userProfile.enrolledCourses.includes(course.id) &&
            !userProfile.completedCourses.includes(course.id)
    );

    // Calculate scores for each course
    availableCourses.forEach(course => {
        const score = calculateRelevanceScore(course, userProfile);
        let reason = '';

        // Generate recommendation reason
        if (course.skillLevel === userProfile.skillLevel) {
            reason = `Perfect match for your ${course.skillLevel} skill level`;
        } else if (
            userProfile.skillLevel === 'beginner' &&
            course.skillLevel === 'intermediate'
        ) {
            reason = 'Ready to advance your skills';
        } else if (
            userProfile.skillLevel === 'intermediate' &&
            course.skillLevel === 'advanced'
        ) {
            reason = 'Take your expertise to the next level';
        } else if (userProfile.interests.includes(course.category)) {
            reason = 'Based on your interests';
        } else {
            reason = 'Expand your knowledge';
        }

        recommendations.push({
            course,
            reason,
            relevanceScore: score,
            type: 'personalized',
        });
    });

    // Sort by relevance score and return top results
    return recommendations
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, limit);
}

/**
 * Get next recommended courses based on completed courses
 */
export function getNextStepRecommendations(
    userProfile: UserProfile,
    limit: number = 3
): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Find courses that have prerequisites we've completed
    const availableCourses = courses.filter(
        course =>
            !userProfile.enrolledCourses.includes(course.id) &&
            !userProfile.completedCourses.includes(course.id)
    );

    availableCourses.forEach(course => {
        // Check if user has completed any prerequisites
        const completedPrerequisites = course.prerequisites.filter(prereqId =>
            userProfile.completedCourses.includes(prereqId)
        );

        if (completedPrerequisites.length > 0) {
            const allPrerequisitesMet = course.prerequisites.every(prereqId =>
                userProfile.completedCourses.includes(prereqId)
            );

            if (allPrerequisitesMet) {
                recommendations.push({
                    course,
                    reason: 'You\'ve completed all prerequisites',
                    relevanceScore: 90 + (course.rating || 0) * 2,
                    type: 'next-step',
                });
            }
        }
    });

    return recommendations
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, limit);
}

/**
 * Get courses in progress (continue learning)
 */
export function getContinueLearningCourses(
    userProfile: UserProfile
): Course[] {
    return userProfile.courseProgress
        .filter(progress => !progress.certificateEarned)
        .sort((a, b) => b.lastAccessedAt.getTime() - a.lastAccessedAt.getTime())
        .map(progress => courses.find(c => c.id === progress.courseId))
        .filter((course): course is Course => course !== undefined);
}

/**
 * Get similar courses based on a given course
 */
export function getSimilarCourses(
    courseId: string,
    limit: number = 3
): Course[] {
    const targetCourse = courses.find(c => c.id === courseId);
    if (!targetCourse) return [];

    return courses
        .filter(course => course.id !== courseId)
        .map(course => {
            let similarityScore = 0;

            // Same category
            if (course.category === targetCourse.category) similarityScore += 40;

            // Same skill level
            if (course.skillLevel === targetCourse.skillLevel) similarityScore += 30;

            // Shared tags
            const sharedTags = course.tags.filter(tag =>
                targetCourse.tags.includes(tag)
            );
            similarityScore += sharedTags.length * 5;

            return { course, similarityScore };
        })
        .sort((a, b) => b.similarityScore - a.similarityScore)
        .slice(0, limit)
        .map(item => item.course);
}

/**
 * Check if user meets prerequisites for a course
 */
export function meetsPrerequisites(
    courseId: string,
    userProfile: UserProfile
): { meets: boolean; missing: Course[] } {
    const course = courses.find(c => c.id === courseId);
    if (!course) return { meets: false, missing: [] };

    const missingPrerequisites = course.prerequisites
        .filter(prereqId => !userProfile.completedCourses.includes(prereqId))
        .map(prereqId => courses.find(c => c.id === prereqId))
        .filter((c): c is Course => c !== undefined);

    return {
        meets: missingPrerequisites.length === 0,
        missing: missingPrerequisites,
    };
}

/**
 * Suggest skill level based on completed courses
 */
export function suggestSkillLevel(userProfile: UserProfile): SkillLevel {
    const completed = userProfile.completedCourses.length;

    if (completed === 0) return 'beginner';

    const completedCourses = courses.filter(c =>
        userProfile.completedCourses.includes(c.id)
    );

    const hasAdvanced = completedCourses.some(c => c.skillLevel === 'advanced');
    const hasIntermediate = completedCourses.some(
        c => c.skillLevel === 'intermediate'
    );

    if (hasAdvanced && completed >= 3) return 'advanced';
    if (hasIntermediate && completed >= 2) return 'intermediate';
    if (completed >= 1) return 'intermediate';

    return 'beginner';
}

/**
 * Get trending courses (high enrollment + recent)
 */
export function getTrendingCourses(limit: number = 6): Course[] {
    const now = new Date();
    const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));

    return courses
        .filter(course => course.updatedAt >= threeMonthsAgo)
        .sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0))
        .slice(0, limit);
}
