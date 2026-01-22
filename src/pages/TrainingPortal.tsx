import { useEffect } from 'react';
import { useTrainingStore } from '@/hooks/use-training-store';
import { SkillLevelSelector } from '@/components/training/SkillLevelSelector';
import { ProgressTracker } from '@/components/training/ProgressTracker';
import { RecommendationPanel } from '@/components/training/RecommendationPanel';
import { CourseCard } from '@/components/training/CourseCard';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
    getPersonalizedRecommendations,
    getContinueLearningCourses,
    getNextStepRecommendations,
    getTrendingCourses,
} from '@/utils/recommendations';
import { courses, getCoursesByLevel } from '@/data/course-data';
import { Rocket, TrendingUp, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { SkillLevel } from '@/types/training';

const TrainingPortal = () => {
    const { userProfile, isFirstVisit, updateLastActive } = useTrainingStore();

    useEffect(() => {
        if (userProfile) {
            updateLastActive();
        }
    }, [userProfile, updateLastActive]);

    // First-time user onboarding
    if (isFirstVisit || !userProfile) {
        return (
            <Layout>
                <section className="section-padding hero-gradient">
                    <div className="container-custom">
                        <SkillLevelSelector />
                    </div>
                </section>
            </Layout>
        );
    }

    // Get personalized recommendations
    const personalizedRecs = getPersonalizedRecommendations(userProfile, 6);
    const nextStepRecs = getNextStepRecommendations(userProfile, 3);
    const continueLearning = getContinueLearningCourses(userProfile);
    const trending = getTrendingCourses(6).map(course => ({
        course,
        reason: 'Popular this month',
        relevanceScore: 85,
        type: 'trending' as const,
    }));

    const beginnerCourses = getCoursesByLevel('beginner');
    const intermediateCourses = getCoursesByLevel('intermediate');
    const advancedCourses = getCoursesByLevel('advanced');

    return (
        <Layout>
            {/* Hero Section */}
            <section className="py-12 md:py-16 hero-gradient border-b border-border">
                <div className="container-custom">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">
                                Welcome back!
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Hey {userProfile.name},<br />
                            <span className="gradient-text">Keep Learning</span>
                        </h1>
                        <p className="text-lg text-muted-foreground mb-6">
                            Your personalized learning portal with adaptive recommendations
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                <Rocket className="w-3 h-3 mr-1" />
                                {userProfile.skillLevel.charAt(0).toUpperCase() + userProfile.skillLevel.slice(1)}
                            </Badge>
                            <Badge variant="outline">
                                {userProfile.enrolledCourses.length} Courses Enrolled
                            </Badge>
                            <Badge variant="outline">
                                {userProfile.currentStreak} Day Streak
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>

            {/* Progress Overview */}
            <section className="py-12 bg-card border-b border-border">
                <div className="container-custom">
                    <ProgressTracker />
                </div>
            </section>

            {/* Continue Learning */}
            {continueLearning.length > 0 && (
                <section className="section-padding">
                    <div className="container-custom">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Continue Learning</h2>
                                    <p className="text-muted-foreground text-sm">
                                        Pick up where you left off
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {continueLearning.slice(0, 3).map((course) => (
                                <CourseCard key={course.id} course={course} showProgress />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Next Steps */}
            {nextStepRecs.length > 0 && (
                <section className="py-12 bg-card">
                    <div className="container-custom">
                        <RecommendationPanel
                            recommendations={nextStepRecs}
                            title="Recommended Next Steps"
                            type="next-step"
                        />
                    </div>
                </section>
            )}

            {/* Personalized Recommendations */}
            {personalizedRecs.length > 0 && (
                <section className="section-padding">
                    <div className="container-custom">
                        <RecommendationPanel
                            recommendations={personalizedRecs}
                            title="Recommended for You"
                            type="personalized"
                        />
                    </div>
                </section>
            )}

            {/* Browse All Courses */}
            <section className="py-16 bg-card">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Browse All Courses</h2>
                        <p className="text-muted-foreground">
                            Explore our comprehensive course library
                        </p>
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
                            <TabsTrigger value="all">All Courses</TabsTrigger>
                            <TabsTrigger value="beginner">Beginner</TabsTrigger>
                            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                            <TabsTrigger value="advanced">Advanced</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="space-y-6">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.map((course) => (
                                    <CourseCard key={course.id} course={course} showProgress />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="beginner" className="space-y-6">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {beginnerCourses.map((course) => (
                                    <CourseCard key={course.id} course={course} showProgress />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="intermediate" className="space-y-6">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {intermediateCourses.map((course) => (
                                    <CourseCard key={course.id} course={course} showProgress />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="advanced" className="space-y-6">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {advancedCourses.map((course) => (
                                    <CourseCard key={course.id} course={course} showProgress />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Trending */}
            <section className="section-padding">
                <div className="container-custom">
                    <RecommendationPanel
                        recommendations={trending}
                        title="Trending This Month"
                        type="trending"
                    />
                </div>
            </section>
        </Layout>
    );
};

export default TrainingPortal;
