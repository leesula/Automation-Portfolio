import React from 'react';
import { Workflow, Sparkles, MessageSquare, Database, FileSpreadsheet, Calendar, MessageCircle, Webhook, ArrowUpRight } from 'lucide-react';

export const TechStack: React.FC = () => {
  const technologies = [
    {
      name: "n8n",
      category: "Workflow Engine",
      role: "Multi-branch orchestration, custom logic, and webhook coordination",
      icon: Workflow,
      badge: "Primary Engine"
    },
    {
      name: "OpenAI & Modern LLMs",
      category: "AI Reasoning",
      role: "Natural language entity extraction, prompt logic, and qualification scoring",
      icon: Sparkles,
      badge: "AI Layer"
    },
    {
      name: "WhatsApp Business API",
      category: "Conversational Messaging",
      role: "Real-time inbound lead chat, message debouncing, and automated follow-ups",
      icon: MessageSquare,
      badge: "Client Channel"
    },
    {
      name: "Supabase (PostgreSQL)",
      category: "Database & CRM",
      role: "Relational data persistence, lead records, and audit logs",
      icon: Database,
      badge: "Persistence"
    },
    {
      name: "Google Sheets",
      category: "Spreadsheet Automation",
      role: "Automated row syncing, task tracking, and accessible team reporting",
      icon: FileSpreadsheet,
      badge: "Data Sync"
    },
    {
      name: "Google Calendar",
      category: "Scheduling",
      role: "Live freeBusy conflict checks and verified appointment invitations",
      icon: Calendar,
      badge: "Calendar Sync"
    },
    {
      name: "Slack",
      category: "Team Notifications",
      role: "Real-time hot lead alerts and human-in-the-loop approval triggers",
      icon: MessageCircle,
      badge: "Alerting"
    },
    {
      name: "APIs & Webhooks",
      category: "Connectivity",
      role: "Secure HTTP endpoints connecting forms, CRM tools, and telephony",
      icon: Webhook,
      badge: "Integration"
    }
  ];

  return (
    <section id="tech-stack" className="py-20 bg-neutral-900/60 border-b border-neutral-800/80 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-800/80">
          <div className="max-w-2xl space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              <span>Section 06</span>
              <span className="text-neutral-700">·</span>
              <span>Tools & Platforms</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-50 tracking-tight">
              Technology Stack
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Built on battle-tested, production-ready platforms that your business can audit, control, and rely on daily.
            </p>
          </div>

          <span className="text-xs font-mono text-neutral-500 self-start sm:self-auto">
            Visually secondary · Zero vendor lock-in
          </span>
        </div>

        {/* 8 Tech Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="p-5 rounded-xl bg-neutral-950 border border-neutral-800/90 hover:border-indigo-500/60 hover:bg-neutral-900/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out flex flex-col justify-between space-y-3 group cursor-default"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 group-hover:border-indigo-500/50 group-hover:text-indigo-300 flex items-center justify-center text-indigo-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900/90 px-2 py-0.5 rounded border border-neutral-800 group-hover:border-neutral-700 transition-colors">
                      {tech.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-neutral-200">
                      {tech.name}
                    </h3>
                    <span className="text-[11px] text-neutral-500 font-mono block">
                      {tech.category}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {tech.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
