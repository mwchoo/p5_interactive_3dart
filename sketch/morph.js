let bottomMark = [];
const NUM_OF_BOTTOMMARK = 5;

let curMolphScene = 0; // 0 to NUM_OF_BOTTOM_MARK
let molphobj;
let molphtimer;

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
    const {x, z} = this.pos;
    if (human.pos.x > x - this.radius / 2 && human.pos.x < x + this.radius / 2 &&
      human.pos.z > z - this.radius / 2 && human.pos.z < z + this.radius / 2) {
      this.activated = true;
      if (this.mode === 0) {
        molphobj.show = true;
        if (molphobj.molphStep >= 1) {
          if (!molphtimer.activated) {
            molphtimer.setTimer();
          }
          if (molphtimer.checkTimeout()) {
            this.mode = 1;
          }
        } else {
          molphobj.molphStep += 0.01;
        }
      }
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
      if (this.currentRad > 1) { // transform done
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

class Molph {
  constructor() {
    this.initMolph();
    this.show = false;
  }

  initMolph() {
    this.pos = [];
    this.circle = [];
    this.morph = [];
    this.morphtarget = [];
    this.morphDetail = 0;
    this.molphStep = 0; // 0 to 1
  }

  readData(uri) {
    fetch(uri)
      .then(response => response.text())
      .then(text => this.loadMorphTarget(text))
  }

  loadMorphTarget(data) {
    // load target geometry
    this.initMolph();
    this.lines = split(data, '\n');
    for (let i = 0; i < this.lines.length; i++) {
      let pieces = split(this.lines[i], '\t');
      if (pieces.length < 2) break;
      let v = new p5.Vector(parseInt(pieces[0]),
        parseInt(pieces[1]));
      this.morphtarget.push(v);
      this.morph.push(new p5.Vector());
      this.morphDetail++;
    }
    // set circle vertices
    let angle = -PI;
    for (let i = 0; i < this.morphDetail; i++) {
      let x = width / 2 + 200 * cos(angle);
      let y = height / 2 + 200 * sin(angle);
      let v = new p5.Vector(x, y);
      this.circle.push(v);
      angle += TWO_PI / this.morphDetail;
    }
  }

  render() {
    if (!this.show) return;
    push();
    // morphing
    scale(0.5)
    translate(0, -(height * 2 / 3), human.pos.z * 2 - 10);

    let morphed = this.molphStep; //map(mouseX, 0, width, 0, 1);
    for (let i = 0; i < this.morphDetail; i++) {
      let o = this.circle[i];
      let t = this.morphtarget[i];
      this.morph[i] = p5.Vector.lerp(o, t, morphed);
    }

    // render morphed geometry
    beginShape();
    noFill();
    stroke(128);
    strokeWeight(4);
    for (let i = 0; i < this.morphDetail; i++) {
      let v = this.morph[i];
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    pop();
  }
}

function initMolph() {
  molphobj = new Molph();
  handleMolph();
  molphtimer = new Timer(3000, molphExpired);
}

function handleMolph() {
  const index = curMolphScene % NUM_OF_BOTTOMMARK;
  molphobj.readData('assets/out' + index.toString() + '.txt');
  if (curMolphScene === NUM_OF_BOTTOMMARK) {
    sounds.bgm.stop();
    if (!car_acc_played && !sounds.car_acc.isPlaying()) {
      sounds.car_acc.play();
      car_acc_played = true;
    }
  }
}

function molphExpired() {
  molphobj.molphStep = 0;
  molphobj.show = false;
  curMolphScene++;
  handleMolph();
}

function handleHeartbeat() {
  if (scene === 0 && curMolphScene === NUM_OF_BOTTOMMARK) {
    // ToDo. play heartbeat
    bgColor = color(sin(millis() * 0.01) * 100, 0, 0);
    if (!sounds.heartbeat.isPlaying()) {
      sounds.heartbeat.play();
    }
  }
}