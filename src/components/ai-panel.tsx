"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getMotionGraphicsSuggestion } from '@/lib/actions';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AiPanelProps {
    lastInteraction: string;
}

export function AiPanel({ lastInteraction }: AiPanelProps) {
    const { toast } = useToast();
    const [suggestion, setSuggestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        setSuggestion('');
        try {
            const result = await getMotionGraphicsSuggestion(lastInteraction);
            if (result.success && result.data) {
                setSuggestion(result.data.motionGraphicsDescription);
            } else {
                setSuggestion(result.error || 'An unknown error occurred.');
                toast({
                    variant: "destructive",
                    title: "AI Error",
                    description: result.error || 'Could not generate suggestion.',
                });
            }
        } catch (error) {
             setSuggestion('A client-side error occurred.');
             toast({
                variant: "destructive",
                title: "Error",
                description: 'Failed to communicate with AI service.',
             });
        }
        setIsLoading(false);
    };

    return (
        <Card className="max-w-xs bg-background/50 backdrop-blur-sm border-primary/50 shadow-lg shadow-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-accent">
                    <Bot className="h-6 w-6" /> AI Motion Graphics
                </CardTitle>
                <CardDescription className="text-muted-foreground">Get AI-powered ideas for interactive animations based on your journey.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleClick} disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Generate Idea
                </Button>
                {suggestion && (
                    <div className="mt-4 rounded-md border border-accent/20 bg-accent/10 p-3">
                        <p className="text-sm text-foreground">{suggestion}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
