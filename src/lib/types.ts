import { z } from 'zod';

export const DynamicQuestionsInputSchema = z.object({
  symptom: z.string().describe('The initial symptom reported by the user.'),
});
export type DynamicQuestionsInput = z.infer<typeof DynamicQuestionsInputSchema>;

export const QuestionSchema = z.object({
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

export const AiSummaryInputSchema = z.object({
  symptom: z.string().describe('The primary symptom of the user.'),
  answers: z.record(z.any()).describe("The user's answers to the triage questions."),
});
export type AiSummaryInput = z.infer<typeof AiSummaryInputSchema>;

export const AiSummaryOutputSchema = z.object({
  summary: z.string().describe('A personalized, non-emergency care summary.'),
  nextSteps: z.array(z.string()).describe('A list of recommended next steps.'),
});
export type AiSummaryOutput = z.infer<typeof AiSummaryOutputSchema>;
