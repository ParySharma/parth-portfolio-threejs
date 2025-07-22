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
