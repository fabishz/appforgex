import { Course } from '@/types/training';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Award, Star, Users, ArrowRight } from 'lucide-react';
import { useTrainingStore } from '@/hooks/use-training-store';
import Link from 'next/link';

interface CourseCardProps {
    course: Course;
    showProgress?: boolean;
}

const SKILL_LEVEL_COLORS = {
    beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
    intermediate: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    advanced: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
};

export function CourseCard({ course, showProgress = false }: CourseCardProps) {
    const { userProfile, enrollInCourse, getCourseProgress } = useTrainingStore();
    const courseProgress = getCourseProgress(course.id);
    const isEnrolled = userProfile?.enrolledCourses.includes(course.id) || false;
    const isCompleted = courseProgress?.certificateEarned || false;

    const totalLessons = course.modules.reduce(
        (sum, module) => sum + module.lessons.length,
        0
    );

    const completedLessons = courseProgress?.moduleProgress.reduce(
        (sum, moduleProgress) =>
            sum + moduleProgress.lessonProgress.filter((l) => l.completed).length,
        0
    ) || 0;

    const progressPercentage = totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    const handleEnroll = () => {
        if (!isEnrolled) {
            enrollInCourse(course.id);
        }
    };

    return (
        <Card className="group card-hover overflow-hidden border-border bg-card">
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
                <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-primary/40" />
                </div>
                {isCompleted && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-2">
                        <Award className="w-5 h-5" />
                    </div>
                )}
            </div>

            <CardHeader>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge
                        variant="outline"
                        className={SKILL_LEVEL_COLORS[course.skillLevel]}
                    >
                        {course.skillLevel.charAt(0).toUpperCase() + course.skillLevel.slice(1)}
                    </Badge>
                    {course.certificateOffered && (
                        <Badge variant="outline" className="text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            Certificate
                        </Badge>
                    )}
                </div>

                <CardTitle className="text-xl line-clamp-2">
                    {course.title}
                </CardTitle>

                <CardDescription className="line-clamp-2">
                    {course.shortDescription}
                </CardDescription>
            </CardHeader>

            <CardContent>
                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}h</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        <span>{totalLessons} lessons</span>
                    </div>
                    {course.rating && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span>{course.rating.toFixed(1)}</span>
                        </div>
                    )}
                    {course.enrollmentCount && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{(course.enrollmentCount / 1000).toFixed(1)}k</span>
                        </div>
                    )}
                </div>

                {/* Progress Bar (if enrolled) */}
                {showProgress && isEnrolled && !isCompleted && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{progressPercentage}%</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                            {completedLessons} of {totalLessons} lessons completed
                        </p>
                    </div>
                )}

                {/* Instructor */}
                <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        By <span className="font-medium text-foreground">{course.instructor.name}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{course.instructor.title}</p>
                </div>
            </CardContent>

            <CardFooter className="gap-2">
                {isCompleted ? (
                    <Link href={`/training-portal/course/${course.id}`} className="w-full">
                        <Button variant="outline" className="w-full">
                            Review Course
                        </Button>
                    </Link>
                ) : isEnrolled ? (
                    <Link href={`/training-portal/course/${course.id}`} className="w-full">
                        <Button className="w-full glow-effect">
                            Continue Learning
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                ) : (
                    <Link href={`/training-portal/course/${course.id}`} className="w-full">
                        <Button variant="outline" className="w-full">
                            View Details
                        </Button>
                    </Link>
                )}
            </CardFooter>
        </Card>
    );
}
