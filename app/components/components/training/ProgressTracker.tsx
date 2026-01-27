import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useTrainingStore } from '@/hooks/use-training-store';
import { Award, BookOpen, Clock, Flame, Target, Trophy } from 'lucide-react';

export function ProgressTracker() {
    const { userProfile, getLearningStats } = useTrainingStore();

    if (!userProfile) {
        return (
            <Card className="border-border bg-card">
                <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">
                        Set up your profile to start tracking progress.
                    </p>
                </CardContent>
            </Card>
        );
    }

    const stats = getLearningStats();

    const statsCards = [
        {
            label: 'Courses Enrolled',
            value: stats.totalCourses,
            icon: BookOpen,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            label: 'Completed',
            value: stats.completedCourses,
            icon: Target,
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
        },
        {
            label: 'Certificates',
            value: stats.certificatesEarned,
            icon: Award,
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-500/10',
        },
        {
            label: 'Current Streak',
            value: `${stats.currentStreak} days`,
            icon: Flame,
            color: 'text-orange-500',
            bgColor: 'bg-orange-500/10',
        },
        {
            label: 'Learning Time',
            value: `${Math.floor(stats.totalLearningTime / 60)}h`,
            icon: Clock,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
        },
        {
            label: 'Quiz Score',
            value: `${Math.round(stats.averageQuizScore)}%`,
            icon: Trophy,
            color: 'text-pink-500',
            bgColor: 'bg-pink-500/10',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {statsCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label} className="border-border bg-card">
                            <CardContent className="p-4">
                                <div className="flex flex-col items-center text-center space-y-2">
                                    <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                                        <Icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Detailed Progress */}
            {stats.inProgressCourses > 0 && (
                <Card className="border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-lg">Course Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {userProfile.courseProgress
                                .filter((p) => !p.certificateEarned)
                                .slice(0, 3)
                                .map((courseProgress) => {
                                    const completedLessons = courseProgress.moduleProgress.reduce(
                                        (sum, mod) =>
                                            sum + mod.lessonProgress.filter((l) => l.completed).length,
                                        0
                                    );

                                    const progress = courseProgress.overallProgress || 0;

                                    return (
                                        <div key={courseProgress.courseId} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-medium">
                                                    {courseProgress.courseId.split('-').map(word =>
                                                        word.charAt(0).toUpperCase() + word.slice(1)
                                                    ).join(' ')}
                                                </span>
                                                <span className="text-muted-foreground">{progress}%</span>
                                            </div>
                                            <Progress value={progress} className="h-2" />
                                            <p className="text-xs text-muted-foreground">
                                                {completedLessons} lessons completed
                                            </p>
                                        </div>
                                    );
                                })}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Achievements */}
            {userProfile.achievements.length > 0 && (
                <Card className="border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                            Recent Achievements
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {userProfile.achievements.slice(0, 6).map((achievement) => (
                                <Badge
                                    key={achievement.id}
                                    variant="outline"
                                    className="text-xs bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                >
                                    <Award className="w-3 h-3 mr-1" />
                                    {achievement.title}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
