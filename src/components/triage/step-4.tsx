'use client';

import { TriageQuestion } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Step4Props = {
  onAnswer: (questionId: string, option: { text: string; value: number; isCritical?: boolean }) => void;
  answers: Record<string, any>;
  question: TriageQuestion;
};

export default function Step4({ onAnswer, answers, question }: Step4Props) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{question.text}</CardTitle>
          <CardDescription>Please answer yes or no.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option) => (
              <button
                key={option.text}
                onClick={() => onAnswer(question.id, option)}
                className={cn(
                  'p-4 rounded-lg border-2 text-center transition-all duration-200 transform hover:scale-105',
                  answers[question.id]?.value === option.value
                    ? 'border-primary bg-primary/10 shadow-md'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <span className="text-md font-medium">{option.text}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
