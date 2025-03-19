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
  const [theme, setTheme] = useState<Theme>("light");
  const [contrast, setContrast] = useState<Contrast>("normal");
  const [fontSize, setFontSize] = useState<FontSize>("normal");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.classList.remove("contrast-normal", "contrast-high");
    root.classList.add(`contrast-${contrast}`);
    root.classList.remove("text-normal", "text-large", "text-larger");
    root.classList.add(`text-${fontSize}`);
  }, [theme, contrast, fontSize]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      contrast, 
      fontSize, 
      setTheme, 
      setContrast, 
      setFontSize 
    }}>
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
