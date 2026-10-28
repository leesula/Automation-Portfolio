import React from 'react';
import { siteConfig } from '../data/projects';
import { Mail, Calendar, Github, Linkedin, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const AboutMe: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-neutral-900 border-b border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Personal Intro & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 block mb-2">
                About the Builder
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
                {siteConfig.builderName}
              </h2>
              <p className="text-base text-indigo-300 font-medium mt-1">
                {siteConfig.roleTitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {siteConfig.bio}
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Deterministic Reliability First:</strong> I build workflows using robust validation, idempotent database operations, and strict error handlers before relying on generative AI.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Clean Data Contracts:</strong> Every form input and webhook is normalized, sanitized, and stored with clear relational constraints.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Autonomous Fault Trapping:</strong> Failures trigger structured alerts with execution IDs and diagnostic stacks so issues can be resolved before clients notice.
                </span>
              </div>
            </div>

            {/* Editable Profile Links */}
            <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center gap-4 text-xs font-mono">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>{siteConfig.email}</span>
              </a>

              <a
                href={siteConfig.calLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Book a Call via Cal.com</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500" />
              </a>

              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500" />
              </a>
            </div>

          </div>

          {/* Right Column: Engineering Principles Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 space-y-6 shadow-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block pb-3 border-b border-neutral-850">
                Core Stack & Working Toolkit
              </span>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-semibold text-neutral-200 block mb-1">Orchestration & Logic</span>
                  <p className="text-neutral-400 font-mono">n8n (Self-hosted & Cloud), Node.js, Custom ES6 Transformations</p>
                </div>

                <div>
                  <span className="font-semibold text-neutral-200 block mb-1">Databases & Storage</span>
                  <p className="text-neutral-400 font-mono">Supabase (PostgreSQL), Google Sheets API (Legacy sync)</p>
                </div>

                <div>
                  <span className="font-semibold text-neutral-200 block mb-1">Communication & Messaging</span>
                  <p className="text-neutral-400 font-mono">Gmail API (OAuth2), Slack Bot API, Webhook Handlers</p>
                </div>

                <div>
                  <span className="font-semibold text-neutral-200 block mb-1">Scheduling & Forms</span>
                  <p className="text-neutral-400 font-mono">Cal.com, Tally Forms, Custom Webhooks</p>
                </div>

                <div>
                  <span className="font-semibold text-neutral-200 block mb-1">Security & Standards</span>
                  <p className="text-neutral-400 font-mono">HMAC cryptographic tokenization, CAN-SPAM compliance, Error triage</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-850 text-xs text-neutral-400 leading-relaxed">
                <span className="text-neutral-200 font-semibold block mb-1">No Vendor Lock-In:</span>
                Workflows and database schemas are built directly in your instances so your company retains 100% intellectual property and control.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
