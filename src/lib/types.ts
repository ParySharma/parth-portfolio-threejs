export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  aiHint: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Skill {
  name: string;
  level: number;
}
