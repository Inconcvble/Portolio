const tech = [];
const screenshots = [];
const videos = [];

const projects = [];
const projectList = { projects: [] };

function addTech() {
  const value = document.getElementById("technologies").value;
  tech.push(value);
  document.getElementById("technologies").value = "";
}

function addScreenshots() {
  const value = document.getElementById("screenshots").files[0];
  screenshots.push(value);
  document.getElementById("screenshots").value = "";
}

function addVideos() {
  const value = document.getElementById("videos").files[0];
  videos.push(value);
  document.getElementById("videos").value = "";
}

function getProjData() {
  const name = document.getElementById("projectName").value;
  const status = document.getElementById("status").value;
  const description = document.getElementById("description").value;
  const liveDemo = document.getElementById("liveDemo").value;

  loadProjects(name, status, description, liveDemo);
}
function loadProjects(name, status, description, liveDemo) {
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
function createJson() {
  const projectsJson = JSON.stringify(projects, null, 2);

  console.log(projectsJson);
}

createJson();
