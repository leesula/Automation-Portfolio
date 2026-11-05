import React, { useState } from 'react';
import { MessageSquare, PhoneCall, BarChart3, Workflow, ArrowRight, Check, RotateCw, Layers, ShieldCheck, Clock } from 'lucide-react';

interface WhatIBuildProps {
  onDiscussService: (serviceTitle: string) => void;
  onExploreProjects: () => void;
}

export const WhatIBuild: React.FC<WhatIBuildProps> = ({ onDiscussService, onExploreProjects }) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (serviceId: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const services = [
    {
      id: "whatsapp-ai-agents",
      title: "WhatsApp AI Agents",
      icon: MessageSquare,
      summary: "Autonomous conversational assistants that engage prospective clients, answer questions, and capture leads directly within WhatsApp.",
      capabilities: [
        "Automate customer conversations 24/7 without delays",
        "Capture and organize inquiries with verified contact details",
        "Assist with lead qualification, appointment booking, and follow-ups"
      ],
      idealFor: "Real estate agencies, clinics, coaches, and local service providers",
      turnaround: "3–5 Days",
      stack: "n8n, Meta Cloud API, Supabase, Google Calendar",
      blueprint: [
        "Inbound webhook with message debouncing",
        "LLM intent & budget qualification",
        "Real-time calendar slot offering",
        "Automated database persistence & Slack alert"
      ]
    },
    {
      id: "ai-voice-agents",
      title: "AI Voice Agents",
      icon: PhoneCall,
      summary: "Natural spoken voice intelligence that answers phone calls, qualifies customer needs, and synchronizes availability in real time.",
      capabilities: [
        "Handle inbound customer calls with zero hold times",
        "Collect customer requirements and verify details phonetically",
        "Support appointment-related workflows and calendar scheduling"
      ],
      idealFor: "Agencies and service businesses receiving high phone inquiry volume",
      turnaround: "4–6 Days",
      stack: "Vapi Telephony, Deepgram Nova-2, OpenAI, Calendar API",
      blueprint: [
        "Instant zero-latency SIP call pickup",
        "Spoken intent classification & transcription",
        "Letter-by-letter phonetic email verification",
        "Live calendar slot reservation & SMS receipt"
      ]
    },
    {
      id: "sales-crm-automation",
      title: "Sales & CRM Automation",
      icon: BarChart3,
      summary: "End-to-end sales pipelines that score new inquiries, trigger personalized follow-ups, and keep CRM dashboards in sync.",
      capabilities: [
        "Organize incoming leads with objective qualification scoring",
        "Track sales pipeline activities and monitor deal velocity",
        "Make follow-up processes easier to manage and auto-stop on reply"
      ],
      idealFor: "B2B firms, sales teams, and founders managing deal flow",
      turnaround: "3–5 Days",
      stack: "n8n, Supabase PostgreSQL, Google Sheets, Webhooks",
      blueprint: [
        "Multi-source lead intake & deduplication",
        "Objective lead scoring (0–100) algorithm",
        "Timed nurture cadence that pauses on reply",
        "Real-time deal pipeline syncing"
      ]
    },
    {
      id: "business-workflow-automation",
      title: "Business Workflow Automation",
      icon: Workflow,
      summary: "Custom integrations that connect everyday applications to eliminate repetitive manual work and data discrepancies.",
      capabilities: [
        "Connect different business applications and spreadsheets",
        "Reduce repetitive manual tasks and eliminate copy-paste work",
        "Automate routine business processes with audit-ready reliability"
      ],
      idealFor: "Operations managers, consulting firms, and growing businesses",
      turnaround: "2–4 Days",
      stack: "n8n Orchestrator, REST APIs, Google Workspace, Slack",
      blueprint: [
        "Cross-platform webhook coordination",
        "Strict data mapping & schema validation",
        "Automated failure retry & team alerting",
        "Immutable audit logs in centralized tables"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-neutral-900/60 border-b border-neutral-800/80 text-neutral-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800/80">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              <span>Section 02</span>
              <span className="text-neutral-700">·</span>
              <span>Services & Deliverables</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
              What I Build
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Practical automation systems built for business owners, sales teams, and operations managers who want to save time. Hover over any card to view the architectural stack.
            </p>
          </div>

          <button
            onClick={onExploreProjects}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer self-start md:self-auto group"
          >
            <span>Explore Working Case Studies</span>
            <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 4 Service Cards 3D Flip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isFlipped = Boolean(flippedCards[service.id]);

            return (
              <div
                key={service.id}
                className="group perspective-1000 min-h-[460px] h-full"
              >
                {/* 3D Flip Container (Hover on desktop, Click on mobile/desktop) */}
                <div
                  className={`w-full h-full relative transform-style-3d transition-transform duration-500 ease-in-out cursor-pointer group-hover-flip group-hover:[transform:rotateY(180deg)] ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  onClick={() => toggleFlip(service.id)}
                  title="Hover or click to flip card"
                >
                  
                  {/* FRONT FACE */}
                  <div className="w-full h-full backface-hidden absolute inset-0 rounded-2xl border border-neutral-800/90 bg-neutral-950 hover:border-neutral-700 hover:shadow-2xl transition-all duration-300 ease-out p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-lg group">
                    <div className="space-y-5">
                      {/* Top Bar with Number and Icon */}
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/40 transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-semibold text-neutral-500">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Title & Summary */}
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 group-hover:text-white transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-neutral-300 leading-relaxed">
                          {service.summary}
                        </p>
                      </div>

                      {/* Key Capabilities List */}
                      <div className="space-y-2.5 pt-1">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block">
                          Core Business Capabilities:
                        </span>
                        <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                          {service.capabilities.map((cap, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-2.5 leading-relaxed">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Ideal For */}
                      <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
                        <span className="text-neutral-500 font-medium">Best suited for: </span>
                        <span className="text-neutral-300 font-medium">{service.idealFor}</span>
                      </div>
                    </div>

                    {/* Card Action & Flip Prompt */}
                    <div className="pt-4 border-t border-neutral-850 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(service.id);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-indigo-300 cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5 text-indigo-400" />
                        <span>View Architecture & Stack</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDiscussService(service.title);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                      >
                        <span>Inquire</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* BACK FACE (Rotated 180 degrees) */}
                  <div className="w-full h-full backface-hidden rotate-y-180 absolute inset-0 rounded-2xl border-2 border-indigo-500/40 bg-neutral-950 p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-indigo-400" />
                          <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold">
                            Architecture & Workflow Logic
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800/80">
                          {service.turnaround}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="text-lg font-bold text-white">
                          {service.title}
                        </h4>
                        <p className="text-xs text-neutral-400 font-mono">
                          Tech: {service.stack}
                        </p>
                      </div>

                      {/* Blueprint Steps */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                          Automated Pipeline Blueprint:
                        </span>
                        <div className="space-y-2">
                          {service.blueprint.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2.5 text-xs text-neutral-200 p-2 rounded-lg bg-neutral-900 border border-neutral-850">
                              <span className="w-5 h-5 rounded-md bg-indigo-950 border border-indigo-800 text-indigo-400 font-mono text-[10px] flex items-center justify-center shrink-0">
                                {sIdx + 1}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Back Action Bar */}
                    <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(service.id);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Flip Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDiscussService(service.title);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                      >
                        <span>Discuss Solution</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
