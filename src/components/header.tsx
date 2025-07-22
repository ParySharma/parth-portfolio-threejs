"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateWelcomeMessage } from '@/ai/flows/welcome-message-flow';

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


export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        setGreeting("Welcome to my digital universe.");
      } finally {
        setIsLoading(false);
      }
    };

    getGreeting();
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex flex-col items-start">
          <div className="text-sm md:text-base font-headline font-bold text-primary-foreground drop-shadow-lg">
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              isTyping ? 
                <TypingEffect text={greeting} onComplete={() => setIsTyping(false)} /> :
                greeting
            )}
            {!isTyping && <span className="text-accent animate-ping">|</span>}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
