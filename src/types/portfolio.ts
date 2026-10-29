export type ProjectStatus = 'Configured & Tested' | 'Production-Ready Pattern' | 'In Development';

export interface WorkflowStage {
  id: string;
  name: string;
  type: 'trigger' | 'code' | 'filter' | 'database' | 'notification' | 'webhook' | 'calendar';
  description: string;
  details?: string;
  codeSnippet?: string;
}

export interface WorkflowDetail {
  id: string;
  title: string;
  filename: string;
  trigger: string;
  purpose: string;
  stages: WorkflowStage[];
  branchingRules?: Array<{ condition: string; outcome: string }>;
  databaseInteractions?: Array<{ table: string; operation: string; fields: string[] }>;
  failureHandling?: string;
}

export interface ProjectCaseStudy {
  overview: string;
  businessProblem: {
    summary: string;
    painPoints: string[];
    manualProcessBefore: string[];
  };
  architecture: {
    diagramSummary: string;
    dataFlow: string[];
  };
  howItWorks: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  logicAndDecisionEngine: {
    deterministicVsAi: string;
    scoringBreakdown?: {
      budget: string;
      companySize: string;
      seniority: string;
      thresholds: string;
    };
    securityNotes: string[];
  };
  integrations: Array<{
    tool: string;
    purpose: string;
    authMethod: string;
  }>;
  reliabilityAndErrorHandling: {
    deduplication: string;
    tamperProtection: string;
    centralizedTriage: string;
  };
  businessValue: {
    potentialBenefits: string[];
    unverifiedNotice: string;
  };
  limitationsAndFutureImprovements: {
    currentLimitations: string[];
    plannedEnhancements: string[];
  };
}

export interface TranscriptionTurn {
  speaker: 'User' | 'Assistant';
  text: string;
  toolCall?: string;
}

export interface ClientWorkflowStep {
  step: number;
  title: string;
  description: string;
  tool: string;
}

export interface ProjectKeyOutput {
  title: string;
  category?: string;
  description: string;
  businessBenefit: string;
  liveUrl?: string;
  actionLabel?: string;
}

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  slug: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  implementationStatus: ProjectStatus;
  techStack: Array<{ name: string; role: string }>;
  workflowCount: number;
  workflows: WorkflowDetail[];
  caseStudy: ProjectCaseStudy;
  videoUrl?: string;
  videoCaption?: string;
  transcriptionDialogue?: TranscriptionTurn[];
  clientWorkflowSteps?: ClientWorkflowStep[];
  keyOutputs?: ProjectKeyOutput[];
  liveDemoUrl?: string;
  liveDemoLabel?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  problemAddressed: string;
  solutionSummary: string;
  deliverables: string[];
  idealFor: string[];
}

export interface WorkProcessStep {
  number: string;
  title: string;
  summary: string;
  deliverable: string;
}
