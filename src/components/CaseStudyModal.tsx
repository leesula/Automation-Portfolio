import React, { useEffect, useState } from 'react';
import { Project } from '../types/portfolio';
import { VoiceTranscriptViewer } from './VoiceTranscriptViewer';
import { 
  X, 
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
  Sparkles
} from 'lucide-react';

interface CaseStudyModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onDiscussProject: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
  onDiscussProject,
}) => {
  // Two levels: Business Overview (Level 1) and Technical Breakdown (Level 2)
  const [caseStudyLevel, setCaseStudyLevel] = useState<'business' | 'technical'>('business');
  const [activeDemoTab, setActiveDemoTab] = useState<'video' | 'transcript' | 'outputs'>('video');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const { caseStudy } = project;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 md:p-10">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        
        {/* Sticky Top Bar in Modal */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-neutral-950/95 backdrop-blur border-b border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="text-indigo-400 font-semibold">Case Study</span>
            <span aria-hidden="true">/</span>
            <span>{project.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="px-6 sm:px-10 py-8 space-y-10">
          
          {/* Header Banner */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 font-mono">
              <span className="text-emerald-400 font-semibold">{project.implementationStatus}</span>
              <span aria-hidden="true">·</span>
              <span>{project.workflowCount} {project.workflowCount === 1 ? 'Workflow' : 'Connected Workflows'}</span>
              <span aria-hidden="true">·</span>
              <span>{project.techStack.slice(0, 3).map(t => t.name).join(' · ')}</span>
            </div>

            <h1 id="case-study-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-50 tracking-tight leading-snug">
              {project.title}
            </h1>

            <p className="text-base text-neutral-300 leading-relaxed max-w-3xl">
              {project.tagline}
            </p>
          </div>

          {/* Level Switcher: Business Overview vs Technical Breakdown */}
          <div className="flex items-center p-1.5 bg-neutral-900 rounded-xl border border-neutral-800 w-fit">
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

          {/* ======================================================== */}
          {/* LEVEL 1: BUSINESS-FRIENDLY OVERVIEW                     */}
          {/* ======================================================== */}
          {caseStudyLevel === 'business' && (
            <div className="space-y-10">
              
              {/* Top Showcase: Live Video Proof OR Key Delivered Outputs */}
              {project.videoUrl || (project.transcriptionDialogue && project.transcriptionDialogue.length > 0) ? (
                <div className="p-4 sm:p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-800/80 gap-3">
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
                      <div className="overflow-hidden rounded-xl border border-neutral-850 bg-black max-h-[480px] flex items-center justify-center">
                        <video
                          src={project.videoUrl}
                          controls
                          playsInline
                          className="w-full max-h-[480px] object-contain rounded-xl"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>

                      {project.videoCaption && (
                        <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-300 leading-relaxed font-mono flex items-start gap-2">
                          <span className="text-indigo-400 font-bold shrink-0">RECORDING BREAKDOWN:</span>
                          <span>{project.videoCaption}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Interactive Transcript Tab Content */}
                  {project.transcriptionDialogue && activeDemoTab === 'transcript' && (
                    <div className="space-y-3">
                      <VoiceTranscriptViewer dialogue={project.transcriptionDialogue} videoUrl={project.videoUrl} />
                    </div>
                  )}

                  {/* Key Outputs View (within media block) */}
                  {project.keyOutputs && activeDemoTab === 'outputs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                      {project.keyOutputs.map((output, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2.5 flex flex-col justify-between"
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
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Key Delivered Outputs Showcase (When live video proof is not available) */
                <div className="p-5 sm:p-7 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800/80 gap-3">
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
                        className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700/80 transition-all flex flex-col justify-between space-y-3"
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

                        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300/90 leading-relaxed">
                          <div className="flex items-center gap-1.5 font-semibold text-emerald-400 mb-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>How It Helps Your Business:</span>
                          </div>
                          <p className="text-[11px] text-neutral-300">
                            {output.businessBenefit}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subsection: The Business Problem */}
              <section className="space-y-4 pt-6 border-t border-neutral-900">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold">
                    The Business Challenge
                  </span>
                </div>
                <h2 className="text-xl font-bold text-neutral-100">
                  What Broke or Wasted Time in the Manual Process
                </h2>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {caseStudy.businessProblem.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2">
                    <span className="text-xs font-mono uppercase text-red-400 tracking-wider block font-semibold">
                      Key Operational Pain Points
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                      {caseStudy.businessProblem.painPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-400 font-mono mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2">
                    <span className="text-xs font-mono uppercase text-amber-400 tracking-wider block font-semibold">
                      Manual Steps Before Automation
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                      {caseStudy.businessProblem.manualProcessBefore.map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 font-mono mt-0.5">#{i + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Subsection: The Automated Solution */}
              <section className="space-y-4 pt-6 border-t border-neutral-900">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                    The Automated Solution
                  </span>
                </div>
                <h2 className="text-xl font-bold text-neutral-100">
                  How The System Solves This Problem
                </h2>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {caseStudy.overview}
                </p>
              </section>

              {/* Subsection: How It Works Step-by-Step */}
              <section className="space-y-4 pt-6 border-t border-neutral-900">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-neutral-100">
                    How It Works in Practice
                  </h2>
                  <span className="text-xs font-mono text-neutral-400">
                    {caseStudy.howItWorks.length} Execution Steps
                  </span>
                </div>
                
                <div className="space-y-3">
                  {caseStudy.howItWorks.map((step) => (
                    <div key={step.step} className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-mono text-xs font-semibold">
                          Step {step.step}
                        </span>
                        <h3 className="text-sm font-semibold text-neutral-100">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pl-1">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Subsection: Connected Business Integrations */}
              <section className="space-y-4 pt-6 border-t border-neutral-900">
                <h2 className="text-xl font-bold text-neutral-100">
                  Connected Business Tools & APIs
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {caseStudy.integrations.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1">
                      <span className="font-semibold text-neutral-100 text-xs block font-mono">
                        {item.tool}
                      </span>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {item.purpose}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Subsection: Intended Business Outcomes & Honest Notice */}
              <section className="space-y-4 pt-6 border-t border-neutral-900">
                <h2 className="text-xl font-bold text-neutral-100">
                  Intended Business Outcomes
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {caseStudy.businessValue.potentialBenefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-900/30 border border-neutral-850 text-xs sm:text-sm text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-400">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{caseStudy.businessValue.unverifiedNotice}</span>
                </div>
              </section>

            </div>
          )}

          {/* ======================================================== */}
          {/* LEVEL 2: TECHNICAL BREAKDOWN & ARCHITECTURE              */}
          {/* ======================================================== */}
          {caseStudyLevel === 'technical' && (
            <div className="space-y-10">
              
              {/* Architecture & Data Flow */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                  <span className="text-indigo-400 font-mono text-sm">T-01.</span>
                  <span>System Architecture & Pipeline Data Flow</span>
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {caseStudy.architecture.diagramSummary}
                </p>

                <div className="p-4 sm:p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2 font-mono text-xs text-neutral-300">
                  <span className="text-[11px] uppercase tracking-wider text-indigo-400 block font-semibold mb-2">
                    Sequential Data Pipeline
                  </span>
                  {caseStudy.architecture.dataFlow.map((flowStep, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-neutral-300">
                      <span className="text-neutral-500 shrink-0">[{idx + 1}]</span>
                      <span>{flowStep}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Logic & Decision Engineering */}
              <section className="space-y-4 pt-6 border-t border-neutral-900">
                <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                  <span className="text-indigo-400 font-mono text-sm">T-02.</span>
                  <span>Deterministic Logic vs. AI Decision Engineering</span>
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {caseStudy.logicAndDecisionEngine.deterministicVsAi}
                </p>

                {caseStudy.logicAndDecisionEngine.scoringBreakdown && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                    <div className="p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-1">
                      <span className="text-indigo-400 font-semibold block">Budget Weights (0–40 pts)</span>
                      <p className="text-neutral-400">{caseStudy.logicAndDecisionEngine.scoringBreakdown.budget}</p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-1">
                      <span className="text-indigo-400 font-semibold block">Company Size Weights (0–35 pts)</span>
                      <p className="text-neutral-400">{caseStudy.logicAndDecisionEngine.scoringBreakdown.companySize}</p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-1">
                      <span className="text-indigo-400 font-semibold block">Seniority Weights (0–25 pts)</span>
                      <p className="text-neutral-400">{caseStudy.logicAndDecisionEngine.scoringBreakdown.seniority}</p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-1">
                      <span className="text-indigo-400 font-semibold block">Tier Action Thresholds</span>
                      <p className="text-neutral-400">{caseStudy.logicAndDecisionEngine.scoringBreakdown.thresholds}</p>
                    </div>
                  </div>
                )}
              </section>

              {/* Full Integrations & Auth Matrix */}
              <section className="space-y-4 pt-6 border-t border-neutral-900">
                <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                  <span className="text-indigo-400 font-mono text-sm">T-03.</span>
                  <span>Integrations & Authentication Protocol Matrix</span>
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-neutral-800 rounded-lg overflow-hidden">
                    <thead className="bg-neutral-900 text-neutral-300 font-mono">
                      <tr>
                        <th className="p-3 border-b border-neutral-800">Tool / Service</th>
                        <th className="p-3 border-b border-neutral-800">Role in Pipeline</th>
                        <th className="p-3 border-b border-neutral-800">Authentication / Protocol</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-850 text-neutral-300 font-mono">
                      {caseStudy.integrations.map((item, idx) => (
                        <tr key={idx} className="hover:bg-neutral-900/40">
                          <td className="p-3 font-semibold text-neutral-100">{item.tool}</td>
                          <td className="p-3 font-sans text-neutral-300">{item.purpose}</td>
                          <td className="p-3 text-neutral-400">{item.authMethod}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Reliability, Deduplication & Error Handling */}
              <section className="space-y-4 pt-6 border-t border-neutral-900">
                <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                  <span className="text-indigo-400 font-mono text-sm">T-04.</span>
                  <span>Reliability, Deduplication & Fault Trapping</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1.5">
                    <span className="text-xs font-mono font-semibold text-indigo-400 block">Deduplication</span>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {caseStudy.reliabilityAndErrorHandling.deduplication}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1.5">
                    <span className="text-xs font-mono font-semibold text-emerald-400 block">Tamper Protection</span>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {caseStudy.reliabilityAndErrorHandling.tamperProtection}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1.5">
                    <span className="text-xs font-mono font-semibold text-amber-400 block">Centralized Triage</span>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {caseStudy.reliabilityAndErrorHandling.centralizedTriage}
                    </p>
                  </div>
                </div>
              </section>

              {/* Limitations & Roadmap */}
              <section className="space-y-4 pt-6 border-t border-neutral-900">
                <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                  <span className="text-indigo-400 font-mono text-sm">T-05.</span>
                  <span>Current Limitations & Planned Roadmap</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2">
                    <span className="text-xs font-mono uppercase text-neutral-400 font-semibold block">
                      Identified Current Limitations
                    </span>
                    <ul className="space-y-2 text-xs text-neutral-300">
                      {caseStudy.limitationsAndFutureImprovements.currentLimitations.map((lim, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-neutral-500 font-mono">•</span>
                          <span>{lim}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2">
                    <span className="text-xs font-mono uppercase text-indigo-400 font-semibold block">
                      Planned Future Enhancements
                    </span>
                    <ul className="space-y-2 text-xs text-neutral-300">
                      {caseStudy.limitationsAndFutureImprovements.plannedEnhancements.map((enh, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-indigo-400 font-mono">→</span>
                          <span>{enh}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

            </div>
          )}

          {/* Call to Action Footer */}
          <section className="pt-8 pb-4 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-indigo-950/20 p-6 rounded-2xl border border-indigo-900/40">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-100">
                Need a similar automation for your business?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Let's discuss your current manual process, tools, and automation objectives.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onDiscussProject();
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <span>Discuss Your Workflow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>

        </div>

      </div>

    </div>
  );
};
