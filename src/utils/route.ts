export type AppRoute =
  | { type: 'home'; section?: string }
  | { type: 'projects' }
  | { type: 'project-detail'; slug: string };

export function parseCurrentRoute(): AppRoute {
  // Check hash first (e.g. #/projects, #/project/sales-pipeline-automation, #projects)
  const hash = window.location.hash.replace(/^#\/?/, '');
  const pathname = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');

  // Determine path from pathname or hash
  const path = pathname || hash;

  if (path.startsWith('project/')) {
    const slug = path.replace(/^project\//, '');
    if (slug) {
      return { type: 'project-detail', slug };
    }
  }

  if (path === 'projects' || hash === 'projects') {
    return { type: 'projects' };
  }

  // Check if hash matches a known section on home
  if (['projects', 'architecture', 'services', 'methodology', 'about', 'contact', 'hero'].includes(hash)) {
    return { type: 'home', section: hash };
  }

  return { type: 'home' };
}

export function formatRouteUrl(route: AppRoute): string {
  switch (route.type) {
    case 'home':
      return route.section ? `/#${route.section}` : '/';
    case 'projects':
      return '/projects';
    case 'project-detail':
      return `/project/${route.slug}`;
  }
}
