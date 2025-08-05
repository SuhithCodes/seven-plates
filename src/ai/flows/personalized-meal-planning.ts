'use server';

/**
 * @fileOverview This file defines a Genkit flow for personalized meal planning recommendations.
 *
 * The flow takes user lifestyle preferences as input and recommends the number of meals per day and preparation time.
 *
 * @exports {
 *   personalizedMealPlanning,
 *   PersonalizedMealPlanningInput,
 *   PersonalizedMealPlanningOutput,
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedMealPlanningInputSchema = z.object({
  lifestyle: z
    .string()
    .describe(
      'A description of the user lifestyle, including work schedule, dietary restrictions, and fitness goals.'
    ),
});
export type PersonalizedMealPlanningInput = z.infer<
  typeof PersonalizedMealPlanningInputSchema
>;

const PersonalizedMealPlanningOutputSchema = z.object({
  mealsPerDay: z
    .number()
    .describe('The recommended number of meals per day for the user.'),
  prepTime: z
    .string()
    .describe(
      'The recommended preparation time for each meal, in minutes (e.g., 30 minutes).' + 'Use the units.'
    ),
});
export type PersonalizedMealPlanningOutput = z.infer<
  typeof PersonalizedMealPlanningOutputSchema
>;

export async function personalizedMealPlanning(
  input: PersonalizedMealPlanningInput
): Promise<PersonalizedMealPlanningOutput> {
  return personalizedMealPlanningFlow(input);
}

const personalizedMealPlanningPrompt = ai.definePrompt({
  name: 'personalizedMealPlanningPrompt',
  input: {schema: PersonalizedMealPlanningInputSchema},
  output: {schema: PersonalizedMealPlanningOutputSchema},
  prompt: `Based on the user's lifestyle:

  {{lifestyle}}

  Recommend the ideal number of meals per day and preparation time for each meal.
  Ensure that prep time has the units.`,
});

const personalizedMealPlanningFlow = ai.defineFlow(
  {
    name: 'personalizedMealPlanningFlow',
    inputSchema: PersonalizedMealPlanningInputSchema,
    outputSchema: PersonalizedMealPlanningOutputSchema,
  },
  async input => {
    const {output} = await personalizedMealPlanningPrompt(input);
    return output!;
  }
);
