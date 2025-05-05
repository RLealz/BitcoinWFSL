"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from "../ui/button";
import { Bitcoin } from "lucide-react";
import { AccessibilityControls } from "../ui/accessibility-controls";

export default function Header() {
  const [user, setUser] = React.useState<null | { id: number }>(null);

  // Function to handle smooth scrolling to sections
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Bitcoin className="h-8 w-8 text-[#FFD700]" />
            <span className="text-xl font-bold text-[#FFD700]">BITCOIN WFSL</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleScroll("servicos")}
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => handleScroll("planos")}
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Planos
            </button>
            <button
              onClick={() => handleScroll("equipa")}
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Equipa
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Contato
            </button>
          </div>

          {/* Accessibility Controls and Auth Button */}
          <div className="flex items-center space-x-4">
            <AccessibilityControls />
            {user ? (
              <Link href="/admin">
                <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth">
                <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                  Admin
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}