"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from "lucide-react";
import Image from 'next/image';
import { Button } from "../ui/button";
import { AccessibilityControls } from "../ui/accessibility-controls";
import { NavigationMenu, NavigationMenuItem } from "../ui/navigation-menu";

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = React.useState<null | { id: number }>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Check if we're on the home page to determine whether to use scroll links
  const isHomePage = pathname === '/';

  return (
    <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Bitcoin WFSL" width={32} height={32} priority className="opacity-80" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuItem 
                href="#servicos" 
                isScrollLink={isHomePage}
                className="px-4"
              >
                Serviços
              </NavigationMenuItem>
              <NavigationMenuItem 
                href="#planos" 
                isScrollLink={isHomePage}
                className="px-4"
              >
                Planos
              </NavigationMenuItem>
              <NavigationMenuItem 
                href="#equipa" 
                isScrollLink={isHomePage}
                className="px-4"
              >
                Equipa
              </NavigationMenuItem>
              <NavigationMenuItem 
                href="#contact" 
                isScrollLink={isHomePage}
                className="px-4"
              >
                Contato
              </NavigationMenuItem>
            </NavigationMenu>
          </div>

          {/* Accessibility Controls and Auth Button */}
          <div className="flex items-center space-x-4">
            <AccessibilityControls />

          {/* Mobile Menu Toggle */}
            <button 
              className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-white hover:text-[#FFD700] focus:outline-none"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} py-4`}>
          <div className="flex flex-col space-y-4 px-2">
            <NavigationMenuItem 
              href="#servicos" 
              isScrollLink={isHomePage}
              className="block py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Serviços
            </NavigationMenuItem>
            <NavigationMenuItem 
              href="#planos" 
              isScrollLink={isHomePage}
              className="block py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Planos
            </NavigationMenuItem>
            <NavigationMenuItem 
              href="#equipa" 
              isScrollLink={isHomePage}
              className="block py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Equipa
            </NavigationMenuItem>
            <NavigationMenuItem 
              href="#contact" 
              isScrollLink={isHomePage}
              className="block py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </NavigationMenuItem>
          </div>
        </div>
      </nav>
    </header>
  );
}