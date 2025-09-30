'use client';

import { TriageQuestion } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Step4Props = {
  onAnswer: (questionId: string, option: { text: string; value: number }) => void;
  answers: Record<string, any>;
  question: TriageQuestion;
};

export default function Step4({ onAnswer, answers, question }: Step4Props) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{question.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[question.id]?.text}
            onValueChange={(value) => {
              const selectedOption = question.options.find((o) => o.text === value);
              if (selectedOption) {
                onAnswer(question.id, selectedOption);
              }
            }}
          >
            <div className="space-y-3">
              {question.options.map((option) => (
                <Label
                  key={option.text}
                  htmlFor={option.text}
                  className={cn(
                    'flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all duration-200',
                    answers[question.id]?.text === option.text
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <RadioGroupItem value={option.text} id={option.text} />
                  <span>{option.text}</span>
                </Label>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
