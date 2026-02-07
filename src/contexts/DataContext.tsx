
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PROFILE_EN, PROFILE_ID, PROFILE_MS,
  SKILLS, SOCIALS, UI_TRANSLATIONS 
} from '../constants';
import { Experience, Education as EducationType, Project, Skill, SocialLink, Language } from '../types';
import { portfolioApi } from '../services/portfolioApi';

// Define the shape of our "Database"
interface AppData {
  language: Language;
  profile: typeof PROFILE_EN;
  experiences: Experience[];
  education: EducationType[];
  projects: Project[];
  skills: Skill[];
  socials: SocialLink[];
  translations: typeof UI_TRANSLATIONS['en'];
}

interface DataContextType extends AppData {
  setLanguage: (lang: Language) => void;
  updateProfile: (data: typeof PROFILE_EN) => void;
  addExperience: (data: Omit<Experience, 'id'>) => Promise<void>;
  updateExperience: (id: string, data: Partial<Experience>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  addEducation: (data: Omit<EducationType, 'id'>) => Promise<void>;
  updateEducation: (id: string, data: Partial<EducationType>) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  addProject: (data: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  resetData: () => void;
  t: (key: keyof typeof UI_TRANSLATIONS['en']) => string;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('app_language') as Language) || 'en';
  });

  const [profile, setProfile] = useState<typeof PROFILE_EN>(PROFILE_EN);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<EducationType[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from API
  const loadData = async (lang: Language) => {
    try {
      setLoading(true);
      const [expData, eduData, projData] = await Promise.all([
        portfolioApi.getExperiences(lang),
        portfolioApi.getEducation(lang),
        portfolioApi.getProjects(lang)
      ]);
      
      setExperiences(expData);
      setEducation(eduData);
      setProjects(projData);
      
      // Set profile based on language
      if (lang === 'id') setProfile(PROFILE_ID);
      else if (lang === 'ms') setProfile(PROFILE_MS);
      else setProfile(PROFILE_EN);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(language);
    localStorage.setItem('app_language', language);
  }, [language]);

  const [skills] = useState<Skill[]>(SKILLS);
  const [socials] = useState<SocialLink[]>(SOCIALS);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const updateProfile = (data: typeof PROFILE_EN) => setProfile(data);

  // Experience CRUD
  const addExperience = async (data: Omit<Experience, 'id'>) => {
    const newExp = await portfolioApi.createExperience({ ...data, language });
    setExperiences(prev => [...prev, newExp]);
  };

  const updateExperience = async (id: string, data: Partial<Experience>) => {
    const updated = await portfolioApi.updateExperience(id, data);
    setExperiences(prev => prev.map(exp => exp.id === id ? updated : exp));
  };

  const deleteExperience = async (id: string) => {
    await portfolioApi.deleteExperience(id);
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  // Education CRUD
  const addEducation = async (data: Omit<EducationType, 'id'>) => {
    const newEdu = await portfolioApi.createEducation({ ...data, language });
    setEducation(prev => [...prev, newEdu]);
  };

  const updateEducation = async (id: string, data: Partial<EducationType>) => {
    const updated = await portfolioApi.updateEducation(id, data);
    setEducation(prev => prev.map(edu => edu.id === id ? updated : edu));
  };

  const deleteEducation = async (id: string) => {
    await portfolioApi.deleteEducation(id);
    setEducation(prev => prev.filter(edu => edu.id !== id));
  };

  // Project CRUD
  const addProject = async (data: Omit<Project, 'id'>) => {
    const newProj = await portfolioApi.createProject({ ...data, language });
    setProjects(prev => [...prev, newProj]);
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    const updated = await portfolioApi.updateProject(id, data);
    setProjects(prev => prev.map(proj => proj.id === id ? updated : proj));
  };

  const deleteProject = async (id: string) => {
    await portfolioApi.deleteProject(id);
    setProjects(prev => prev.filter(proj => proj.id !== id));
  };

  const resetData = () => {
    if(confirm(`Are you sure? This will reload data from server.`)) {
      loadData(language);
    }
  };

  const t = (key: keyof typeof UI_TRANSLATIONS['en']): string => {
    return UI_TRANSLATIONS[language][key] || UI_TRANSLATIONS['en'][key] || key;
  };

  return (
    <DataContext.Provider value={{
      language, setLanguage,
      profile, experiences, education, projects, skills, socials,
      updateProfile, 
      addExperience, updateExperience, deleteExperience,
      addEducation, updateEducation, deleteEducation,
      addProject, updateProject, deleteProject,
      resetData, t, translations: UI_TRANSLATIONS[language],
      loading
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
