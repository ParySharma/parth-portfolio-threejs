"use client";

import React, { useState, useEffect } from 'react';
import { generateWelcomeMessage } from '@/ai/flows/welcome-message-flow';
import { Sparkles } from 'lucide-react';

function TypingEffect({ text, onComplete }: { text: string, onComplete: () => void }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (text) {
      let i = 0;
      setDisplayedText('');
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(interval);
          onComplete();
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [text, onComplete]);

  return <>{displayedText}</>;
}

export function AiWelcome() {
  const [greeting, setGreeting] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const getGreeting = async () => {
      try {
        const date = new Date();
        const hours = date.getHours();
        let timeOfDay = 'evening';
        if (hours >= 5 && hours < 12) {
          timeOfDay = 'morning';
        } else if (hours >= 12 && hours < 18) {
          timeOfDay = 'afternoon';
        }
        
        const result = await generateWelcomeMessage({ timeOfDay });
        setGreeting(result.greeting);
      } catch (error) {
        console.error("Failed to generate welcome message:", error);
        setGreeting("Welcome to my digital universe. Explore my work.");
      } finally {
        setIsLoading(false);
      }
    };

    getGreeting();
  }, []);

  return (
    <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 w-full max-w-4xl text-center px-4">
      <h1 className="text-xl md:text-2xl font-headline font-bold text-primary-foreground mb-2 drop-shadow-lg">
        {isLoading ? (
          <span className="animate-pulse">Loading...</span>
        ) : (
          isTyping ? 
            <TypingEffect text={greeting} onComplete={() => setIsTyping(false)} /> :
            greeting
        )}
        {!isTyping && <span className="text-accent animate-ping">|</span>}
      </h1>
      <p className="flex items-center justify-center text-xs text-accent font-semibold drop-shadow-md">
        <Sparkles className="mr-2 h-3 w-3 animate-pulse" />
        AI-Generated Welcome
      </p>
    </div>
  );
}
