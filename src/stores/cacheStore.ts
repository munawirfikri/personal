import { create } from 'zustand';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface CacheState {
  cache: Record<string, CacheEntry<any>>;
  set: <T>(key: string, data: T, ttl?: number) => void;
  get: <T>(key: string, ttl?: number) => T | null;
  clear: (key?: string) => void;
}

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export const useCacheStore = create<CacheState>((set, get) => ({
  cache: {},
  
  set: (key, data, ttl = DEFAULT_TTL) => {
    set((state) => ({
      cache: {
        ...state.cache,
        [key]: { data, timestamp: Date.now() + ttl }
      }
    }));
  },
  
  get: (key, ttl = DEFAULT_TTL) => {
    const entry = get().cache[key];
    if (!entry) return null;
    
    if (Date.now() > entry.timestamp) {
      get().clear(key);
      return null;
    }
    
    return entry.data;
  },
  
  clear: (key) => {
    if (key) {
      set((state) => {
        const { [key]: _, ...rest } = state.cache;
        return { cache: rest };
      });
    } else {
      set({ cache: {} });
    }
  },
}));
