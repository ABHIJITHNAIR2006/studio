'use client';

import { TriageQuestion } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type Step4Props = {
  onAnswer: (questionId: string, option: { text: string; value: number; isCritical?: boolean }) => void;
  answers: Record<string, any>;
  question: TriageQuestion;
};

export default function Step4({ onAnswer, answers, question }: Step4Props) {
    const selectedValue = answers[question.id]?.text;
    
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              When did your symptoms start?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
                onValueChange={(value) => {
                    const selectedOption = question.options.find(opt => opt.text === value);
                    if(selectedOption) {
                        onAnswer(question.id, selectedOption)
                    }
                }}
                value={selectedValue}
                className="space-y-3"
            >
              {question.options.map((option) => (
                <Label
                    key={option.text}
                    htmlFor={option.text}
                    className={cn(
                        'flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all duration-200',
                        selectedValue === option.text
                        ? 'border-primary bg-primary/10 shadow-lg'
                        : 'border-border hover:border-primary/50'
                    )}
                >
                  <RadioGroupItem value={option.text} id={option.text} />
                  <span className="font-semibold text-base">{option.text}</span>
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    );
  }