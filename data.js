export const tech = [];
export const screenshots = [];
export const videos = [];

const projects = [];
const projectList = { projects: [] };

export function loadProjects(name, status, description, liveDemo) {
  const project = {
    name: name,
    status: status,
    description: description,
    technologies: tech,
    screenshots: screenshots,
    videos: videos,
    liveDemo: liveDemo,
  };
  projects.push(project);
}
export function createJson() {
  const projectsJson = JSON.stringify(projects, null, 2);

  return projectsJson;
}
