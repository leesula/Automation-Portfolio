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
  ChevronRight
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
  const [caseStudyLevel, setCaseStudyLevel] = useState<'business' | 'technical'>('business');
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

        {/* Level Switcher: Business Overview vs Technical Breakdown + Live Demo Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-neutral-900/60 border border-neutral-850">
          <div className="flex items-center p-1 bg-neutral-950 rounded-xl border border-neutral-800">
            <button
              onClick={() => setCaseStudyLevel('business')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                caseStudyLevel === 'business'
                  ? 'bg-neutral-800 text-white shadow-sm ring-1 ring-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>Level 1: Business Overview</span>
            </button>

            <button
              onClick={() => setCaseStudyLevel('technical')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                caseStudyLevel === 'technical'
                  ? 'bg-neutral-800 text-white shadow-sm ring-1 ring-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Level 2: Technical Breakdown</span>
            </button>
          </div>

          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-700/80 rounded-xl transition-all shadow-sm hover:shadow-emerald-500/20 cursor-pointer group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{project.liveDemoLabel || 'Launch Live Production CRM'}</span>
              <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>

        {/* ======================================================== */}
        {/* LEVEL 1: BUSINESS-FRIENDLY OVERVIEW                     */}
        {/* ======================================================== */}
        {caseStudyLevel === 'business' && (
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

            {/* Subsection: The Solution & How It Works */}
            <section className="space-y-6 pt-6 border-t border-neutral-900">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  The Automated Solution
                </span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
                  How The System Runs in Practice
                </h2>
                <p className="mt-1 text-sm text-neutral-400">
                  {caseStudy.overview}
                </p>
              </div>

              {/* Step-by-Step Practical Journey */}
              <div className="space-y-3">
                {caseStudy.howItWorks.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80 flex items-start gap-4 hover:border-neutral-700/80 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800/60 text-indigo-300 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                      {step.step}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-neutral-100">
                        {step.title}
                      </h4>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Subsection: Business Value & Return on Investment */}
            <section className="space-y-4 pt-6 border-t border-neutral-900">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                  Business Value & ROI
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
                Tangible Operational Gains
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {caseStudy.businessValue.potentialBenefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/60 flex items-start gap-2.5 text-xs text-neutral-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>

              {caseStudy.businessValue.unverifiedNotice && (
                <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-850 text-xs text-neutral-400 font-mono leading-relaxed">
                  {caseStudy.businessValue.unverifiedNotice}
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
                    <span className="text-[10px] font-mono text-indigo-400 block pt-1">Auth: {tool.authMethod}</span>
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
        )}

        {/* ======================================================== */}
        {/* LEVEL 2: TECHNICAL BREAKDOWN                            */}
        {/* ======================================================== */}
        {caseStudyLevel === 'technical' && (
          <div className="space-y-12">
            
            {/* System Architecture Blueprint */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                  System Architecture Blueprint
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
                End-to-End Orchestration & Data Flow
              </h2>
              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 text-xs text-neutral-300 leading-relaxed font-mono">
                {caseStudy.architecture.diagramSummary}
              </div>

              {/* Data Flow Trace */}
              <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-850 space-y-2.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  Data Flow Execution Trace
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  {caseStudy.architecture.dataFlow.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-neutral-300">
                      <span className="text-indigo-400 font-bold shrink-0">→</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Decision Engine & Deterministic Safeguards */}
            <section className="space-y-4 pt-6 border-t border-neutral-900">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">
                  Decision Engine & Deterministic Safeguards
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
                Deterministic Validation vs. Probabilistic AI
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {caseStudy.logicAndDecisionEngine.deterministicVsAi}
              </p>

              {/* Scoring Breakdown if available */}
              {caseStudy.logicAndDecisionEngine.scoringBreakdown && (
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs space-y-2">
                  <h3 className="font-semibold text-neutral-200 font-mono uppercase tracking-wider text-[11px]">
                    100-Point Scoring Rubric
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300 font-mono text-[11px]">
                    <div>Budget: {caseStudy.logicAndDecisionEngine.scoringBreakdown.budget}</div>
                    <div>Company Size: {caseStudy.logicAndDecisionEngine.scoringBreakdown.companySize}</div>
                    <div>Seniority: {caseStudy.logicAndDecisionEngine.scoringBreakdown.seniority}</div>
                    <div>Thresholds: {caseStudy.logicAndDecisionEngine.scoringBreakdown.thresholds}</div>
                  </div>
                </div>
              )}

              {/* Security & Token Validation Notes */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Security & Integrity Policies</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-neutral-400 font-mono">
                  {caseStudy.logicAndDecisionEngine.securityNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Reliability, Deduplication & Error Handling */}
            <section className="space-y-4 pt-6 border-t border-neutral-900">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  Reliability & Fault-Tolerance
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
                Production Error Handling & Recovery
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1.5">
                  <span className="font-semibold text-neutral-200 block font-mono text-[11px]">Deduplication</span>
                  <p className="text-neutral-400 leading-relaxed">{caseStudy.reliabilityAndErrorHandling.deduplication}</p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1.5">
                  <span className="font-semibold text-neutral-200 block font-mono text-[11px]">Tamper Protection</span>
                  <p className="text-neutral-400 leading-relaxed">{caseStudy.reliabilityAndErrorHandling.tamperProtection}</p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1.5">
                  <span className="font-semibold text-neutral-200 block font-mono text-[11px]">Centralized Triage</span>
                  <p className="text-neutral-400 leading-relaxed">{caseStudy.reliabilityAndErrorHandling.centralizedTriage}</p>
                </div>
              </div>
            </section>

            {/* Workflow Blueprints Preview */}
            <section className="space-y-4 pt-6 border-t border-neutral-900">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                    Node Blueprints
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
                    Engineered Workflows ({project.workflows.length})
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                {project.workflows.map((wf) => (
                  <div key={wf.id} className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-neutral-100">{wf.title}</h4>
                      <span className="text-[11px] font-mono text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                        Trigger: {wf.trigger}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">{wf.purpose}</p>

                    <div className="pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">
                        Pipeline Stages:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {wf.stages.map((stage) => (
                          <span
                            key={stage.id}
                            className="px-2 py-1 rounded bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-300"
                          >
                            {stage.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

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
