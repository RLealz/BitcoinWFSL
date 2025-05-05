"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";

interface NavigationMenuProps {
  className?: string;
  children: React.ReactNode;
}

export function NavigationMenu({ className, children }: NavigationMenuProps) {
  return (
    <nav className={cn("flex items-center space-x-4", className)}>
      {children}
    </nav>
  );
}

interface NavigationMenuItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  href: string;
  children: React.ReactNode;
  isScrollLink?: boolean;
  className?: string;
}

export function NavigationMenuItem({
  active,
  children,
  href,
  isScrollLink = false,
  className,
  ...props
}: NavigationMenuItemProps) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isScrollLink) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  };

  return isScrollLink ? (
    <a
      href={href}
      onClick={handleScroll}
      className={cn(
        "text-white hover:text-[#FFD700] transition-colors",
        active && "text-[#FFD700]",
        className
      )}
      {...props}
    >
      {children}
    </a>
  ) : (
    <Link
      href={href}
      className={cn(
        "text-white hover:text-[#FFD700] transition-colors",
        active && "text-[#FFD700]",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}