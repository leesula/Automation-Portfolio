import React, { useState } from 'react';
import { siteConfig } from '../data/projects';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element Brand Wordmark */}
          <button
            onClick={() => handleNavClick('hero')}
            className="text-base font-semibold text-neutral-100 tracking-tight hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            {siteConfig.builderName}
          </button>

          {/* Zone 2: 4-5 single-line clean text links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
            <button
              onClick={() => handleNavClick('projects')}
              className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => handleNavClick('architecture')}
              className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Architecture & Flows
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('methodology')}
              className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              How I Work
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            >
              <span>Discuss a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-neutral-100 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-neutral-300">
            <button
              onClick={() => handleNavClick('projects')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => handleNavClick('architecture')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer"
            >
              Architecture & Flows
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('methodology')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer"
            >
              How I Work
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
            >
              <span>Discuss a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
