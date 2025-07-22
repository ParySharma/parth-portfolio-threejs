"use client";

import type { Experience as ExperienceType } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase } from 'lucide-react';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <div className="container mx-auto max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary-foreground text-center mb-12">
        Work Experience
      </h2>
      <div className="relative border-l-2 border-accent/20 pl-8 space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[42px] top-1.5 h-6 w-6 bg-accent rounded-full flex items-center justify-center ring-8 ring-background">
              <Briefcase className="w-3 h-3 text-accent-foreground" />
            </div>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 transition-all duration-300 hover:scale-105 hover:border-accent">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-headline text-xl text-accent">{exp.role}</CardTitle>
                    <CardDescription className="text-lg font-semibold">{exp.company}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="whitespace-nowrap">{exp.period}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
