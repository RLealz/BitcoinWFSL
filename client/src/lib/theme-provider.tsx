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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage or defaults
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme;
    if (saved === "light" || saved === "dark") return saved;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  });

  const [contrast, setContrast] = useState<Contrast>(() => {
    const saved = localStorage.getItem("contrast") as Contrast;
    return saved === "high" ? "high" : "normal";
  });

  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const saved = localStorage.getItem("fontSize") as FontSize;
    if (saved === "large" || saved === "larger") return saved;
    return "normal";
  });

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("contrast", contrast);
    document.documentElement.classList.remove("contrast-normal", "contrast-high");
    document.documentElement.classList.add(`contrast-${contrast}`);
  }, [contrast]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
    document.documentElement.classList.remove("text-normal", "text-large", "text-larger");
    document.documentElement.classList.add(`text-${fontSize}`);
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