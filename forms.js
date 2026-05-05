import { tech, screenshots, videos, loadProjects, createJson } from "./data.js";

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

  const currentValue = file.name;

  if (currentValue === "") return;

  const newInput = document.createElement("input");
  newInput.name = "snapItem[]";
  newInput.value = currentValue;

  snapElement.parentElement.appendChild(newInput);
  snapElement.value = "";
}

function addVideos() {
  const vidElement = document.getElementById("videos");
  const file = vidElement.files[0];
  const currentValue = file.name;

  if (currentValue === "") return;

  const newInput = document.createElement("input");
  newInput.name = "vidItem[]";
  newInput.value = currentValue;

  vidElement.parentElement.appendChild(newInput);
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
    screenshots.push(snapElement.files[0].name);
  }
  const snapIns = document.getElementsByName("snapItem[]");
  const allSnapValues = Array.from(snapIns).map((snapIn) => snapIn.value);
  screenshots.push(...allSnapValues);

  const vidElement = document.getElementById("videos");
  if (vidElement.files[0]) {
    videos.push(vidElement.files[0].name);
  }
  const vidIns = document.getElementsByName("vidItem[]");
  const allVidValues = Array.from(vidIns).map((vidIn) => vidIn.value);
  videos.push(...allVidValues);

  loadProjects(name, status, description, liveDemo);
  createJson();
}
