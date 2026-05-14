document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => e.preventDefault());
});

const tech = [];
const screenshots = [];
const videos = [];

const response = await fetch("http://localhost:3000/projects");
const projects = await response.json();

const updateProj = document.querySelector(".updatedProject");
const newProj = document.querySelector(".newProject");

document
  .querySelector(".newProject form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

const btnActiveAdd = document.getElementById("btnShowAdd");
const btnActiveUpdate = document.getElementById("btnShowUpdate");
const btnUpdatedSubmit = document.getElementById("updatedSubmit");
const btnBack = document.createElement("button");

const btnTech = document.getElementById("addMoreTech");

btnTech.addEventListener("click", function (event) {
  event.preventDefault();
  addTech();
});

const btnSnap = document.getElementById("addMoreScreenshots");

btnSnap.addEventListener("click", function (event) {
  event.preventDefault();
  addScreenshots();
});

const btnVid = document.getElementById("addMoreVids");

btnVid.addEventListener("click", function (event) {
  event.preventDefault();
  addVideos();
});

function addTech() {
  const techInput = document.getElementById("technologies");
  const currentValue = techInput.value;

  if (currentValue === "") return;

  const newInput = document.createElement("input");
  newInput.name = "techItem[]";
  newInput.value = currentValue;

  techInput.parentElement.appendChild(newInput);
  techInput.value = "";
}

function addScreenshots() {
  const snapElement = document.getElementById("screenshots");
  const file = snapElement.files[0];

  if (!file) return;

  screenshots.push(file);
  snapElement.value = "";
}

function addVideos() {
  const vidElement = document.getElementById("videos");
  const file = vidElement.files[0];

  if (!file) return;

  videos.push(file);
  vidElement.value = "";
}

const btnSubmit = document.getElementById("submit");

btnSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Submitting");
  getProjData();
});

function getProjData() {
  const name = document.getElementById("projectName").value;
  const status = document.getElementById("status").value;
  const description = document.getElementById("description").value;
  const liveDemo = document.getElementById("liveDemo").value;

  const techInput = document.getElementById("technologies");
  if (techInput.value !== "") {
    tech.push(techInput.value);
  }
  const techIns = document.getElementsByName("techItem[]");
  const allTechValues = Array.from(techIns).map((techIn) => techIn.value);
  tech.push(...allTechValues);

  const snapElement = document.getElementById("screenshots");
  if (snapElement.files[0]) {
    screenshots.push(snapElement.files[0]);
  }

  const vidElement = document.getElementById("videos");
  if (vidElement.files[0]) {
    videos.push(vidElement.files[0]);
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("status", status);
  formData.append("technologies", tech);
  screenshots.forEach((file) => formData.append("screenshots", file));
  videos.forEach((file) => formData.append("videos", file));
  formData.append("liveDemo", liveDemo);
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  fetch("http://localhost:3000/addProject", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      tech.length = 0;
      screenshots.length = 0;
      videos.length = 0;
    })
    .catch((err) => console.error(err));
}

btnBack.textContent = "Back";
btnBack.style.display = "none";

document.body.appendChild(btnBack);

btnActiveAdd.addEventListener("click", function (event) {
  event.preventDefault();
  newProj.classList.add("active");

  btnActiveAdd.style.display = "none";
  btnActiveUpdate.style.display = "none";
  btnBack.style.display = "block";
});

btnActiveUpdate.addEventListener("click", async function (event) {
  event.preventDefault();
  updateProj.classList.add("active");

  const response = await fetch("http://localhost:3000/projects");
  const freshProjects = await response.json();

  const updatedProjectSelect = document.getElementById("updatedProjectSelect");

  updatedProjectSelect.innerHTML =
    '<option value="">-- Select a project --</option>';

  freshProjects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.name;
    updatedProjectSelect.appendChild(option);
  });

  updatedProjectSelect.addEventListener("change", function () {
    const selectedId = updatedProjectSelect.value;
    const selectedProject = freshProjects.find((p) => p.id === selectedId);

    if (!selectedProject) return;

    document.getElementById("updatedProjectName").value = selectedProject.name;
    document.getElementById("updatedDescription").value =
      selectedProject.description;
    document.getElementById("updatedStatus").value = selectedProject.status;
    document.getElementById("updatedTechnologies").value =
      selectedProject.technologies.join(", ");
    document.getElementById("updatedLiveDemo").value = selectedProject.liveDemo;
  });
  btnActiveAdd.style.display = "none";
  btnActiveUpdate.style.display = "none";
  btnBack.style.display = "block";
});

btnBack.addEventListener("click", function (event) {
  event.preventDefault();
  newProj.classList.remove("active");
  updateProj.classList.remove("active");

  btnActiveAdd.style.display = "inline";
  btnActiveUpdate.style.display = "inline";

  btnBack.style.display = "none";
});

btnUpdatedSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  updateProjData();
});

function updateProjData() {
  console.log("Submitting");
  const id = document.getElementById("updatedProjectSelect").value;
  const name = document.getElementById("updatedProjectName").value;
  const status = document.getElementById("updatedStatus").value;
  const description = document.getElementById("updatedDescription").value;
  const liveDemo = document.getElementById("updatedLiveDemo").value;

  const techInput = document.getElementById("updatedTechnologies");
  const techValues = techInput.value.split(",").map((t) => t.trim());
  tech.push(...techValues);

  const snapElement = document.getElementById("updatedScreenshots");
  if (snapElement.files[0]) {
    screenshots.push(snapElement.files[0]);
  }

  const vidElement = document.getElementById("videos");
  if (vidElement.files[0]) {
    videos.push(vidElement.files[0]);
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("status", status);
  formData.append("technologies", tech);
  screenshots.forEach((file) => formData.append("screenshots", file));
  videos.forEach((file) => formData.append("videos", file));
  formData.append("liveDemo", liveDemo);

  fetch("http://localhost:3000/updateProject", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      name,
      description,
      status,
      technologies: tech,
      liveDemo,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      tech.length = 0;
      screenshots.length = 0;
      videos.length = 0;
    })
    .catch((err) => console.error(err));
}
