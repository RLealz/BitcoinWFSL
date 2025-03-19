import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme-provider";
import { Moon, Sun, ZoomIn, ContrastIcon } from "lucide-react";

export function AccessibilityControls() {
  const { theme, contrast, fontSize, setTheme, setContrast, setFontSize } = useTheme();

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Accessibility controls">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            aria-label="Adjust appearance settings"
          >
            {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light Mode
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark Mode
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            aria-label="Adjust contrast"
          >
            <ContrastIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setContrast("normal")}>
            Normal Contrast
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setContrast("high")}>
            High Contrast
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            aria-label="Adjust font size"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setFontSize("normal")}>
            Normal Text
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFontSize("large")}>
            Large Text
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFontSize("larger")}>
            Larger Text
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
