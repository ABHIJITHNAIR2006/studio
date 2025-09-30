'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Combobox } from '@/components/ui/combobox';
import { symptoms as predefinedSymptoms } from '@/lib/data';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

type Step1Props = {
  onSymptomSelect: (symptom: { text: string; value: number }) => void;
};

export default function Step1({ onSymptomSelect }: Step1Props) {
  const [value, setValue] = useState<string | undefined>();
  const [customValue, setCustomValue] = useState('');

  const allOptions = useMemo(() => {
    return predefinedSymptoms.map((s) => ({ label: s.name, value: s.name.toLowerCase() }));
  }, []);

  const handleSelect = (selectedValue: string) => {
    const selectedOption = allOptions.find(opt => opt.value === selectedValue);
    if (selectedOption) {
      const answer = { text: selectedOption.label, value: 1 };
      onSymptomSelect(answer);
    }
    setValue(selectedValue);
  }
  
  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      const answer = { text: customValue.trim(), value: 1 };
      onSymptomSelect(answer);
    }
  }

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
            onChange={handleSelect}
            placeholder="e.g., Headache, fever, cough..."
            searchPlaceholder="Search symptoms..."
            emptyMessage="No symptoms found. You can describe it below."
          />
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Or describe your symptom if not listed
          </div>
          <div className="mt-2 flex gap-2">
            <Input 
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder='e.g., "Sharp pain in my side"' 
            />
            <Button onClick={handleCustomSubmit} disabled={!customValue.trim()}>Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
