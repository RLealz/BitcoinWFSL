"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = "light" | "dark";
type Contrast = "normal" | "high";
type FontSize = "normal" | "large" | "larger";

interface ThemeContextType {
  theme: Theme;
  contrast: Contrast;
  fontSize: FontSize;
  setTheme: (theme: Theme) => void;
  setContrast: (contrast: Contrast) => void;
  setFontSize: (size: FontSize) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with defaults or saved preferences
  const [theme, setThemeState] = useState<Theme>("dark");
  const [contrast, setContrastState] = useState<Contrast>("normal");
  const [fontSize, setFontSizeState] = useState<FontSize>("normal");

  // Set theme
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  };

  // Set contrast
  const setContrast = (newContrast: Contrast) => {
    setContrastState(newContrast);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('high-contrast', newContrast === 'high');
      localStorage.setItem('contrast', newContrast);
    }
  };

  // Set font size
  const setFontSize = (newSize: FontSize) => {
    setFontSizeState(newSize);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('text-normal', 'text-large', 'text-larger');
      document.documentElement.classList.add(`text-${newSize}`);
      localStorage.setItem('fontSize', newSize);
    }
  };

  // Effect to load saved preferences from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load theme
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      }

      // Load contrast
      const savedContrast = localStorage.getItem('contrast') as Contrast;
      if (savedContrast) {
        setContrast(savedContrast);
      }

      // Load font size
      const savedFontSize = localStorage.getItem('fontSize') as FontSize;
      if (savedFontSize) {
        setFontSize(savedFontSize);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, contrast, fontSize, setTheme, setContrast, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}