import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { FeaturedProjects } from './components/FeaturedProjects';
import { WorkflowInteractiveViewer } from './components/WorkflowInteractiveViewer';
import { AgentSafetySimulator } from './components/AgentSafetySimulator';
import { Services } from './components/Services';
import { HowIWork } from './components/HowIWork';
import { AboutMe } from './components/AboutMe';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { projectsData } from './data/projects';
import { Project } from './types/portfolio';

export default function App() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [activeProjectIdForInspection, setActiveProjectIdForInspection] = useState<string>(projectsData[0].id);
  const [selectedServiceInterest, setSelectedServiceInterest] = useState<string | undefined>(undefined);

  const primaryProject = projectsData[0];

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    handleNavigateSection('contact');
  };

  const handleOpenCaseStudy = (project: Project = primaryProject) => {
    setSelectedCaseStudy(project);
  };

  const handleCloseCaseStudy = () => {
    setSelectedCaseStudy(null);
  };

  const handleInspectWorkflows = (project: Project) => {
    setActiveProjectIdForInspection(project.id);
    handleNavigateSection('architecture');
  };

  const handleDiscussService = (serviceTitle: string) => {
    setSelectedServiceInterest(serviceTitle);
    handleNavigateSection('contact');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-200">
      {/* Top Navigation Bar */}
      <Navbar
        onOpenContact={handleOpenContact}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreProjects={() => handleNavigateSection('projects')}
          onDiscussProject={handleOpenContact}
          onOpenCaseStudy={handleOpenCaseStudy}
          projects={projectsData}
        />

        {/* Featured Projects Gallery (Practical Business Automations) */}
        <FeaturedProjects
          projects={projectsData}
          onSelectProject={handleOpenCaseStudy}
          onOpenFlowViewer={handleInspectWorkflows}
        />

        {/* Specialized in Production-Ready Automation Systems (Capabilities) */}
        <Capabilities />

        {/* Architecture & Interactive Workflow Inspection Section */}
        <section id="architecture" className="py-24 bg-neutral-950 border-b border-neutral-850 text-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
              <div className="max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 block mb-2">
                  Technical Verification
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-50 tracking-tight">
                  Behind the Scenes: Node Logic & Blueprints
                </h2>
                <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
                  For technical teams and founders who want to verify how these automations are engineered under the hood. Inspect the exact n8n node blueprints, database contracts, and error-handling routines.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800 self-start md:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Verified n8n Workflows</span>
              </div>
            </div>

            {/* Interactive Workflow Node Explorer across all 3 Projects */}
            <WorkflowInteractiveViewer
              projects={projectsData}
              initialProjectId={activeProjectIdForInspection}
            />

            {/* Interactive Multi-Project Logic & Safety Simulator */}
            <AgentSafetySimulator />

          </div>
        </section>

        {/* Services & Deliverables */}
        <Services onDiscussService={handleDiscussService} />

        {/* How I Work Methodology */}
        <HowIWork onStartProject={handleOpenContact} />

        {/* About Me */}
        <AboutMe />

        {/* Contact & Scope Inquiry */}
        <ContactSection initialServiceInterest={selectedServiceInterest} />
      </main>

      {/* Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Comprehensive Case Study Modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          project={selectedCaseStudy}
          isOpen={true}
          onClose={handleCloseCaseStudy}
          onDiscussProject={handleOpenContact}
        />
      )}
    </div>
  );
}
