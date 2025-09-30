'use client';

import { TriageQuestion } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Step2Props = {
  onAnswer: (questionId: string, option: { text: string; value: number; isCritical?: boolean }) => void;
  answers: Record<string, any>;
  question: TriageQuestion;
  symptom: string | null;
};

export default function Step2({ onAnswer, answers, question, symptom }: Step2Props) {
  const getDotColor = (value: number) => {
    if (value === 1) return 'bg-success';
    if (value === 3) return 'bg-warning';
    if (value === 5) return 'bg-destructive';
    return 'bg-gray-400';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            How severe is your {symptom?.toLowerCase()}?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {question.options.map((option) => (
              <button
                key={option.text}
                onClick={() => onAnswer(question.id, option)}
                className={cn(
                  'w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center justify-between',
                  answers[question.id]?.value === option.value
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <div>
                  <span className="text-lg font-semibold">{option.text}</span>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <div className={cn('w-4 h-4 rounded-full', getDotColor(option.value))} />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
