'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Combobox } from '@/components/ui/combobox';
import { symptoms as predefinedSymptoms } from '@/lib/data';

type Step1Props = {
  onAnswer: (questionId: string, option: { text: string; value: number }) => void;
  value: string | undefined;
  onSymptomSelect: (symptom: { text: string; value: number }) => void;
};

export default function Step1({ onAnswer, value, onSymptomSelect }: Step1Props) {
  const allOptions = useMemo(() => {
    return predefinedSymptoms.map((s) => ({ label: s.name, value: s.name.toLowerCase() }));
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">What is your primary symptom?</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            Start typing or select your symptom from the list below.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 md:px-12 py-6">
          <Combobox
            options={allOptions}
            value={value}
            onChange={(selectedValue) => {
              const selectedOption = allOptions.find(opt => opt.value === selectedValue);
              if (selectedOption) {
                const answer = { text: selectedOption.label, value: 1 };
                onAnswer('symptom', answer)
                onSymptomSelect(answer);
              }
            }}
            placeholder="e.g., Headache, fever, cough..."
            searchPlaceholder="Search symptoms..."
            emptyMessage="No symptoms found. Try a different search."
          />
        </CardContent>
      </Card>
    </div>
  );
}
