let door = undefined;

class Door {
  constructor() {
    this.pos = {
      x: 0,
      y: 0,
      z: -2000
    }
  }

  drawBorder() {
    push();
    specularMaterial(50, 50, 50);
    shininess(20);

    push();
    translate(0, -127, 0);
    box(125, 5, 15);
    pop();

    push();
    translate(0, 127, 0);
    box(120, 3, 15);
    pop();

    push();
    translate(-60, 2, 0);
    box(5, 254, 15);
    pop();

    push();
    translate(60, 2, 0);
    box(5, 254, 15);
    pop();

    pop();
  }

  drawDoorLeaf() {
    push();
    translate(-100, -3, 50);
    rotateY(HALF_PI/2);
    specularMaterial(50, 50, 50);
    shininess(20);
    box(120, 250, 5);
    pop();
  }

  drawOutside() {
    push();
    emissiveMaterial(255, 255, 255);
    //specularMaterial(255);
    //shininess(20);
    box(120, 250, 5);
    pop();
  }

  render() {
    const {x, y, z} = this.pos;
    push();
    noStroke();
    translate(x, y - 50, z)

    this.drawBorder();
    this.drawDoorLeaf();
    this.drawOutside();
    pop();
  }
}

function drawDoor() {
  // ToDo. add lights!
  door.render();
}