import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  Video
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
  const [flippedProjects, setFlippedProjects] = useState<Record<string, boolean>>({});

  const toggleFlip = (projectId: string) => {
    setFlippedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  // Prioritize the 3 core projects specified by user brief
  const featuredIds = [
    'real-estate-qualification-whatsapp-v2',
    'sales-pipeline-automation',
    'voice-agent-buyer-qualification-vapi'
  ];

  // Pick the 3 featured projects, falling back if not found
  const featuredProjects = featuredIds
    .map(id => projects.find(p => p.id === id))
    .filter((p): p is Project => Boolean(p));

  const projectsToDisplay = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-24 bg-neutral-900/60 border-b border-neutral-800/80 text-neutral-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800/80">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              <span>Section 04</span>
              <span className="text-neutral-700">·</span>
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
              My Projects
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Real-world systems engineered to eliminate repetitive manual tasks, engage leads within seconds, and connect your business tools seamlessly. Hover over any card to view video proof and system execution.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onViewAllProjects}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-200 bg-neutral-950 hover:bg-neutral-900 hover:text-white hover:-translate-y-0.5 border border-neutral-800 rounded-lg transition-all duration-200 cursor-pointer shadow-sm group"
            >
              <span>View All Projects ({projects.length})</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 2x2 Featured Projects 3D Flip Card Grid with Expanded Height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projectsToDisplay.map((project, idx) => {
            const isFlipped = Boolean(flippedProjects[project.id]);

            return (
              <div
                key={project.id}
                className="group perspective-1000 min-h-[620px] sm:min-h-[640px] lg:min-h-[660px] h-full"
              >
                {/* 3D Flip Inner Container (Hover on desktop, Click on touch/desktop) */}
                <div
                  className={`w-full h-full relative transform-style-3d transition-transform duration-500 ease-in-out cursor-pointer group-hover-flip group-hover:[transform:rotateY(180deg)] ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  onClick={() => toggleFlip(project.id)}
                  title="Hover or click to flip card for video proof"
                >
                  
                  {/* FRONT FACE */}
                  <div className="w-full h-full backface-hidden absolute inset-0 rounded-2xl border border-neutral-800/90 bg-neutral-950 hover:border-neutral-700 hover:shadow-2xl transition-all duration-300 ease-out p-6 sm:p-7 flex flex-col justify-between shadow-lg group">
                    <div className="space-y-3.5">
                      
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
                        <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-850 space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-semibold block">
                            Problem Solved:
                          </span>
                          <p className="text-neutral-300 leading-relaxed line-clamp-2">
                            {project.problem}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-850 space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                            What It Does:
                          </span>
                          <p className="text-neutral-300 leading-relaxed line-clamp-2">
                            {project.solution}
                          </p>
                        </div>

                        {/* Dedicated Business Impact Highlight Callout */}
                        {(project.cardBenefit || project.businessImpact?.cardBenefit) && (
                          <div className="p-3 rounded-xl bg-indigo-950/35 border border-indigo-800/50 space-y-1">
                            <div className="flex items-center gap-1.5 text-indigo-300 font-semibold text-[10px] uppercase font-mono tracking-wider">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                              <span>Business Impact:</span>
                            </div>
                            <p className="text-neutral-200 leading-relaxed text-xs">
                              {project.cardBenefit || project.businessImpact?.cardBenefit}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Connected Tools — Sized generously so all tools fit */}
                      <div className="pt-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">
                          Connected Tools:
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                          {project.techStack.map((tech) => (
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

                    {/* Card Action Buttons Row — Clean, no explicit flip buttons */}
                    <div className="pt-4 mt-2 border-t border-neutral-850 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-[11px] font-mono text-neutral-500 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80"></span>
                        <span>{project.workflowCount || 4} Automated Workflows</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.liveDemoUrl && (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/80 rounded-lg transition-colors cursor-pointer shadow-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>Live CRM</span>
                            <ExternalLink className="w-3 h-3 text-emerald-400" />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProject(project);
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shadow-sm hover:shadow-indigo-500/20"
                        >
                          <span>Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* BACK FACE (Rotated 180 degrees) — Shows Video Proof / Live Proof */}
                  <div className="w-full h-full backface-hidden rotate-y-180 absolute inset-0 rounded-2xl border-2 border-indigo-500/40 bg-neutral-950 p-6 sm:p-7 flex flex-col justify-between shadow-2xl">
                    <div className="space-y-3.5 flex-1 flex flex-col">
                      
                      {/* Back Header */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-neutral-800">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                            {project.videoUrl ? (
                              <>
                                <Video className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Video Proof of Execution</span>
                              </>
                            ) : (
                              <span>Live Production System Proof</span>
                            )}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                          Verified System
                        </span>
                      </div>

                      {/* Project Title */}
                      <h4 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                        {project.title}
                      </h4>

                      {/* Video Player or Live CRM Preview */}
                      {project.videoUrl ? (
                        <div className="space-y-3 flex-1 flex flex-col justify-center">
                          <div 
                            className="relative rounded-xl overflow-hidden border border-neutral-800 bg-black aspect-video shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <video
                              src={project.videoUrl}
                              controls
                              preload="metadata"
                              playsInline
                              className="w-full h-full object-contain bg-black"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>

                          {project.videoCaption && (
                            <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-850">
                              <span className="font-semibold text-neutral-200">Demonstration: </span>
                              {project.videoCaption}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3 flex-1 flex flex-col justify-center">
                          <div className="p-4 rounded-xl bg-neutral-900/90 border border-emerald-900/40 space-y-3 shadow-inner">
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                                  Interactive Production Deployment
                                </span>
                                <h5 className="text-sm font-bold text-white">
                                  Sales Pipeline CRM Dashboard
                                </h5>
                              </div>
                              {project.liveDemoUrl && (
                                <a
                                  href={project.liveDemoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/80 rounded-lg transition-colors shadow-sm"
                                >
                                  <span>Launch CRM</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>

                            <p className="text-xs text-neutral-300 leading-relaxed">
                              Live production CRM deployed on Vercel and connected directly to the automated Supabase pipeline. Inspect inbound leads, 100-point scoring tiers, email sequences, and meeting sync in real time.
                            </p>

                            {/* Visual Live Metrics Proof */}
                            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                                <span className="text-neutral-500 block text-[10px]">Lead Ingestion</span>
                                <span className="text-emerald-400 font-semibold">&lt; 60s Scoring Tier</span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                                <span className="text-neutral-500 block text-[10px]">Meeting Sync</span>
                                <span className="text-indigo-400 font-semibold">Cal.com Bi-directional</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Back Action Bar — No explicit "Flip Back to Summary", just clean Case Study CTA */}
                    <div className="pt-3 border-t border-neutral-850 flex items-center justify-between">
                      <div className="text-[11px] font-mono text-neutral-400">
                        Production Test Proof
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shadow-sm hover:shadow-indigo-500/20"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

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
