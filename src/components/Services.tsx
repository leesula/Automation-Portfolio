import React from 'react';
import { servicesData } from '../data/projects';
import { ArrowRight, CheckCircle2, Target, Briefcase } from 'lucide-react';

interface ServicesProps {
  onDiscussService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onDiscussService }) => {
  return (
    <section id="services" className="py-24 bg-neutral-900 border-b border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 block mb-2">
            Services & Deliverables
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
            Tailored Automation Solutions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
            Every service is scoped around your actual business processes and existing software stack. Deliverables are designed for long-term maintainability, security, and full client ownership.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, idx) => (
            <div
              key={service.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-md"
            >
              <div className="space-y-6">
                
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-2">
                    <span>0{idx + 1}.</span>
                    <span className="text-indigo-400">{service.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-100 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {service.solutionSummary}
                  </p>
                </div>

                {/* Problem Addressed */}
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-850 text-xs">
                  <span className="font-semibold text-neutral-300 block mb-1">Problem Addressed:</span>
                  <p className="text-neutral-400 leading-relaxed">{service.problemAddressed}</p>
                </div>

                {/* Deliverables List */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2.5">
                    What You Receive:
                  </span>
                  <ul className="space-y-2 text-xs text-neutral-300">
                    {service.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                    Ideal For:
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-400">
                    {service.idealFor.map((target, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <span className="text-neutral-600 font-mono">•</span>
                        <span>{target}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Card Footer CTA */}
              <div className="mt-8 pt-4 border-t border-neutral-900 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-mono">Custom Architecture</span>
                <button
                  onClick={() => onDiscussService(service.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
