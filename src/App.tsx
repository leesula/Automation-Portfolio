import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { FeaturedProjects } from './components/FeaturedProjects';
import { HowItHelpsYourBusiness } from './components/HowItHelpsYourBusiness';
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
    handleNavigateSection('how-it-helps');
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

            {/* Client-Focused Section: How It Helps Your Business */}
            <HowItHelpsYourBusiness
              projects={projectsData}
              initialProjectId={activeProjectIdForInspection}
              onSelectProject={(slug) => navigateTo({ type: 'project-detail', slug })}
              onDiscussProject={(title) => handleOpenContact(title)}
            />

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
