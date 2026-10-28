import React from 'react';
import { siteConfig } from '../data/projects';
import { ArrowUpRight, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <span className="text-base font-bold text-neutral-100 tracking-tight">
              {siteConfig.builderName}
            </span>
            <p className="text-xs text-neutral-400 mt-0.5">
              {siteConfig.roleTitle}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-xs text-neutral-400 font-medium">
            <button
              onClick={() => onNavigateSection('hero')}
              className="hover:text-neutral-100 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigateSection('projects')}
              className="hover:text-neutral-100 transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => onNavigateSection('architecture')}
              className="hover:text-neutral-100 transition-colors cursor-pointer"
            >
              Architecture & Flows
            </button>
            <button
              onClick={() => onNavigateSection('services')}
              className="hover:text-neutral-100 transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => onNavigateSection('methodology')}
              className="hover:text-neutral-100 transition-colors cursor-pointer"
            >
              Methodology
            </button>
            <button
              onClick={() => onNavigateSection('contact')}
              className="hover:text-neutral-100 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-neutral-500 text-xs font-mono">
          <div>
            © {currentYear} {siteConfig.builderName}. Built for automated reliability.
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-neutral-300 transition-colors"
            >
              Email
            </a>
            <a
              href={siteConfig.calLink}
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-300 transition-colors inline-flex items-center gap-0.5"
            >
              <span>Cal.com</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-300 transition-colors inline-flex items-center gap-0.5"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <button
              onClick={scrollToTop}
              className="hover:text-neutral-300 transition-colors inline-flex items-center gap-1 cursor-pointer ml-3 text-neutral-400"
              aria-label="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
