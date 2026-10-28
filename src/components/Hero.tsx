import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, PhoneCall, MessageSquare, Workflow, Calendar, Database, Bell, CheckCircle2, Bot } from 'lucide-react';
import { Project } from '../types/portfolio';

interface HeroProps {
  onExploreProjects: () => void;
  onDiscussProject: () => void;
  onOpenCaseStudy: (project: Project) => void;
  projects: Project[];
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProjects,
  onDiscussProject,
  onOpenCaseStudy,
  projects,
}) => {
  // Default to featured voice agent project
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];
  
  // Use clientWorkflowSteps if defined, or fall back to first 5 stages
  const previewSteps = activeProject?.clientWorkflowSteps || [
    { step: 1, title: "Incoming Buyer Call", description: "Answers inbound phone leads immediately 24/7 with zero hold times.", tool: "Vapi Telephony" },
    { step: 2, title: "Buyer Requirement Collection", description: "Natural spoken dialogue gathers property type, location, budget range, and timeline.", tool: "Voice AI & LLM" },
    { step: 3, title: "Lead Data Storage", description: "Cleans spoken inputs, resolves budget ambiguities, and saves verified contact to Supabase.", tool: "Supabase DB" },
    { step: 4, title: "Calendar Availability Check", description: "Queries advisor's Google Calendar in real time for open 30-min consultation slots.", tool: "Google Calendar" },
    { step: 5, title: "Appointment Booking", description: "Verifies email spelling letter-by-letter and secures the booked calendar invite.", tool: "Calendar Invite" },
    { step: 6, title: "Team Notification", description: "Dispatches instant Slack notification to the advisory team with complete call summary.", tool: "Slack Alert" }
  ];

  const currentStep = previewSteps[activeStepIndex] || previewSteps[0];

  // Featured projects selectable in preview header
  const topPreviewProjects = projects.slice(0, 3);

  const handleSelectProject = (projId: string) => {
    setSelectedProjectId(projId);
    setActiveStepIndex(0);
  };

  const handleNextStep = () => {
    setActiveStepIndex((prev) => (prev + 1) % previewSteps.length);
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-neutral-950 border-b border-neutral-900">
      {/* Background subtle radial grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />
      
      {/* Subtle top ambient glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-80 bg-indigo-900/15 blur-3xl pointer-events-none rounded-full" 
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Positioning & Headlines */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Client-Focused Header Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-400">
              <span className="text-indigo-400 font-semibold tracking-wide">AI Automation Builder</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Lead Qualification</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>CRM & Tool Integrations</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>n8n Workflows</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-neutral-50 tracking-tight leading-[1.14]">
              Turning Repetitive Work into Intelligent Workflows.
            </h1>

            {/* Concise Supporting Text */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              I build AI agents and business automations that help businesses manage leads, streamline operations, and connect their tools.
            </p>

            {/* Two Clear Call to Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreProjects}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-sm hover:shadow-indigo-500/20 cursor-pointer"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onDiscussProject}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-all cursor-pointer"
              >
                <span>Discuss a Project</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            {/* Value Highlights for Clients */}
            <div className="pt-6 border-t border-neutral-900 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-neutral-400">
              <div>
                <p className="font-semibold text-neutral-200">Faster Lead Response</p>
                <p className="text-neutral-500 mt-0.5">Engage inquiries instantly via Voice & WhatsApp</p>
              </div>
              <div>
                <p className="font-semibold text-neutral-200">Zero Data Gaps</p>
                <p className="text-neutral-500 mt-0.5">Automated sync across CRM, Sheets & Calendars</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-semibold text-neutral-200">Human Control</p>
                <p className="text-neutral-500 mt-0.5">Built-in approval gates for sensitive decisions</p>
              </div>
            </div>

          </div>

          {/* Right Column: Project-Specific Workflow Preview */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 sm:p-6 shadow-2xl backdrop-blur-sm space-y-5">
              
              {/* Header: Honest Workflow Preview */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider font-mono">
                      Workflow Preview
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Step-by-step automated business process
                  </p>
                </div>

                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80">
                  Interactive Demo
                </span>
              </div>

              {/* Project Tab Selector */}
              {topPreviewProjects.length > 1 && (
                <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-lg border border-neutral-850 overflow-x-auto">
                  {topPreviewProjects.map((p) => {
                    const isSelected = p.id === activeProject.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectProject(p.id)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-neutral-800 text-neutral-100 shadow-sm font-semibold'
                            : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        {p.shortTitle}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Project Context */}
              <div>
                <h3 className="text-sm font-bold text-neutral-100 line-clamp-1">
                  {activeProject.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {activeProject.tagline}
                </p>
              </div>

              {/* Step Navigation Dots / Indicators */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Execution Sequence</span>
                  <span className="text-indigo-400 font-semibold">
                    Step {activeStepIndex + 1} of {previewSteps.length}
                  </span>
                </div>

                <div className="grid grid-cols-6 gap-1">
                  {previewSteps.map((s, idx) => {
                    const isCurrent = activeStepIndex === idx;
                    const isCompleted = idx < activeStepIndex;
                    return (
                      <button
                        key={s.step}
                        onClick={() => setActiveStepIndex(idx)}
                        className={`h-2 rounded transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-indigo-500 ring-2 ring-indigo-400/40'
                            : isCompleted
                            ? 'bg-emerald-500/80'
                            : 'bg-neutral-800 hover:bg-neutral-700'
                        }`}
                        title={`Stage ${idx + 1}: ${s.title}`}
                        aria-label={`Select step ${idx + 1}: ${s.title}`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Active Step Card */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[11px] font-semibold">
                      Step {currentStep.step}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-100">
                      {currentStep.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 shrink-0">
                    {currentStep.tool}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {currentStep.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-850 text-xs">
                  <button
                    onClick={handleNextStep}
                    className="text-xs text-neutral-300 hover:text-white font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3 h-3 text-indigo-400" />
                  </button>

                  <span className="text-[11px] text-neutral-500 font-mono">
                    Click steps above to explore
                  </span>
                </div>
              </div>

              {/* Destination Match: View Case Study opens THIS exact project */}
              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <span className="text-neutral-400">
                  {activeProject.workflowCount} {activeProject.workflowCount === 1 ? 'Workflow' : 'Connected Workflows'}
                </span>
                <button
                  onClick={() => onOpenCaseStudy(activeProject)}
                  className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
