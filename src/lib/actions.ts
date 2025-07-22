'use server';

import { generateMotionGraphics, type GenerateMotionGraphicsOutput } from '@/ai/flows/generate-motion-graphics';

interface ActionResult {
    success: boolean;
    data?: GenerateMotionGraphicsOutput;
    error?: string;
}

export async function getMotionGraphicsSuggestion(userNavigationData: string): Promise<ActionResult> {
    try {
        const result = await generateMotionGraphics({
            userNavigationData,
            portfolioTheme: 'futuristic dark tech with neon highlights',
            dominantColor: '#00FFFF',
        });
        return { success: true, data: result };
    } catch (error) {
        console.error("Error generating motion graphics suggestion:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, error: `Failed to generate suggestion: ${errorMessage}` };
    }
}
