'use client';

import { useState } from 'react';
import { TriageQuestion } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type Step3Props = {
  onAnswer: (questionId: string, selectedSymptoms: string[]) => void;
  answers: Record<string, any>;
  question: TriageQuestion;
};

export default function Step3({ onAnswer, answers, question }: Step3Props) {
  const [selected, setSelected] = useState<string[]>(answers[question.id]?.value ? Object.keys(answers[question.id].value) : []);

  const handleSelect = (symptomText: string) => {
    const newSelected = selected.includes(symptomText)
      ? selected.filter((s) => s !== symptomText)
      : [...selected, symptomText];
    setSelected(newSelected);
    onAnswer(question.id, newSelected);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{question.text}</CardTitle>
          <CardDescription>Select any that apply (optional)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.options.map((option) => (
              <div
                key={option.text}
                onClick={() => handleSelect(option.text)}
                className="flex items-center space-x-2 rounded-lg border border-border p-4 cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <Checkbox
                  id={option.text}
                  checked={selected.includes(option.text)}
                  onCheckedChange={() => handleSelect(option.text)}
                />
                <Label htmlFor={option.text} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
