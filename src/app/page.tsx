"use client";

import type { Project, Experience as ExperienceType } from '@/lib/types';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 as Loader } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { ProjectDetailsDialog } from '@/components/project-details-dialog';
import { ContactDialog } from '@/components/contact-dialog';
import { Experience } from '@/components/experience';

const InteractiveScene = dynamic(() => import('@/components/3d/interactive-scene').then(mod => mod.InteractiveScene), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background text-foreground z-0">
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
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'MUI', 'Redux', 'axios', 'Firebase'],
    liveUrl: 'https://www.zomohealth.com/',
    repoUrl: '#',
    aiHint: 'medical dashboard chart'
  },
  {
    id: 2,
    title: 'Atologist Infotech - Marketing Portfolio',
    description: 'Contributed to the development of the official marketing and services portfolio for Atologist Infotech. This project showcases the company\'s expertise and services, featuring a clean, professional design built with Next.js and Material-UI for a polished user experience.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'MUI', 'Redux', 'Firebase'],
    liveUrl: 'https://atologist-website.web.app/',
    repoUrl: '#',
    aiHint: 'corporate website technology'
  },
  {
    id: 3,
    title: 'SmartX - Portfolio Website',
    description: 'A demo portfolio website created to showcase modern web development techniques. Built with Next.js and Material-UI, this project demonstrates a responsive and visually appealing layout for presenting projects and skills, serving as a template for personal branding.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'MUI', 'Netlify'],
    liveUrl: 'https://smartxnew.netlify.app/home',
    repoUrl: 'https://github.com/ParySharma/smartx',
    aiHint: 'modern portfolio design'
  },
   {
    id: 4,
    title: 'Parth Portfolio',
    description: 'My personal developer portfolio, which you are currently viewing. Built from the ground up with Next.js, ShadCN UI, and Tailwind CSS to create an interactive and visually engaging showcase of my skills, experience, and projects, including 3D animations and GenAI features.',
    image: '/images/projects/parth-portfolio-new.png',
    tags: ['Next.js', 'React', 'ShadCN UI', 'Tailwind CSS', 'GenAI'],
    liveUrl: 'https://parthsharma-portfolio.netlify.app/',
    repoUrl: 'https://github.com/ParySharma/myPortfolio',
    aiHint: 'developer portfolio project'
  },
  {
    id: 5,
    title: 'Parth Portfolio Old - Portfolio Site',
    description: 'An earlier version of my personal portfolio. This project was built to showcase my skills at the time using Next.js and Material-UI, demonstrating my foundational expertise in modern frontend technologies.',
    image: '/images/projects/parth-portfolio-old.png',
    tags: ['Next.js', 'MUI'],
    liveUrl: 'https://parysharma.netlify.app/',
    repoUrl: 'https://github.com/ParySharma/parth_pofolio',
    aiHint: 'archived portfolio design'
  },
];

const experiences: ExperienceType[] = [
  {
    company: 'Zomo Health',
    role: 'SDE-2 (Frontend)',
    period: 'Oct 2023 - Present',
    description: 'Leading frontend development for a patient-centric health management platform. Architecting and implementing features using Next.js, Material-UI, and Redux. Collaborating with cross-functional teams to deliver a seamless user experience.',
  },
  {
    company: 'Atologist Infotech',
    role: 'React JS Developer',
    period: 'Aug 2021 - Oct 2023',
    description: 'Developed and maintained various client websites and internal projects using React, Next.js, and related technologies. Contributed to UI/UX design and implementation, ensuring high performance and responsiveness.',
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
    <div className="relative min-h-screen w-full bg-background font-body text-foreground">
      <InteractiveScene projects={projects} onProjectClick={handleProjectClick} />
      
      <Header onContactClick={handleContactOpen} />
      
      <main className="relative z-10 mt-[100vh]">
        <section id="experience" className="py-20 bg-background/80 backdrop-blur-sm">
          <Experience experiences={experiences} />
        </section>
      </main>
      
      <ProjectDetailsDialog
        project={selectedProject}
        isOpen={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      />
      
      <ContactDialog isOpen={isContactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
