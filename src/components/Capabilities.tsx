import React from 'react';
import { capabilitiesList } from '../data/projects';
import { Workflow, Database, Cpu, MessageSquare, CalendarCheck, ShieldCheck, PhoneCall, Bot } from 'lucide-react';

const capabilityIcons: Record<string, React.ElementType> = {
  "n8n Workflow Engineering": Workflow,
  "LangChain AI Agents & Tool Calling": Bot,
  "WhatsApp & Multi-Channel Messaging": MessageSquare,
  "Lead Scoring & Intake Engines": Cpu,
  "Database & Spreadsheet Architecture": Database,
  "Voice AI & Telephony Automation": PhoneCall,
  "Security, Hashing & Compliance": ShieldCheck,
};

export const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="py-20 bg-neutral-900 border-b border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 font-mono">
            Core Capabilities
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-neutral-50 tracking-tight">
            Specialized in Production-Ready Automation Systems
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Every capability listed here is directly backed by implemented workflow architectures, database schemas, and API contracts. No fabricated certifications or exaggerated claims.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilitiesList.map((item, index) => {
            const Icon = capabilityIcons[item.title] || Workflow;
            return (
              <div
                key={item.title}
                className="group p-6 rounded-xl bg-neutral-950 border border-neutral-800/90 hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-semibold text-neutral-100 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Zero-Pill Technology Listing (unboxed text with typographic separators) */}
                <div className="mt-6 pt-4 border-t border-neutral-900 flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
                  {item.technologies.map((tech, techIdx) => (
                    <React.Fragment key={tech}>
                      <span className="hover:text-indigo-300 transition-colors">{tech}</span>
                      {techIdx < item.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-neutral-700">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
