let cols, rows;
let noiseScale = 0.02;
let flowfield;
let particles = [];
let numParticles = 500;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / 10);
  rows = floor(height / 10);
  flowfield = new Array(cols * rows);
  
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
  background(0);
}

function draw() {
  background(0, 10); 
  let yoff = frameCount * 0.001;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff) * TWO_PI * 2;
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
    this.maxSpeed = 2;
    this.prevPos = this.pos.copy();
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
    this.prevPos.set(this.pos);
  }
  
  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
  
  show() {
    stroke(255, 50);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  }
}