import { useState } from 'react';
import { QuizQuestion } from '@/types/training';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface QuizComponentProps {
    questions: QuizQuestion[];
    passingScore: number;
    onComplete: (score: number, passed: boolean) => void;
}

export function QuizComponent({ questions, passingScore, onComplete }: QuizComponentProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(number | string)[]>(
        new Array(questions.length).fill(null)
    );
    const [showResults, setShowResults] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const handleAnswerSelect = (answer: number | string) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setSelectedAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
        setShowResults(true);
    };

    const handleRetry = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers(new Array(questions.length).fill(null));
        setShowResults(false);
        setSubmitted(false);
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.correctAnswer) {
                correct++;
            }
        });
        return Math.round((correct / questions.length) * 100);
    };

    const score = calculateScore();
    const passed = score >= passingScore;

    if (showResults) {
        const correctCount = questions.filter(
            (q, index) => selectedAnswers[index] === q.correctAnswer
        ).length;

        return (
            <Card className="border-border bg-card">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                        {passed ? (
                            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Trophy className="w-10 h-10 text-green-500" />
                            </div>
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center">
                                <RotateCcw className="w-10 h-10 text-orange-500" />
                            </div>
                        )}
                    </div>
                    <CardTitle className="text-3xl">
                        {passed ? 'Congratulations!' : 'Keep Trying!'}
                    </CardTitle>
                    <CardDescription>
                        {passed
                            ? 'You passed the quiz!'
                            : `You need ${passingScore}% to pass. Try again!`}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="text-center">
                        <div className="text-5xl font-bold mb-2">{score}%</div>
                        <p className="text-muted-foreground">
                            {correctCount} out of {questions.length} correct
                        </p>
                    </div>

                    <div className="space-y-4">
                        {questions.map((question, index) => {
                            const isCorrect = selectedAnswers[index] === question.correctAnswer;
                            const userAnswer = selectedAnswers[index];

                            return (
                                <Card key={question.id} className="border-border">
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-3">
                                            {isCorrect ? (
                                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                            )}
                                            <div className="flex-1 space-y-2">
                                                <p className="font-medium">{question.question}</p>
                                                {!isCorrect && (
                                                    <>
                                                        <p className="text-sm text-muted-foreground">
                                                            Your answer:{' '}
                                                            <span className="text-red-500">
                                                                {question.type === 'multiple-choice' &&
                                                                    typeof userAnswer === 'number'
                                                                    ? question.options?.[userAnswer]
                                                                    : userAnswer}
                                                            </span>
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Correct answer:{' '}
                                                            <span className="text-green-500">
                                                                {question.type === 'multiple-choice' &&
                                                                    typeof question.correctAnswer === 'number'
                                                                    ? question.options?.[question.correctAnswer]
                                                                    : question.correctAnswer}
                                                            </span>
                                                        </p>
                                                    </>
                                                )}
                                                {question.explanation && (
                                                    <p className="text-sm text-muted-foreground italic">
                                                        {question.explanation}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </CardContent>

                <CardFooter className="flex gap-3">
                    {!passed && (
                        <Button onClick={handleRetry} variant="outline" className="flex-1">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Try Again
                        </Button>
                    )}
                    <Button
                        onClick={() => onComplete(score, passed)}
                        className="flex-1 glow-effect"
                    >
                        {passed ? 'Continue' : 'Review Lessons'}
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    const allAnswered = selectedAnswers.every((answer) => answer !== null);

    return (
        <Card className="border-border bg-card">
            <CardHeader>
                <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="mb-4" />
                <CardTitle>{currentQuestion.question}</CardTitle>
            </CardHeader>

            <CardContent>
                {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                    <RadioGroup
                        value={String(selectedAnswers[currentQuestionIndex] ?? '')}
                        onValueChange={(value) => handleAnswerSelect(Number(value))}
                    >
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => (
                                <label
                                    key={index}
                                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedAnswers[currentQuestionIndex] === index
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/50'
                                        }`}
                                >
                                    <RadioGroupItem value={String(index)} id={`option-${index}`} />
                                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                                        {option}
                                    </Label>
                                </label>
                            ))}
                        </div>
                    </RadioGroup>
                )}
            </CardContent>

            <CardFooter className="flex justify-between">
                <Button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    variant="outline"
                >
                    Previous
                </Button>

                {currentQuestionIndex === questions.length - 1 ? (
                    <Button
                        onClick={handleSubmit}
                        disabled={!allAnswered}
                        className="glow-effect"
                    >
                        Submit Quiz
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        disabled={selectedAnswers[currentQuestionIndex] === null}
                    >
                        Next
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
