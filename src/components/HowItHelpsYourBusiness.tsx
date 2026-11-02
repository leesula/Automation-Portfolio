import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Zap, 
  ShieldCheck, 
  ExternalLink,
  Bot,
  MessageSquare,
  Workflow,
  Sparkles,
  PhoneCall,
  Calendar,
  Database,
  Users
} from 'lucide-react';

interface HowItHelpsYourBusinessProps {
  projects: Project[];
  initialProjectId?: string;
  onSelectProject: (slug: string) => void;
  onDiscussProject: (projectTitle?: string) => void;
}

export const HowItHelpsYourBusiness: React.FC<HowItHelpsYourBusinessProps> = ({
  projects,
  initialProjectId,
  onSelectProject,
  onDiscussProject,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    initialProjectId || projects[0]?.id || ''
  );

  React.useEffect(() => {
    if (initialProjectId) {
      setSelectedProjectId(initialProjectId);
    }
  }, [initialProjectId]);

  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];
  const { caseStudy } = activeProject;
  const workflowSteps = activeProject.clientWorkflowSteps || [];
  const keyOutputs = activeProject.keyOutputs || [];

  return (
    <section id="how-it-helps" className="py-24 bg-neutral-950 border-b border-neutral-900 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-900">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                Client-First Automation
              </span>
              <span className="text-neutral-700">·</span>
              <span className="text-xs font-mono text-emerald-400">
                Practical Business ROI
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
              How It Helps Your Business
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Explore how each automated system eliminates operational bottlenecks, accelerates response times, and keeps your team focused on closing deals and serving customers.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Business Value First</span>
          </div>
        </div>

        {/* Interactive Project Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-850">
          {projects.map((proj) => {
            const isSelected = proj.id === activeProject.id;
            return (
              <button
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-neutral-800 text-white border-neutral-700 shadow-sm font-semibold'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-900 hover:text-neutral-200 hover:bg-neutral-900/60'
                }`}
              >
                {proj.category.includes('Voice') ? (
                  <PhoneCall className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-neutral-500'}`} />
                ) : proj.category.includes('WhatsApp') ? (
                  <MessageSquare className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-neutral-500'}`} />
                ) : (
                  <Workflow className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-neutral-500'}`} />
                )}
                <span>{proj.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Project Overview Card */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 space-y-10 shadow-xl">
          
          {/* Top Banner: Project Title & Target Problem */}
          <div className="space-y-3 pb-6 border-b border-neutral-850">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                {activeProject.category}
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/80">
                {activeProject.implementationStatus}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-100 tracking-tight leading-snug">
              {activeProject.title}
            </h3>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-4xl">
              {activeProject.tagline}
            </p>
          </div>

          {/* 1. The Business Challenge */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              <h4 className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold">
                1. The Business Challenge
              </h4>
            </div>

            <div className="p-5 rounded-xl bg-neutral-950/90 border border-neutral-800 space-y-3">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeProject.problem}
              </p>

              {caseStudy.businessProblem?.painPoints && caseStudy.businessProblem.painPoints.length > 0 && (
                <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {caseStudy.businessProblem.painPoints.slice(0, 4).map((pain, i) => (
                    <div key={i} className="flex items-start gap-2 text-neutral-300">
                      <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span>{pain}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 2. How the Solution Works */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                2. How the Solution Works
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400">
              The automated customer and data journey runs smoothly from initial contact to team hand-off:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
              {workflowSteps.map((step, idx) => (
                <div 
                  key={step.step}
                  className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 hover:border-neutral-750 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-md bg-indigo-950 border border-indigo-800/80 text-indigo-300 font-mono text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 truncate max-w-[80px]">
                        {step.tool}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-neutral-200 leading-snug">
                      {step.title}
                    </h5>

                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Key Business Benefits */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                3. Key Business Benefits
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {caseStudy.businessValue.potentialBenefits.slice(0, 4).map((benefit, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Benefit 0{i + 1}</span>
                    </div>
                    <p className="text-xs text-neutral-200 leading-relaxed pt-1">
                      {benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Business Features & Deliverables */}
          {keyOutputs.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">
                  4. Business Features & Operational Capabilities
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyOutputs.slice(0, 4).map((output, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 hover:border-neutral-750 transition-colors space-y-2.5 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-indigo-400 font-semibold text-[11px]">
                          FEATURE 0{idx + 1}
                        </span>
                        {output.category && (
                          <span className="font-mono text-neutral-400 bg-neutral-900 text-[10px] px-2 py-0.5 rounded border border-neutral-800">
                            {output.category}
                          </span>
                        )}
                      </div>
                      <h5 className="text-xs sm:text-sm font-semibold text-neutral-100">
                        {output.title}
                      </h5>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {output.description}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800 text-[11px] text-emerald-300 flex items-start gap-1.5 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-emerald-200 font-semibold">Direct Impact: </strong>
                        {output.businessBenefit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Tools & Integrations (Non-Technical Presentation) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                5. Connected Tools & Integrations
              </h4>
            </div>

            <p className="text-xs text-neutral-400">
              Works directly with the software tools your business already uses:
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
              {activeProject.techStack.map((tech) => (
                <div 
                  key={tech.name}
                  className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 flex items-center gap-2"
                >
                  <span className="font-semibold text-neutral-200">{tech.name}</span>
                  <span className="text-neutral-500 text-[11px]">· {tech.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer for this Project */}
          <div className="pt-6 border-t border-neutral-850 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectProject(activeProject.slug)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shadow-sm hover:shadow-indigo-500/20"
              >
                <span>View Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {activeProject.liveDemoUrl && (
                <a
                  href={activeProject.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/80 rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{activeProject.liveDemoLabel || 'Launch Live Production CRM'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                </a>
              )}
            </div>

            <button
              onClick={() => onDiscussProject(activeProject.title)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Discuss a Similar Solution</span>
              <ArrowUpRight className="w-4 h-4 text-indigo-400" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
