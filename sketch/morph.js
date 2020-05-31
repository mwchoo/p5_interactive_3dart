let bottomMark = [];
const NUM_OF_BOTTOMMARK = 3;

class BottomMark {
  constructor(x, y, z) {
    this.pos = {
      x: x,
      y: y,
      z: z
    }
    this.radius = 50;
    this.trianglePoints = [];
    this.currentRad = 0.1;
    this.mode = 0; // 0: triangle, 1: tri to cir, 2: circle
    this.activated = false;

    for (let i = 0; i < 3; i++) { // triangle vertices
      let x = this.radius * cos(i * TWO_PI / 3.0 - HALF_PI);
      let y = this.radius * sin(i * TWO_PI / 3.0 - HALF_PI);
      this.trianglePoints[i] = {
        x, y
      };
    }
  }

  handleBottomMark() {
    const {x, y, z} = this.pos;
    console.log(this.pos);
    console.log(human.pos);
    if (human.pos.x > x - this.radius / 2 && human.pos.x < x + this.radius / 2 &&
      human.pos.z > z - this.radius / 2 && human.pos.z < z + this.radius / 2) {
      this.activated = true;
    }
  }

  render() {
    const {x, y, z} = this.pos;
    push();
    translate(x, y + 80, z);
    rotateX(HALF_PI);
    noFill();

    if (this.activated) {
      if (this.mode === 2) {
        stroke(0, 250, 0);
      } else {
        stroke(250, 0, 0);
      }
    } else {
      stroke(200);
    }
    strokeWeight(5);

    if (this.mode === 0) { // triangle
      this.currentRad = 0.1;
    } else if (this.mode === 1) { // tri to cir
      this.currentRad += 0.02;
      if (this.currentRad > 1) {
        this.mode = 2;
      }
    } else if (this.mode === 2) { // circle
      this.currentRad = 1;
    } else { // default
      this.currentRad = 0.5 + 0.5 * sin(millis() / 1000.0);
    }
    let rad = this.currentRad * this.radius;

    beginShape();
    for (let i = 0; i < 3; i++) {
      let px = map(this.currentRad, 0, 1, this.trianglePoints[i].x, 0);
      let py = map(this.currentRad, 0, 1, this.trianglePoints[i].y, 0);

      let ang1 = (i + 1) * TWO_PI / 3.0 + HALF_PI;
      let ang2 = (i + 2) * TWO_PI / 3.0 + HALF_PI;
      let dang = (ang2 - ang1) / 60.0;
      for (let t = ang1; t <= ang2; t += dang) {
        let ax = px + rad * cos(t);
        let ay = py + rad * sin(t);
        vertex(ax, ay);
      }
    }
    endShape(CLOSE);
    pop();

    this.handleBottomMark();
  }
}

function initButtomMark() {
  for (let i = 0; i < NUM_OF_BOTTOMMARK; i++) {
    const markpos = (door.pos.z / (NUM_OF_BOTTOMMARK + 1)) * (i + 1);
    bottomMark.push(new BottomMark(0, 0, markpos));
  }
}

function drawBottomMark() {
  for (let i = 0; i < NUM_OF_BOTTOMMARK; i++) {
    bottomMark[i].render();
  }
}