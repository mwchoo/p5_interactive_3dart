class Human {  // Implemented by Minwoo Choo
  constructor() {
    this.walk = false;
    this.direction = 'backward';
    this.pos = {
      x: 0,
      y: 0,
      z: 0
    }
  }

  drawBody() {
    push();
    if (this.walk) {
      rotateY(-sin(rot) * 0.1);
    }
    model(humanModel.body);
    pop();
  }

  drawLegs() {
    push();

    /* LEFT LEG */
    push();
    translate(0, 90, 0);
    if (this.walk) {
      rotateX(sin(rot) * 0.5);
    }
    translate(0, -90, 0);
    model(humanModel.leg_l_h);

    translate(0, 50, 0);
    if (this.walk) {
      rotateX(-sin(rot) * 0.4 + 0.2);
    }
    translate(0, -50, 0);
    model(humanModel.leg_l_l);
    pop();

    /* RIGHT LEG */
    push();
    translate(0, 90, 0);
    if (this.walk) {
      rotateX(-sin(rot) * 0.5);
    }
    translate(0, -90, 0);
    model(humanModel.leg_r_h);

    translate(0, 50, 10);
    if (this.walk) {
      rotateX(sin(rot) * 0.4 + 0.2);
    }
    translate(0, -50, -10);
    model(humanModel.leg_r_l);
    pop();

    pop();
  }

  render() {
    push();
    noStroke();
    rotateZ(PI);
    scale(1);
    translate(this.pos.x, this.pos.y - 80, this.pos.z);

    if (this.direction === 'forward') {
      rotateY(PI);
    } else if (this.direction === 'backward') {
    } else if (this.direction === 'left') {
      rotateY(HALF_PI);
    } else if (this.direction === 'right') {
      rotateY(-HALF_PI);
    }

    this.drawBody();
    this.drawLegs();

    if (this.walk) {
      this.pos.y = sin(rot);
      rot += 0.1;
    }

    pop();
    handleClear();
  }
}

function handleClear() {
  const {x, z} = door.pos;
  if (human.pos.x > x - 60 && human.pos.x < x + 60 &&
    human.pos.z > z - 40 && human.pos.z < z - 20) {
    scene = 1;
    bgColor = color(255, 255, 255);
  }
}