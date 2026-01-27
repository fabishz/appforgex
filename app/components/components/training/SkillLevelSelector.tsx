import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useTrainingStore } from '@/hooks/use-training-store';
import { SkillLevel, CourseCategory } from '@/types/training';
import { Rocket, Zap, Crown, CheckCircle } from 'lucide-react';

interface SkillLevelSelectorProps {
    onComplete?: () => void;
}

const SKILL_LEVELS = [
    {
        value: 'beginner' as SkillLevel,
        label: 'Beginner',
        description: 'New to programming or the technology',
        icon: Rocket,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        features: [
            'Foundational theory modules',
            'Step-by-step tutorials',
            'Interactive coding exercises',
            'Basic skill-building challenges',
        ],
    },
    {
        value: 'intermediate' as SkillLevel,
        label: 'Intermediate',
        description: 'Have some experience and want to level up',
        icon: Zap,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        features: [
            'Real-world practical projects',
            'Advanced concepts and patterns',
            'Code optimization techniques',
            'Best practices and architectures',
        ],
    },
    {
        value: 'advanced' as SkillLevel,
        label: 'Advanced',
        description: 'Experienced and seeking mastery',
        icon: Crown,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        features: [
            'Complex production-grade projects',
            'System design and architecture',
            'Performance optimization',
            'Advanced specialization topics',
        ],
    },
];

const CATEGORIES: { value: CourseCategory; label: string }[] = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'ai-ml', label: 'AI & Machine Learning' },
    { value: 'devops', label: 'DevOps & Cloud' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
];

export function SkillLevelSelector({ onComplete }: SkillLevelSelectorProps) {
    const { initializeUser } = useTrainingStore();
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [selectedLevel, setSelectedLevel] = useState<SkillLevel>('beginner');
    const [selectedInterests, setSelectedInterests] = useState<CourseCategory[]>([]);

    const handleComplete = () => {
        initializeUser(name || 'Learner', selectedLevel, selectedInterests);
        onComplete?.();
    };

    const toggleInterest = (category: CourseCategory) => {
        setSelectedInterests((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    return (
        <div className="max-w-4xl mx-auto">
            {step === 1 && (
                <Card className="border-border bg-card animate-fade-in-up">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl">Welcome to the Training Portal!</CardTitle>
                        <CardDescription className="text-base">
                            Let's personalize your learning experience
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">What should we call you?</Label>
                            <Input
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="text-lg"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                onClick={() => setStep(2)}
                                disabled={!name.trim()}
                                size="lg"
                                className="glow-effect"
                            >
                                Continue
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {step === 2 && (
                <Card className="border-border bg-card animate-fade-in-up">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Select Your Skill Level</CardTitle>
                        <CardDescription>
                            This helps us recommend the right courses for you
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <RadioGroup value={selectedLevel} onValueChange={(v) => setSelectedLevel(v as SkillLevel)}>
                            <div className="grid md:grid-cols-3 gap-4">
                                {SKILL_LEVELS.map((level) => {
                                    const Icon = level.icon;
                                    const isSelected = selectedLevel === level.value;
                                    return (
                                        <label
                                            key={level.value}
                                            className={`relative cursor-pointer`}
                                        >
                                            <RadioGroupItem
                                                value={level.value}
                                                id={level.value}
                                                className="sr-only"
                                            />
                                            <Card
                                                className={`card-hover transition-all ${isSelected
                                                        ? 'border-primary shadow-lg glow-effect'
                                                        : 'border-border'
                                                    }`}
                                            >
                                                <CardContent className="p-6 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className={`w-12 h-12 rounded-xl ${level.bgColor} flex items-center justify-center`}>
                                                            <Icon className={`w-6 h-6 ${level.color}`} />
                                                        </div>
                                                        {isSelected && (
                                                            <CheckCircle className="w-6 h-6 text-primary" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-1">{level.label}</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {level.description}
                                                        </p>
                                                    </div>
                                                    <ul className="space-y-1">
                                                        {level.features.map((feature) => (
                                                            <li key={feature} className="text-xs text-muted-foreground flex items-start gap-2">
                                                                <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </label>
                                    );
                                })}
                            </div>
                        </RadioGroup>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setStep(1)}>
                                Back
                            </Button>
                            <Button onClick={() => setStep(3)} size="lg" className="glow-effect">
                                Continue
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {step === 3 && (
                <Card className="border-border bg-card animate-fade-in-up">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">What are you interested in?</CardTitle>
                        <CardDescription>
                            Choose one or more areas (you can change this later)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {CATEGORIES.map((category) => {
                                const isSelected = selectedInterests.includes(category.value);
                                return (
                                    <button
                                        key={category.value}
                                        onClick={() => toggleInterest(category.value)}
                                        className={`p-4 rounded-lg border-2 transition-all text-left ${isSelected
                                                ? 'border-primary bg-primary/10'
                                                : 'border-border hover:border-primary/50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-sm">{category.label}</span>
                                            {isSelected && (
                                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setStep(2)}>
                                Back
                            </Button>
                            <Button
                                onClick={handleComplete}
                                disabled={selectedInterests.length === 0}
                                size="lg"
                                className="glow-effect"
                            >
                                Start Learning
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
