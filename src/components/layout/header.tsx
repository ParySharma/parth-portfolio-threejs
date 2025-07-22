"use client";

import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
    onContactClick: () => void;
}

export function Header({ onContactClick }: HeaderProps) {
    return (
        <header className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-headline font-bold flex items-center gap-2 text-primary-foreground select-none">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-accent animate-pulse" />
                <span>Motion Portfolio</span>
            </h1>
            <nav>
                <Button onClick={onContactClick} variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-300">
                    Contact Me
                </Button>
            </nav>
        </header>
    );
}
