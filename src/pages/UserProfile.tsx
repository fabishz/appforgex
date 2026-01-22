import { Layout } from '@/components/layout/Layout';
import { useTrainingStore } from '@/hooks/use-training-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { CourseCard } from '@/components/training/CourseCard';
import { getCourseById } from '@/data/course-data';
import {
    Award,
    BookOpen,
    Clock,
    Flame,
    Target,
    Trophy,
    TrendingUp,
    Calendar,
    Settings,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { userProfile, getLearningStats, resetProgress } = useTrainingStore();
    const navigate = useNavigate();

    if (!userProfile) {
        return (
            <Layout>
                <div className="container-custom section-padding text-center">
                    <h1 className="text-3xl font-bold mb-4">Please set up your profile</h1>
                    <Link to="/training-portal">
                        <Button>Go to Portal</Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    const stats = getLearningStats();
    const enrolledCourses = userProfile.enrolledCourses
        .map((id) => getCourseById(id))
        .filter((c): c is NonNullable<typeof c> => c !== undefined);

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            resetProgress();
            navigate('/training-portal');
        }
    };

    return (
        <Layout>
            {/* Profile Header */}
            <section className="py-12 md:py-16 hero-gradient border-b border-border">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <Avatar className="w-24 h-24 border-4 border-primary">
                            <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-purple-600 text-white">
                                {userProfile.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-2">{userProfile.name}</h1>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                    {userProfile.skillLevel.charAt(0).toUpperCase() + userProfile.skillLevel.slice(1)}
                                </Badge>
                                {userProfile.interests.map((interest) => (
                                    <Badge key={interest} variant="outline">
                                        {interest.split('-').join(' ')}
                                    </Badge>
                                ))}
                            </div>
                            <p className="text-muted-foreground">
                                Member since {new Date(userProfile.createdAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>

                        <Button variant="outline" onClick={handleReset}>
                            <Settings className="w-4 h-4 mr-2" />
                            Reset Progress
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-12 border-b border-border">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
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
                                label: 'Learning Time',
                                value: `${Math.floor(stats.totalLearningTime / 60)}h`,
                                icon: Clock,
                                color: 'text-purple-500',
                                bgColor: 'bg-purple-500/10',
                            },
                            {
                                label: 'Current Streak',
                                value: `${stats.currentStreak} days`,
                                icon: Flame,
                                color: 'text-orange-500',
                                bgColor: 'bg-orange-500/10',
                            },
                        ].map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={stat.label} className="border-border bg-card">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center space-y-3">
                                            <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                                                <Icon className={`w-6 h-6 ${stat.color}`} />
                                            </div>
                                            <div>
                                                <p className="text-3xl font-bold">{stat.value}</p>
                                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Enrolled Courses */}
            {enrolledCourses.length > 0 && (
                <section className="section-padding bg-card">
                    <div className="container-custom">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">My Courses</h2>
                            <Badge variant="outline">{enrolledCourses.length} enrolled</Badge>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enrolledCourses.map((course) => (
                                <CourseCard key={course.id} course={course} showProgress />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Achievements */}
            {userProfile.achievements.length > 0 && (
                <section className="section-padding">
                    <div className="container-custom">
                        <div className="flex items-center gap-3 mb-8">
                            <Trophy className="w-8 h-8 text-yellow-500" />
                            <div>
                                <h2 className="text-2xl font-bold">Achievements</h2>
                                <p className="text-muted-foreground text-sm">
                                    {userProfile.achievements.length} earned
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {userProfile.achievements.map((achievement) => (
                                <Card key={achievement.id} className="border-border bg-card">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                                                <Award className="w-6 h-6 text-yellow-500" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold mb-1">{achievement.title}</h3>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    {achievement.description}
                                                </p>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(achievement.earnedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Learning Activity */}
            <section className="py-16 bg-card">
                <div className="container-custom">
                    <h2 className="text-2xl font-bold mb-8">Learning Activity</h2>

                    <Card className="border-border bg-background">
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Average Quiz Score</span>
                                        <span className="text-lg font-bold">{Math.round(stats.averageQuizScore)}%</span>
                                    </div>
                                    <Progress value={stats.averageQuizScore} className="h-2" />
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Completed Lessons</p>
                                        <p className="text-2xl font-bold">{stats.completedLessons}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Longest Streak</p>
                                        <p className="text-2xl font-bold">{stats.longestStreak} days</p>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">Last Active</p>
                                    <p className="font-medium">
                                        {new Date(userProfile.lastActiveDate).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </Layout>
    );
};

export default UserProfile;
