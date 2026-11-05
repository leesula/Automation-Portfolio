import React from 'react';
import { siteConfig } from '../data/projects';
import { Mail, Calendar, Linkedin, Github, CheckCircle2, ArrowUpRight, MessageSquare } from 'lucide-react';
import { recordCallBookingToSupabase } from '../lib/supabase';

interface AboutMeProps {
  onOpenBookingModal?: () => void;
}

export const AboutMe: React.FC<AboutMeProps> = ({ onOpenBookingModal }) => {
  return (
    <section id="about" className="py-24 bg-neutral-950 border-b border-neutral-900 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Personal Intro & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-2">
                <span>Section 07</span>
                <span className="text-neutral-700">·</span>
                <span>Background</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
                About Me
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-indigo-400 font-mono mt-2 leading-relaxed">
                AI Automation Builder | Helping Real Estate Agencies Reduce Manual Work, Improve Lead Follow-ups & Streamline Operations.
              </p>
            </div>

            {/* Exact Suggested Brief Content */}
            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
              I enjoy building practical automation systems that connect AI, business applications, and everyday workflows. My focus is on creating solutions that are useful, understandable, and easier for businesses to manage.
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed">
              Rather than building complex, fragile experiments, I prioritize deterministic reliability: validating data, organizing customer details, setting up error alerting, and ensuring workflows operate seamlessly in the background without needing constant oversight.
            </p>

            {/* Core Values List */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Client-First Clarity:</strong> Workflows are documented and structured so business owners understand how data moves through their systems.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Practical Tools:</strong> Built on industry-standard software like WhatsApp, Supabase, n8n, and Google Workspace that your team already knows.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Safe & Auditable:</strong> Built-in notifications and approval steps ensure humans retain full oversight over sensitive customer interactions.
                </span>
              </div>
            </div>

            {/* Working Links & Direct Channels */}
            <div className="pt-6 border-t border-neutral-850 flex flex-wrap items-center gap-3 text-xs font-mono">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-750 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>{siteConfig.email}</span>
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-750 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500" />
              </a>
            </div>

          </div>

          {/* Right Column: Clean Personal Brand Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-neutral-850 bg-neutral-950 hover:border-neutral-750 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden group">
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block">
                  Profile Summary
                </span>
                <h3 className="text-xl font-bold text-neutral-100">
                  {siteConfig.builderName}
                </h3>
                <p className="text-xs font-mono text-indigo-400 font-medium leading-relaxed">
                  AI Automation Builder | Helping Real Estate Agencies Reduce Manual Work, Improve Lead Follow-ups & Streamline Operations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-850 space-y-2 text-xs">
                <span className="font-semibold text-neutral-300 block">Primary Specializations:</span>
                <ul className="space-y-1.5 text-neutral-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    <span>Conversational AI Agents (WhatsApp & Spoken Voice)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    <span>Lead Intake, Qualification & Scoring Pipelines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    <span>CRM & Database Synchronization (Supabase, Sheets)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    <span>Live Calendar Verification & Appointment Booking</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    if (onOpenBookingModal) {
                      onOpenBookingModal();
                    } else {
                      window.open(siteConfig.calLink, '_blank');
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-600/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a 20-min Discovery Call</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
