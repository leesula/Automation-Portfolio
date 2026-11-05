import React, { useState } from 'react';
import { Clock, Database, MessageSquare, Repeat, Link2, Sparkles, CheckCircle2 } from 'lucide-react';

interface WhyAutomationProps {
  onStartDiscussion: () => void;
}

export const WhyAutomation: React.FC<WhyAutomationProps> = ({ onStartDiscussion }) => {
  // Default to warm luxury beige as requested by user
  const [colorTheme, setColorTheme] = useState<'beige' | 'dark-taupe'>('beige');
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const benefits = [
    {
      icon: Clock,
      title: "Reduce Repetitive Manual Work",
      description: "Automate administrative routines, copy-pasting between apps, and initial phone screenings so your staff can focus on high-value conversations.",
      before: "10+ hours lost weekly re-typing customer notes, copy-pasting data, and screening spam calls.",
      after: "Zero manual data entry. Background workflows run in < 3s with perfect accuracy."
    },
    {
      icon: Database,
      title: "Organize Customer Information",
      description: "Capture, validate, and structure incoming customer details into centralized databases or spreadsheets without messy input errors.",
      before: "Lead details scattered across chat threads, paper notes, and messy spreadsheets.",
      after: "Centralized Supabase & Sheet records with cleaned phone numbers and budget brackets."
    },
    {
      icon: MessageSquare,
      title: "Improve Inquiry Handling",
      description: "Engage prospective clients immediately across WhatsApp, phone, and web forms—providing 24/7 responsiveness when buyer interest is highest.",
      before: "Customer waits 4–8 hours for reply; after-hours buyer inquiries go cold.",
      after: "Instant 24/7 response within 10 seconds; captures details and books discovery calls."
    },
    {
      icon: Repeat,
      title: "Make Follow-Up Processes Consistent",
      description: "Establish reliable, timed follow-up cadences that nurture leads systematically and pause automatically the second a customer replies.",
      before: "Follow-ups forgotten when team gets busy; deals stall without notice.",
      after: "Automated, polite multi-touch cadence that halts instantly the second client replies."
    },
    {
      icon: Link2,
      title: "Connect Different Business Tools",
      description: "Bridge isolated software systems—linking forms, CRMs, Google Calendar, Slack, and email into one unified, synchronized operational pipeline.",
      before: "Siloed applications requiring tedious manual CSV exports and data reconciliations.",
      after: "Seamless bi-directional sync across Google Calendar, WhatsApp, CRM, and Slack."
    },
    {
      icon: Sparkles,
      title: "Make Business Operations Easier to Manage",
      description: "Gain clear visibility into active leads, booked appointments, and pipeline velocity with daily Slack digests and live operational dashboards.",
      before: "Zero visibility into team response times or unaddressed customer inquiries.",
      after: "Daily automated Slack digest with hot lead alerts and verified booked meetings."
    }
  ];

  const isBeige = colorTheme === 'beige';

  return (
    <section 
      id="why-automation" 
      className="py-24 transition-colors duration-500 border-y bg-[#F5F0E8] text-stone-900 border-[#E2D9CC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2D9CC] transition-colors duration-500">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold">
              <span className="text-amber-800">Section 03</span>
              <span className="text-stone-400">·</span>
              <span className="text-stone-600">Practical Benefits</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-950 transition-colors">
              Why AI Automation?
            </h2>
            
            <p className="text-sm sm:text-base leading-relaxed text-stone-700 transition-colors">
              Automation is not about replacing human relationships—it is about removing the friction, delays, and repetitive clerical tasks that slow modern businesses down. Hover over any card to view the Before vs. After transformation.
            </p>
          </div>
        </div>

        {/* 6 Benefits 3D Flip Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            const isFlipped = Boolean(flippedCards[idx]);

            return (
              <div
                key={idx}
                className="group perspective-1000 min-h-[300px] h-full"
              >
                {/* 3D Flip Inner Container (Flips on hover for desktop, and on click/tap) */}
                <div
                  className={`w-full h-full relative transform-style-3d transition-transform duration-500 ease-in-out cursor-pointer group-hover-flip group-hover:[transform:rotateY(180deg)] ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  onClick={() => toggleFlip(idx)}
                  title="Hover or click to flip card"
                >
                  
                  {/* FRONT FACE */}
                  <div className="w-full h-full backface-hidden absolute inset-0 p-6 sm:p-7 rounded-2xl border transition-all duration-300 ease-out space-y-4 flex flex-col justify-between shadow-sm bg-white/95 border-[#E2D9CC] hover:border-stone-400 text-stone-900 group-hover:shadow-xl">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                          isBeige
                            ? 'bg-[#F5F0E8] border-[#DDD3C2] text-stone-900 group-hover:text-indigo-600 group-hover:border-indigo-300'
                            : 'bg-[#1c1917] border-[#44403c] text-[#e7d8c5] group-hover:text-indigo-400 group-hover:border-indigo-500/50'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border transition-colors ${
                          isBeige ? 'bg-[#F5F0E8] border-[#E2D9CC] text-stone-600' : 'bg-[#1c1917] border-[#44403c] text-stone-400'
                        }`}>
                          Impact 0{idx + 1}
                        </span>
                      </div>
                      
                      <h3 className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                        isBeige ? 'text-stone-950 group-hover:text-stone-900' : 'text-stone-100 group-hover:text-white'
                      }`}>
                        {benefit.title}
                      </h3>

                      <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                        isBeige ? 'text-stone-600 font-normal' : 'text-stone-300 font-normal'
                      }`}>
                        {benefit.description}
                      </p>
                    </div>

                    <div className={`pt-3 border-t flex items-center justify-between text-[11px] font-mono font-medium transition-colors ${
                      isBeige 
                        ? 'border-stone-200 text-emerald-700' 
                        : 'border-[#38332e] text-emerald-400'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Practical Business Gain</span>
                      </div>
                      <span className="text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                        Compare ↻
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE (Rotated 180 degrees) */}
                  <div className={`w-full h-full backface-hidden rotate-y-180 absolute inset-0 p-6 sm:p-7 rounded-2xl border-2 transition-all duration-300 space-y-4 flex flex-col justify-between shadow-2xl ${
                    isBeige
                      ? 'bg-stone-950 text-stone-100 border-indigo-500/40'
                      : 'bg-[#141210] text-stone-100 border-indigo-500/40'
                  }`}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                        <span className="text-xs font-mono font-bold text-indigo-400">
                          BEFORE vs. AFTER
                        </span>
                        <span className="text-[10px] font-mono text-stone-400">
                          Transformation
                        </span>
                      </div>

                      {/* Before State */}
                      <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-900/40 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-red-400 font-bold block">
                          Before Automation:
                        </span>
                        <p className="text-xs text-stone-300 leading-snug">
                          {benefit.before}
                        </p>
                      </div>

                      {/* After State */}
                      <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/40 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                          After Automation:
                        </span>
                        <p className="text-xs text-emerald-200 leading-snug">
                          {benefit.after}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                      <span>Click to flip back</span>
                      <span>↺</span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Contrast Anchored Callout Banner — Anchors the Dark Site Aesthetic */}
        <div className={`p-6 sm:p-7 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl transition-all duration-300 ${
          isBeige
            ? 'bg-neutral-950 text-neutral-100 border-neutral-850'
            : 'bg-[#141210] text-stone-100 border-[#38332e]'
        }`}>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-neutral-50 tracking-tight">
              Have specific workflows that consume too much of your week?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              Every system is customized around the applications and databases your business already uses.
            </p>
          </div>

          <button
            onClick={onStartDiscussion}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-0.5 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap self-start sm:self-auto shadow-md hover:shadow-indigo-500/20 active:scale-[0.98]"
          >
            <span>Let's Discuss Your Process</span>
          </button>
        </div>

      </div>
    </section>
  );
};
