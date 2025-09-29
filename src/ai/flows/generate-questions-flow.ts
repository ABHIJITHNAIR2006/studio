'use server';
/**
 * @fileOverview Generates dynamic triage questions based on a user's initial symptom.
 *
 * - getDynamicQuestions - A function that takes a symptom and returns two relevant follow-up questions.
 * - DynamicQuestionsInput - The input type for the getDynamicQuestions function.
 * - DynamicQuestionsOutput - The return type for the getDynamicQuestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const DynamicQuestionsInputSchema = z.object({
  symptom: z.string().describe('The initial symptom reported by the user.'),
});
export type DynamicQuestionsInput = z.infer<typeof DynamicQuestionsInputSchema>;

const QuestionSchema = z.object({
  id: z.string().describe('A unique ID for the question (e.g., "q2", "q3").'),
  text: z.string().describe('The question text.'),
  type: z.enum(['severity', 'yes_no']).describe('The type of question.'),
  options: z.array(
    z.object({
      text: z.string(),
      value: z.number(),
      isCritical: z.boolean().optional(),
    })
  ).describe('The options for the question.'),
});

export const DynamicQuestionsOutputSchema = z.object({
  questions: z.array(QuestionSchema).length(2).describe('An array of exactly two follow-up questions.'),
});
export type DynamicQuestionsOutput = z.infer<typeof DynamicQuestionsOutputSchema>;


export async function getDynamicQuestions(input: DynamicQuestionsInput): Promise<DynamicQuestionsOutput> {
  return generateQuestionsFlow(input);
}

const generateQuestionsPrompt = ai.definePrompt({
  name: 'generateQuestionsPrompt',
  input: { schema: DynamicQuestionsInputSchema },
  output: { schema: DynamicQuestionsOutputSchema },
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
    inputSchema: DynamicQuestionsInputSchema,
    outputSchema: DynamicQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await generateQuestionsPrompt(input);
    return output!;
  }
);
