'use server';

/**
 * @fileOverview Generates adaptive motion graphics responding to user navigation, enhancing the interactive 3D environment.
 *
 * - generateMotionGraphics - A function that generates adaptive motion graphics.
 * - GenerateMotionGraphicsInput - The input type for the generateMotionGraphics function.
 * - GenerateMotionGraphicsOutput - The return type for the generateMotionGraphics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMotionGraphicsInputSchema = z.object({
  userNavigationData: z.string().describe('Data representing the user\'s navigation within the 3D environment.'),
  portfolioTheme: z.string().describe('The overall theme of the portfolio (e.g., modern, minimalist, futuristic).'),
  dominantColor: z.string().describe('The dominant color of the portfolio for aesthetic coherence.'),
});
export type GenerateMotionGraphicsInput = z.infer<typeof GenerateMotionGraphicsInputSchema>;

const GenerateMotionGraphicsOutputSchema = z.object({
  motionGraphicsCode: z.string().describe('The code (e.g., Three.js, CSS animations) for the generated motion graphics.'),
  motionGraphicsDescription: z.string().describe('A description of the generated motion graphics and how they respond to user navigation.'),
});
export type GenerateMotionGraphicsOutput = z.infer<typeof GenerateMotionGraphicsOutputSchema>;

export async function generateMotionGraphics(input: GenerateMotionGraphicsInput): Promise<GenerateMotionGraphicsOutput> {
  return generateMotionGraphicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMotionGraphicsPrompt',
  input: {schema: GenerateMotionGraphicsInputSchema},
  output: {schema: GenerateMotionGraphicsOutputSchema},
  prompt: `You are an expert in creating adaptive motion graphics for interactive 3D environments. Your goal is to generate motion graphics code that responds to user navigation within the portfolio, enhancing its visual appeal and user engagement.

  User Navigation Data: {{{userNavigationData}}}
  Portfolio Theme: {{{portfolioTheme}}}
  Dominant Color: {{{dominantColor}}}

  Based on the user's navigation data, portfolio theme, and dominant color, generate the motion graphics code and provide a description of how the motion graphics respond to user interactions. The code should be compatible with Three.js or CSS animations, and should seamlessly integrate with the existing 3D environment.

  Ensure that the motion graphics enhance the user experience and captivate potential employers. Focus on creating visually stunning and responsive animations that showcase the developer's expertise and innovation.
  `,
});

const generateMotionGraphicsFlow = ai.defineFlow(
  {
    name: 'generateMotionGraphicsFlow',
    inputSchema: GenerateMotionGraphicsInputSchema,
    outputSchema: GenerateMotionGraphicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
