class Human {  // Implemented by Minwoo Choo
  constructor() {
    this.walk = true;
    this.rot = 0;
    this.direction = 'backward';
    this.pos = {
      x: 0,
      y: 0,
      z: 0
    }
  }

  drawBody() {
    push();
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
    //pop();

    //push();
    translate(0, 50, 0);
    if (this.walk) {
      rotateX(-sin(rot) * 0.5);
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
    //pop();

    //push();
    translate(0, 50, 10);
    if (this.walk) {
      rotateX(sin(rot) * 0.5);
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
    scale(2);
    translate(this.pos.x, this.pos.y, this.pos.z);

    if (this.direction === 'forward') {
      rotateZ(PI);
    } else if (this.direction === 'backward') {
    } else if (this.direction === 'left') {
      rotateZ(HALF_PI);
    } else if (this.direction === 'right') {
      rotateZ(-HALF_PI);
    }

    this.drawBody();
    this.drawLegs();

    if (this.walk) {
      rot += 0.1;
    }

    pop();
  }
}