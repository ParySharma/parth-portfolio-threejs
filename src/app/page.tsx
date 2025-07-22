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
    {
    id: 1,
    title: 'Zomo Health - Health Management Platform',
    description: 'Developed a comprehensive health management platform for Zomo Health, designed to redefine personalized care. This application provides innovative solutions for users to manage their health, connect with professionals, and access resources, fostering a healthier and happier community.',
    image: 'https://www.zomohealth.com/_next/image?url=%2Fimages%2Fhero%2Fabout_light.webp&w=1920&q=75',
    tags: ['Next.js', 'MUI', 'Redux', 'axios', 'Firebase'],
    liveUrl: 'https://www.zomohealth.com/',
    repoUrl: '#',
    aiHint: 'medical dashboard chart'
  },
  {
    id: 2,
    title: 'Atologist Infotech - Marketing Portfolio',
    description: 'Contributed to the development of the official marketing and services portfolio for Atologist Infotech. This project showcases the company\'s expertise and services, featuring a clean, professional design built with Next.js and Material-UI for a polished user experience.',
    image: 'https://atologistinfotech.com/img/logo.png',
    tags: ['Next.js', 'MUI', 'Redux', 'Firebase'],
    liveUrl: 'https://atologistinfotech.com/',
    repoUrl: '#',
    aiHint: 'corporate website technology'
  },
  {
    id: 3,
    title: 'SmartX - Portfolio Website',
    description: 'A demo portfolio website created to showcase modern web development techniques. Built with Next.js and Material-UI, this project demonstrates a responsive and visually appealing layout for presenting projects and skills, serving as a template for personal branding.',
    image: 'https://smartxnew.netlify.app/images/logo/logo.png',
    tags: ['Next.js', 'MUI', 'Netlify'],
    liveUrl: 'https://smartxnew.netlify.app/home',
    repoUrl: 'https://github.com/ParySharma/smartx',
    aiHint: 'modern portfolio design'
  },
   {
    id: 4,
    title: 'Parth Portfolio',
    description: 'My personal developer portfolio, which you are currently viewing. Built from the ground up with Next.js, ShadCN UI, and Tailwind CSS to create an interactive and visually engaging showcase of my skills, experience, and projects, including 3D animations and GenAI features.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'React', 'ShadCN UI', 'Tailwind CSS', 'GenAI'],
    liveUrl: 'https://parthsharma-portfolio.netlify.app/',
    repoUrl: 'https://github.com/ParySharma/myPortfolio',
    aiHint: 'developer portfolio project'
  },
  {
    id: 5,
    title: 'Parth Portfolio Old - Portfolio Site',
    description: 'An earlier version of my personal portfolio. This project was built to showcase my skills at the time using Next.js and Material-UI, demonstrating my foundational expertise in modern frontend technologies.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'MUI'],
    liveUrl: 'https://parysharma.netlify.app/',
    repoUrl: 'https://github.com/ParySharma/parth_pofolio',
    aiHint: 'archived portfolio design'
  },
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
