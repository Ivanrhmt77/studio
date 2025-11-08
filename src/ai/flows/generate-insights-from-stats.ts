'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating insights from student grade statistics.
 *
 * The flow takes in statistical data about student grades and uses a language model to generate
 * human-readable insights about overall student performance and challenging subjects.
 *
 * @remarks
 * - It exports `generateInsightsFromStats` function to trigger the insights generation.
 * - It uses `GenerateInsightsFromStatsInput` as the input type, defining the structure of the
 *   statistical data.
 * - It uses `GenerateInsightsFromStatsOutput` as the output type, which includes the generated
 *   insights as a string.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInsightsFromStatsInputSchema = z.object({
  averageGrade: z.number().describe('The average grade of all students.'),
  medianGrade: z.number().describe('The median grade of all students.'),
  maxGrade: z.number().describe('The highest grade achieved by any student.'),
  minGrade: z.number().describe('The lowest grade achieved by any student.'),
  standardDeviation: z.number().describe('The standard deviation of student grades.'),
  subjectAverages: z
    .record(z.number())
    .describe(
      'A map of subject names to their average grades.  For example: { Math: 75, English: 82 }'
    ),
});

export type GenerateInsightsFromStatsInput = z.infer<
  typeof GenerateInsightsFromStatsInputSchema
>;

const GenerateInsightsFromStatsOutputSchema = z.object({
  insights: z.string().describe('The generated insights about student performance.'),
});

export type GenerateInsightsFromStatsOutput = z.infer<
  typeof GenerateInsightsFromStatsOutputSchema
>;

export async function generateInsightsFromStats(
  input: GenerateInsightsFromStatsInput
): Promise<GenerateInsightsFromStatsOutput> {
  return generateInsightsFromStatsFlow(input);
}

const relevanceCheckTool = ai.defineTool({
  name: 'relevanceCheck',
  description: 'Determine whether a specific point is relevant and significant to include in the insights report.',
  inputSchema: z.object({
    point: z.string().describe('The point to evaluate for relevance.'),
  }),
  outputSchema: z.boolean().describe('true if the point is deemed relevant and significant, false otherwise.'),
},
async (input) => {
  // This is a placeholder; in a real application, this function would contain the
  // actual logic to determine relevance and significance.
  // For now, we'll just return true.
  return true;
});

const generateInsightsFromStatsPrompt = ai.definePrompt({
  name: 'generateInsightsFromStatsPrompt',
  tools: [relevanceCheckTool],
  input: {schema: GenerateInsightsFromStatsInputSchema},
  output: {schema: GenerateInsightsFromStatsOutputSchema},
  prompt: `Analyze the following student grade statistics and generate insights about overall student performance and challenging subjects.

Average Grade: {{{averageGrade}}}
Median Grade: {{{medianGrade}}}
Max Grade: {{{maxGrade}}}
Min Grade: {{{minGrade}}}
Standard Deviation: {{{standardDeviation}}}
Subject Averages: {{{subjectAverages}}}

Consider these potential points and only include them if the relevanceCheck tool confirms their importance:

- The average grade indicates the overall performance level of the students.
- The median grade provides a sense of the central tendency of the grades, which is less sensitive to outliers.
- The max and min grades show the range of student performance.
- The standard deviation indicates the variability or spread of the grades around the average.
- Subject averages highlight subjects where students may be struggling or excelling.

Based on this, create well-reasoned insights for the administrator.
`,
});

const generateInsightsFromStatsFlow = ai.defineFlow(
  {
    name: 'generateInsightsFromStatsFlow',
    inputSchema: GenerateInsightsFromStatsInputSchema,
    outputSchema: GenerateInsightsFromStatsOutputSchema,
  },
  async input => {
    const {output} = await generateInsightsFromStatsPrompt(input);
    return output!;
  }
);
