// Request animation frame
const requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

// Canvas
const canvas = document.querySelector('#canvas'); //Get the canvas
const ctx = canvas.getContext('2d'); //Get the context

// Set full-screen
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

// Options
const background            = 'rgba(20, 196, 255, 1)';                    // Background color
const particlesPerExplosion = 20;
const particlesMinSpeed     = 3;
const particlesMaxSpeed     = 6;
const particlesMinSize      = 1;
const particlesMaxSize      = 3;
const explosions            = [];

let fps        = 60;
const interval = 1000 / fps;

let now, delta;
let then = Date.now();

// Optimization for mobile devices
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  fps = 29;
}

// // Draw
// function draw() {
//   // Loop
//   requestAnimationFrame(draw);

//   // Set NOW and DELTA
//   now   = Date.now();
//   delta = now - then;

//   // New frame
//   if (delta > interval) {

//     // Update THEN
//     then = now - (delta % interval);

//     // Our animation
//     drawBackground();
//     drawExplosion();

//   }

// }

// Draw explosion(s)
function drawExplosion() {

  if (explosions.length === 0) {
    return;
  }

  for (let i = 0; i < explosions.length; i++) {

    const explosion = explosions[i];
    const particles = explosion.particles;

    if (particles.length === 0) {
      explosions.splice(i, 1);
      return;
    }

    const particlesAfterRemoval = particles.slice();
    for (let ii = 0; ii < particles.length; ii++) {

      const particle = particles[ii];

      // Check particle size
      // If 0, remove
      if (particle.size <= 0) {
        particlesAfterRemoval.splice(ii, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, Math.PI * 2, 0, false);
      ctx.closePath();
      ctx.fillStyle = 'rgb(' + particle.r + ',' + particle.g + ',' + particle.b + ')';
      ctx.fill();

      // Update
      particle.x += particle.xv;
      particle.y += particle.yv;
      particle.size -= .1;
    }

    explosion.particles = particlesAfterRemoval;

  }

}

// Draw the background
function drawBackground() {
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Key Pressed Down
function keyPressdown(xPos,yPos) {

//   let xPos, yPos;

//   if (e.offsetX) {
//     xPos = e.offsetX;
//     yPos = e.offsetY;
//   } else if (e.layerX) {
//     xPos = e.layerX;
//     yPos = e.layerY;
//   }
  console.log(xPos, yPos)

  explosions.push(
    new explosion(xPos, yPos)
  );

}

// Explosion
function explosion(x, y) {

  this.particles = [];

  for (let i = 0; i < particlesPerExplosion; i++) {
    this.particles.push(
      new particle(x, y)
    );
  }

}

// Particle
function particle(x, y) {
  this.x    = x;
  this.y    = y;
  this.xv   = randInt(particlesMinSpeed, particlesMaxSpeed, false);
  this.yv   = randInt(particlesMinSpeed, particlesMaxSpeed, false);
  this.size = randInt(particlesMinSize, particlesMaxSize, true);
  this.r    = randInt(113, 222);
  this.g    = '00';
  this.b    = randInt(105, 255);
}

// Returns an random integer, positive or negative
// between the given value
function randInt(min, max, positive) {

  let num;
  if (positive === false) {
    num = Math.floor(Math.random() * max) - min;
    num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
  } else {
    num = Math.floor(Math.random() * max) + min;
  }

  return num;

}
console.log('hi')

//On-click
document.querySelector('canvas').onclick = function (e) {
    console.log(e)
    keyPressdown(e);
};