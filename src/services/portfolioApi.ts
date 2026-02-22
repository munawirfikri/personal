import axios from 'axios';
import { Experience, Education, Project } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      if (window.location.hash === '#admin') {
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (password: string) =>
    api.post('/auth/login', { password }).then(res => res.data),
  
  logout: () =>
    api.post('/auth/logout'),
  
  verify: () =>
    api.get('/auth/verify'),
};

export const portfolioApi = {
  // Experiences
  getExperiences: (lang: string = 'en'): Promise<Experience[]> =>
    api.get(`/experiences?lang=${lang}`).then(res => res.data),
  
  createExperience: (data: Omit<Experience, 'id'>): Promise<Experience> =>
    api.post('/experiences', data).then(res => res.data),
  
  updateExperience: (id: string, data: Partial<Experience>): Promise<Experience> =>
    api.put(`/experiences/${id}`, data).then(res => res.data),
  
  deleteExperience: (id: string): Promise<void> =>
    api.delete(`/experiences/${id}`),

  // Education
  getEducation: (lang: string = 'en'): Promise<Education[]> =>
    api.get(`/education?lang=${lang}`).then(res => res.data),
  
  createEducation: (data: Omit<Education, 'id'>): Promise<Education> =>
    api.post('/education', data).then(res => res.data),
  
  updateEducation: (id: string, data: Partial<Education>): Promise<Education> =>
    api.put(`/education/${id}`, data).then(res => res.data),
  
  deleteEducation: (id: string): Promise<void> =>
    api.delete(`/education/${id}`),

  // Projects
  getProjects: (lang: string = 'en'): Promise<Project[]> =>
    api.get(`/projects?language=${lang}`).then(res => 
      res.data.map((p: any) => ({
        ...p,
        imageUrl: p.image_url,
        id: p.id.toString()
      }))
    ),
  
  createProject: (data: Omit<Project, 'id'>): Promise<Project> =>
    api.post('/projects', data).then(res => res.data),
  
  updateProject: (id: string, data: Partial<Project>): Promise<Project> =>
    api.put(`/projects/${id}`, data).then(res => res.data),
  
  deleteProject: (id: string): Promise<void> =>
    api.delete(`/projects/${id}`),
};