'use server';
/**
 * @fileOverview Generates dynamic triage questions based on a user's initial symptom.
 *
 * - getDynamicQuestions - A function that takes a symptom and returns two relevant follow-up questions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { DynamicQuestionsInput, DynamicQuestionsOutput, DynamicQuestionsInputSchema, DynamicQuestionsOutputSchema } from '@/lib/types';
import { DynamicQuestionsInputSchema as InputSchema, DynamicQuestionsOutputSchema as OutputSchema } from '@/lib/types';

export async function getDynamicQuestions(input: DynamicQuestionsInput): Promise<DynamicQuestionsOutput> {
  return generateQuestionsFlow(input);
}

const generateQuestionsPrompt = ai.definePrompt({
  name: 'generateQuestionsPrompt',
  input: { schema: InputSchema },
  output: { schema: OutputSchema },
  model: 'gemini-pro',
  prompt: `You are a medical assistant responsible for generating follow-up questions for a symptom triage app.
Based on the user's initial symptom, generate two relevant follow-up questions.

The first question (id: "q2") should always be a 'severity' type question to assess how severe the symptom is.
The options for the severity question must be:
- { text: 'Mild', value: 1 }
- { text: 'Moderate', value: 3 }
- { text: 'Severe', value: 5, isCritical: true }

The second question (id: "q3") should be a 'yes_no' type question that is relevant to the initial symptom to gather more information.
For the 'yes_no' question, the "Yes" option should have a value between 1 and 5, and can be critical. The "No" option must have a value of 0.

Initial Symptom: {{{symptom}}}

Generate the two questions.`,
});


const generateQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuestionsFlow',
    inputSchema: InputSchema,
    outputSchema: OutputSchema,
  },
  async (input) => {
    const { output } = await generateQuestionsPrompt(input);
    return output!;
  }
);
