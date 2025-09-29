'use server';
/**
 * @fileOverview Generates a personalized care summary using AI.
 *
 * - getAiSummary - A function that takes user symptoms and answers to generate a summary.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { AiSummaryInput, AiSummaryOutput, AiSummaryInputSchema, AiSummaryOutputSchema } from '@/lib/types';


export async function getAiSummary(input: AiSummaryInput): Promise<AiSummaryOutput> {
  return generateSummaryFlow(input);
}

const generateSummaryPrompt = ai.definePrompt({
  name: 'generateSummaryPrompt',
  input: { schema: AiSummaryInputSchema },
  output: { schema: AiSummaryOutputSchema },
  model: 'gemini-pro',
  prompt: `You are a medical assistant AI. Your task is to provide a personalized, non-emergency care summary and next steps based on a user's triage responses.

Do not provide emergency advice. The user has already been assessed as non-critical.

User's primary symptom: {{{symptom}}}
User's answers:
{{{JSONstringify answers}}}

Generate a helpful summary and a list of 3-4 actionable next steps.
Keep the tone helpful and reassuring.
`,
  custom: {
    JSONstringify: (input: any) => JSON.stringify(input, null, 2),
  },
});

const generateSummaryFlow = ai.defineFlow(
  {
    name: 'generateSummaryFlow',
    inputSchema: AiSummaryInputSchema,
    outputSchema: AiSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await generateSummaryPrompt(input);
    return output!;
  }
);
