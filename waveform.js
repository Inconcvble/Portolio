const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "rgb(5, 5, 15)";

const ctx = canvas.getContext("2d");

const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
gradient.addColorStop(0, "#800080");
gradient.addColorStop(1, "#ff0000");

ctx.fillStyle = gradient;

const position = [];
const barWidth = 9;
const barHeight = 10;

function createPositions() {
  for (let i = 10; i <= canvas.width - 10; i += 10) {
    position.push(i);
  }
}

function createColumn(pos, peak) {
  ctx.beginPath();
  for (let i = peak; i < 30; i++) {
    let space = i;
    ctx.rect(pos, i * 12 + space, barWidth, barHeight);
  }
  ctx.fill();
}

function columnAtPos() {
  if (!position || position.length === 0) return;
  for (let i = 0; i < position.length; i++) {
    let dynamicPeak = Math.floor(Math.random() * 19) + 5;

    createColumn(position.at(i), dynamicPeak);
  }
}

createPositions();
columnAtPos();
