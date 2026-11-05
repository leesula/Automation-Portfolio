import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Search, Cpu, Wrench, Rocket, RotateCw, Check, Sparkles } from 'lucide-react';

interface HowIWorkProps {
  onStartProject: () => void;
}

export const HowIWork: React.FC<HowIWorkProps> = ({ onStartProject }) => {
  // Track which step cards are flipped
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (stepNumber: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const steps = [
    {
      number: "01",
      title: "Understand the Problem",
      tagline: "Process Discovery & Audit",
      description: "Analyze the business process and identify where hours are lost to manual work.",
      icon: Search,
      details: "We start by reviewing your current operational flow, identifying where hours are lost to manual data entry or delayed customer responses.",
      deliverables: [
        "Process workflow audit & bottleneck map",
        "Calculated hours & cost saving forecast",
        "Identified automation entry points"
      ],
      timeframe: "1–2 Days",
      clientOutput: "Scope Blueprint & Plan"
    },
    {
      number: "02",
      title: "Plan the Solution",
      tagline: "Architecture & Integrations",
      description: "Design the exact workflow logic, app connections, and data contracts.",
      icon: Cpu,
      details: "We map out the required connections between your forms, databases, and communication channels to create an auditable architecture.",
      deliverables: [
        "System architecture & data schema",
        "API & webhook integration specification",
        "Failure recovery & alerting plan"
      ],
      timeframe: "2–3 Days",
      clientOutput: "Technical Specification"
    },
    {
      number: "03",
      title: "Build and Test",
      tagline: "Engineering & Validation",
      description: "Develop the production workflow and validate against real-world edge cases.",
      icon: Wrench,
      details: "The automation is constructed using robust validation and tested against real-world edge cases to ensure zero dropped leads or errors.",
      deliverables: [
        "Production-ready workflow deployment",
        "Simulated lead & stress testing suite",
        "Instant error alerts & human fallback gates"
      ],
      timeframe: "3–5 Days",
      clientOutput: "Live Tested System"
    },
    {
      number: "04",
      title: "Deliver and Maintain",
      tagline: "Handoff & Long-Term Reliability",
      description: "Present the working system, train your team, and ensure smooth operation.",
      icon: Rocket,
      details: "You receive the full working system with clear documentation on how your team can monitor, operate, and extend it over time.",
      deliverables: [
        "Live team walkthrough & video guides",
        "Comprehensive runbook & credential transfer",
        "30-day post-launch warranty & tuning"
      ],
      timeframe: "Continuous Peace of Mind",
      clientOutput: "Fully Independent System"
    }
  ];

  return (
    <section 
      id="process" 
      className="py-24 bg-[#F5F0E8] text-stone-900 border-y border-[#E2D9CC] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2D9CC]">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold">
              <span className="text-amber-800">Section 05</span>
              <span className="text-stone-400">·</span>
              <span className="text-stone-600">Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight">
              How I Work
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              A structured, transparent four-step process to take your automation from business problem to reliable daily production. Hover over any card to view key deliverables.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-stone-800 bg-[#EDE6D8] px-3.5 py-2 rounded-xl border border-[#DDD3C2] self-start md:self-auto shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Predictable & Transparent Milestones</span>
          </div>
        </div>

        {/* 4-Step Process 3D Flip Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isFlipped = Boolean(flippedCards[step.number]);

            return (
              <div
                key={step.number}
                className="group perspective-1000 min-h-[380px] h-full"
              >
                {/* 3D Flip Inner Container (Hover on desktop, Click on mobile/desktop) */}
                <div
                  className={`w-full h-full relative transform-style-3d transition-transform duration-500 ease-in-out cursor-pointer group-hover-flip group-hover:[transform:rotateY(180deg)] ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  onClick={() => toggleFlip(step.number)}
                  title="Hover or click to flip card"
                >
                  
                  {/* FRONT FACE */}
                  <div className="w-full h-full backface-hidden absolute inset-0 p-6 sm:p-7 rounded-2xl border border-[#E2D9CC] bg-white/95 hover:border-stone-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 shadow-sm group">
                    <div className="space-y-4">
                      {/* Top Bar with Number and Icon */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl sm:text-3xl font-bold font-mono text-stone-900 group-hover:text-indigo-600 transition-colors">
                          {step.number}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-[#F5F0E8] border border-[#DDD3C2] flex items-center justify-center text-stone-900 group-hover:text-indigo-600 transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-mono text-amber-800 uppercase tracking-wider block font-medium">
                          {step.tagline}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-stone-950 tracking-tight mt-0.5">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                        {step.description}
                      </p>

                      <p className="text-xs text-stone-500 leading-relaxed pt-1">
                        {step.details}
                      </p>
                    </div>

                    {/* Interactive Flip Hint Button on Front */}
                    <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-mono text-stone-500">
                        Phase 0{idx + 1} of 04
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(step.number);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 group-hover:translate-x-0.5 transition-all cursor-pointer"
                      >
                        <span>View Outputs</span>
                        <RotateCw className="w-3.5 h-3.5 text-indigo-600" />
                      </button>
                    </div>
                  </div>

                  {/* BACK FACE (Rotated 180 degrees) */}
                  <div className="w-full h-full backface-hidden rotate-y-180 absolute inset-0 p-6 sm:p-7 rounded-2xl border-2 border-indigo-500/40 bg-stone-950 text-stone-100 shadow-2xl flex flex-col justify-between space-y-4">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-indigo-400">
                            STEP {step.number}
                          </span>
                          <span className="text-stone-600">·</span>
                          <span className="text-xs text-stone-300 font-medium">Outputs</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                          {step.timeframe}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white">
                        {step.clientOutput}
                      </h4>

                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block font-medium">
                          Exact Deliverables:
                        </span>
                        <ul className="space-y-2 text-xs text-stone-300">
                          {step.deliverables.map((item, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2 leading-relaxed">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Back Button */}
                    <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-mono text-stone-400">
                        Auditable Result
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(step.number);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Flip Back</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Anchored Dark Contrast Bridge Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-neutral-950 text-neutral-100 border border-neutral-850 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl transition-all duration-300">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 sm:mt-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm sm:text-base font-bold text-neutral-50 tracking-tight">
                Transparent Scoping & Guaranteed Ownership
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Clear deliverables, architecture diagrams, and error-handling criteria are established before building begins. No surprise lock-ins.
              </p>
            </div>
          </div>
          
          <button
            onClick={onStartProject}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-0.5 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap self-start sm:self-auto shadow-md hover:shadow-indigo-500/20 active:scale-[0.98] inline-flex items-center gap-2"
          >
            <span>Discuss an Automation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
