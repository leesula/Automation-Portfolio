import React, { useState, useEffect } from 'react';
import { Project } from '../types/portfolio';
import { VoiceTranscriptViewer } from './VoiceTranscriptViewer';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Database, 
  Calendar, 
  Mail, 
  Server, 
  Zap, 
  ArrowUpRight,
  Briefcase,
  Code2,
  Sparkles,
  ExternalLink,
  Layers,
  PhoneCall,
  Clock,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Target,
  XCircle
} from 'lucide-react';

interface ProjectDetailPageProps {
  project: Project;
  allProjects: Project[];
  onBackToProjects: () => void;
  onSelectProject: (slug: string) => void;
  onDiscussProject: (projectTitle?: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  allProjects,
  onBackToProjects,
  onSelectProject,
  onDiscussProject,
}) => {
  const [activeDemoTab, setActiveDemoTab] = useState<'video' | 'transcript' | 'outputs'>('video');

  // Set default demo tab based on project capabilities
  useEffect(() => {
    if (project.videoUrl) {
      setActiveDemoTab('video');
    } else if (project.transcriptionDialogue && project.transcriptionDialogue.length > 0) {
      setActiveDemoTab('transcript');
    } else {
      setActiveDemoTab('outputs');
    }
  }, [project]);

  // Update window title for better SEO & UX
  useEffect(() => {
    document.title = `${project.shortTitle} | Sudha Leela Portfolio`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      document.title = "Sudha Leela | AI Automation Builder & Workflow Architect";
    };
  }, [project]);

  const { caseStudy } = project;

  // Find next and previous projects for bottom navigation
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-24">
      {/* Top Header & Breadcrumbs Bar */}
      <div className="sticky top-16 z-30 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-850">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
            <button
              onClick={onBackToProjects}
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-indigo-400 transition-colors cursor-pointer font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-neutral-300 truncate max-w-[200px] sm:max-w-xs">{project.shortTitle}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/80 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{project.liveDemoLabel || 'Launch Live CRM'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            )}

            <button
              onClick={() => onDiscussProject(project.title)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <span>Discuss a Similar Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Main Hero Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-400 font-mono">
            <span className="px-2.5 py-1 rounded bg-indigo-950/60 border border-indigo-800/80 text-indigo-300 font-medium">
              {project.category}
            </span>
            <span className="text-neutral-700">·</span>
            <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 font-medium">
              {project.implementationStatus}
            </span>
            <span className="text-neutral-700">·</span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
              {project.workflowCount} {project.workflowCount === 1 ? 'Workflow' : 'Connected Workflows'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-50 tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-4xl">
            {project.tagline}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-red-400 font-semibold block">
                The Problem Solved
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                The Automation Solution
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Connected Tech Stack Badges */}
          <div className="pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2">
              Connected Infrastructure & Tools:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {project.techStack.map((tech) => (
                <span 
                  key={tech.name}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center gap-2"
                >
                  <span className="font-semibold text-neutral-200">{tech.name}</span>
                  <span className="text-neutral-500 text-[11px] hidden sm:inline">({tech.role})</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Interactive CRM / Live Demo Banner (if available) */}
        {project.liveDemoUrl && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-neutral-950 border border-emerald-800/40 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                  Interactive Live Output
                </span>
                <p className="text-sm font-semibold text-neutral-100">
                  {project.liveDemoLabel || 'Launch Live Production CRM'}
                </p>
              </div>
            </div>
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-emerald-200 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600/60 rounded-xl transition-all shadow-md hover:shadow-emerald-500/20 cursor-pointer group whitespace-nowrap self-start sm:self-auto"
            >
              <span>Launch Live System</span>
              <ExternalLink className="w-4 h-4 text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        )}

        {/* Business-Friendly Case Study Content */}
        <div className="space-y-12">
            
            {/* Top Showcase: Live Video Proof OR Key Delivered Outputs */}
            {project.videoUrl || (project.transcriptionDialogue && project.transcriptionDialogue.length > 0) ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-800 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider font-mono">
                      Live Production Output & Execution Demo
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80 self-start sm:self-auto">
                    Verified Output Artifact
                  </span>
                </div>

                {/* View Selector if multiple media / output views exist */}
                <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-lg border border-neutral-800 w-fit flex-wrap">
                  {project.videoUrl && (
                    <button
                      onClick={() => setActiveDemoTab('video')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        activeDemoTab === 'video'
                          ? 'bg-neutral-800 text-neutral-100 shadow-sm font-semibold'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      🎥 Video Output Recording
                    </button>
                  )}
                  {project.transcriptionDialogue && (
                    <button
                      onClick={() => setActiveDemoTab('transcript')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        activeDemoTab === 'transcript'
                          ? 'bg-indigo-950 text-indigo-300 shadow-sm font-semibold border border-indigo-800'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      🎙️ Live Interactive Transcript ({project.transcriptionDialogue.length} Turns)
                    </button>
                  )}
                  {project.keyOutputs && project.keyOutputs.length > 0 && (
                    <button
                      onClick={() => setActiveDemoTab('outputs')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activeDemoTab === 'outputs'
                          ? 'bg-neutral-800 text-neutral-100 shadow-sm font-semibold'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      <span>Key Deliverables ({project.keyOutputs.length})</span>
                    </button>
                  )}
                </div>

                {/* Video Tab Content */}
                {project.videoUrl && activeDemoTab === 'video' && (
                  <div className="space-y-3">
                    <div className="overflow-hidden rounded-xl border border-neutral-800 bg-black max-h-[520px] flex items-center justify-center">
                      <video
                        src={project.videoUrl}
                        controls
                        playsInline
                        className="w-full h-auto max-h-[500px] object-contain rounded-xl"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    {project.videoCaption && (
                      <p className="text-xs text-neutral-400 font-mono leading-relaxed bg-neutral-950 p-3 rounded-lg border border-neutral-850">
                        {project.videoCaption}
                      </p>
                    )}
                  </div>
                )}

                {/* Transcript Tab Content */}
                {project.transcriptionDialogue && activeDemoTab === 'transcript' && (
                  <div className="pt-2">
                    <VoiceTranscriptViewer 
                      dialogue={project.transcriptionDialogue}
                      videoUrl={project.videoUrl}
                    />
                  </div>
                )}

                {/* Key Outputs View (within media block) */}
                {project.keyOutputs && activeDemoTab === 'outputs' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {project.keyOutputs.map((output, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono text-indigo-400 font-semibold text-[11px]">
                              DELIVERABLE 0{idx + 1}
                            </span>
                            {output.category && (
                              <span className="font-mono text-neutral-400 bg-neutral-900 text-[10px] px-2 py-0.5 rounded border border-neutral-800">
                                {output.category}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-semibold text-neutral-100">{output.title}</h4>
                          <p className="text-xs text-neutral-300 leading-relaxed">{output.description}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-950/25 border border-emerald-800/40 text-xs text-emerald-300 leading-relaxed">
                          <span className="font-semibold text-emerald-200 block mb-0.5">How It Helps Your Business:</span>
                          {output.businessBenefit}
                        </div>

                        {output.liveUrl && (
                          <div className="pt-1">
                            <a
                              href={output.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-emerald-500/20 cursor-pointer"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                              <span>{output.actionLabel || 'Launch Live Deliverable'}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-white" />
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Key Delivered Outputs Showcase (When live video proof is not available) */
              <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider font-mono">
                      Key Project Outputs & Business Value
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/80 self-start sm:self-auto">
                    Verified System Scope & ROI
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-100">
                    What This Automation Delivered & How It Powers Business Operations
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    This system runs autonomously as a verified backend automation architecture. Below are the concrete operational outputs delivered by this project and the exact business value they provide for client operations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.keyOutputs?.map((output, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700/80 transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono font-semibold text-indigo-400">
                            DELIVERABLE 0{idx + 1}
                          </span>
                          {output.category && (
                            <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                              {output.category}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-semibold text-neutral-100 leading-snug">
                          {output.title}
                        </h4>

                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {output.description}
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300/90 leading-relaxed">
                          <div className="flex items-center gap-1.5 font-semibold text-emerald-400 mb-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>How It Helps Your Business:</span>
                          </div>
                          <p className="text-[11px] text-neutral-300">
                            {output.businessBenefit}
                          </p>
                        </div>

                        {output.liveUrl && (
                          <div className="pt-1">
                            <a
                              href={output.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-emerald-500/20 cursor-pointer"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                              <span>{output.actionLabel || 'Launch Live Deliverable'}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-white" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subsection: The Business Challenge */}
            <section className="space-y-4 pt-6 border-t border-neutral-900">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold">
                  The Business Challenge
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
                What Broke or Wasted Time in the Manual Process
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {caseStudy.businessProblem.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-850 space-y-2">
                  <h3 className="text-xs font-bold text-red-300 font-mono uppercase tracking-wider">
                    Core Operational Friction
                  </h3>
                  <ul className="space-y-2 text-xs text-neutral-300">
                    {caseStudy.businessProblem.painPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-850 space-y-2">
                  <h3 className="text-xs font-bold text-neutral-400 font-mono uppercase tracking-wider">
                    Previous Manual Steps
                  </h3>
                  <ul className="space-y-2 text-xs text-neutral-400">
                    {caseStudy.businessProblem.manualProcessBefore.map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-neutral-500 font-mono shrink-0">0{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Subsection: How It Helps Your Business & How The Solution Works */}
            <section className="space-y-6 pt-6 border-t border-neutral-900">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  How It Helps Your Business
                </span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
                  How The Solution Works
                </h2>
                <p className="mt-1 text-sm text-neutral-400">
                  {caseStudy.overview}
                </p>
              </div>

              {/* Step-by-Step Practical Journey (3-5 Simple Non-Technical Steps) */}
              <div className="space-y-3">
                {(project.clientWorkflowSteps && project.clientWorkflowSteps.length > 0 
                  ? project.clientWorkflowSteps 
                  : caseStudy.howItWorks).map((step: any) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80 flex items-start gap-4 hover:border-neutral-700/80 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800/60 text-indigo-300 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                      {step.step}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-neutral-100">
                          {step.title}
                        </h4>
                        {step.tool && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400">
                            {step.tool}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Subsection: Dedicated Business Impact Section */}
            <section className="space-y-8 pt-8 border-t border-neutral-900">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Business Impact</span>
                  </span>
                  <span className="text-neutral-700">·</span>
                  <span className="text-xs font-mono text-neutral-400">
                    How This Helps Your Business
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100 tracking-tight">
                  Practical Outcomes Beyond The Technology
                </h2>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl">
                  {project.businessImpact?.summary || 
                    "This automation is built to eliminate manual friction, reduce response times, and prevent missed opportunities by executing reliable business rules without requiring constant human intervention."}
                </p>
              </div>

              {/* Impact Statements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(project.businessImpact?.impactStatements || []).map((statement, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center">
                          0{idx + 1}
                        </span>
                        <h3 className="text-sm font-bold text-neutral-100">
                          {statement.title}
                        </h3>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {statement.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400/90 pt-1 border-t border-neutral-850">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Operational Improvement</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Before Automation vs. With Automation Comparison */}
              {project.businessImpact?.beforeVsAfter && (
                <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-800 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                        Process Transformation
                      </span>
                      <span className="text-neutral-700">·</span>
                      <span className="text-xs text-neutral-400">
                        Operational Comparison
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Eliminating Bottlenecks
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Before Automation */}
                    <div className="p-5 rounded-xl bg-red-950/15 border border-red-900/30 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-red-400">
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{project.businessImpact.beforeVsAfter.beforeTitle || 'Before Automation (Manual Process)'}</span>
                      </div>
                      <ul className="space-y-2.5 text-xs text-neutral-300">
                        {project.businessImpact.beforeVsAfter.before.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-red-400 font-mono text-[11px] shrink-0 mt-0.5">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* With Automation */}
                    <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{project.businessImpact.beforeVsAfter.afterTitle || 'With AI Workflow Automation'}</span>
                      </div>
                      <ul className="space-y-2.5 text-xs text-neutral-200">
                        {project.businessImpact.beforeVsAfter.after.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Potential Metrics to Measure */}
              {project.businessImpact?.potentialMetrics && project.businessImpact.potentialMetrics.length > 0 && (
                <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-200">
                      Potential Metrics to Measure
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    When evaluating this automation for your business, here are key operational indicators to track before and after implementation:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {project.businessImpact.potentialMetrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-850 flex items-center gap-2 text-xs text-neutral-300"
                      >
                        <Target className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-neutral-500 font-mono pt-1">
                    Note: Metrics reflect qualitative operational goals. Actual results depend on inbound inquiry volume, sales cycle duration, and response processes.
                  </p>
                </div>
              )}
            </section>

            {/* Subsection: Tools & Integrations */}
            <section className="space-y-4 pt-6 border-t border-neutral-900">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  Connected Tools & Real Integrations
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
                Production Integrations Used
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {caseStudy.integrations.map((tool, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800 text-xs space-y-1">
                    <span className="font-semibold text-neutral-100 block">{tool.tool}</span>
                    <p className="text-neutral-400 text-[11px] leading-relaxed">{tool.purpose}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Subsection: Limitations and Future Roadmap */}
            {caseStudy.limitationsAndFutureImprovements && (
              <section className="space-y-4 pt-6 border-t border-neutral-900">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                    Scope Boundaries & Next Phase
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800 text-xs space-y-2">
                    <h3 className="font-bold text-neutral-300 font-mono uppercase tracking-wider text-[11px]">
                      Current Scope Boundaries
                    </h3>
                    <ul className="space-y-1.5 text-neutral-400 list-disc list-inside">
                      {caseStudy.limitationsAndFutureImprovements.currentLimitations.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800 text-xs space-y-2">
                    <h3 className="font-bold text-indigo-300 font-mono uppercase tracking-wider text-[11px]">
                      Planned Enhancements
                    </h3>
                    <ul className="space-y-1.5 text-neutral-400 list-disc list-inside">
                      {caseStudy.limitationsAndFutureImprovements.plannedEnhancements.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

          </div>

        {/* Bottom CTA Box */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold block">
            Custom Automation Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100">
            Need a Similar Automation System for Your Business?
          </h2>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            I build deterministic, audit-ready AI workflows tailored to your specific tools, CRM, and customer intake processes.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onDiscussProject(project.title)}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              <span>Discuss a Similar Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={onBackToProjects}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </button>
          </div>
        </div>

        {/* Next / Previous Project Navigation */}
        <div className="pt-8 border-t border-neutral-900 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onSelectProject(prevProject.slug)}
            className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-850 hover:border-neutral-700 transition-all text-left group cursor-pointer"
          >
            <span className="text-[11px] font-mono text-neutral-500 block mb-1">← Previous Project</span>
            <span className="text-sm font-semibold text-neutral-200 group-hover:text-indigo-400 transition-colors block">
              {prevProject.shortTitle}
            </span>
          </button>

          <button
            onClick={() => onSelectProject(nextProject.slug)}
            className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-850 hover:border-neutral-700 transition-all text-right group cursor-pointer"
          >
            <span className="text-[11px] font-mono text-neutral-500 block mb-1">Next Project →</span>
            <span className="text-sm font-semibold text-neutral-200 group-hover:text-indigo-400 transition-colors block">
              {nextProject.shortTitle}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
