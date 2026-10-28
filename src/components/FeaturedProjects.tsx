import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { VoiceTranscriptViewer } from './VoiceTranscriptViewer';
import { 
  ArrowRight, 
  Layers, 
  ExternalLink,
  PhoneCall,
  CheckCircle2,
  Workflow,
  Sparkles
} from 'lucide-react';

interface FeaturedProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenFlowViewer: (project: Project) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  onSelectProject,
  onOpenFlowViewer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [mediaTabs, setMediaTabs] = useState<Record<string, 'video' | 'transcript' | 'steps' | 'outputs'>>({});

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-neutral-950 border-b border-neutral-900 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-900">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 block mb-2">
              Portfolio Projects
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
              Practical Business Automations
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
              Real-world systems engineered to eliminate repetitive manual tasks, engage leads instantly, and keep your business tools in sync.
            </p>
          </div>

          {/* Category Filter Tabs */}
          {categories.length > 1 && (
            <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-lg border border-neutral-800 self-start md:self-auto overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-neutral-800 text-neutral-100 shadow-sm font-semibold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Projects Gallery */}
        <div className="mt-12 space-y-12">
          {filteredProjects.map((project) => {
            const hasVideo = Boolean(project.videoUrl);
            const hasOutputs = Boolean(project.keyOutputs && project.keyOutputs.length > 0);
            const defaultTab = hasVideo ? 'video' : (hasOutputs ? 'outputs' : 'steps');
            const currentTab = mediaTabs[project.id] || defaultTab;
            const workflowSteps = project.clientWorkflowSteps || [];
            const keyOutputs = project.keyOutputs || [];

            return (
              <div
                key={project.id}
                className="rounded-2xl border border-neutral-850 bg-neutral-900/40 hover:border-neutral-750 transition-all overflow-hidden flex flex-col lg:flex-row shadow-lg"
              >
                {/* Left Column: Project Overview */}
                <div className="p-6 sm:p-8 lg:p-10 lg:w-7/12 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    
                    {/* Metadata Header */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 font-mono">
                      <span className="text-indigo-400 font-medium">{project.category}</span>
                      <span aria-hidden="true" className="text-neutral-700">·</span>
                      <span className="text-emerald-400">{project.implementationStatus}</span>
                      <span aria-hidden="true" className="text-neutral-700">·</span>
                      <span>{project.workflowCount} {project.workflowCount === 1 ? 'Workflow' : 'Connected Workflows'}</span>
                    </div>

                    {/* Practical Project Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 tracking-tight">
                      {project.title}
                    </h3>

                    {/* Short Tagline / Summary */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {project.tagline}
                    </p>

                    {/* Problem & Solution Blocks */}
                    <div className="grid grid-cols-1 gap-3 pt-1">
                      {/* Business Problem */}
                      <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1 text-xs">
                        <span className="font-semibold text-red-400 font-mono text-[11px] uppercase tracking-wider block">
                          The Business Problem:
                        </span>
                        <p className="text-neutral-300 leading-relaxed">{project.problem}</p>
                      </div>

                      {/* What Automation Does */}
                      <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1 text-xs">
                        <span className="font-semibold text-emerald-400 font-mono text-[11px] uppercase tracking-wider block">
                          What The Automation Does:
                        </span>
                        <p className="text-neutral-300 leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    {/* Key Connected Tools */}
                    <div className="pt-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                        Main Connected Tools:
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        {project.techStack.map((tech) => (
                          <span 
                            key={tech.name}
                            className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700 transition-colors"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-neutral-850 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shadow-sm hover:shadow-indigo-500/20"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenFlowViewer(project)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-200 bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Inspect {project.workflowCount} {project.workflowCount === 1 ? 'Workflow' : 'Workflows'}</span>
                    </button>

                    {project.videoUrl ? (
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/80 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Video Recording Available</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/50 border border-indigo-800/80 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        <span>{project.keyOutputs?.length || 4} Key Deliverables Documented</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Column: Workflow Illustration or Live Proof */}
                <div className="p-6 sm:p-8 lg:p-10 lg:w-5/12 bg-neutral-950/60 border-t lg:border-t-0 lg:border-l border-neutral-850 flex flex-col justify-between">
                  <div className="space-y-4">
                    
                    {/* Header Strip */}
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                        {project.videoUrl 
                          ? "Execution Output & Process" 
                          : "Key Deliverables & Business Utility"}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400">
                        {project.videoUrl ? "Verified Recording" : "Verified Scope"}
                      </span>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800 overflow-x-auto scrollbar-none">
                      {project.videoUrl && (
                        <button
                          onClick={() => setMediaTabs(prev => ({ ...prev, [project.id]: 'video' }))}
                          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                            currentTab === 'video'
                              ? 'bg-neutral-800 text-neutral-100 font-semibold shadow-sm'
                              : 'text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          🎥 Video Proof
                        </button>
                      )}
                      {project.transcriptionDialogue && (
                        <button
                          onClick={() => setMediaTabs(prev => ({ ...prev, [project.id]: 'transcript' }))}
                          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                            currentTab === 'transcript'
                              ? 'bg-indigo-950 text-indigo-300 font-semibold border border-indigo-800 shadow-sm'
                              : 'text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          <PhoneCall className="w-3 h-3 text-indigo-400" />
                          <span>Transcript</span>
                        </button>
                      )}
                      {hasOutputs && (
                        <button
                          onClick={() => setMediaTabs(prev => ({ ...prev, [project.id]: 'outputs' }))}
                          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                            currentTab === 'outputs'
                              ? 'bg-indigo-950 text-indigo-200 font-semibold border border-indigo-700/80 shadow-sm'
                              : 'text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          <Sparkles className="w-3 h-3 text-indigo-400" />
                          <span>Key Deliverables & ROI</span>
                        </button>
                      )}
                      <button
                        onClick={() => setMediaTabs(prev => ({ ...prev, [project.id]: 'steps' }))}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                          currentTab === 'steps'
                            ? 'bg-neutral-800 text-neutral-100 font-semibold shadow-sm'
                            : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        📋 Process Steps
                      </button>
                    </div>

                    {/* View: Key Outputs (Primary view when video proof is not available) */}
                    {currentTab === 'outputs' && hasOutputs && (
                      <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
                        <div className="p-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-[11px] text-neutral-300 leading-relaxed">
                          <span className="text-indigo-400 font-semibold">What this project delivers: </span>
                          Concrete operational outputs produced by this automation and how they directly benefit business operations.
                        </div>

                        {keyOutputs.map((output, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80 hover:border-neutral-700 transition-colors space-y-2 text-xs"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-indigo-400 font-mono font-semibold text-[11px]">
                                  0{idx + 1}
                                </span>
                                <span className="text-neutral-100 font-semibold text-xs">
                                  {output.title}
                                </span>
                              </div>
                              {output.category && (
                                <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-850 shrink-0">
                                  {output.category}
                                </span>
                              )}
                            </div>

                            <p className="text-[11px] text-neutral-300 leading-relaxed pl-5">
                              {output.description}
                            </p>

                            <div className="ml-5 p-2 rounded-md bg-emerald-950/30 border border-emerald-800/40 text-[11px] text-emerald-300 flex items-start gap-1.5 leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>
                                <strong className="text-emerald-200 font-semibold">How It Helps Your Business: </strong>
                                {output.businessBenefit}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* View: Video */}
                    {currentTab === 'video' && project.videoUrl && (
                      <div className="space-y-3">
                        <div className="overflow-hidden rounded-xl border border-neutral-800 bg-black aspect-video relative group flex items-center justify-center">
                          <video
                            src={project.videoUrl}
                            controls
                            playsInline
                            className="w-full h-full object-cover rounded-xl"
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                        <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                          {project.videoCaption || "Actual recorded output of this automation executing in production."}
                        </p>
                      </div>
                    )}

                    {/* View: Transcript */}
                    {currentTab === 'transcript' && project.transcriptionDialogue && (
                      <div className="space-y-2">
                        <VoiceTranscriptViewer dialogue={project.transcriptionDialogue} compact={true} />
                      </div>
                    )}

                    {/* View: Workflow Steps Illustration */}
                    {currentTab === 'steps' && (
                      <div className="space-y-2.5">
                        {workflowSteps.length > 0 ? (
                          workflowSteps.map((step) => (
                            <div
                              key={step.step}
                              className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-colors space-y-1"
                            >
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="text-indigo-400 font-mono font-semibold text-[11px]">
                                    0{step.step}
                                  </span>
                                  <span className="text-neutral-100 font-medium">
                                    {step.title}
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-850">
                                  {step.tool}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-400 pl-5 leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          ))
                        ) : (
                          project.workflows.map((wf, idx) => (
                            <div
                              key={wf.id}
                              className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-between text-xs font-mono"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-indigo-400 text-[11px]">0{idx + 1}</span>
                                <span className="text-neutral-200">{wf.title}</span>
                              </div>
                              <span className="text-[10px] text-neutral-500">{wf.stages.length} nodes</span>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                  </div>

                  {/* Card Bottom Link */}
                  <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                    <span>Clean integrations & automated verification</span>
                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Case Study</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
