"use client";

import type { Project } from '@/lib/types';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

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
                data-ai-hint={project.aiHint} 
             />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map(t => <Badge key={t} variant="secondary" className="bg-primary/50 text-primary-foreground">{t}</Badge>)}
          </div>
        </div>
        <DialogFooter className="mt-4">
            <div className="flex w-full justify-end gap-2">
                {project.liveUrl && project.liveUrl !== '#' && (
                    <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Site
                        </a>
                    </Button>
                )}
                {project.repoUrl && project.repoUrl !== '#' && (
                     <Button asChild variant="secondary">
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                        </a>
                    </Button>
                )}
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
