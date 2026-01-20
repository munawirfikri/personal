import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROFILE, EXPERIENCES, EDUCATION, PROJECTS, SKILLS, SOCIALS } from '../constants';
import { Experience, Education as EducationType, Project, Skill, SocialLink } from '../types';

// Define the shape of our "Database"
interface AppData {
  profile: typeof PROFILE;
  experiences: Experience[];
  education: EducationType[];
  projects: Project[];
  skills: Skill[];
  socials: SocialLink[];
}

interface DataContextType extends AppData {
  updateProfile: (data: typeof PROFILE) => void;
  updateExperiences: (data: Experience[]) => void;
  updateEducation: (data: EducationType[]) => void;
  updateProjects: (data: Project[]) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or fallback to constants
  const [profile, setProfile] = useState<typeof PROFILE>(() => {
    try {
      const saved = localStorage.getItem('cms_profile');
      return saved ? JSON.parse(saved) : PROFILE;
    } catch (e) {
      console.error("Error parsing profile from local storage", e);
      return PROFILE;
    }
  });

  const [experiences, setExperiences] = useState<Experience[]>(() => {
    try {
      const saved = localStorage.getItem('cms_experiences');
      return saved ? JSON.parse(saved) : EXPERIENCES;
    } catch (e) {
      return EXPERIENCES;
    }
  });

  const [education, setEducation] = useState<EducationType[]>(() => {
    try {
      const saved = localStorage.getItem('cms_education');
      return saved ? JSON.parse(saved) : EDUCATION;
    } catch (e) {
      return EDUCATION;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('cms_projects');
      return saved ? JSON.parse(saved) : PROJECTS;
    } catch (e) {
      return PROJECTS;
    }
  });

  // Skills and Socials are static for now in this CMS demo
  const [skills] = useState<Skill[]>(SKILLS);
  const [socials] = useState<SocialLink[]>(SOCIALS);

  // Debug Log to confirm DataContext is active
  useEffect(() => {
    console.log("DataContext Initialized. Profile loaded:", profile.name);
  }, []);

  // Persistence Effects
  useEffect(() => localStorage.setItem('cms_profile', JSON.stringify(profile)), [profile]);
  useEffect(() => localStorage.setItem('cms_experiences', JSON.stringify(experiences)), [experiences]);
  useEffect(() => localStorage.setItem('cms_education', JSON.stringify(education)), [education]);
  useEffect(() => localStorage.setItem('cms_projects', JSON.stringify(projects)), [projects]);

  const updateProfile = (data: typeof PROFILE) => setProfile(data);
  const updateExperiences = (data: Experience[]) => setExperiences(data);
  const updateEducation = (data: EducationType[]) => setEducation(data);
  const updateProjects = (data: Project[]) => setProjects(data);

  const resetData = () => {
    if(confirm("Are you sure? This will reset all your changes to the original code defaults.")) {
      setProfile(PROFILE);
      setExperiences(EXPERIENCES);
      setEducation(EDUCATION);
      setProjects(PROJECTS);
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <DataContext.Provider value={{
      profile, experiences, education, projects, skills, socials,
      updateProfile, updateExperiences, updateEducation, updateProjects, resetData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider. Check if App is wrapped in index.tsx');
  }
  return context;
};