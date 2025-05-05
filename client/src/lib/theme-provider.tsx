import { createContext, useContext, useEffect, useState } from "react";

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

// Helper to safely access browser APIs
const isBrowser = typeof window !== "undefined";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with default values first
  const [theme, setTheme] = useState<Theme>("light");
  const [contrast, setContrast] = useState<Contrast>("normal");
  const [fontSize, setFontSize] = useState<FontSize>("normal");
  
  // Initialization effect that runs only in the browser
  useEffect(() => {
    if (isBrowser) {
      // Theme initialization
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      }
      
      // Contrast initialization
      const savedContrast = localStorage.getItem("contrast") as Contrast;
      if (savedContrast === "high") {
        setContrast("high");
      }
      
      // Font size initialization
      const savedFontSize = localStorage.getItem("fontSize") as FontSize;
      if (savedFontSize === "large" || savedFontSize === "larger") {
        setFontSize(savedFontSize);
      }
    }
  }, []);

  // Persist settings to localStorage and update class names
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("contrast", contrast);
      document.documentElement.classList.remove("contrast-normal", "contrast-high");
      document.documentElement.classList.add(`contrast-${contrast}`);
    }
  }, [contrast]);

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("fontSize", fontSize);
      document.documentElement.classList.remove("text-normal", "text-large", "text-larger");
      document.documentElement.classList.add(`text-${fontSize}`);
    }
  }, [fontSize]);

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        contrast, 
        fontSize, 
        setTheme, 
        setContrast, 
        setFontSize 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}