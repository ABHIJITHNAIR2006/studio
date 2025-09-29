'use client';

import { triageQuestions } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Step2Props = {
  onAnswer: (questionId: string, option: { text: string; value: number; isCritical?: boolean }) => void;
  answers: Record<string, any>;
};

export default function Step2({ onAnswer, answers }: Step2Props) {
  const question = triageQuestions.step2[0];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{question.text}</CardTitle>
          <CardDescription>Select the option that best describes your symptom&apos;s severity.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {question.options.map((option) => (
              <button
                key={option.text}
                onClick={() => onAnswer(question.id, option)}
                className={cn(
                  'p-6 rounded-lg border-2 text-center transition-all duration-200 transform hover:scale-105',
                  answers[question.id]?.value === option.value
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <span className="text-lg font-semibold">{option.text}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
