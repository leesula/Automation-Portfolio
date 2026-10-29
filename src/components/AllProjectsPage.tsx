import React, { useState, useEffect } from 'react';
import { Project } from '../types/portfolio';
import { 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Filter, 
  PhoneCall, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

interface AllProjectsPageProps {
  projects: Project[];
  onSelectProject: (slug: string) => void;
  onBackToHome: () => void;
  onOpenContact: (projectTitle?: string) => void;
  onOpenFlowViewer?: (project: Project) => void;
}

export const AllProjectsPage: React.FC<AllProjectsPageProps> = ({
  projects,
  onSelectProject,
  onBackToHome,
  onOpenContact,
  onOpenFlowViewer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    document.title = "All Projects | Sudha Leela Portfolio";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      document.title = "Sudha Leela | AI Automation Builder & Workflow Architect";
    };
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      project.title.toLowerCase().includes(q) ||
      project.shortTitle.toLowerCase().includes(q) ||
      project.problem.toLowerCase().includes(q) ||
      project.solution.toLowerCase().includes(q) ||
      project.techStack.some(t => t.name.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-24">
      {/* Top Header & Navigation Bar */}
      <div className="sticky top-16 z-30 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-400 hover:text-indigo-400 transition-colors cursor-pointer font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <span className="text-xs font-mono text-neutral-400">
            Showing {filteredProjects.length} of {projects.length} Verified Systems
          </span>

          <button
            onClick={() => onOpenContact()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <span>Discuss a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        {/* Title Header */}
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 block">
            Complete Systems Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-50 tracking-tight">
            All AI Automation & Workflow Projects
          </h1>
          <p className="text-base text-neutral-300 max-w-3xl leading-relaxed">
            Browse verified production automations covering voice agents, WhatsApp business bots, multi-workflow CRM sync, lead qualification engines, and executive assistants.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-850">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-800 text-neutral-100 shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tool, CRM, or keyword..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-neutral-900/40 border border-neutral-850 space-y-3">
            <p className="text-sm text-neutral-300">No projects found matching your search.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs text-indigo-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-neutral-850 bg-neutral-900/50 hover:border-neutral-750 transition-all p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-lg group"
              >
                <div className="space-y-4">
                  {/* Category & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-indigo-400 font-medium">{project.category}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/80 text-emerald-400">
                      {project.implementationStatus}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-neutral-100 group-hover:text-white transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Problem & Solution Mini Blocks */}
                  <div className="space-y-2.5 pt-1 text-xs">
                    <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/80 space-y-1">
                      <span className="font-semibold text-red-400 text-[10px] uppercase font-mono tracking-wider block">
                        Problem Solved:
                      </span>
                      <p className="text-neutral-300 line-clamp-2 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/80 space-y-1">
                      <span className="font-semibold text-emerald-400 text-[10px] uppercase font-mono tracking-wider block">
                        What It Does:
                      </span>
                      <p className="text-neutral-300 line-clamp-2 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div className="pt-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span 
                          key={tech.name}
                          className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400"
                        >
                          {tech.name}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-neutral-500 text-[10px]">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-4 border-t border-neutral-850 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProject(project.slug)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shadow-sm"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/80 rounded-lg transition-colors cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Live CRM</span>
                        <ExternalLink className="w-3 h-3 text-emerald-400" />
                      </a>
                    )}
                  </div>

                  {project.videoUrl ? (
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Video Recording</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-neutral-500">
                      {project.workflowCount} {project.workflowCount === 1 ? 'Workflow' : 'Workflows'}
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Bottom Contact Section */}
        <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center space-y-4 mt-12">
          <h2 className="text-2xl font-bold text-neutral-100">
            Have a Workflow or CRM Problem to Automate?
          </h2>
          <p className="text-sm text-neutral-300 max-w-lg mx-auto">
            Let's discuss how custom AI agents, webhook pipelines, and automated integrations can save hours of repetitive work for your team.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenContact()}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              <span>Discuss Your Automation Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
