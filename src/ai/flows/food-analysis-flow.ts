'use server';
/**
 * @fileOverview A food analysis AI agent.
 *
 * - analyzeFood - A function that handles the food analysis process.
 * - FoodAnalysisInput - The input type for the analyzeFood function.
 * - FoodAnalysisOutput - The return type for the analyzeFood function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FoodAnalysisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a food item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  dishName: z.string().describe('The name of the dish.'),
});
export type FoodAnalysisInput = z.infer<typeof FoodAnalysisInputSchema>;

const FoodAnalysisOutputSchema = z.object({
  isFood: z.boolean().describe('Whether or not the input image is of food.'),
  calories: z.number().describe('Estimated calories.'),
  macros: z.object({
    protein: z.number().describe('Estimated protein in grams.'),
    carbs: z.number().describe('Estimated carbohydrates in grams.'),
    fat: z.number().describe('Estimated fat in grams.'),
  }),
});
export type FoodAnalysisOutput = z.infer<typeof FoodAnalysisOutputSchema>;

export async function analyzeFood(input: FoodAnalysisInput): Promise<FoodAnalysisOutput> {
  return foodAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'foodAnalysisPrompt',
  input: {schema: FoodAnalysisInputSchema},
  output: {schema: FoodAnalysisOutputSchema},
  prompt: `You are a nutrition expert. Analyze the following image and dish name.

Dish Name: {{{dishName}}}
Photo: {{media url=photoDataUri}}

First, determine if the image contains food. If it does not, set isFood to false and return zero for all macros and calories.
If it is food, estimate the calories and macronutrients (protein, carbs, fat) in grams for the given dish.`,
});

const foodAnalysisFlow = ai.defineFlow(
  {
    name: 'foodAnalysisFlow',
    inputSchema: FoodAnalysisInputSchema,
    outputSchema: FoodAnalysisOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (error) {
      console.error('Food analysis error:', error);
      
      // Return a fallback response when AI is unavailable
      return {
        isFood: true,
        calories: 0,
        macros: {
          protein: 0,
          carbs: 0,
          fat: 0,
        },
      };
    }
  }
);
