const projects = ["Psychwave", "DND", "Ogre Bloodkour"];

const projectList = { projects: [] };

projects.forEach((project, index) => {
  projectList.projects.push({
    id: index + 1,
    name: project,
  });
});

const projectsJson = JSON.stringify(projectList, null, 2);

console.log(projectsJson);
