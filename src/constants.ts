import { Experience, Project, Skill, SocialLink } from './types';

// NOTE: This data serves as the knowledge base for the website AND the AI Assistant.

export const PROFILE = {
  name: "Munawir Fikri Al-Akbari",
  title: "Software Engineer",
  tagline: "Building scalable backend systems & digital solutions.",
  location: "Riau, Indonesia",
  email: "munawirfikri@gmail.com",
  about: `I am an experienced Software Engineer with over 3+ years of experience in multiple industries including education, retail, health care, and dermatology. I have a strong foundation in programming languages and enjoy solving complex problems to deliver efficient, high-quality solutions. I am constantly exploring new technologies and keeping up with industry trends.

  Currently, I am pursuing a Master of Computer Science at Universitas Budi Luhur (GPA 3.7), building upon my Bachelor's in Informatics Engineering from Universitas Riau (GPA 3.64).`,
  availability: "Open for opportunities",
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    role: "Backend Developer Senior Specialist",
    company: "ARYA NOBLE, PT",
    period: "May 2024 – Current",
    description: "Serving as Squad Lead and Code Reviewer. Responsible for the CIS DERMIES Backend System and developing APIs for SAP Integration.",
    technologies: ["Backend Architecture", "Code Review", "SAP Integration", "Leadership"]
  },
  {
    id: 'exp2',
    role: "Backend Developer",
    company: "INDOCYBER GLOBAL TEKNOLOGI, PT",
    period: "Nov 2022 – May 2024",
    description: "Assigned to client Arya Noble. Developed CMS and backend for mobile apps (Pick & Pack). Revamped existing systems (E-Registration, ClinicMS, BuildingMS) and integrated databases (Axapta, MySQL, PostgreSQL).",
    technologies: ["Mobile Backend", "CMS", "MySQL", "PostgreSQL", "System Integration"]
  },
  {
    id: 'exp3',
    role: "Capstone Advisor (Part Time)",
    company: "BANGKIT ACADEMY",
    period: "May 2023 - Jun 2023",
    description: "Responsible for giving advice and conducting mentoring sessions for 4 project groups led by Google, GoTo, and Traveloka.",
    technologies: ["Mentoring", "Project Management", "Advisory"]
  },
  {
    id: 'exp4',
    role: "Google DSC Lead",
    company: "Google Developer Student Clubs - UNRI",
    period: "Aug 2021 – July 2022",
    description: "Initiated a Google Developer Community at University of Riau. Organized several learning events about technologies from experts.",
    technologies: ["Community Management", "Leadership", "Public Speaking"]
  },
  {
    id: 'exp5',
    role: "Software Developer",
    company: "IAI TAFAQQUH FIDDIN DUMAI",
    period: "Jan 2020 – July 2022",
    description: "Developed the Academic Information System (Portal Akademik) and the Admission System (PMB).",
    technologies: ["Full Stack Development", "Academic Systems", "Web Development"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: "CIS DERMIES Backend",
    description: "Architected and maintained the core backend system for Dermies (Arya Noble). Handled high-load data processing and third-party integrations.",
    imageUrl: "https://picsum.photos/600/400?grayscale&random=10",
    tags: ["Backend", "SAP Integration", "Health Tech"],
    link: "#",
    github: "#"
  },
  {
    id: 'p2',
    title: "Pick & Pack Mobile App",
    description: "Developed the Content Management System and robust backend APIs for the Pick & Pack mobile application, ensuring seamless data synchronization.",
    imageUrl: "https://picsum.photos/600/400?grayscale&random=11",
    tags: ["Mobile Backend", "CMS", "API Development"],
    link: "#",
    github: "#"
  },
  {
    id: 'p3',
    title: "Academic Portal System",
    description: "Built a comprehensive Academic Information System for IAI Tafaqquh Fiddin, managing student data, grades, and course schedules.",
    imageUrl: "https://picsum.photos/600/400?grayscale&random=12",
    tags: ["Web App", "Information Systems", "Education Tech"],
    link: "#",
    github: "#"
  }
];

export const SKILLS: Skill[] = [
  { name: "Laravel / CodeIgniter", category: "backend" },
  { name: "Spring Boot (Kotlin)", category: "backend" },
  { name: "Node.js / ExpressJS", category: "backend" },
  { name: "ReactJS / NextJS", category: "frontend" },
  { name: "Android Native / React Native", category: "frontend" },
  { name: "MySQL / PostgreSQL", category: "backend" },
  { name: "MongoDB / SQL Server", category: "backend" },
  { name: "Docker / Git", category: "tools" },
];

export const SOCIALS: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/munawirfikri/",
    icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
  },
  {
    platform: "GitHub",
    url: "https://github.com/munawirfikri",
    icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
  }
];