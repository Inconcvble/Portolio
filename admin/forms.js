const tech = [];
const screenshots = [];
const videos = [];

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
