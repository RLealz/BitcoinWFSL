"use client";

import React from 'react';
import { Moon, Sun, ZoomIn, Contrast } from 'lucide-react';
import { Button } from './button';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from './dropdown-menu';
import { useTheme } from '../theme-provider';

export function AccessibilityControls() {
  const { theme, contrast, fontSize, setTheme, setContrast, setFontSize } = useTheme();

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Toggle high contrast mode
  const toggleContrast = () => {
    setContrast(contrast === 'normal' ? 'high' : 'normal');
  };

  // Change font size
  const changeFontSize = (size: 'normal' | 'large' | 'larger') => {
    setFontSize(size);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        className="text-white/70 hover:text-[#FFD700]"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>

      {/* Contrast Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleContrast}
        aria-label={contrast === 'normal' ? 'Ativar alto contraste' : 'Desativar alto contraste'}
        className="text-white/70 hover:text-[#FFD700]"
      >
        <Contrast className="h-5 w-5" />
      </Button>

      {/* Font Size Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Alterar tamanho da fonte"
            className="text-white/70 hover:text-[#FFD700]"
          >
            <ZoomIn className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => changeFontSize('normal')}>
            Tamanho normal
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeFontSize('large')}>
            Tamanho grande
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeFontSize('larger')}>
            Tamanho maior
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}