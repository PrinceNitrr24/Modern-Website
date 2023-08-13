const canvas1 = document.createElement("canvas");
canvas1.className = "canvas1";
document.body.appendChild(canvas1);
const ctx1 = canvas1.getContext("2d");
canvas1.style.position = "fixed";
canvas1.style.top = "0";
canvas1.style.left = "0";
canvas1.style.pointerEvents = "none";

canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;
let spots1 = [];
let hue1 = 0;

const mouse1 = {
  // Rename the 'mouse' variable to 'mouse1'
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  mouse1.x = event.clientX;
  mouse1.y = event.clientY;
  for (let i = 0; i < 10; i++) {
    spots1.push(new Particle1()); // Rename Particle to Particle1
  }
});

class Particle1 {
  // Rename Particle to Particle1
  constructor() {
    this.x = mouse1.x;
    this.y = mouse1.y;
    this.size = Math.random() * 2 + 0.1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = "hsl(" + hue1 + ",100%,50%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.1) this.size -= 0.01;
  }
  draw() {
    ctx1.fillStyle = this.color;
    ctx1.beginPath();
    ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx1.fill();
  }
}

function handleParticle() {
  for (let i = 0; i < spots1.length; i++) {
    spots1[i].update();
    spots1[i].draw();
    for (let j = i; j < spots1.length; j++) {
      const dx = spots1[i].x - spots1[j].x;
      const dy = spots1[i].y - spots1[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 90) {
        ctx1.beginPath();
        ctx1.strokeStyle = spots1[i].color;
        ctx1.lineWidth = spots1[i].size / 10;
        ctx1.moveTo(spots1[i].x, spots1[i].y);
        ctx1.lineTo(spots1[j].x, spots1[j].y);
        ctx1.stroke();
      }
    }
    if (spots1[i].size <= 0.3) {
      spots1.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  handleParticle();
  hue1++;
  requestAnimationFrame(animate);
}

window.addEventListener("resize", function () {
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;
});

animate();
