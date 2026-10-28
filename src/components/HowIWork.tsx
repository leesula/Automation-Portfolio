import React from 'react';
import { workProcessSteps } from '../data/projects';
import { ArrowRight, Layers, CheckCircle } from 'lucide-react';

interface HowIWorkProps {
  onStartProject: () => void;
}

export const HowIWork: React.FC<HowIWorkProps> = ({ onStartProject }) => {
  return (
    <section id="methodology" className="py-24 bg-neutral-950 border-b border-neutral-900 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 block mb-2">
            Engineering Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
            How I Work: From Problem to Production
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
            I prioritize understanding the underlying business mechanics before selecting tools or writing code. Every workflow is designed to be maintainable, auditable, and resilient to third-party API changes.
          </p>
        </div>

        {/* 6-Step Process Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workProcessSteps.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-2xl border border-neutral-850 bg-neutral-900/40 hover:border-neutral-750 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="text-2xl font-bold font-mono text-indigo-400">
                  {step.number}
                </span>
                
                <h3 className="text-base font-bold text-neutral-100 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {step.summary}
                </p>
              </div>

              {/* Tangible Deliverable */}
              <div className="pt-4 border-t border-neutral-850 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">Deliverable:</span>
                <span className="text-neutral-300 font-medium truncate ml-2">
                  {step.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Terms & Scope Clarification */}
        <div className="mt-12 p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-start sm:items-center gap-3">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="leading-relaxed">
              Transparent scoping: Architecture blueprints and deployment support are clearly defined upfront under agreed terms. No surprise vendor lock-in.
            </p>
          </div>
          <button
            onClick={onStartProject}
            className="text-indigo-400 hover:text-indigo-300 font-semibold whitespace-nowrap cursor-pointer inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Start a Project Discussion</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
