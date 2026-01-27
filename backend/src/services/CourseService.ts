import { courseRepository } from '../repositories/CourseRepository.js';
import { userRepository } from '../repositories/UserRepository.js';
import {
    Course,
    CourseFilters,
    Recommendation,
    NotFoundError,
} from '../types/index.js';

export class CourseService {
    /**
     * Get all courses with optional filters
     */
    async getAllCourses(
        filters?: CourseFilters,
        page: number = 1,
        limit: number = 10
    ): Promise<{ courses: Course[]; total: number; hasMore: boolean }> {
        const skip = (page - 1) * limit;
        
        if (filters) {
            // Use findAll for filtered queries
            const skillLevel = Array.isArray(filters.skillLevel) 
                ? filters.skillLevel[0] 
                : filters.skillLevel;
            
            const duration = filters.duration 
                ? typeof filters.duration === 'object' 
                    ? filters.duration.max 
                    : filters.duration
                : undefined;

            const courses = await courseRepository.findAll({
                category: filters.category as any,
                skillLevel: skillLevel,
                searchQuery: filters.searchQuery,
                duration: duration,
                sortBy: filters.sortBy as any,
            });
            
            return {
                courses,
                total: courses.length,
                hasMore: false,
            };
        }
        
        return courseRepository.list(skip, limit);
    }

    /**
     * Get course by ID
     */
    async getCourseById(courseId: string): Promise<Course> {
        const course = await courseRepository.findById(courseId);
        if (!course) {
            throw new NotFoundError('Course', courseId);
        }
        return course;
    }

    /**
     * Get recommended courses for a user
     */
    async getRecommendedCourses(
        userId: string,
        limit: number = 5
    ): Promise<Recommendation[]> {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User', userId);
        }

        const allCourses = await courseRepository.findAll();

        // Filter out already enrolled courses
        const availableCourses = allCourses.filter(
            (c) => !user.enrolledCourses.includes(c.id)
        );

        // Recommendation logic:
        // 1. Match interests and skill level progression
        // 2. Consider prerequisites met
        // 3. Score based on relevance
        const recommendations = availableCourses
            .map((course) => {
                let relevanceScore = 0;
                let reason = '';

                // 1. Interest matching (30 points)
                if (user.interests.includes(course.category)) {
                    relevanceScore += 30;
                    reason += 'Matches your interests. ';
                }

                // 2. Skill level progression (25 points)
                const skillLevels = ['beginner', 'intermediate', 'advanced'];
                const userSkillIndex = skillLevels.indexOf(user.skillLevel);
                const courseSkillIndex = skillLevels.indexOf(
                    course.skillLevel
                );

                if (courseSkillIndex === userSkillIndex + 1) {
                    relevanceScore += 25;
                    reason += 'Next step in your learning path. ';
                } else if (courseSkillIndex === userSkillIndex) {
                    relevanceScore += 15;
                    reason += 'Consolidate your current level. ';
                }

                // 3. Prerequisites met (20 points)
                const prerequisitesMet = course.prerequisites.every((prereq) =>
                    user.completedCourses.includes(prereq)
                );
                if (prerequisitesMet) {
                    relevanceScore += 20;
                    reason += 'Prerequisites met. ';
                } else if (course.prerequisites.length === 0) {
                    relevanceScore += 10;
                    reason += 'No prerequisites required. ';
                }

                // 4. Popularity (15 points)
                if ((course.enrollmentCount || 0) > 1000) {
                    relevanceScore += 15;
                    reason += 'Popular course. ';
                }

                // 5. High rating (10 points)
                if ((course.rating || 0) >= 4.5) {
                    relevanceScore += 10;
                    reason += 'Highly rated. ';
                }

                return {
                    course,
                    relevanceScore: Math.min(relevanceScore, 100),
                    reason: reason.trim(),
                    type: this.classifyRecommendationType(
                        course,
                        user.skillLevel
                    ),
                };
            })
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, limit);

        return recommendations;
    }

    /**
     * Classify recommendation type
     */
    private classifyRecommendationType(
        course: Course,
        userSkillLevel: string
    ): 'next-step' | 'similar' | 'trending' | 'personalized' {
        const skillLevels = ['beginner', 'intermediate', 'advanced'];
        const userSkillIndex = skillLevels.indexOf(userSkillLevel);
        const courseSkillIndex = skillLevels.indexOf(course.skillLevel);

        if (courseSkillIndex === userSkillIndex + 1) {
            return 'next-step';
        } else if (courseSkillIndex === userSkillIndex) {
            return 'similar';
        } else if ((course.enrollmentCount || 0) > 2000) {
            return 'trending';
        } else {
            return 'personalized';
        }
    }

    /**
     * Search courses
     */
    async searchCourses(query: string): Promise<Course[]> {
        return courseRepository.findAll({
            searchQuery: query,
        });
    }

    /**
     * Get courses by category
     */
    async getCoursesByCategory(category: string): Promise<Course[]> {
        return courseRepository.findAll({
            category: category,
        });
    }

    /**
     * Enroll user in course
     */
    async enrollCourse(userId: string, courseId: string): Promise<void> {
        // Verify course exists
        const course = await courseRepository.findById(courseId);
        if (!course) {
            throw new NotFoundError('Course', courseId);
        }

        // Enroll user
        await userRepository.enrollCourse(userId, courseId);

        // Increment enrollment count
        await courseRepository.incrementEnrollment(courseId);
    }
}

export const courseService = new CourseService();
