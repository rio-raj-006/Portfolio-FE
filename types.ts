
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

export interface SkillsResponse {
  skills: {
    [category: string]: Skill[];
  };
}

export interface Project {
  id: string;
  title: string;
  domain: string;
  projectType: string;
  duration: string;
  overview: string;
  problemStatement: string;
  solution: string;
  keyFeatures: string[];
  responsibilities: string[];
  architecture: {
    description: string;
    components: string[];
  };
  techStack: {
    backend: string[];
    database: string[];
    integration: string[];
    tools: string[];
  };
  impact: string[];
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
