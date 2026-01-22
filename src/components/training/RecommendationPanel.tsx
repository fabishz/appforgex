import { Recommendation } from '@/types/training';
import { CourseCard } from './CourseCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, TrendingUp, ArrowRight, BookOpen } from 'lucide-react';

interface RecommendationPanelProps {
    recommendations: Recommendation[];
    title?: string;
    type?: 'personalized' | 'next-step' | 'trending' | 'continue';
}

const PANEL_CONFIG = {
    personalized: {
        icon: Sparkles,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
    },
    'next-step': {
        icon: ArrowRight,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
    },
    trending: {
        icon: TrendingUp,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
    },
    continue: {
        icon: BookOpen,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
    },
};

export function RecommendationPanel({
    recommendations,
    title = 'Recommended for You',
    type = 'personalized',
}: RecommendationPanelProps) {
    if (recommendations.length === 0) return null;

    const config = PANEL_CONFIG[type];
    const Icon = config.icon;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-muted-foreground text-sm">
                        Personalized based on your profile and progress
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((rec) => (
                    <div key={rec.course.id} className="relative">
                        <CourseCard course={rec.course} showProgress />
                        {rec.reason && (
                            <div className="mt-2">
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    {rec.reason}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
