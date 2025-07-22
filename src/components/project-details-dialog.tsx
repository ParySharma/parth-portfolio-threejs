"use client";

import type { Project } from '@/lib/types';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface ProjectDetailsDialogProps {
  project: Project | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetailsDialog({ project, isOpen, onOpenChange }: ProjectDetailsDialogProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] bg-background/80 backdrop-blur-md border-primary text-foreground">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-accent">{project.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{project.description}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-accent/20">
             <Image 
                src={project.image} 
                alt={project.title} 
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 hover:scale-105"
                data-ai-hint={project.hint} 
             />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map(t => <Badge key={t} variant="secondary" className="bg-primary/50 text-primary-foreground">{t}</Badge>)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
