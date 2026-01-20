
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PROFILE_EN, EXPERIENCES_EN, EDUCATION_EN, PROJECTS_EN,
  PROFILE_ID, EXPERIENCES_ID, EDUCATION_ID, PROJECTS_ID,
  PROFILE_MS, EXPERIENCES_MS, EDUCATION_MS, PROJECTS_MS,
  SKILLS, SOCIALS, UI_TRANSLATIONS 
} from '../constants';
import { Experience, Education as EducationType, Project, Skill, SocialLink, Language } from '../types';

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
  updateExperiences: (data: Experience[]) => void;
  updateEducation: (data: EducationType[]) => void;
  updateProjects: (data: Project[]) => void;
  resetData: () => void;
  t: (key: keyof typeof UI_TRANSLATIONS['en']) => string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initialize Language
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('app_language') as Language) || 'en';
  });

  // Helpers to get initial data based on language
  const getInitialProfile = (lang: Language) => {
    if (lang === 'id') return PROFILE_ID;
    if (lang === 'ms') return PROFILE_MS;
    return PROFILE_EN;
  }
  const getInitialExperiences = (lang: Language) => {
    if (lang === 'id') return EXPERIENCES_ID;
    if (lang === 'ms') return EXPERIENCES_MS;
    return EXPERIENCES_EN;
  }
  const getInitialEducation = (lang: Language) => {
    if (lang === 'id') return EDUCATION_ID;
    if (lang === 'ms') return EDUCATION_MS;
    return EDUCATION_EN;
  }
  const getInitialProjects = (lang: Language) => {
    if (lang === 'id') return PROJECTS_ID;
    if (lang === 'ms') return PROJECTS_MS;
    return PROJECTS_EN;
  }

  // 2. State definition with keyed persistence
  // We use key prefix like "en_profile", "id_profile" so CMS edits are per-language.
  
  const [profile, setProfile] = useState<typeof PROFILE_EN>(getInitialProfile(language));
  const [experiences, setExperiences] = useState<Experience[]>(getInitialExperiences(language));
  const [education, setEducation] = useState<EducationType[]>(getInitialEducation(language));
  const [projects, setProjects] = useState<Project[]>(getInitialProjects(language));

  // 3. Load data from local storage whenever language changes
  useEffect(() => {
    const loadDataForLang = (lang: Language) => {
      try {
        const savedProfile = localStorage.getItem(`${lang}_profile`);
        setProfile(savedProfile ? JSON.parse(savedProfile) : getInitialProfile(lang));

        const savedExp = localStorage.getItem(`${lang}_experiences`);
        setExperiences(savedExp ? JSON.parse(savedExp) : getInitialExperiences(lang));

        const savedEdu = localStorage.getItem(`${lang}_education`);
        setEducation(savedEdu ? JSON.parse(savedEdu) : getInitialEducation(lang));

        const savedProj = localStorage.getItem(`${lang}_projects`);
        setProjects(savedProj ? JSON.parse(savedProj) : getInitialProjects(lang));
      } catch (e) {
        console.error("Error loading language data", e);
      }
    };

    loadDataForLang(language);
    localStorage.setItem('app_language', language);
  }, [language]);

  // 4. Persistence Effects (Save to [lang]_key when state changes)
  useEffect(() => localStorage.setItem(`${language}_profile`, JSON.stringify(profile)), [profile, language]);
  useEffect(() => localStorage.setItem(`${language}_experiences`, JSON.stringify(experiences)), [experiences, language]);
  useEffect(() => localStorage.setItem(`${language}_education`, JSON.stringify(education)), [education, language]);
  useEffect(() => localStorage.setItem(`${language}_projects`, JSON.stringify(projects)), [projects, language]);

  const [skills] = useState<Skill[]>(SKILLS);
  const [socials] = useState<SocialLink[]>(SOCIALS);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const updateProfile = (data: typeof PROFILE_EN) => setProfile(data);
  const updateExperiences = (data: Experience[]) => setExperiences(data);
  const updateEducation = (data: EducationType[]) => setEducation(data);
  const updateProjects = (data: Project[]) => setProjects(data);

  const resetData = () => {
    if(confirm(`Are you sure? This will reset the ${language.toUpperCase()} content to defaults.`)) {
      setProfile(getInitialProfile(language));
      setExperiences(getInitialExperiences(language));
      setEducation(getInitialEducation(language));
      setProjects(getInitialProjects(language));
      
      // Clear specific keys
      localStorage.removeItem(`${language}_profile`);
      localStorage.removeItem(`${language}_experiences`);
      localStorage.removeItem(`${language}_education`);
      localStorage.removeItem(`${language}_projects`);
      
      window.location.reload();
    }
  };

  const t = (key: keyof typeof UI_TRANSLATIONS['en']): string => {
    return UI_TRANSLATIONS[language][key] || UI_TRANSLATIONS['en'][key] || key;
  };

  return (
    <DataContext.Provider value={{
      language, setLanguage,
      profile, experiences, education, projects, skills, socials,
      updateProfile, updateExperiences, updateEducation, updateProjects, resetData,
      t, translations: UI_TRANSLATIONS[language]
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
