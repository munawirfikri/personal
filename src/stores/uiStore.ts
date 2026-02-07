import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeNotification: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'dark',
      sidebarOpen: false,
      notifications: [],
      
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        return { theme: newTheme };
      }),
      
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      addNotification: (message, type = 'info') => set((state) => ({
        notifications: [...state.notifications, { id: Date.now().toString(), message, type }]
      })),
      
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
    }),
    { name: 'ui-storage' }
  )
);
