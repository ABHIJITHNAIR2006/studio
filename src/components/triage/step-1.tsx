'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Combobox } from '@/components/ui/combobox';
import { symptoms as predefinedSymptoms } from '@/lib/data';
import { getSymptomSuggestions } from '@/ai/flows/ai-symptom-suggestions';
import debounce from 'lodash.debounce';

type Step1Props = {
  onAnswer: (questionId: string, option: { text: string; value: number }) => void;
  value: string | undefined;
  onSymptomSelect: (symptom: { text: string; value: number }) => void;
};

export default function Step1({ onAnswer, value, onSymptomSelect }: Step1Props) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    try {
      const result = await getSymptomSuggestions({ symptomDescription: query });
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error('AI suggestion error:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

  const handleSearchChange = (search: string) => {
    debouncedFetchSuggestions(search);
  };

  const allOptions = useMemo(() => {
    const combined = new Set([
      ...predefinedSymptoms.map((s) => s.name),
      ...suggestions,
    ]);
    return Array.from(combined).map((s) => ({ label: s, value: s.toLowerCase() }));
  }, [suggestions]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">What is your primary symptom?</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            Start typing your symptom below. Our AI will help you find the right term.
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
            searchPlaceholder={isLoading ? 'AI is thinking...' : 'Search symptoms...'}
            emptyMessage="No symptoms found. Try a different search."
            onSearchChange={handleSearchChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
