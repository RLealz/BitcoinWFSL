"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  href: string;
  label: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            href="/" 
            className="text-white/60 hover:text-[#FFD700] transition-colors flex items-center"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-white/40 mx-1" />
            {item.isCurrent ? (
              <span 
                aria-current="page"
                className="text-[#FFD700]"
              >
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="text-white/60 hover:text-[#FFD700] transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}