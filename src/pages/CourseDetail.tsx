import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { useTrainingStore } from '@/hooks/use-training-store';
import { getCourseById } from '@/data/course-data';
import { meetsPrerequisites, getSimilarCourses } from '@/utils/recommendations';
import { CourseCard } from '@/components/training/CourseCard';
import {
    BookOpen,
    Clock,
    Award,
    Star,
    Users,
    CheckCircle,
    Lock,
    PlayCircle,
    ArrowRight,
    AlertCircle,
    Download,
    Trophy,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const SKILL_LEVEL_COLORS = {
    beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
    intermediate: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    advanced: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
};

const LESSON_TYPE_ICONS = {
    theory: BookOpen,
    interactive: PlayCircle,
    challenge: Award,
    project: Award,
    quiz: CheckCircle,
};

const CourseDetail = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { userProfile, enrollInCourse, getCourseProgress, startLesson } = useTrainingStore();

    if (!courseId) {
        return <div>Course not found</div>;
    }

    const course = getCourseById(courseId);

    if (!course) {
        return (
            <Layout>
                <div className="container-custom section-padding text-center">
                    <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
                    <Link to="/training-portal">
                        <Button>Back to Portal</Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    const isEnrolled = userProfile?.enrolledCourses.includes(course.id) || false;
    const isCompleted = userProfile?.completedCourses.includes(course.id) || false;
    const courseProgress = getCourseProgress(course.id);
    const certificateEarned = courseProgress?.certificateEarned || false;
    const prerequisiteCheck = userProfile
        ? meetsPrerequisites(course.id, userProfile)
        : { meets: true, missing: [] };
    const similarCourses = getSimilarCourses(course.id, 3);

    const totalLessons = course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
    const completedLessons = courseProgress?.moduleProgress.reduce(
        (sum, mod) => sum + mod.lessonProgress.filter((l) => l.completed).length,
        0
    ) || 0;
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const handleEnroll = () => {
        enrollInCourse(course.id);
    };

    const handleStartCourse = () => {
        const firstModule = course.modules[0];
        const firstLesson = firstModule?.lessons[0];
        if (firstModule && firstLesson) {
            startLesson(course.id, firstModule.id, firstLesson.id);
            navigate(`/training-portal/learn/${course.id}/${firstModule.id}/${firstLesson.id}`);
        }
    };

    const handleDownloadCertificate = () => {
        toast({
            title: "Certificate Downloaded",
            description: `You have successfully downloaded your certificate for ${course.title}.`,
        });
    };

    return (
        <Layout>
            {/* Course Hero */}
            <section className="py-16 hero-gradient border-b border-border">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="outline" className={SKILL_LEVEL_COLORS[course.skillLevel]}>
                                    {course.skillLevel.charAt(0).toUpperCase() + course.skillLevel.slice(1)}
                                </Badge>
                                <Badge variant="outline">{course.category.split('-').join(' ')}</Badge>
                                {course.certificateOffered && (
                                    <Badge variant="outline" className="text-yellow-500 bg-yellow-500/10 border-yellow-500/20">
                                        <Award className="w-3 h-3 mr-1" />
                                        Certificate
                                    </Badge>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{course.title}</h1>

                            <p className="text-xl text-muted-foreground">{course.fullDescription}</p>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="w-5 h-5" />
                                    <span>{course.duration} hours</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <BookOpen className="w-5 h-5" />
                                    <span>{totalLessons} lessons</span>
                                </div>
                                {course.rating && (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                                        <span>{course.rating.toFixed(1)} rating</span>
                                    </div>
                                )}
                                {course.enrollmentCount && (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Users className="w-5 h-5" />
                                        <span>{course.enrollmentCount.toLocaleString()} students</span>
                                    </div>
                                )}
                            </div>

                            {/* Progress (if enrolled) */}
                            {isEnrolled && (
                                <Card className="border-primary/20 bg-primary/5">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-semibold">Your Progress</span>
                                            <span className="text-lg font-bold">{isCompleted ? 100 : progressPercentage}%</span>
                                        </div>
                                        <Progress value={isCompleted ? 100 : progressPercentage} className="h-3 mb-2" />
                                        <p className="text-sm text-muted-foreground">
                                            {completedLessons} of {totalLessons} lessons completed
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Instructor */}
                            <Card className="border-border bg-card">
                                <CardHeader>
                                    <CardTitle className="text-lg">Instructor</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                                            {course.instructor.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{course.instructor.name}</p>
                                            <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* CTA */}
                            {!prerequisiteCheck.meets ? (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Prerequisites Required</AlertTitle>
                                    <AlertDescription className="space-y-2">
                                        <p>Complete these courses first:</p>
                                        <ul className="list-disc list-inside text-sm">
                                            {prerequisiteCheck.missing.map((prereq) => (
                                                <li key={prereq.id}>{prereq.title}</li>
                                            ))}
                                        </ul>
                                    </AlertDescription>
                                </Alert>
                            ) : isEnrolled ? (
                                <div className="space-y-3">
                                    <Button onClick={handleStartCourse} size="lg" className="w-full glow-effect">
                                        {isCompleted ? 'Review Course' : progressPercentage > 0 ? 'Continue Learning' : 'Start Course'}
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>

                                    {certificateEarned && (
                                        <Button onClick={handleDownloadCertificate} variant="outline" size="lg" className="w-full border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10">
                                            <Download className="w-5 h-5 mr-2" />
                                            Download Certificate
                                        </Button>
                                    )}

                                    {isCompleted && !certificateEarned && (
                                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 text-green-500">
                                            <Trophy className="w-5 h-5" />
                                            <span className="font-medium">Course Completed!</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Button onClick={handleEnroll} size="lg" className="w-full glow-effect">
                                    Enroll Now
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Learning Outcomes */}
            <section className="py-12 bg-card border-b border-border">
                <div className="container-custom">
                    <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {course.learningOutcomes.map((outcome, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <p className="text-muted-foreground">{outcome}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Course Content */}
            <section className="section-padding">
                <div className="container-custom">
                    <h2 className="text-2xl font-bold mb-6">Course Content</h2>

                    <Card className="border-border bg-card">
                        <CardContent className="p-6">
                            <Accordion type="multiple" className="w-full">
                                {course.modules.map((module, moduleIndex) => {
                                    const moduleProgress = courseProgress?.moduleProgress.find(
                                        (m) => m.moduleId === module.id
                                    );
                                    const moduleLessonsCompleted = moduleProgress?.lessonProgress.filter(
                                        (l) => l.completed
                                    ).length || 0;
                                    const moduleProgressPercentage =
                                        module.lessons.length > 0
                                            ? Math.round((moduleLessonsCompleted / module.lessons.length) * 100)
                                            : 0;

                                    return (
                                        <AccordionItem key={module.id} value={module.id}>
                                            <AccordionTrigger className="hover:no-underline">
                                                <div className="flex items-center justify-between w-full pr-4">
                                                    <div className="flex items-center gap-3 text-left">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                                                            {moduleIndex + 1}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">{module.title}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {module.lessons.length} lessons · {module.estimatedDuration} min
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {isEnrolled && (
                                                        <Badge variant="outline" className="mr-2">
                                                            {moduleProgressPercentage}%
                                                        </Badge>
                                                    )}
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="pl-14 space-y-2">
                                                    <p className="text-sm text-muted-foreground mb-4">
                                                        {module.description}
                                                    </p>
                                                    <Separator className="my-4" />
                                                    {module.lessons.map((lesson) => {
                                                        const Icon = LESSON_TYPE_ICONS[lesson.type];
                                                        const lessonCompleted = moduleProgress?.lessonProgress.find(
                                                            (l) => l.lessonId === lesson.id
                                                        )?.completed;
                                                        const isLocked = lesson.isLocked && !isEnrolled;

                                                        return (
                                                            <div
                                                                key={lesson.id}
                                                                className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    {lessonCompleted ? (
                                                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                                                    ) : isLocked ? (
                                                                        <Lock className="w-5 h-5 text-muted-foreground" />
                                                                    ) : (
                                                                        <Icon className="w-5 h-5 text-primary" />
                                                                    )}
                                                                    <div>
                                                                        <p className="font-medium text-sm">{lesson.title}</p>
                                                                        <p className="text-xs text-muted-foreground">
                                                                            {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}{' '}
                                                                            · {lesson.duration} min
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                })}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Similar Courses */}
            {similarCourses.length > 0 && (
                <section className="py-16 bg-card">
                    <div className="container-custom">
                        <h2 className="text-2xl font-bold mb-8">Similar Courses</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {similarCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </Layout>
    );
};

export default CourseDetail;
