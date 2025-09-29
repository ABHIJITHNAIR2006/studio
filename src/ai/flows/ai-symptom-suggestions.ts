// src/ai/flows/ai-symptom-suggestions.ts
'use server';
/**
 * @fileOverview Provides AI-powered symptom suggestions based on user input.
 *
 * - getSymptomSuggestions - A function that takes a user's symptom description and returns AI-generated suggestions.
 * - SymptomSuggestionInput - The input type for the getSymptomSuggestions function.
 * - SymptomSuggestionOutput - The return type for the getSymptomSuggestions function.
 */

import {ai, geminiPro} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomSuggestionInputSchema = z.object({
  symptomDescription: z
    .string()
    .describe('A description of the symptoms the user is experiencing.'),
});
export type SymptomSuggestionInput = z.infer<typeof SymptomSuggestionInputSchema>;

const SymptomSuggestionOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of AI-generated symptom suggestions.'),
});
export type SymptomSuggestionOutput = z.infer<typeof SymptomSuggestionOutputSchema>;

export async function getSymptomSuggestions(input: SymptomSuggestionInput): Promise<SymptomSuggestionOutput> {
  return symptomSuggestionFlow(input);
}

const symptomSuggestionPrompt = ai.definePrompt({
  name: 'symptomSuggestionPrompt',
  input: {schema: SymptomSuggestionInputSchema},
  output: {schema: SymptomSuggestionOutputSchema},
  model: geminiPro,
  prompt: `You are a medical assistant providing symptom suggestions based on the user's description.

  Provide a list of potential symptoms related to the user's description.

  User Symptom Description: {{{symptomDescription}}}

  Symptom Suggestions:`,
});

const symptomSuggestionFlow = ai.defineFlow(
  {
    name: 'symptomSuggestionFlow',
    inputSchema: SymptomSuggestionInputSchema,
    outputSchema: SymptomSuggestionOutputSchema,
  },
  async input => {
    const {output} = await symptomSuggestionPrompt(input);
    return output!;
  }
);
