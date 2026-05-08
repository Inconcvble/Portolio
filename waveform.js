const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";

const position = [];
const barWidth = 4;
const barHeight = 2;

function createPositions() {
  for (let i = 3; i <= canvas.width - 3; i += 5) {
    position.push(i);
  }
  return position;
}

function createColumn(pos, peak) {
  ctx.beginPath();
  for (let i = peak; i < 30; i++) {
    let space = i + 5;
    ctx.rect(pos, i * 2 + space, barWidth, barHeight);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }
  ctx.fill();
}

function columnAtPos() {
  if (!position || position.length === 0) return;
  for (let i = 0; i < position.length; i++) {
    let dynamicPeak = Math.floor(Math.random() * 18) + 10;

    createColumn(position.at(i), dynamicPeak);
  }
}

createPositions();
columnAtPos();
