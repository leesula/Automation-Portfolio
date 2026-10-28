import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Bot, 
  User, 
  Zap, 
  Play, 
  Pause, 
  RotateCcw, 
  Search, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Volume2, 
  Database,
  PhoneCall,
  Clock,
  ShieldCheck,
  Filter
} from 'lucide-react';
import { TranscriptionTurn } from '../types/portfolio';

interface VoiceTranscriptViewerProps {
  dialogue: TranscriptionTurn[];
  videoUrl?: string;
  compact?: boolean;
}

export const VoiceTranscriptViewer: React.FC<VoiceTranscriptViewerProps> = ({
  dialogue,
  videoUrl,
  compact = false,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'tools' | 'assistant' | 'user'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const activeTurnRef = useRef<HTMLDivElement | null>(null);

  // Auto-step progression
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAuto) {
      timer = setTimeout(() => {
        setActiveStepIndex((prev) => {
          if (prev >= dialogue.length - 1) {
            setIsPlayingAuto(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1600);
    }
    return () => clearTimeout(timer);
  }, [isPlayingAuto, activeStepIndex, dialogue.length]);

  // Scroll active turn into view during auto-play
  useEffect(() => {
    if (isPlayingAuto && activeTurnRef.current) {
      activeTurnRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeStepIndex, isPlayingAuto]);

  const handleStartAutoPlay = () => {
    if (activeStepIndex >= dialogue.length - 1 || activeStepIndex < 0) {
      setActiveStepIndex(0);
    }
    setIsPlayingAuto(true);
  };

  const handlePauseAutoPlay = () => {
    setIsPlayingAuto(false);
  };

  const handleReset = () => {
    setIsPlayingAuto(false);
    setActiveStepIndex(-1);
  };

  const handleStepForward = () => {
    setIsPlayingAuto(false);
    setActiveStepIndex((prev) => Math.min(prev + 1, dialogue.length - 1));
  };

  const handleStepBackward = () => {
    setIsPlayingAuto(false);
    setActiveStepIndex((prev) => Math.max(prev - 1, 0));
  };

  // Filter dialogue
  const filteredDialogue = dialogue.filter((turn, idx) => {
    // If in single-step / simulation mode and activeStepIndex >= 0
    if (activeStepIndex >= 0 && idx > activeStepIndex) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = turn.text.toLowerCase().includes(q);
      const matchSpeaker = turn.speaker.toLowerCase().includes(q);
      const matchTool = turn.toolCall ? turn.toolCall.toLowerCase().includes(q) : false;
      if (!matchText && !matchSpeaker && !matchTool) return false;
    }

    if (filterMode === 'tools') return !!turn.toolCall;
    if (filterMode === 'assistant') return turn.speaker === 'Assistant';
    if (filterMode === 'user') return turn.speaker === 'User';
    return true;
  });

  const toolTurnsCount = dialogue.filter(d => !!d.toolCall).length;

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-xl flex flex-col">
      {/* Top Header & Context Banner */}
      <div className="px-5 py-4 bg-neutral-900/90 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-100 tracking-wide">
                Live Voice Call Transcription & Tool Execution Stream
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                Verified Call Audio Sync
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono">
              Vapi Speech-to-Speech · n8n Webhook Tools · 28 Spoken Turns · 4 Tool Invocations
            </p>
          </div>
        </div>

        {/* Playback Simulation Controls */}
        <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
          {isPlayingAuto ? (
            <button
              onClick={handlePauseAutoPlay}
              className="px-2.5 py-1 text-xs font-medium text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 rounded border border-amber-800/80 flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Pause playback"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={handleStartAutoPlay}
              className="px-2.5 py-1 text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 rounded border border-emerald-800/80 flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Auto-play conversation step by step"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{activeStepIndex >= 0 ? 'Resume' : 'Play Turn-by-Turn'}</span>
            </button>
          )}

          {activeStepIndex >= 0 && (
            <>
              <button
                onClick={handleStepBackward}
                disabled={activeStepIndex <= 0}
                className="px-2 py-1 text-xs text-neutral-400 hover:text-neutral-200 disabled:opacity-40 cursor-pointer"
                title="Previous turn"
              >
                ◀
              </button>
              <span className="text-[11px] font-mono text-neutral-400 px-1">
                {activeStepIndex + 1}/{dialogue.length}
              </span>
              <button
                onClick={handleStepForward}
                disabled={activeStepIndex >= dialogue.length - 1}
                className="px-2 py-1 text-xs text-neutral-400 hover:text-neutral-200 disabled:opacity-40 cursor-pointer"
                title="Next turn"
              >
                ▶
              </button>
              <button
                onClick={handleReset}
                className="p-1 text-neutral-400 hover:text-neutral-200 cursor-pointer ml-1"
                title="Reset to full view"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Critical Speech Clarification Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 p-4 bg-neutral-900/40 border-b border-neutral-850 text-xs">
        <div className="p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800 flex items-start gap-2.5">
          <div className="p-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-400 mt-0.5 shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold text-neutral-200 block text-[11px] font-mono uppercase tracking-wider">
              Spoken Budget Discrepancy Sanitization
            </span>
            <p className="text-neutral-400 text-[11px] leading-relaxed mt-0.5">
              Caller said <span className="text-amber-300 font-mono">"300 to 500 dollars"</span>. The agent's prompt recognized the residential mismatch, gently asked <span className="text-neutral-200 font-mono">"did you mean $300k to $500k?"</span>, and normalized to <span className="text-emerald-400 font-mono">$300,000–$500,000</span>.
            </p>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800 flex items-start gap-2.5">
          <div className="p-1 rounded bg-indigo-950/60 border border-indigo-800/60 text-indigo-400 mt-0.5 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold text-neutral-200 block text-[11px] font-mono uppercase tracking-wider">
              Phonetic Email Verification & Correction
            </span>
            <p className="text-neutral-400 text-[11px] leading-relaxed mt-0.5">
              Agent read back spelled email. Caller clarified <span className="text-indigo-300 font-mono">"After N only single A"</span>. Agent corrected spelling to <span className="text-emerald-400 font-mono">sudhapersonal22@gmail.com</span> before calendar invite generation.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="px-4 py-2.5 bg-neutral-950 border-b border-neutral-850 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => { setFilterMode('all'); setActiveStepIndex(-1); }}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              filterMode === 'all'
                ? 'bg-neutral-800 text-neutral-100 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            All Turns ({dialogue.length})
          </button>
          <button
            onClick={() => { setFilterMode('tools'); setActiveStepIndex(-1); }}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              filterMode === 'tools'
                ? 'bg-indigo-950 text-indigo-300 font-semibold border border-indigo-800'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Zap className="w-3 h-3 text-indigo-400" />
            <span>Tool Triggers ({toolTurnsCount})</span>
          </button>
          <button
            onClick={() => { setFilterMode('assistant'); setActiveStepIndex(-1); }}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              filterMode === 'assistant'
                ? 'bg-neutral-800 text-neutral-100 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Voice AI Turns
          </button>
          <button
            onClick={() => { setFilterMode('user'); setActiveStepIndex(-1); }}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              filterMode === 'user'
                ? 'bg-neutral-800 text-neutral-100 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Buyer (Lila)
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-48">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dialogue..."
            className="w-full pl-8 pr-3 py-1 text-xs bg-neutral-900 border border-neutral-800 rounded-md text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Transcript Scrolling Dialogue Box */}
      <div className={`p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-neutral-950 ${compact ? 'max-h-[380px]' : 'max-h-[520px]'}`}>
        {filteredDialogue.length === 0 ? (
          <div className="py-12 text-center text-xs text-neutral-500 font-mono">
            No dialogue matching filter or search query.
          </div>
        ) : (
          filteredDialogue.map((turn, index) => {
            const isAssistant = turn.speaker === 'Assistant';
            const isCurrent = activeStepIndex === index;

            return (
              <div
                key={index}
                ref={isCurrent ? activeTurnRef : null}
                className={`transition-all duration-200 ${
                  isCurrent ? 'ring-2 ring-indigo-500/80 rounded-xl p-1 bg-indigo-950/20' : ''
                }`}
              >
                <div
                  className={`flex items-start gap-3 ${
                    isAssistant ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-800/80 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-xl p-3.5 text-xs sm:text-[13px] leading-relaxed space-y-2 ${
                      isAssistant
                        ? 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-tl-sm'
                        : 'bg-indigo-600/90 text-white rounded-tr-sm shadow-md'
                    }`}
                  >
                    {/* Speaker Header */}
                    <div className="flex items-center justify-between gap-2 pb-1 border-b border-neutral-800/60 text-[10px] font-mono">
                      <span className={isAssistant ? 'text-indigo-400 font-semibold' : 'text-indigo-200 font-semibold'}>
                        {isAssistant ? 'Green Estates Voice AI' : 'Buyer (Lila · Tampa Lead)'}
                      </span>
                      <span className={isAssistant ? 'text-neutral-500' : 'text-indigo-200/80'}>
                        Turn #{index + 1}
                      </span>
                    </div>

                    {/* Speech Content */}
                    <p className="whitespace-pre-wrap">{turn.text}</p>

                    {/* Real-time Tool Call Trigger Chip (if fired on this turn) */}
                    {turn.toolCall && (
                      <div className="pt-1.5">
                        <div className="p-2 rounded-lg bg-neutral-950/90 border border-emerald-800/80 text-emerald-300 font-mono text-[11px] flex items-center justify-between gap-2 shadow-inner">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                            <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="font-semibold text-neutral-100">{turn.toolCall}</span>
                          </div>
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-900 shrink-0">
                            n8n Webhook 200 OK
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Summary Strip */}
      <div className="px-4 py-2.5 bg-neutral-900/90 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-indigo-400" />
          <span>Supabase Table: <span className="text-neutral-200">buyer_leads</span> (Upserted on Phone)</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          <span>Google Calendar: <span className="text-emerald-300 font-semibold">Monday Oct 5, 9:00 AM ET</span></span>
        </div>
      </div>
    </div>
  );
};
