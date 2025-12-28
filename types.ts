
export interface ProfileSummary {
  name: string;
  role: string;
  experience: string;
  domain: string;
  shortIntro: string;
}

export interface AboutInfo {
  about: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string | null;
  demoUrl: string | null;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  status: string;
  message: string;
}
