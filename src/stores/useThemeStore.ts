import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'sun' | 'nebula' | 'pop';

interface ThemeState {
  theme: Theme;
  grain: boolean;
  sparkles: boolean;
  setTheme: (t: Theme) => void;
  setGrain: (v: boolean) => void;
  setSparkles: (v: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'pop',
      grain: true,
      sparkles: true,
      setTheme: (theme) => set({ theme }),
      setGrain: (grain) => set({ grain }),
      setSparkles: (sparkles) => set({ sparkles }),
    }),
    { name: 'x7-theme-v1' }
  )
);
