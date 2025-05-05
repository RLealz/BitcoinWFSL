"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Simple dropdown menu component for the migration
// This is a simplified version of the radix-ui dropdown menu

interface DropdownMenuProps {
  children: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  return <div className="relative inline-block text-left">{children}</div>;
};

interface DropdownMenuTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ 
  children, 
  asChild = false 
}) => {
  const [open, setOpen] = React.useState(false);

  // This component is used to control the visibility of the menu content
  React.useEffect(() => {
    if (open) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const dropdown = document.querySelector("[data-dropdown-content]");
        
        if (dropdown && !dropdown.contains(target)) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [open]);

  // Pass the open state to the child element using React.cloneElement
  const childElement = React.Children.only(children);
  const trigger = React.cloneElement(childElement as React.ReactElement, {
    onClick: () => setOpen(!open),
    "aria-expanded": open,
    "aria-haspopup": true
  });

  // Store the open state so the content can access it
  React.useEffect(() => {
    const dropdownContent = document.querySelector("[data-dropdown-content]");
    if (dropdownContent) {
      if (open) {
        dropdownContent.classList.remove("hidden");
      } else {
        dropdownContent.classList.add("hidden");
      }
    }
  }, [open]);

  return trigger;
};

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  children: React.ReactNode;
}

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ 
  children, 
  align = "center",
  className,
  ...props 
}) => {
  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0"
  };

  return (
    <div 
      data-dropdown-content 
      className={cn(
        "absolute z-50 mt-2 min-w-[8rem] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800",
        alignClasses[align],
        className,
        "hidden" // Initially hidden
      )}
      {...props}
    >
      <div className="py-1">{children}</div>
    </div>
  );
};

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <button
      className={cn(
        "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};