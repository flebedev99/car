const gameArea = document.getElementById("road");
const car = document.getElementById("plr");
const distance = document.getElementById("distance");
let score = 0;
let line;
let ncar;
let lineY = 0;
let carX = 205;
let carY = 5;
let carS = 150;
let carR = 0;
let carW = 75;
let carH = 150;
let ncarX = Math.random() * 400;
let ncarY = 600;
let measureIn = "m";
let changeBy = carS / 15000;
let gameOver = false;

function createLine() {
  line = document.createElement("div");
  line.style.borderLeft = "dashed white 10px";
  line.style.borderRight = "dashed white 10px";
  line.style.width = "175px";
  line.style.height = "1000px";
  line.style.left = "150px";
  line.style.bottom = -lineY + "px";
  line.style.margin = "auto";
  line.style.position = "absolute";
  line.style.zIndex = "0";
  gameArea.appendChild(line);
}
function createCars() {
  ncar = new Image(90);
  ncar.src = "src/Car.png";
  ncar.style.borderRadius = "30px";
  ncar.style.transform = "rotate(180deg)";
  ncar.style.left = ncarX + "px";
  ncar.style.bottom = ncarY + "px";
  ncar.style.position = "absolute";
  ncar.style.zIndex = 2;
  ncar.style.filter = "sepia(1)";
  gameArea.appendChild(ncar);
}
function updateLine() {
  lineY += 1;
  line.style.bottom = -lineY + "px";
  window.scrollY = 0;
  if (lineY > 200) {
    lineY = -20;
    line.remove();
    createLine();
  }
}
function updatePlayer() {
  if (carX < 50) {
    carX = 50;
  }
  if (carX > 350) {
    carX = 350;
  }
  car.style.left = carX + "px";
  car.style.transform = "rotate(" + carR + "deg)";
}
createLine();
function animationLoop() {
  updateLine();
  if (gameOver === true) {
    return;
  }
  setTimeout(animationLoop, 1);
}
document.addEventListener("keydown", function (k) {
  if (k.keyCode === 37) {
    carX -= carS;
    carR = -50;
  } else if (k.keyCode === 39) {
    carX += carS;
    carR = 50;
  }
  if (k.keyCode === 82) {
    ncar.remove();
    score = 0;
    lineY = 0;
    carX = 205;
    carY = 5;
    carS = 150;
    carR = 0;
    ncarX = Math.random() * 400;
    ncarY = 600;
    measureIn = "m";
    changeBy = carS / 15000;
    gameOver = false;
    startGame();
  }
});
//Reset rotation
document.body.onkeyup = function () {
  carR = 0;
};
function gameLoop() {
  updatePlayer();
  updateCars();
  Distance();
  collision();
  if (gameOver === true) {
    return;
  }
  setTimeout(gameLoop, 1);
}
function Distance() {
  score += changeBy;
  distance.innerText = score.toFixed(1) + measureIn;
  if (Math.round(score) > 999) {
    measureIn = "km";
    score = 1;
    changeBy = 1 / 1000;
  }
}
function updateCars() {
  ncarY -= 2;
  if (ncarY < -150) {
    ncar.remove();
    ncarY = 600;
    ncarX = Math.random() * 400;
    createCars();
  }
  ncar.style.left = ncarX + "px";
  ncar.style.bottom = ncarY + "px";
}
function collision() {
  if (
    carY < ncarY + carH &&
    carH + carY > ncarY &&
    carX < ncarX + carW &&
    carW + carX > ncarX
  ) {
    gameOver = true;
  }
}
function startGame() {
  createCars();
  gameLoop();
  animationLoop();
}
startGame();
