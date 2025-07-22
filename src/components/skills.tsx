"use client";

import type { Skill } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  return (
    <div className="container mx-auto max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary-foreground text-center mb-12">
        Skills
      </h2>
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-primary-foreground">{skill.name}</h3>
                <span className="text-sm font-medium text-accent">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-2 [&>div]:bg-accent" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
