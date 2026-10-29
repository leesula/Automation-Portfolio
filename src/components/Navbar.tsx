import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/projects';
import { Project } from '../types/portfolio';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  ChevronDown, 
  Bot, 
  Workflow, 
  PhoneCall, 
  MessageSquare, 
  Sparkles,
  ArrowRight,
  Database
} from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigateProjects: () => void;
  onSelectProject: (slug: string) => void;
  onNavigateHome: () => void;
  projects: Project[];
  currentRoute?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenContact, 
  onNavigateSection,
  onNavigateProjects,
  onSelectProject,
  onNavigateHome,
  projects,
  currentRoute = 'home'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [mobileProjectsExpanded, setMobileProjectsExpanded] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProjectsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleNavSection = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
    setProjectsDropdownOpen(false);
  };

  const handleProjectClick = (slug: string) => {
    onSelectProject(slug);
    setProjectsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleViewAllProjects = () => {
    onNavigateProjects();
    setProjectsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // Group projects into clear, client-friendly categories
  const aiAgentProjects = projects.filter(p => 
    p.category.includes('Voice') || p.category.includes('WhatsApp') || p.category.includes('Healthcare')
  );

  const workflowCrmProjects = projects.filter(p => 
    !aiAgentProjects.some(a => a.id === p.id)
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Brand Wordmark */}
          <button
            onClick={() => {
              onNavigateHome();
              setMobileMenuOpen(false);
            }}
            className="text-base font-semibold text-neutral-100 tracking-tight hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer flex items-center gap-2"
          >
            <span>{siteConfig.builderName}</span>
            <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/80 hidden sm:inline">
              AI Automations
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
            
            {/* Projects Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProjectsDropdownOpen(!projectsDropdownOpen)}
                className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer py-2 ${
                  projectsDropdownOpen || currentRoute === 'projects' || currentRoute.startsWith('project/')
                    ? 'text-neutral-100 font-semibold'
                    : 'text-neutral-400 hover:text-neutral-100'
                }`}
                aria-expanded={projectsDropdownOpen}
                aria-haspopup="true"
              >
                <span>Projects</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  projectsDropdownOpen ? 'rotate-180 text-indigo-400' : 'text-neutral-500'
                }`} />
              </button>

              {/* Desktop Dropdown Container */}
              {projectsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-[480px] rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="space-y-4">
                    
                    {/* Category 1: AI Agents */}
                    <div>
                      <div className="flex items-center gap-1.5 px-2 pb-1.5 text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold border-b border-neutral-900">
                        <Bot className="w-3.5 h-3.5" />
                        <span>AI Voice & Conversational Agents</span>
                      </div>
                      <div className="mt-1 space-y-1">
                        {aiAgentProjects.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => handleProjectClick(p.slug)}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-900/80 transition-colors flex items-start gap-3 group cursor-pointer"
                          >
                            <div className="w-7 h-7 rounded-lg bg-indigo-950/60 border border-indigo-900/60 flex items-center justify-center shrink-0 mt-0.5 text-indigo-400">
                              {p.category.includes('Voice') ? (
                                <PhoneCall className="w-3.5 h-3.5" />
                              ) : (
                                <MessageSquare className="w-3.5 h-3.5" />
                              )}
                            </div>
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-semibold text-neutral-200 group-hover:text-indigo-300 transition-colors truncate">
                                  {p.shortTitle}
                                </span>
                                {p.videoUrl && (
                                  <span className="text-[10px] font-mono text-emerald-400 shrink-0">
                                    Demo Video
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-neutral-400 line-clamp-1">
                                {p.tagline}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Category 2: Workflow & CRM Automation */}
                    <div>
                      <div className="flex items-center gap-1.5 px-2 pb-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold border-b border-neutral-900">
                        <Workflow className="w-3.5 h-3.5" />
                        <span>Workflow, CRM & Process Automation</span>
                      </div>
                      <div className="mt-1 space-y-1">
                        {workflowCrmProjects.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => handleProjectClick(p.slug)}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-900/80 transition-colors flex items-start gap-3 group cursor-pointer"
                          >
                            <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-900/60 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                              {p.liveDemoUrl ? (
                                <Database className="w-3.5 h-3.5" />
                              ) : (
                                <Workflow className="w-3.5 h-3.5" />
                              )}
                            </div>
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-semibold text-neutral-200 group-hover:text-emerald-300 transition-colors truncate">
                                  {p.shortTitle}
                                </span>
                                {p.liveDemoUrl && (
                                  <span className="text-[10px] font-mono text-emerald-400 shrink-0">
                                    Live CRM
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-neutral-400 line-clamp-1">
                                {p.tagline}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dropdown Bottom Bar */}
                    <div className="pt-2 border-t border-neutral-900 flex items-center justify-between px-2 text-xs">
                      <span className="text-[11px] text-neutral-500 font-mono">
                        {projects.length} Verified Systems
                      </span>
                      <button
                        onClick={handleViewAllProjects}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>View All Projects</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavSection('architecture')}
              className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Architecture & Flows
            </button>
            <button
              onClick={() => handleNavSection('services')}
              className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => handleNavSection('methodology')}
              className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              How I Work
            </button>
            <button
              onClick={() => handleNavSection('about')}
              className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Primary Action Button */}
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
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div className="flex flex-col space-y-1 text-sm font-medium text-neutral-300">
            {/* Expandable Projects Accordion in Mobile */}
            <div className="border-b border-neutral-850 pb-2">
              <button
                onClick={() => setMobileProjectsExpanded(!mobileProjectsExpanded)}
                className="w-full flex items-center justify-between py-2.5 text-left text-neutral-200 hover:text-white font-semibold cursor-pointer"
              >
                <span>Projects ({projects.length})</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  mobileProjectsExpanded ? 'rotate-180 text-indigo-400' : 'text-neutral-500'
                }`} />
              </button>

              {mobileProjectsExpanded && (
                <div className="pl-2 pr-1 pt-1 pb-2 space-y-3">
                  {/* AI Agents Group */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 block px-2">
                      AI Agents
                    </span>
                    {aiAgentProjects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleProjectClick(p.slug)}
                        className="w-full text-left p-2 rounded-lg hover:bg-neutral-900 text-xs text-neutral-300 hover:text-white transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate">{p.shortTitle}</span>
                        {p.videoUrl && (
                          <span className="text-[10px] font-mono text-emerald-400 shrink-0">Demo</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Workflow & CRM Group */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block px-2">
                      Workflow & CRM Automation
                    </span>
                    {workflowCrmProjects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleProjectClick(p.slug)}
                        className="w-full text-left p-2 rounded-lg hover:bg-neutral-900 text-xs text-neutral-300 hover:text-white transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate">{p.shortTitle}</span>
                        {p.liveDemoUrl && (
                          <span className="text-[10px] font-mono text-emerald-400 shrink-0">Live CRM</span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-1 px-2">
                    <button
                      onClick={handleViewAllProjects}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore All Projects Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavSection('architecture')}
              className="text-left py-2.5 hover:text-white transition-colors cursor-pointer"
            >
              Architecture & Flows
            </button>
            <button
              onClick={() => handleNavSection('services')}
              className="text-left py-2.5 hover:text-white transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => handleNavSection('methodology')}
              className="text-left py-2.5 hover:text-white transition-colors cursor-pointer"
            >
              How I Work
            </button>
            <button
              onClick={() => handleNavSection('about')}
              className="text-left py-2.5 hover:text-white transition-colors cursor-pointer"
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
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shadow-md"
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
