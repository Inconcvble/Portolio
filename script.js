const projectsGrid = document.getElementById("projects-grid");

const response = await fetch("https://portfolio-zcu0.onrender.com");
const projects = await response.json();

const racer = document.querySelector(".racer");

projects.forEach((project) => {
  console.log(project);
  const projectCard = document.createElement("div");
  const projectBody = document.createElement("div");
  const projectThumbnail = document.createElement("div");
  const projectTag = document.createElement("span");
  const projectName = document.createElement("h3");
  const projectDesc = document.createElement("p");
  const projectStatus = document.createElement("p");

  projectCard.classList.add("project-card");
  projectThumbnail.classList.add("project-thumb");
  projectBody.classList.add("project-body");
  projectTag.classList.add("project-tag");

  projectTag.textContent = project.technologies.join(" / ");
  projectName.textContent = project.name;
  projectDesc.textContent = project.description;
  projectStatus.textContent = project.status;

  if (project.screenshots.length > 0) {
    const projectThumbImg = document.createElement("img");
    projectThumbImg.src = `http://localhost:3000/uploads/${project.screenshots[0]}`;
    projectThumbnail.appendChild(projectThumbImg);
  }

  projectBody.appendChild(projectTag);
  projectBody.appendChild(projectName);
  projectBody.appendChild(projectDesc);
  projectBody.appendChild(projectStatus);

  if (project.liveDemo !== "") {
    const projectLink = document.createElement("a");

    projectLink.classList.add("project-demo-link");
    projectLink.classList.add("btn-ghost");

    projectLink.href = project.liveDemo;
    projectLink.textContent = "View now";
    projectLink.style.width = "fit-content";
    projectBody.appendChild(projectLink);
  }

  projectCard.appendChild(projectThumbnail);
  projectCard.appendChild(projectBody);

  projectsGrid.appendChild(projectCard);
});

function runRacer() {
  racer.style.animation = "racerScroll 15s forwards";
  racer.addEventListener(
    "animationend",
    () => {
      racer.style.animation = "none";
      setTimeout(() => {
        runRacer();
      }, 20000);
    },
    { once: true },
  );
}

runRacer();
