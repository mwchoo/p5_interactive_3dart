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

    for (let i = 0; i < 3; i++) { // triangle vertices
      let x = this.radius * cos(i * TWO_PI / 3.0 - HALF_PI);
      let y = this.radius * sin(i * TWO_PI / 3.0 - HALF_PI);
      this.trianglePoints[i] = {
        x, y
      };
    }
  }

  render() {
    const {x, y, z} = this.pos;
    push();
    translate(x, y + 80, z);
    rotateX(HALF_PI);
    noFill();
    stroke(200);
    strokeWeight(5);

    this.currentRad = 0.5 + 0.5 * sin(millis() / 1000.0);
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
  }
}

function initButtomMark() {
  for (let i = 0; i < NUM_OF_BOTTOMMARK; i++) {
    const markpos = (door.pos.z / (NUM_OF_BOTTOMMARK + 1)) * (i + 1);
    console.log(markpos);
    bottomMark.push(new BottomMark(0, 0, markpos));
  }
}

function drawBottomMark() {
  for (let i = 0; i < NUM_OF_BOTTOMMARK; i++) {
    bottomMark[i].render();
  }
}