import React, { useState } from 'react';
import { Project, WorkflowDetail, WorkflowStage } from '../types/portfolio';
import { 
  Play, 
  Code2, 
  Database, 
  Filter, 
  Bell, 
  Radio, 
  Calendar, 
  CheckCircle, 
  FileCode,
  Info,
  Layers,
  Bot,
  MessageSquare
} from 'lucide-react';

interface WorkflowInteractiveViewerProps {
  projects: Project[];
  initialProjectId?: string;
}

export const WorkflowInteractiveViewer: React.FC<WorkflowInteractiveViewerProps> = ({
  projects,
  initialProjectId
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    initialProjectId || projects[0]?.id || ''
  );
  
  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(
    currentProject.workflows[0]?.id || ''
  );
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);

  // When project changes, ensure workflow selection is valid
  const currentWorkflow = currentProject.workflows.find(w => w.id === selectedWorkflowId) 
    || currentProject.workflows[0];

  const currentStage: WorkflowStage | undefined = currentWorkflow?.stages.find(
    s => s.id === selectedStageId
  ) || currentWorkflow?.stages[0];

  const getStageIcon = (type: WorkflowStage['type']) => {
    switch (type) {
      case 'trigger': return Play;
      case 'webhook': return Radio;
      case 'code': return Code2;
      case 'database': return Database;
      case 'filter': return Filter;
      case 'notification': return Bell;
      case 'calendar': return Calendar;
      default: return Code2;
    }
  };

  const getStageBadgeColor = (type: WorkflowStage['type']) => {
    switch (type) {
      case 'trigger':
      case 'webhook':
        return 'text-amber-400 bg-amber-950/40 border-amber-800/60';
      case 'code':
        return 'text-blue-400 bg-blue-950/40 border-blue-800/60';
      case 'database':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60';
      case 'filter':
        return 'text-purple-400 bg-purple-950/40 border-purple-800/60';
      case 'notification':
        return 'text-pink-400 bg-pink-950/40 border-pink-800/60';
      case 'calendar':
        return 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60';
      default:
        return 'text-neutral-400 bg-neutral-900 border-neutral-800';
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-xl">
      
      {/* Top Project Selector Bar */}
      <div className="p-4 sm:p-5 border-b border-neutral-850 bg-neutral-900/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 block mb-1">
            System Architecture Explorer
          </span>
          <h3 className="text-base font-bold text-neutral-100">
            Inspect Workflow Blueprints & Node Logic
          </h3>
        </div>

        {/* Project Selector Pills (interactive filter buttons) */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800 overflow-x-auto">
          {projects.map((proj) => {
            const isSelected = proj.id === currentProject.id;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  setSelectedWorkflowId(proj.workflows[0]?.id || '');
                  setSelectedStageId(null);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {proj.shortTitle}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Workflows Tabs Header */}
      <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-mono text-neutral-400">
            <span className="text-neutral-300 font-semibold">{currentProject.title}</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>{currentProject.workflowCount} {currentProject.workflowCount === 1 ? 'Workflow' : 'Synchronized Workflows'}</span>
          </div>

          <div className="text-xs font-mono text-neutral-400 bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800 self-start sm:self-auto">
            Status: {currentProject.implementationStatus}
          </div>
        </div>

        {/* If project has multiple workflows (e.g. Sales Pipeline has 7), render sub-tabs */}
        {currentProject.workflows.length > 1 && (
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {currentProject.workflows.map((wf) => {
              const isSelected = wf.id === currentWorkflow.id;
              return (
                <button
                  key={wf.id}
                  onClick={() => {
                    setSelectedWorkflowId(wf.id);
                    setSelectedStageId(null);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-neutral-800 text-neutral-100 border-neutral-700 shadow-sm'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-850 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  {wf.title.split('—')[0].trim()}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Workflow Purpose Banner */}
      <div className="p-4 sm:p-5 bg-neutral-900/20 border-b border-neutral-800/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-semibold text-neutral-100 flex items-center gap-2">
              <span>{currentWorkflow.title}</span>
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-4xl">
              {currentWorkflow.purpose}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-2 rounded-lg border border-neutral-800">
            <Radio className="w-3.5 h-3.5 text-amber-400" />
            <span>Trigger: {currentWorkflow.trigger}</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800 min-h-[460px]">
        
        {/* Left Column: Visual Pipeline Flow Nodes */}
        <div className="lg:col-span-5 p-4 sm:p-6 overflow-y-auto max-h-[540px]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800/80">
            <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
              Execution Sequence ({currentWorkflow.stages.length} Nodes)
            </span>
            <span className="text-[11px] text-neutral-500">Click node to inspect</span>
          </div>

          <div className="space-y-3">
            {currentWorkflow.stages.map((stage, idx) => {
              const Icon = getStageIcon(stage.type);
              const isSelected = (currentStage?.id === stage.id);
              const badgeStyle = getStageBadgeColor(stage.type);

              return (
                <div key={stage.id} className="relative">
                  {/* Connecting directional line to next node */}
                  {idx < currentWorkflow.stages.length - 1 && (
                    <div 
                      className="absolute left-6 top-10 w-0.5 h-6 bg-neutral-800 -z-0" 
                      aria-hidden="true" 
                    />
                  )}

                  <button
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 border-indigo-500/80 shadow-md ring-1 ring-indigo-500/30'
                        : 'bg-neutral-950 hover:bg-neutral-900/60 border-neutral-850 hover:border-neutral-750'
                    }`}
                  >
                    <div className={`p-2 rounded-lg border shrink-0 mt-0.5 ${badgeStyle}`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-semibold truncate ${isSelected ? 'text-indigo-200' : 'text-neutral-200'}`}>
                          {stage.name}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-neutral-400 shrink-0">
                          {stage.type}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Branching Rules Summary if available */}
          {currentWorkflow.branchingRules && currentWorkflow.branchingRules.length > 0 && (
            <div className="mt-6 pt-4 border-t border-neutral-800">
              <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider block mb-2">
                Conditional Branching Rules
              </span>
              <div className="space-y-2">
                {currentWorkflow.branchingRules.map((rule, rIdx) => (
                  <div key={rIdx} className="p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800 text-xs">
                    <span className="font-mono text-indigo-400">IF: </span>
                    <span className="text-neutral-300">{rule.condition}</span>
                    <div className="mt-1 text-neutral-400 pl-4 border-l border-neutral-800">
                      <span className="font-mono text-emerald-400">THEN: </span>
                      {rule.outcome}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Node Logic & Technical Details Inspector */}
        <div className="lg:col-span-7 p-4 sm:p-6 bg-neutral-950 flex flex-col justify-between">
          {currentStage ? (
            <div className="space-y-5">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
                  <span>Node Inspector</span>
                  <span aria-hidden="true" className="text-neutral-600">/</span>
                  <span className="capitalize">{currentStage.type} Node</span>
                </div>
                <h4 className="text-lg font-bold text-neutral-100">
                  {currentStage.name}
                </h4>
                <p className="mt-1.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {currentStage.description}
                </p>
              </div>

              {/* Implementation Details */}
              {currentStage.details && (
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300 space-y-1">
                  <div className="font-semibold text-neutral-200 flex items-center gap-1.5 mb-1">
                    <Info className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Technical Implementation Note</span>
                  </div>
                  <p className="leading-relaxed text-neutral-400">
                    {currentStage.details}
                  </p>
                </div>
              )}

              {/* Code / Prompt Snippet from actual JSON */}
              {currentStage.codeSnippet && (
                <div>
                  <div className="flex items-center justify-between pb-1.5">
                    <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-blue-400" />
                      <span>Extracted Logic / System Instruction</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">Sanitized Runtime</span>
                  </div>
                  <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3.5 font-mono text-xs text-neutral-300 overflow-x-auto max-h-56 scrollbar-thin">
                    <pre className="whitespace-pre">{currentStage.codeSnippet}</pre>
                  </div>
                </div>
              )}

              {/* Database impact for this workflow */}
              {currentWorkflow.databaseInteractions && currentWorkflow.databaseInteractions.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                    Database Schema & Table Operations
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentWorkflow.databaseInteractions.map((db, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-neutral-900/40 border border-neutral-800 text-xs">
                        <div className="flex items-center justify-between font-mono mb-1">
                          <span className="text-emerald-400 font-semibold">{db.table}</span>
                          <span className="text-[10px] text-neutral-400 px-1.5 py-0.2 rounded bg-neutral-800">{db.operation}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 truncate">
                          Fields: {db.fields.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="py-20 text-center text-neutral-500 text-sm">
              Select a stage on the left to inspect its parameters.
            </div>
          )}

          {/* Export File Reference */}
          <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-neutral-500">
            <span className="truncate">Source file: {currentWorkflow.filename}</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Parsed from Uploaded JSON</span>
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
