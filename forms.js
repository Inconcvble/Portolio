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

  loadProjects(name, status, description, liveDemo);
  createJson();
}
