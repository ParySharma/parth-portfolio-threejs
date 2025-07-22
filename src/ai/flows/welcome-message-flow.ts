'use server';
/**
 * @fileOverview A flow to generate a welcome message.
 *
 * - generateWelcomeMessage - A function that generates a welcome message.
 * - WelcomeMessageInput - The input type for the generateWelcomeMessage function.
 * - WelcomeMessageOutput - The return type for the generateWelcomeMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WelcomeMessageInputSchema = z.object({
  timeOfDay: z.string().optional().describe('The current time of day (e.g., morning, afternoon, evening).'),
});
export type WelcomeMessageInput = z.infer<typeof WelcomeMessageInputSchema>;

const WelcomeMessageOutputSchema = z.object({
  greeting: z.string().describe('A creative and friendly welcome message for a developer\'s portfolio.'),
});
export type WelcomeMessageOutput = z.infer<typeof WelcomeMessageOutputSchema>;

export async function generateWelcomeMessage(input: WelcomeMessageInput): Promise<WelcomeMessageOutput> {
  return welcomeMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'welcomeMessagePrompt',
  input: {schema: WelcomeMessageInputSchema},
  output: {schema: WelcomeMessageOutputSchema},
  prompt: `You are a creative AI assistant for a web developer's interactive portfolio. Your task is to generate a short, welcoming, and slightly futuristic greeting for visitors. The developer's name is Parth Sharma.

Keep the message concise (1-2 sentences).

{{#if timeOfDay}}
The current time is {{timeOfDay}}. Tailor the message to be appropriate for this time.
{{/if}}

Generate a greeting that is both professional and intriguing, hinting at the interactive nature of the portfolio.
`,
});

const welcomeMessageFlow = ai.defineFlow(
  {
    name: 'welcomeMessageFlow',
    inputSchema: WelcomeMessageInputSchema,
    outputSchema: WelcomeMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
