import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuizComponent } from '@/components/training/QuizComponent';
import { useTrainingStore } from '@/hooks/use-training-store';
import { getCourseById } from '@/data/course-data';
import { Lesson } from '@/types/training';
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    BookOpen,
    Home,
    Code,
    Lightbulb,
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LessonPage = () => {
    const { courseId, moduleId, lessonId } = useParams<{
        courseId: string;
        moduleId: string;
        lessonId: string;
    }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { startLesson, completeLesson, submitQuiz, getCourseProgress } = useTrainingStore();

    const [timeSpent, setTimeSpent] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeSpent((prev) => prev + 1);
        }, 60000); // Increment every minute

        return () => clearInterval(timer);
    }, [lessonId]);

    if (!courseId || !moduleId || !lessonId) {
        return <div>Invalid lesson URL</div>;
    }

    const course = getCourseById(courseId);
    if (!course) return <div>Course not found</div>;

    const module = course.modules.find((m) => m.moduleId === moduleId);
    if (!module) return <div>Module not found</div>;

    const lesson = module.lessons.find((l) => l.lessonId === lessonId);
    if (!lesson) return <div>Lesson not found</div>;

    const courseProgress = getCourseProgress(courseId);
    const lessonProgress = courseProgress?.moduleProgress
        .find((m) => m.moduleId === moduleId)
        ?.lessonProgress.find((l) => l.lessonId === lessonId);

    const isCompleted = lessonProgress?.completed || false;

    // Find next and previous lessons
    const currentLessonIndex = module.lessons.findIndex((l) => l.id === lessonId);
    const previousLesson = currentLessonIndex > 0 ? module.lessons[currentLessonIndex - 1] : null;
    const nextLesson =
        currentLessonIndex < module.lessons.length - 1
            ? module.lessons[currentLessonIndex + 1]
            : null;

    const handleMarkComplete = () => {
        completeLesson(courseId, moduleId, lessonId, timeSpent || 5);
        if (nextLesson) {
            navigate(`/training-portal/learn/${courseId}/${moduleId}/${nextLesson.id}`);
        } else {
            // Course Completed
            toast({
                title: "Course Completed! 🎉",
                description: `Congratulations! You have completed ${course.title}.`,
                duration: 5000,
            });
            navigate(`/training-portal/course/${courseId}`);
        }
    };

    const handleQuizComplete = (score: number, passed: boolean) => {
        submitQuiz(courseId, moduleId, lessonId, score);
        if (passed) {
            completeLesson(courseId, moduleId, lessonId, timeSpent || 10);
            if (nextLesson) {
                navigate(`/training-portal/learn/${courseId}/${moduleId}/${nextLesson.id}`);
            } else {
                // Course Completed
                toast({
                    title: "Course Completed! 🎉",
                    description: `Congratulations! You have completed ${course.title}.`,
                    duration: 5000,
                });
                navigate(`/training-portal/course/${courseId}`);
            }
        }
    };

    useEffect(() => {
        startLesson(courseId, moduleId, lessonId);
    }, [courseId, moduleId, lessonId, startLesson]);

    const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const completedLessons =
        courseProgress?.moduleProgress.reduce(
            (sum, m) => sum + m.lessonProgress.filter((l) => l.completed).length,
            0
        ) || 0;
    const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="border-b border-border bg-card sticky top-0 z-10">
                <div className="container-custom py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/training-portal">
                                <Button variant="ghost" size="sm">
                                    <Home className="w-4 h-4 mr-2" />
                                    Portal
                                </Button>
                            </Link>
                            <Separator orientation="vertical" className="h-6" />
                            <Link to={`/training-portal/course/${courseId}`}>
                                <Button variant="ghost" size="sm" className="text-sm">
                                    {course.title}
                                </Button>
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-sm text-muted-foreground">
                                {overallProgress}% Complete
                            </div>
                            <Progress value={overallProgress} className="w-32 h-2" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex">
                {/* Sidebar - Course Navigation */}
                <aside className="w-80 border-r border-border bg-card overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-border">
                        <h3 className="font-semibold mb-1">{module.title}</h3>
                        <p className="text-sm text-muted-foreground">{module.lessons.length} lessons</p>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-2 space-y-1">
                            {module.lessons.map((lessonItem) => {
                                const lessonItemProgress = courseProgress?.moduleProgress
                                    .find((m) => m.moduleId === moduleId)
                                    ?.lessonProgress.find((l) => l.lessonId === lessonItem.id);
                                const itemCompleted = lessonItemProgress?.completed || false;
                                const isActive = lessonItem.id === lessonId;

                                return (
                                    <Link
                                        key={lessonItem.id}
                                        to={`/training-portal/learn/${courseId}/${moduleId}/${lessonItem.id}`}
                                    >
                                        <div
                                            className={`p-3 rounded-lg transition-colors ${isActive
                                                ? 'bg-primary/10 border border-primary'
                                                : 'hover:bg-secondary/50'
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                {itemCompleted ? (
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full border-2 border-border mt-0.5" />
                                                )}
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm">{lessonItem.title}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="outline" className="text-xs">
                                                            {lessonItem.type}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">
                                                            {lessonItem.duration} min
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <div className="container-custom py-8 max-w-4xl">
                        {/* Lesson Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-3">
                                <Badge variant="outline" className="capitalize">
                                    {lesson.type}
                                </Badge>
                                {isCompleted && (
                                    <Badge variant="outline" className="text-green-500 bg-green-500/10 border-green-500/20">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Completed
                                    </Badge>
                                )}
                            </div>
                            <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
                            <p className="text-muted-foreground">{lesson.duration} minutes</p>
                        </div>

                        {/* Lesson Content */}
                        {lesson.type === 'theory' && lesson.content.theory && (
                            <div className="space-y-8">
                                {lesson.content.theory.sections.map((section, index) => (
                                    <Card key={index} className="border-border bg-card">
                                        <CardContent className="p-6 space-y-4">
                                            <h2 className="text-2xl font-semibold">{section.heading}</h2>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {section.content}
                                            </p>

                                            {section.codeExample && (
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Code className="w-4 h-4 text-primary" />
                                                        <span className="text-sm font-medium">Code Example</span>
                                                    </div>
                                                    <SyntaxHighlighter
                                                        language={section.codeExample.language}
                                                        style={vscDarkPlus}
                                                        customStyle={{
                                                            borderRadius: '0.5rem',
                                                            padding: '1.5rem',
                                                        }}
                                                    >
                                                        {section.codeExample.code}
                                                    </SyntaxHighlighter>
                                                    {section.codeExample.explanation && (
                                                        <p className="text-sm text-muted-foreground italic">
                                                            {section.codeExample.explanation}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}

                                {/* Key Takeaways */}
                                <Card className="border-primary/20 bg-primary/5">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Lightbulb className="w-5 h-5 text-primary" />
                                            <h3 className="font-semibold">Key Takeaways</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {lesson.content.theory.keyTakeaways.map((takeaway, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                                                    <span className="text-sm">{takeaway}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {lesson.type === 'interactive' && lesson.content.interactive && (
                            <Card className="border-border bg-card">
                                <CardContent className="p-6 space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-3">Instructions</h2>
                                        <p className="text-muted-foreground">{lesson.content.interactive.instructions}</p>
                                    </div>

                                    {lesson.content.interactive.starterCode && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">Starter Code</h3>
                                            <SyntaxHighlighter
                                                language="javascript"
                                                style={vscDarkPlus}
                                                customStyle={{
                                                    borderRadius: '0.5rem',
                                                    padding: '1.5rem',
                                                }}
                                            >
                                                {lesson.content.interactive.starterCode}
                                            </SyntaxHighlighter>
                                        </div>
                                    )}

                                    {lesson.content.interactive.hints.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">Hints</h3>
                                            <ul className="space-y-2">
                                                {lesson.content.interactive.hints.map((hint, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5" />
                                                        {hint}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {lesson.type === 'challenge' && lesson.content.challenge && (
                            <Card className="border-border bg-card">
                                <CardContent className="p-6 space-y-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <h2 className="text-2xl font-semibold">{lesson.content.challenge.title}</h2>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    lesson.content.challenge.difficulty === 'easy'
                                                        ? 'text-green-500 bg-green-500/10'
                                                        : lesson.content.challenge.difficulty === 'medium'
                                                            ? 'text-yellow-500 bg-yellow-500/10'
                                                            : 'text-red-500 bg-red-500/10'
                                                }
                                            >
                                                {lesson.content.challenge.difficulty}
                                            </Badge>
                                        </div>
                                        <p className="text-muted-foreground">{lesson.content.challenge.description}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-2">Requirements</h3>
                                        <ul className="space-y-1">
                                            {lesson.content.challenge.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm">
                                                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {lesson.type === 'quiz' && lesson.content.quiz && (
                            <QuizComponent
                                questions={lesson.content.quiz.questions}
                                passingScore={lesson.content.quiz.passingScore}
                                onComplete={handleQuizComplete}
                            />
                        )}

                        {/* Navigation */}
                        {lesson.type !== 'quiz' && (
                            <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
                                <div>
                                    {previousLesson ? (
                                        <Link
                                            to={`/training-portal/learn/${courseId}/${moduleId}/${previousLesson.id}`}
                                        >
                                            <Button variant="outline">
                                                <ChevronLeft className="w-4 h-4 mr-2" />
                                                Previous
                                            </Button>
                                        </Link>
                                    ) : (
                                        <div />
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    {!isCompleted && (
                                        <Button onClick={handleMarkComplete} variant="outline">
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Mark Complete
                                        </Button>
                                    )}
                                    {nextLesson ? (
                                        <Link
                                            to={`/training-portal/learn/${courseId}/${moduleId}/${nextLesson.id}`}
                                        >
                                            <Button className="glow-effect">
                                                Next Lesson
                                                <ChevronRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link to={`/training-portal/course/${courseId}`}>
                                            <Button className="glow-effect">
                                                Back to Course
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LessonPage;
