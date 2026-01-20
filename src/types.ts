
export type Language = 'en' | 'id' | 'ms';

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  year: string;
  gpa?: string;
  description?: string;
  logoUrl?: string; // Optional logo placeholder
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'soft';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // SVG path or identifier
}

export interface InstagramMedia {
  id: string;
  caption: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
}

export enum SectionId {
  HERO = 'home',
  ABOUT = 'about',
  EXPERIENCE = 'experience',
  EDUCATION = 'education',
  PROJECTS = 'projects',
  INSTAGRAM = 'instagram',
  CONTACT = 'contact',
}
