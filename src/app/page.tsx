"use client";

import type { Project } from '@/lib/types';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 as Loader } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { ProjectDetailsDialog } from '@/components/project-details-dialog';
import { ContactDialog } from '@/components/contact-dialog';

const InteractiveScene = dynamic(() => import('@/components/3d/interactive-scene').then(mod => mod.InteractiveScene), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background text-foreground">
      <Loader className="h-12 w-12 animate-spin text-accent" />
      <p className="mt-4 text-lg font-headline">Loading 3D Universe...</p>
    </div>
  ),
});

const projects: Project[] = [
  { id: 1, title: 'Project Alpha', description: 'A cutting-edge web application that leverages server-side rendering and a component-based architecture to deliver a fast and responsive user experience.', tech: ['React', 'Node.js', 'GraphQL'], image: 'https://placehold.co/600x400.png', hint: 'abstract technology' },
  { id: 2, title: 'Project Beta', description: 'An e-commerce platform with a unique, minimalist design, focusing on user-friendly navigation and a seamless checkout process. Built with modern frontend technologies.', tech: ['Next.js', 'TypeScript', 'PostgreSQL'], image: 'https://placehold.co/600x400.png', hint: 'minimalist design' },
  { id: 3, title: 'Project Gamma', description: 'A real-time data visualization tool that transforms complex datasets into interactive and understandable charts and graphs. Perfect for business intelligence.', tech: ['D3.js', 'Firebase', 'Svelte'], image: 'https://placehold.co/600x400.png', hint: 'data visualization' },
  { id: 4, title: 'Project Delta', description: 'A collaborative content management system that allows teams to create, edit, and publish content with a powerful and intuitive editor.', tech: ['Vue.js', 'Tailwind CSS', 'Supabase'], image: 'https://placehold.co/600x400.png', hint: 'collaboration tool' },
  { id: 5, title: 'Project Epsilon', description: 'A mobile-first social networking app designed for communities, featuring real-time chat, event scheduling, and media sharing capabilities.', tech: ['React Native', 'Firebase', 'Redux'], image: 'https://placehold.co/600x400.png', hint: 'social network' },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setContactOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleContactOpen = () => {
    setContactOpen(true);
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background font-body text-foreground">
      <InteractiveScene projects={projects} onProjectClick={handleProjectClick} />
      
      <Header onContactClick={handleContactOpen} />
      
      <ProjectDetailsDialog
        project={selectedProject}
        isOpen={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      />
      
      <ContactDialog isOpen={isContactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
