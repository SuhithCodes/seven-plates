'use server';

import { personalizedMealPlanning } from '@/ai/flows/personalized-meal-planning';
import { z } from 'zod';

const lifestyleSchema = z.object({
  lifestyle: z.string().min(10, { message: 'Please describe your lifestyle in at least 10 characters.' }),
});

export async function getMealPlan(
  prevState: any,
  formData: FormData
) {
  const validatedFields = lifestyleSchema.safeParse({
    lifestyle: formData.get('lifestyle'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.lifestyle?.[0],
    };
  }

  try {
    const result = await personalizedMealPlanning({
      lifestyle: validatedFields.data.lifestyle,
    });
    return { data: result };
  } catch (error) {
    console.error('Meal plan generation failed:', error);
    return { error: 'Failed to generate a meal plan. Please try again later.' };
  }
}
