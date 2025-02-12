let cols, rows;
let noiseScale = 0.02;
let flowfield;
let particles = [];
let numParticles = 500;
let colorPalette;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / 10);
  rows = floor(height / 10);
  flowfield = new Array(cols * rows);
  colorPalette = [color(255, 0, 100, 100), color(0, 255, 150, 100), color(100, 0, 255, 100)];
  
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
  background(0);
}

function draw() {
  background(0, 5); // Adds more transparency for an ethereal effect
  let yoff = frameCount * 0.002; // Evolving over time
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      flowfield[index] = v;
      xoff += noiseScale;
    }
    yoff += noiseScale;
  }
  
  for (let particle of particles) {
    particle.follow(flowfield);
    particle.update();
    particle.edges();
    particle.show();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = random(1, 4);
    this.size = random(5, 20);
    this.shapeType = random(["ellipse", "rect", "triangle"]);
    this.color = random(colorPalette);
  }
  
  follow(vectors) {
    let x = floor(this.pos.x / 10);
    let y = floor(this.pos.y / 10);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
  
  show() {
    noStroke();
    fill(this.color);
    if (this.shapeType === "ellipse") {
      ellipse(this.pos.x, this.pos.y, this.size);
    } else if (this.shapeType === "rect") {
      rect(this.pos.x, this.pos.y, this.size, this.size);
    } else if (this.shapeType === "triangle") {
      triangle(
        this.pos.x, this.pos.y - this.size / 2,
        this.pos.x - this.size / 2, this.pos.y + this.size / 2,
        this.pos.x + this.size / 2, this.pos.y + this.size / 2
      );
    }
  }
}
