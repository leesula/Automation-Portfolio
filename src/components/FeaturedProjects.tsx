import React from 'react';
import { Project } from '../types/portfolio';
import { 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  Workflow,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  Layers
} from 'lucide-react';

interface FeaturedProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenFlowViewer?: (project: Project) => void;
  onViewAllProjects: () => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  onSelectProject,
  onOpenFlowViewer,
  onViewAllProjects,
}) => {
  // Display only 4 top featured projects to keep the main landing page concise and scannable
  const featuredIds = [
    'voice-agent-buyer-qualification-vapi',
    'real-estate-qualification-whatsapp-v2',
    'sales-pipeline-automation',
    'personal-assistant-schedule-agent'
  ];

  // Pick the 4 featured projects, falling back to first 4 if IDs match
  const featuredProjects = featuredIds
    .map(id => projects.find(p => p.id === id))
    .filter((p): p is Project => Boolean(p));

  const projectsToDisplay = featuredProjects.length >= 3 ? featuredProjects : projects.slice(0, 4);

  return (
    <section id="projects" className="py-20 bg-neutral-950 border-b border-neutral-900 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-900">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                Featured Workflows
              </span>
              <span className="text-neutral-700">·</span>
              <span className="text-xs font-mono text-emerald-400">
                Client-First Solutions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
              Practical Business Automations
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Real-world systems engineered to eliminate repetitive manual tasks, engage leads within seconds, and connect your business tools seamlessly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onViewAllProjects}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-850 hover:text-white border border-neutral-800 rounded-lg transition-all cursor-pointer shadow-sm group"
            >
              <span>View All Projects ({projects.length})</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Concise 2x2 Featured Projects Grid (Significantly shorter than previous vertical stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projectsToDisplay.map((project, idx) => {
            const workflowSteps = project.clientWorkflowSteps || [];

            return (
              <div
                key={project.id}
                className="rounded-2xl border border-neutral-850 bg-neutral-900/40 hover:border-neutral-750 transition-all p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-lg group relative overflow-hidden"
              >
                <div className="space-y-4">
                  
                  {/* Category, Status & Index Header */}
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400 font-semibold">0{idx + 1}</span>
                      <span className="text-neutral-700">/</span>
                      <span className="text-neutral-400">{project.category}</span>
                    </div>

                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 font-mono">
                      {project.implementationStatus}
                    </span>
                  </div>

                  {/* Practical Project Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 group-hover:text-white transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Client-friendly Problem & Solution Summary */}
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-neutral-950/90 border border-neutral-850 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-semibold block">
                        Problem Solved:
                      </span>
                      <p className="text-neutral-300 leading-relaxed line-clamp-2">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-950/90 border border-neutral-850 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                        What It Does:
                      </span>
                      <p className="text-neutral-300 leading-relaxed line-clamp-2">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Workflow Preview Strip */}
                  {workflowSteps.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">
                        Workflow Preview:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                        {workflowSteps.slice(0, 4).map((step, sIdx) => (
                          <div 
                            key={step.step}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-300"
                          >
                            <span className="text-indigo-400 font-semibold">{sIdx + 1}.</span>
                            <span className="truncate max-w-[120px]">{step.title}</span>
                          </div>
                        ))}
                        {workflowSteps.length > 4 && (
                          <span className="text-neutral-500 text-[10px] px-1 font-mono">
                            +{workflowSteps.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Connected Tools */}
                  <div className="pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">
                      Connected Tools:
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span 
                          key={tech.name}
                          className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card Action Buttons Row */}
                <div className="pt-4 border-t border-neutral-850 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shadow-sm hover:shadow-indigo-500/20"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/80 rounded-lg transition-colors cursor-pointer shadow-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Live CRM</span>
                        <ExternalLink className="w-3 h-3 text-emerald-400" />
                      </a>
                    )}
                  </div>

                  {project.videoUrl ? (
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Video Recording Available</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      <span>{project.keyOutputs?.length || 4} Key Deliverables</span>
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* View All Projects Banner / CTA */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h3 className="text-base sm:text-lg font-bold text-neutral-100">
                Explore the Full Automation Library
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl">
              Looking for other solutions? Discover all {projects.length} verified architectures, including Healthcare & WhatsApp Nutrition, and custom Google Sheets scheduling bots.
            </p>
          </div>

          <button
            onClick={onViewAllProjects}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-600/20 whitespace-nowrap self-start sm:self-auto"
          >
            <span>View All {projects.length} Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
