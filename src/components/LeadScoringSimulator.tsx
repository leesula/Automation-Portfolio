import React, { useState } from 'react';
import { ShieldCheck, Mail, Bell, ArrowRight, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';

export const LeadScoringSimulator: React.FC = () => {
  const [budgetOption, setBudgetOption] = useState<string>("1L above");
  const [companySize, setCompanySize] = useState<string>("100-1000");
  const [jobTitle, setJobTitle] = useState<string>("VP of Operations");
  const [leadName, setLeadName] = useState<string>("Sarah Jenkins");
  const [leadCompany, setLeadCompany] = useState<string>("Acme Technologies");

  // Exact reproduction of Workflow 1 JavaScript Scoring Node
  const calculateScore = () => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Budget Score
    let budgetValue = 0;
    if (budgetOption === "1L above") { budgetValue = 100000; score += 40; reasons.push("budget:high (+40)"); }
    else if (budgetOption === "50k - 1L") { budgetValue = 50000; score += 25; reasons.push("budget:mid (+25)"); }
    else if (budgetOption === "30k - 50k") { budgetValue = 30000; score += 15; reasons.push("budget:low (+15)"); }
    else if (budgetOption === "20k - 30k") { budgetValue = 20000; score += 5; reasons.push("budget:minimal (+5)"); }
    else { budgetValue = 0; score += 0; reasons.push("budget:none (+0)"); }

    // 2. Company Size Score
    if (companySize === "1000 +") { score += 35; reasons.push("size:enterprise (+35)"); }
    else if (companySize === "100-1000") { score += 20; reasons.push("size:mid-market (+20)"); }
    else if (companySize === "10-100") { score += 10; reasons.push("size:smb (+10)"); }
    else if (companySize === "1-10") { score += 3; reasons.push("size:micro (+3)"); }
    else { score += 0; reasons.push("size:unknown (+0)"); }

    // 3. Job Title Seniority Score
    const titleLower = jobTitle.toLowerCase();
    if (/ceo|cto|coo|founder|owner|president/.test(titleLower)) {
      score += 25;
      reasons.push("seniority:c-suite (+25)");
    } else if (/vp|vice president|director/.test(titleLower)) {
      score += 20;
      reasons.push("seniority:vp (+20)");
    } else if (/manager|lead|head/.test(titleLower)) {
      score += 15;
      reasons.push("seniority:manager (+15)");
    } else if (/engineer|developer|analyst|designer/.test(titleLower)) {
      score += 8;
      reasons.push("seniority:ic (+8)");
    } else if (/intern|trainee|junior/.test(titleLower)) {
      score += 2;
      reasons.push("seniority:junior (+2)");
    } else {
      score += 5;
      reasons.push("seniority:other (+5)");
    }

    // 4. Tier Assignment
    let tier: 'high' | 'mid' | 'low';
    if (score >= 70) tier = 'high';
    else if (score >= 40) tier = 'mid';
    else tier = 'low';

    return { score, tier, reasons, budgetValue };
  };

  const { score, tier, reasons } = calculateScore();

  const getTierDisplay = (t: 'high' | 'mid' | 'low') => {
    switch (t) {
      case 'high':
        return {
          label: "HIGH TIER (VIP Priority)",
          textColor: "text-emerald-400",
          bgColor: "bg-emerald-950/40 border-emerald-800/80",
          routingActions: [
            "Send VIP Welcome Email via Gmail (personalized account executive assignment)",
            "Instant Slack Alert to #lead-support-team with full profile & immediate claim link",
            "Initial status set to 'new' with prioritized 24h follow-up window"
          ]
        };
      case 'mid':
        return {
          label: "MID TIER (Nurture Sequence)",
          textColor: "text-amber-400",
          bgColor: "bg-amber-950/40 border-amber-800/80",
          routingActions: [
            "Send Nurture Start Email via Gmail with relevant case studies and pricing breakdown",
            "Enroll in 3-touch educational email sequence with Cal.com booking link",
            "Track replies; alert sales if prospect engages"
          ]
        };
      case 'low':
        return {
          label: "LOW TIER (Timeline Verification)",
          textColor: "text-blue-400",
          bgColor: "bg-blue-950/40 border-blue-800/80",
          routingActions: [
            "Send Cold Touch Email via Gmail with quick 3–6 month timeline confirmation",
            "Enroll in low-frequency check-in sequence",
            "Suppress sales rep notifications to preserve team capacity"
          ]
        };
    }
  };

  const currentTierInfo = getTierDisplay(tier);

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 block mb-1">
            Live Logic Simulator
          </span>
          <h3 className="text-xl font-bold text-neutral-100">
            Interactive Lead Scoring & Tier Routing Engine
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Test the exact JavaScript scoring algorithm extracted from Workflow 1 with real parameters.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800 self-start sm:self-auto">
          <span>Max Score: 100 pts</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Mock Lead Identity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                Lead Name
              </label>
              <input
                type="text"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                value={leadCompany}
                onChange={(e) => setLeadCompany(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* Budget Dropdown */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-neutral-300">
                1. Budget Tier (0–40 pts)
              </label>
              <span className="text-[11px] font-mono text-neutral-500">Weight: 40%</span>
            </div>
            <select
              value={budgetOption}
              onChange={(e) => setBudgetOption(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-indigo-500 font-mono cursor-pointer"
            >
              <option value="1L above">1L above (₹100,000+ / ~$1,200+) — 40 pts</option>
              <option value="50k - 1L">50k - 1L (₹50,000 - ₹100,000) — 25 pts</option>
              <option value="30k - 50k">30k - 50k (₹30,000 - ₹50,000) — 15 pts</option>
              <option value="20k - 30k">20k - 30k (₹20,000 - ₹30,000) — 5 pts</option>
              <option value="Below 20k">Below 20k / Unspecified — 0 pts</option>
            </select>
          </div>

          {/* Company Size Dropdown */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-neutral-300">
                2. Company Size (0–35 pts)
              </label>
              <span className="text-[11px] font-mono text-neutral-500">Weight: 35%</span>
            </div>
            <select
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-indigo-500 font-mono cursor-pointer"
            >
              <option value="1000 +">1000 + Employees (Enterprise) — 35 pts</option>
              <option value="100-1000">100 - 1000 Employees (Mid-Market) — 20 pts</option>
              <option value="10-100">10 - 100 Employees (SMB) — 10 pts</option>
              <option value="1-10">1 - 10 Employees (Micro / Boutique) — 3 pts</option>
            </select>
          </div>

          {/* Job Title / Seniority */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-neutral-300">
                3. Job Title Seniority (0–25 pts)
              </label>
              <span className="text-[11px] font-mono text-neutral-500">Weight: 25%</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { label: "CEO / Founder", title: "Founder & CEO" },
                { label: "VP / Director", title: "VP of Operations" },
                { label: "Manager / Lead", title: "Engineering Manager" },
                { label: "IC / Engineer", title: "Software Engineer" },
                { label: "Junior / Intern", title: "Sales Intern" },
                { label: "Other Role", title: "Independent Consultant" }
              ].map((role) => (
                <button
                  key={role.label}
                  type="button"
                  onClick={() => setJobTitle(role.title)}
                  className={`px-2.5 py-1.5 text-[11px] font-mono rounded-lg border text-left truncate transition-colors cursor-pointer ${
                    jobTitle === role.title
                      ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Or type custom job title..."
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-900/60 border border-neutral-800 text-neutral-300 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Output & Simulation Results Column */}
        <div className="lg:col-span-6 bg-neutral-900/40 rounded-xl border border-neutral-800 p-6 space-y-6">
          {/* Big Score Counter & Tier Badge */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <div>
              <span className="text-xs text-neutral-400 font-mono block">Calculated Lead Score</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-neutral-50 tabular-nums font-mono">
                  {score}
                </span>
                <span className="text-sm font-mono text-neutral-500">/ 100 pts</span>
              </div>
            </div>

            <div className={`px-4 py-2 rounded-xl border text-right ${currentTierInfo.bgColor}`}>
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">Assigned Tier</span>
              <span className={`text-sm font-bold font-mono tracking-tight ${currentTierInfo.textColor}`}>
                {currentTierInfo.label}
              </span>
            </div>
          </div>

          {/* Scoring Factors Breakdown */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2">
              Algorithm Score Breakdown
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-300">
              {reasons.map((r, i) => (
                <span key={i} className="px-2 py-1 rounded bg-neutral-950 border border-neutral-800">
                  {r}
                </span>
              ))}
            </div>
          </div>

          {/* Automated System Actions Triggered */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
              Automated Pipeline Actions (Workflow 1 Execution)
            </span>
            <div className="space-y-2">
              {currentTierInfo.routingActions.map((action, aIdx) => (
                <div key={aIdx} className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-neutral-300 leading-relaxed">{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Database State Result */}
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 font-mono text-[11px] text-neutral-400 space-y-1">
            <div className="text-neutral-300 font-semibold flex items-center justify-between">
              <span>Supabase leads table update:</span>
              <span className="text-emerald-400">status: 'new'</span>
            </div>
            <p className="truncate text-neutral-500">
              `{`{"name": "${leadName}", "company": "${leadCompany}", "score": ${score}, "tier": "${tier}"}`}`
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
