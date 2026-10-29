import React, { useState, useEffect } from 'react';
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
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { AllProjectsPage } from './components/AllProjectsPage';
import { projectsData } from './data/projects';
import { Project } from './types/portfolio';
import { AppRoute, parseCurrentRoute, formatRouteUrl } from './utils/route';

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseCurrentRoute());
  const [activeProjectIdForInspection, setActiveProjectIdForInspection] = useState<string>(projectsData[0].id);
  const [selectedServiceInterest, setSelectedServiceInterest] = useState<string | undefined>(undefined);

  // Sync route on browser back/forward or hash change
  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(parseCurrentRoute());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (newRoute: AppRoute) => {
    const url = formatRouteUrl(newRoute);
    window.history.pushState(null, '', url);
    setRoute(newRoute);

    if (newRoute.type === 'home' && newRoute.section) {
      setTimeout(() => {
        const el = document.getElementById(newRoute.section!);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    if (route.type !== 'home') {
      navigateTo({ type: 'home', section: sectionId });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenContact = (interest?: string) => {
    if (interest) {
      setSelectedServiceInterest(interest);
    }
    handleNavigateSection('contact');
  };

  const handleInspectWorkflows = (project: Project) => {
    setActiveProjectIdForInspection(project.id);
    handleNavigateSection('architecture');
  };

  const handleDiscussService = (serviceTitle: string) => {
    setSelectedServiceInterest(serviceTitle);
    handleNavigateSection('contact');
  };

  // Find target project for project detail page
  const currentProjectSlug = route.type === 'project-detail' ? route.slug : undefined;
  const currentProject = currentProjectSlug
    ? projectsData.find(p => p.slug === currentProjectSlug || p.id === currentProjectSlug)
    : undefined;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-200">
      {/* Top Navigation Bar with Improved Projects Menu */}
      <Navbar
        projects={projectsData}
        currentRoute={
          route.type === 'project-detail' 
            ? `project/${route.slug}` 
            : route.type === 'projects' 
            ? 'projects' 
            : 'home'
        }
        onOpenContact={() => handleOpenContact()}
        onNavigateSection={handleNavigateSection}
        onNavigateProjects={() => navigateTo({ type: 'projects' })}
        onSelectProject={(slug) => navigateTo({ type: 'project-detail', slug })}
        onNavigateHome={() => navigateTo({ type: 'home' })}
      />

      <main className="flex-1">
        {/* VIEW 1: Dedicated Individual Project Case Study Page */}
        {route.type === 'project-detail' && currentProject ? (
          <ProjectDetailPage
            project={currentProject}
            allProjects={projectsData}
            onBackToProjects={() => navigateTo({ type: 'projects' })}
            onSelectProject={(slug) => navigateTo({ type: 'project-detail', slug })}
            onDiscussProject={(title) => handleOpenContact(title || currentProject.title)}
          />
        ) : route.type === 'projects' ? (
          /* VIEW 2: Complete All Projects Catalog Page */
          <AllProjectsPage
            projects={projectsData}
            onSelectProject={(slug) => navigateTo({ type: 'project-detail', slug })}
            onBackToHome={() => navigateTo({ type: 'home' })}
            onOpenContact={(title) => handleOpenContact(title)}
            onOpenFlowViewer={handleInspectWorkflows}
          />
        ) : (
          /* VIEW 3: Main Landing Page (with Shortened Featured Projects section) */
          <>
            {/* Hero Section */}
            <Hero
              onExploreProjects={() => handleNavigateSection('projects')}
              onDiscussProject={() => handleOpenContact()}
              onOpenCaseStudy={(project) => navigateTo({ type: 'project-detail', slug: project.slug })}
              projects={projectsData}
            />

            {/* Shortened Featured Projects Gallery (3-4 concise cards + View All Projects CTA) */}
            <FeaturedProjects
              projects={projectsData}
              onSelectProject={(project) => navigateTo({ type: 'project-detail', slug: project.slug })}
              onViewAllProjects={() => navigateTo({ type: 'projects' })}
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

                {/* Interactive Workflow Node Explorer */}
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
            <HowIWork onStartProject={() => handleOpenContact()} />

            {/* About Me */}
            <AboutMe />

            {/* Contact & Scope Inquiry */}
            <ContactSection initialServiceInterest={selectedServiceInterest} />
          </>
        )}
      </main>

      {/* Persistent Footer */}
      <Footer onNavigateSection={handleNavigateSection} />
    </div>
  );
}
