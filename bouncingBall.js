const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 800;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var rightPressed = false;
var leftPressed = false;

function keyUpHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 39) {
    rightPressed = false;
  }
}

function keyDownHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 39) {
    rightPressed = true;
  }
}

ctx.font = "40px defaultFont";

const minWidth = 0;
const maxWidth = 1600;
const minHeight = 0;
const maxHeight = 800;

var ballRadius = 25;
var ballX = 80;
var ballY = 600;

var blockWidth = 100;
var blockHeight = 50;
var blockX = 150;
var blockY = 750;

var block2X = 350;
var block2Y = 700;
var block2Height = 100;

var block3X = 580;
var block3Y = 600;
var block3Height = 200;

var block4X = 800;
var block4Y = 550;
var block4Height = 250;

var block5X = 1050;
var block5Y = 500;
var block5Height = 300;

var block6X = 1300;
var block6Y = 450;
var block6Height = 350;

var doorX = 1300;
var doorY = 350;
var doorRadius = 50;

var moveSpeed = 2.5;
var gravity = 3.5;
var gravity2 = 4;
var ballSpeed = 3.5;

var min = 0;
var sec = 0;
var time = 0;
var tm = "00";
var ts = "00";

var life = 3;

function ball() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.closePath();

  var ballImg = document.getElementById("ball-image");
  ctx.drawImage(
    ballImg,
    ballX - ballRadius,
    ballY - ballRadius,
    ballRadius * 2,
    ballRadius * 2
  );
}

function block() {
  var blockImg = document.getElementById("block-image");

  ctx.fillStyle = "black";
  ctx.drawImage(blockImg, blockX, blockY, 100, 100);

  ctx.drawImage(blockImg, block2X, block2Y, 100, 100);

  ctx.drawImage(blockImg, block3X, block3Y, 100, 100);
  ctx.drawImage(blockImg, block3X, block3Y + 100, 100, 100);

  ctx.drawImage(blockImg, block4X, block4Y, 100, 100);
  ctx.drawImage(blockImg, block4X, block4Y + 100, 100, 100);
  ctx.drawImage(blockImg, block4X, block4Y + 200, 100, 100);

  ctx.drawImage(blockImg, block5X, block5Y, 100, 100);
  ctx.drawImage(blockImg, block5X, block5Y + 100, 100, 100);
  ctx.drawImage(blockImg, block5X, block5Y + 200, 100, 100);
  ctx.drawImage(blockImg, block5X, block5Y + 300, 100, 100);

  ctx.drawImage(blockImg, block6X, block6Y, 100, 100);
  ctx.drawImage(blockImg, block6X, block6Y + 100, 100, 100);
  ctx.drawImage(blockImg, block6X, block6Y + 200, 100, 100);
  ctx.drawImage(blockImg, block6X, block6Y + 300, 100, 100);
}

function door() {
  var doorImg = document.getElementById("door-image");
  ctx.drawImage(doorImg, block6X, block6Y - 140, 100, 140);
}

function bouncing() {
  ballY += ballSpeed;

  if (
    (ballY >= blockY - ballRadius &&
      ballX >= blockX - ballRadius &&
      ballX - ballRadius <= blockX + blockWidth) ||
    (ballY >= block2Y - ballRadius &&
      ballX >= block2X - ballRadius &&
      ballX - ballRadius <= block2X + blockWidth) ||
    (ballY >= block3Y - ballRadius &&
      ballX >= block3X - ballRadius &&
      ballX - ballRadius <= block3X + blockWidth) ||
    (ballY >= block4Y - ballRadius &&
      ballX >= block4X - ballRadius &&
      ballX - ballRadius <= block4X + blockWidth) ||
    (ballY >= block5Y - ballRadius &&
      ballX >= block5X - ballRadius &&
      ballX - ballRadius <= block5X + blockWidth) ||
    (ballY >= block6Y - ballRadius &&
      ballX >= block6X - ballRadius &&
      ballX - ballRadius <= block6X + blockWidth) ||
    (ballY == maxHeight - ballRadius && ballX < blockX)
  ) {
    ballSpeed = -gravity;

    setTimeout(() => {
      ballSpeed = gravity;
    }, 500);
  }
}

function finish() {
  if (ballX >= doorX) {
    alert("Clear! Clear Time : " + tm + " min " + ts + " sec");
    restart();
  }
}
function respawn() {
  ballX = 80;
  ballY = 600;

  life--;

  if (life < 0) {
    restart();
    alert("Game Over. Restart the Game.");
  }
}
function restart() {
  rightPressed = false;
  leftPressed = false;

  ballX = 80;
  ballY = 600;

  min = 0;
  sec = 0;
  time = 0;
  tm = "00";
  ts = "00";

  life = 3;
}

function bug() {
  if (ballY > maxHeight) {
    restart();
    alert("Sorry, Bug Occured. Restart the Game.");
  }
}

function stopwatch() {
  setInterval(function () {
    time++;

    min = Math.floor(time / 60);
    sec = time % 60;
    min = min % 60;

    tm = min;
    ts = sec;

    if (tm < 10) {
      tm = "0" + min;
    }
    if (ts < 10) {
      ts = "0" + sec;
    }
  }, 1000);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#FFFFFF";

  ctx.fillText(tm, 50, 50);
  ctx.fillText(":", 100, 47);
  ctx.fillText(ts, 115, 50);

  ctx.fillText("Your life : " + life, 1350, 50);
  block();
  door();
  ball();
  bouncing();
  finish();
  bug();

  if (rightPressed) {
    ballX += moveSpeed;
  } else if (leftPressed) {
    ballX -= moveSpeed;
  }

  if (ballX > maxWidth - ballRadius) {
    ballX -= moveSpeed;
  } else if (ballX < minWidth + ballRadius) {
    ballX += moveSpeed;
  }

  if (ballY >= blockY - ballRadius && ballX == blockX - ballRadius) {
    ballX -= moveSpeed;
  } else if (
    ballY >= blockY - ballRadius &&
    ballX == blockX + blockWidth + ballRadius
  ) {
    ballX += moveSpeed;
  }

  if (ballY >= block2Y - ballRadius && ballX == block2X - ballRadius) {
    ballX -= moveSpeed;
  } else if (
    ballY >= block2Y - ballRadius &&
    ballX == block2X + blockWidth + ballRadius
  ) {
    ballX += moveSpeed;
  }

  if (ballY >= block3Y - ballRadius && ballX == block3X - ballRadius) {
    ballX -= moveSpeed;
  } else if (
    ballY >= block3Y - ballRadius &&
    ballX == block3X + blockWidth + ballRadius
  ) {
    ballX += moveSpeed;
  }

  if (ballY >= block4Y - ballRadius && ballX == block4X - ballRadius) {
    ballX -= moveSpeed;
  } else if (
    ballY >= block4Y - ballRadius &&
    ballX == block4X + blockWidth + ballRadius
  ) {
    ballX += moveSpeed;
  }

  if (ballY >= block5Y - ballRadius && ballX == block5X - ballRadius) {
    ballX -= moveSpeed;
  } else if (
    ballY >= block5Y - ballRadius &&
    ballX == block5X + blockWidth + ballRadius
  ) {
    ballX += moveSpeed;
  }

  if (ballY >= block6Y - ballRadius && ballX == block6X - ballRadius) {
    ballX -= moveSpeed;
  } else if (
    ballY >= block6Y - ballRadius &&
    ballX == block6X + blockWidth + ballRadius
  ) {
    ballX += moveSpeed;
  }

  if (ballY == maxHeight - ballRadius && ballX > blockX) {
    respawn();
  }
}

setInterval(draw, 10);
stopwatch();
