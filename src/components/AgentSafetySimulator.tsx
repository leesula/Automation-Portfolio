import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Database,
  ArrowRight,
  PhoneCall,
  Mic,
  Volume2,
  Zap
} from 'lucide-react';
import { LeadScoringSimulator } from './LeadScoringSimulator';

export const AgentSafetySimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'voice-ai' | 'real-estate' | 'scoring' | 'schedule' | 'nutrition'>('voice-ai');

  // Interactive state for Voice AI Agent (Vapi + n8n)
  const [voiceSpeechInput, setVoiceSpeechInput] = useState('I want to buy a townhouse in Tampa with budget 300 to 500 dollars within 2 months paying cash');
  const [callerName, setCallerName] = useState('Lila');
  const [spokenEmail, setSpokenEmail] = useState('S-U-D-H-A-P-E-R-S-O-N-A-L-2-2@gmail.com');
  const [phoneticCorrection, setPhoneticCorrection] = useState('After N only single A');

  // Interactive state for Real Estate Burst & Approval Agent
  const [burstMessages, setBurstMessages] = useState<string[]>([
    "I would like to buy an apartment",
    "In Madhapur, about 150 sq yards",
    "Budget around 90 lakhs to 1 crore"
  ]);
  const [newBurstInput, setNewBurstInput] = useState('');
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('Are pets allowed into the apartment?');
  const [approvalDecision, setApprovalDecision] = useState<'APPROVE' | 'REJECT'>('APPROVE');
  const [humanInstruction, setHumanInstruction] = useState('Complex welcomes pets under 25kg.');

  // Interactive state for Schedule Agent (Project 2)
  const [schedulePrompt, setSchedulePrompt] = useState('Add a task for tomorrow at 3pm to review n8n automation docs');
  const [currentDateInput, setCurrentDateInput] = useState('9/10/2026');

  // Interactive state for WhatsApp Nutrition Safety Agent (Project 3)
  const [nutritionQuery, setNutritionQuery] = useState('What is a good high-protein vegetarian breakfast?');

  // Simulator logic for Voice Lead Parser (Endpoint A & B)
  const simulateVoiceLeadParser = () => {
    const lower = voiceSpeechInput.toLowerCase();

    // Property type matching
    let propType = 'townhouse';
    if (lower.includes('single family') || lower.includes('house')) propType = 'single_family';
    else if (lower.includes('condo') || lower.includes('apartment')) propType = 'condo';
    else if (lower.includes('townhouse') || lower.includes('townhome')) propType = 'townhouse';

    // Location matching
    const location = lower.includes('tampa') ? 'Tampa, FL' : (lower.includes('miami') ? 'Miami, FL' : 'Tampa Metro');

    // Budget ambiguity detection (e.g. 300 to 500 dollars residential home)
    const hasSmallDollarSpoken = lower.includes('300 to 500') || lower.includes('300') || lower.includes('500');
    const isUnder1000 = hasSmallDollarSpoken && !lower.includes('k') && !lower.includes('thousand') && !lower.includes('million');
    
    let budgetMin = 300000;
    let budgetMax = 500000;
    let ambiguityNotice = '';

    if (isUnder1000) {
      ambiguityNotice = '⚠️ Spoken Ambiguity Detected: "300 to 500 dollars" flagged by agent prompt. Residential purchase context auto-clarified with caller to "$300,000–$500,000".';
    } else if (lower.includes('850k') || lower.includes('850')) {
      budgetMin = 750000;
      budgetMax = 850000;
    }

    // Timeline matching
    let timeline = '1_to_3_months';
    if (lower.includes('asap') || lower.includes('immediately')) timeline = 'asap';
    else if (lower.includes('6 months') || lower.includes('six months')) timeline = '3_to_6_months';
    else if (lower.includes('2 months') || lower.includes('two months')) timeline = '1_to_3_months';

    // Financing matching
    let financing = 'cash';
    if (lower.includes('preapproved') || lower.includes('pre-approved') || lower.includes('lender')) financing = 'pre_approved';
    else if (lower.includes('cash') || lower.includes('own funds')) financing = 'cash';
    else financing = 'exploring';

    // Phonetic email verification
    const cleanEmail = phoneticCorrection.toLowerCase().includes('single a')
      ? 'sudhapersonal22@gmail.com'
      : spokenEmail.toLowerCase().replace(/[^a-z0-9@.]/g, '');

    return {
      parsedEntity: {
        full_name: callerName,
        location_pref: location,
        property_type: propType,
        budget_min: budgetMin,
        budget_max: budgetMax,
        timeline: timeline,
        financing_status: financing,
        email: cleanEmail,
      },
      hasAmbiguity: isUnder1000,
      ambiguityNotice,
      freeBusySlots: [
        { day: 'Today', time: '4:30 PM ET', notice: '3.5h notice window (>3h min req)' },
        { day: 'Monday (Oct 5)', time: '9:00 AM ET', notice: 'Selected by Lila in live call' },
        { day: 'Tuesday (Oct 6)', time: '9:00 AM ET', notice: 'Open 30-min consultation window' }
      ],
      supabaseTable: 'buyer_leads',
      upsertConflict: 'phone (+1-813-555-0192)',
      nextDirective: 'offer_booking'
    };
  };

  const handleAddBurstMessage = () => {
    if (!newBurstInput.trim()) return;
    setBurstMessages([...burstMessages, newBurstInput.trim()]);
    setNewBurstInput('');
    setIsDebouncing(true);
    setTimeout(() => setIsDebouncing(false), 800);
  };

  // Simulator logic for Schedule Agent
  const simulateScheduleParse = () => {
    const isTomorrow = schedulePrompt.toLowerCase().includes('tomorrow');
    const isCompleted = schedulePrompt.toLowerCase().includes('complete') || schedulePrompt.toLowerCase().includes('done');
    const isUpdate = schedulePrompt.toLowerCase().includes('mark') || schedulePrompt.toLowerCase().includes('update');
    
    // Invariant: Google Sheet uses M/D/YYYY
    const calculatedDate = isTomorrow ? '9/11/2026' : currentDateInput;
    const taskName = schedulePrompt.replace(/add a task for (tomorrow|today|next monday|september \d+)? to/i, '').trim();
    const status = isCompleted ? 'Completed' : (isUpdate ? 'In Progress' : 'Pending');

    return {
      operation: isUpdate ? 'UPDATE row in Sheet' : 'APPEND new row to Sheet',
      date: calculatedDate,
      task: taskName.charAt(0).toUpperCase() + taskName.slice(1) || 'Review automation docs',
      status: status,
      duplicateCheck: 'Verified: No identical task exists on ' + calculatedDate,
      response: isUpdate 
        ? `Updated: ${taskName} is now marked as ${status}.`
        : `Added: ${taskName} — ${calculatedDate}.`
    };
  };

  // Simulator logic for WhatsApp Nutrition Agent Safety Guardrails
  const simulateNutritionSafety = () => {
    const lower = nutritionQuery.toLowerCase();
    
    // Emergency Red Flags from prompt
    const redFlags = ['chest pain', 'breathing', 'fainting', 'dizzy', 'vomit', 'blood', 'heart'];
    const isEmergency = redFlags.some(flag => lower.includes(flag));

    if (isEmergency) {
      return {
        type: 'EMERGENCY_RED_FLAG',
        statusColor: 'text-red-400 bg-red-950/40 border-red-800',
        badge: '🚨 Clinical Red-Flag Triggered',
        action: 'Nutrition guidance immediately suspended. User urged to seek emergency medical attention.',
        output: '⚠️ This sounds like a potential medical emergency. Please seek urgent medical evaluation or contact emergency services immediately. Do not attempt to manage severe symptoms through dietary changes.'
      };
    }

    if (lower.includes('diet plan') || lower.includes('lose weight')) {
      return {
        type: 'PERSONALIZATION_PROMPT',
        statusColor: 'text-amber-400 bg-amber-950/40 border-amber-800',
        badge: '🎯 Progressive Personalization',
        action: 'Asks 2 focused follow-up questions to customize suggestions without overwhelming user.',
        output: `I can certainly help you build a sustainable meal routine! To tailor it appropriately:\n\n1️⃣ What is your primary goal? (Weight management, energy, or muscle building?)\n2️⃣ Are you vegetarian, vegan, or non-vegetarian?\n\n(No extreme calorie restriction or crash diets needed!)`
      };
    }

    return {
      type: 'NUTRITION_GUIDANCE',
      statusColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-800',
      badge: '✅ Culturally Tailored Habit Guidance',
      action: 'Delivers balanced protein + fiber combo using familiar whole foods with portion guidance.',
      output: `*For a high-protein vegetarian breakfast 🍳*\n\nTry:\n• Paneer bhurji + 2 whole-grain rotis\n• Sprouted moong dal chilla + mint curd\n• Rolled oats cooked in milk with almonds and chia seeds\n\n💡 Aim for a palm-sized portion of protein (paneer/curd/dal) to stay energized through the morning.`
    };
  };

  const voiceResult = simulateVoiceLeadParser();
  const scheduleResult = simulateScheduleParse();
  const nutritionResult = simulateNutritionSafety();

  return (
    <div className="space-y-6">
      
      {/* Tab Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 block mb-1">
            Logic & Guardrail Simulators
          </span>
          <h3 className="text-xl font-bold text-neutral-100">
            Interactive Logic & Prompt Safety Engines
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Test the extracted rules, formulas, and emergency guardrails from your deployed projects.
          </p>
        </div>

        {/* Simulator Tabs */}
        <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-xl border border-neutral-800 self-start sm:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('voice-ai')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'voice-ai'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-indigo-300" />
            <span>Voice AI Caller (Vapi + FreeBusy)</span>
          </button>
          <button
            onClick={() => setActiveTab('real-estate')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'real-estate'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            WhatsApp Burst Debouncer (V2)
          </button>
          <button
            onClick={() => setActiveTab('scoring')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'scoring'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Lead Scoring Engine
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Schedule Agent Parser
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'nutrition'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Clinical Safety & WhatsApp
          </button>
        </div>
      </div>

      {/* Tab: Voice AI Lead Parser & Google Calendar FreeBusy */}
      {activeTab === 'voice-ai' && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-xl space-y-8">
          <div className="pb-4 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 uppercase">Live Telephony Voice AI</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Vapi Function Tools
                </span>
              </div>
              <h4 className="text-lg font-bold text-neutral-100 mt-1">
                Voice Lead Normalization, Spoken Ambiguity Clarification & Google Calendar FreeBusy
              </h4>
            </div>
            <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800 self-start sm:self-auto">
              Simulates 4 n8n Endpoints
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Voice Inputs */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-2">
                  1. Spoken Buyer Criteria (Speech-to-Text Utterance):
                </label>
                <textarea
                  value={voiceSpeechInput}
                  onChange={(e) => setVoiceSpeechInput(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-mono focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <button
                    onClick={() => setVoiceSpeechInput('I want to buy a townhouse in Tampa with budget 300 to 500 dollars within 2 months paying cash')}
                    className="px-2.5 py-1 text-[11px] font-mono bg-neutral-900 hover:bg-neutral-850 text-neutral-300 rounded border border-neutral-800 cursor-pointer"
                  >
                    Preset: Lila (Tampa $300k-$500k)
                  </button>
                  <button
                    onClick={() => setVoiceSpeechInput('Looking for single family home in Tampa, budget around 850k, timeline ASAP, working with lender preapproved')}
                    className="px-2.5 py-1 text-[11px] font-mono bg-neutral-900 hover:bg-neutral-850 text-neutral-300 rounded border border-neutral-800 cursor-pointer"
                  >
                    Preset: Pre-Approved $850k
                  </button>
                  <button
                    onClick={() => setVoiceSpeechInput('Looking for condo in Downtown Tampa under 400 thousand, moving in 6 months')}
                    className="px-2.5 py-1 text-[11px] font-mono bg-neutral-900 hover:bg-neutral-850 text-neutral-300 rounded border border-neutral-800 cursor-pointer"
                  >
                    Preset: Condo 6-Month
                  </button>
                </div>
              </div>

              {/* Phonetic Email Speller */}
              <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-3">
                <span className="text-xs font-medium text-neutral-200 block">
                  2. Phonetic Email Spell-Out & Verbal Correction:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Spoken Spell-Out:</label>
                    <input
                      type="text"
                      value={spokenEmail}
                      onChange={(e) => setSpokenEmail(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Verbal Correction:</label>
                    <input
                      type="text"
                      value={phoneticCorrection}
                      onChange={(e) => setPhoneticCorrection(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-indigo-300 text-xs"
                    />
                  </div>
                </div>

                <div className="p-2.5 rounded bg-neutral-950 border border-neutral-850 text-[11px] font-mono flex items-center justify-between">
                  <span className="text-neutral-400">Sanitized Email:</span>
                  <span className="text-emerald-400 font-semibold">{voiceResult.parsedEntity.email}</span>
                </div>
              </div>

              {/* Ambiguity notice */}
              {voiceResult.hasAmbiguity && (
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/80 text-xs text-amber-300 font-mono flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{voiceResult.ambiguityNotice}</span>
                </div>
              )}
            </div>

            {/* Right Column: n8n Webhook & FreeBusy Output */}
            <div className="lg:col-span-6 bg-neutral-900/40 rounded-xl border border-neutral-800 p-6 space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Supabase Upsert Payload (vapi/upsert-lead)
                </span>
                <span className="text-xs font-mono text-emerald-400">HTTP 200 Success</span>
              </div>

              {/* Parsed JSON Preview */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto space-y-1">
                <div className="text-neutral-500">// Parsed via n8n JavaScript normalization node</div>
                <div>{'{'}</div>
                <div className="pl-4"><span className="text-indigo-400">"full_name"</span>: "{voiceResult.parsedEntity.full_name}",</div>
                <div className="pl-4"><span className="text-indigo-400">"location_pref"</span>: "{voiceResult.parsedEntity.location_pref}",</div>
                <div className="pl-4"><span className="text-indigo-400">"property_type"</span>: "{voiceResult.parsedEntity.property_type}",</div>
                <div className="pl-4"><span className="text-indigo-400">"budget_range"</span>: "${voiceResult.parsedEntity.budget_min.toLocaleString()} - ${voiceResult.parsedEntity.budget_max.toLocaleString()}",</div>
                <div className="pl-4"><span className="text-indigo-400">"timeline"</span>: "{voiceResult.parsedEntity.timeline}",</div>
                <div className="pl-4"><span className="text-indigo-400">"financing_status"</span>: "{voiceResult.parsedEntity.financing_status}",</div>
                <div className="pl-4"><span className="text-indigo-400">"email"</span>: "{voiceResult.parsedEntity.email}"</div>
                <div>{'}'}</div>
              </div>

              {/* FreeBusy Google Calendar Slots */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span className="uppercase tracking-wider">Google Calendar FreeBusy (vapi/check-availability)</span>
                  <span className="text-indigo-400">America/New_York (ET)</span>
                </div>

                <div className="space-y-2">
                  {voiceResult.freeBusySlots.map((slot, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-neutral-100 font-semibold">{slot.day} · {slot.time}</span>
                      </div>
                      <span className="text-[11px] text-neutral-400">{slot.notice}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-850 text-xs font-mono text-neutral-400 flex items-center justify-between">
                <span>Vapi Next Directive:</span>
                <span className="text-indigo-400 font-semibold">{voiceResult.nextDirective}</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 0: Real Estate WhatsApp Burst & Human Approval Simulator */}
      {activeTab === 'real-estate' && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-xl space-y-8">
          <div className="pb-4 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase">Production Engine Demonstration</span>
              <h4 className="text-lg font-bold text-neutral-100 mt-0.5">8s WhatsApp Burst Debouncer & Human Slack Approval</h4>
            </div>
            <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800 self-start sm:self-auto">
              Simulates Workflow 1 & 2
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Burst Messages Input */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-neutral-300">
                    1. Rapid WhatsApp "Burst" Messages:
                  </label>
                  <span className="text-[11px] font-mono text-emerald-400">8s Debounce Window</span>
                </div>
                
                <div className="space-y-2">
                  {burstMessages.map((msg, mIdx) => (
                    <div key={mIdx} className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 flex items-center justify-between font-mono">
                      <span>"{msg}"</span>
                      <span className="text-[10px] text-neutral-500">Msg #{mIdx + 1}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type another quick text and click add..."
                    value={newBurstInput}
                    onChange={(e) => setNewBurstInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddBurstMessage()}
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-neutral-900/60 border border-neutral-800 text-neutral-200 font-mono focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddBurstMessage}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Add Burst
                  </button>
                </div>
              </div>

              {/* Human in the loop simulation */}
              <div className="pt-4 border-t border-neutral-850 space-y-3">
                <label className="text-xs font-medium text-neutral-300 block">
                  2. Edge-Case Inquiry (Triggers Slack Human Approval):
                </label>
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-900/60 border border-neutral-800 text-neutral-200 font-mono focus:outline-none focus:border-indigo-500"
                />

                <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2">
                  <span className="text-[11px] font-mono uppercase text-amber-400 block font-semibold">
                    Simulate Human Property Advisor in Slack (#lead-support-team):
                  </span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-neutral-300 cursor-pointer">
                      <input
                        type="radio"
                        checked={approvalDecision === 'APPROVE'}
                        onChange={() => setApprovalDecision('APPROVE')}
                        className="text-indigo-600"
                      />
                      <span>APPROVE</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-neutral-300 cursor-pointer">
                      <input
                        type="radio"
                        checked={approvalDecision === 'REJECT'}
                        onChange={() => setApprovalDecision('REJECT')}
                        className="text-indigo-600"
                      />
                      <span>REJECT</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={humanInstruction}
                    onChange={(e) => setHumanInstruction(e.target.value)}
                    placeholder="Staff instruction or reason..."
                    className="w-full px-3 py-1.5 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-200 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Execution Output */}
            <div className="lg:col-span-6 bg-neutral-900/40 rounded-xl border border-neutral-800 p-6 space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Concatenated Supabase Buffer State
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${isDebouncing ? 'text-amber-400 border-amber-800 bg-amber-950/40 animate-pulse' : 'text-emerald-400 border-emerald-800 bg-emerald-950/40'}`}>
                  {isDebouncing ? 'Debouncing (8s)...' : 'Latest Run Active'}
                </span>
              </div>

              {/* Concatenated Payload */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 space-y-1">
                <span className="text-neutral-500 block text-[10px]">COMBINED_TEXT (Processed as 1 Turn):</span>
                <p className="text-emerald-300">
                  "{burstMessages.join(' / ')}"
                </p>
                <span className="text-[10px] text-neutral-500 block pt-1">
                  Single-question rule enforced · No multi-reply spamming
                </span>
              </div>

              {/* Matched Property */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs space-y-1">
                <div className="flex items-center justify-between text-indigo-400 font-semibold">
                  <span>Supabase Property Match:</span>
                  <span className="text-emerald-400">Emerald Heights (3 BHK)</span>
                </div>
                <p className="text-neutral-400 text-[11px]">
                  Price: ₹98 Lakhs · Location: Madhapur · Status: Available
                </p>
              </div>

              {/* Simulated Slack Approval & WhatsApp Response */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">Agent Voice Rewritten WhatsApp Reply:</span>
                  <span className="text-emerald-400">24h Meta Window OK</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-850 text-xs text-neutral-200 leading-relaxed font-sans">
                  {approvalDecision === 'APPROVE' ? (
                    <>
                      Yes! 😊 I checked with our property team and they confirmed: <strong>{humanInstruction}</strong>
                      <br /><br />
                      Would you like to schedule a visit to inspect Emerald Heights in person?
                    </>
                  ) : (
                    <>
                      I checked with our property team, and unfortunately: <strong>{humanInstruction}</strong>
                      <br /><br />
                      Would you like me to look for alternative properties in Madhapur with similar specifications?
                    </>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                <span>Verified Google Calendar Booking:</span>
                <span className="text-emerald-400">Mon-Sat 10:00 - 18:00 IST</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 1: Lead Scoring Engine */}
      {activeTab === 'scoring' && <LeadScoringSimulator />}

      {/* Tab 2: Schedule Agent Parser */}
      {activeTab === 'schedule' && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-xl">
          <div className="pb-4 mb-6 border-b border-neutral-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase">LangChain AI Agent Tool Simulation</span>
              <h4 className="text-lg font-bold text-neutral-100 mt-0.5">Google Sheets Schema & Date Invariant Engine</h4>
            </div>
            <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
              M/D/YYYY Schema
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Natural Language User Command:
                </label>
                <div className="space-y-2">
                  {[
                    "Add a task for tomorrow to review n8n automation docs",
                    "Add a task for September 10 to prepare client presentation",
                    "Mark my task to review n8n automation docs as completed"
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSchedulePrompt(preset)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                        schedulePrompt === preset
                          ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      "{preset}"
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Or Type Custom Chat Input:
                </label>
                <input
                  type="text"
                  value={schedulePrompt}
                  onChange={(e) => setSchedulePrompt(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-850 text-xs text-neutral-400 space-y-1 font-mono">
                <span className="text-neutral-300 font-semibold block">Strict Format Invariant Rules from Prompt:</span>
                <p>• Must write dates strictly as M/D/YYYY (e.g. 9/10/2026). Reject YYYY-MM-DD or DD/MM/YYYY.</p>
                <p>• Must search existing sheet rows before appending to prevent duplicate task entries.</p>
                <p>• Only report success after Google Sheets tool executes successfully.</p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-neutral-900/40 rounded-xl border border-neutral-800 p-6 space-y-5">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block pb-2 border-b border-neutral-800">
                Executed Google Sheets Tool Operation
              </span>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-indigo-400 font-semibold">
                  <span>Tool Action:</span>
                  <span className="text-emerald-400">{scheduleResult.operation}</span>
                </div>
                <div className="pt-2 border-t border-neutral-900 space-y-1.5">
                  <div className="flex justify-between text-neutral-400">
                    <span>date:</span>
                    <span className="text-neutral-200 font-bold">{scheduleResult.date}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>task:</span>
                    <span className="text-neutral-200 truncate ml-4">{scheduleResult.task}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>status:</span>
                    <span className="text-indigo-300">{scheduleResult.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{scheduleResult.duplicateCheck}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 font-mono">
                <span className="text-neutral-500 block text-[10px] mb-1">Agent Response to User:</span>
                "{scheduleResult.response}"
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Clinical Safety & WhatsApp Guardrail */}
      {activeTab === 'nutrition' && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-xl">
          <div className="pb-4 mb-6 border-b border-neutral-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase">Clinical Guardrail & Prompt Constitution</span>
              <h4 className="text-lg font-bold text-neutral-100 mt-0.5">WhatsApp Emergency Triage & Habit Guidance</h4>
            </div>
            <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
              Qwen 3.8 27B + Guardrails
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Test Inbound WhatsApp Queries:
                </label>
                <div className="space-y-2">
                  {[
                    "What is a good high-protein vegetarian breakfast?",
                    "Give me a diet plan to lose weight quickly",
                    "I have severe chest pain and dizziness, what should I eat?"
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNutritionQuery(preset)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                        nutritionQuery === preset
                          ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      "{preset}"
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Or Type Custom User Message:
                </label>
                <input
                  type="text"
                  value={nutritionQuery}
                  onChange={(e) => setNutritionQuery(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-850 text-xs text-neutral-400 space-y-1 font-mono">
                <span className="text-neutral-300 font-semibold block">Safety Guardrails Enforced:</span>
                <p>• Zero Medical Diagnosis: Never prescribes drugs or diagnoses disease.</p>
                <p>• Immediate Red-Flag Protocol: Chest pain, fainting, shortness of breath redirect instantly to emergency services.</p>
                <p>• Zero Shaming: Bans 'bad food' / 'cheat food'; promotes balanced whole foods.</p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-neutral-900/40 rounded-xl border border-neutral-800 p-6 space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Agent Safety Evaluation
                </span>
                <span className={`px-2.5 py-1 rounded text-xs font-mono border ${nutritionResult.statusColor}`}>
                  {nutritionResult.badge}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-400">
                <span className="text-neutral-200 font-semibold block mb-0.5">Triage Directive:</span>
                {nutritionResult.action}
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                  Simulated WhatsApp Outbound Response:
                </span>
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 font-sans whitespace-pre-wrap leading-relaxed">
                  {nutritionResult.output}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
