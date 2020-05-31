/*
2020-1 Computer Grapics :: PROJECT 9 - INTERACTIVE 3D ART
20141150 Minwoo Choo

< MANUAL >
ARROW_UP Key: go forward
ARROW_DOWN Key: go backward

Mouse Move: cam angle

P Key: screen shot
*/

let scene = 0;
let pov_mode = 0;
let sounds = {
  bgm: undefined,
  walk: undefined,
  beep: undefined
}
let textures = {}
let image_scene = {};
let line_data = [];
let humanModel = {
  body: undefined,
  leg_l_h: undefined,
  leg_l_l: undefined,
  leg_r_h: undefined,
  leg_r_l: undefined
};
let human;
//let scene_timer;
let rot = 0;

let X = 160;  // 0;
let Y = -200;  // 0;
let Z = 500;  //1700;
let centerX = 0;
let centerY = -100;
let centerZ = -2000;
let h = 20;

let spotPos, spotDir, modelPos;
let mrot, srot;

document.onselectstart = function () {
  // prevent mouse drag or text/element selection
  window.getSelection().removeAllRanges();
};

function preload() {
  //sounds.bgm = loadSound('assets/bgm.mp3');
  sounds.walk = loadSound('assets/walk.mp3');
  humanModel.body = loadModel('assets/body.obj');
  humanModel.leg_l_h = loadModel('assets/leg_l_h.obj');
  humanModel.leg_l_l = loadModel('assets/leg_l_l.obj');
  humanModel.leg_r_h = loadModel('assets/leg_r_h.obj');
  humanModel.leg_r_l = loadModel('assets/leg_r_l.obj');
}

function setup() {
  // const blinder = document.getElementById('blinder');
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(RGB, 255, 255, 255, 1);
  /*
  gl = this._renderer.GL;
  gl.disable(gl.DEPTH_TEST);*/

  //scene_timer = new Timer(3000, handleScene);

  spotPos = new p5.Vector(-1000, 2000, 200);
  modelPos = new p5.Vector(-200, 1000, 0);
  mrot = 0;
  srot = 0;

  human = new Human();
  door = new Door();
  initButtomMark();
  initMolph();
  //readData();
  // sounds.bgm.play();
  // blinder.style.opacity = '0';
}

function draw() {
  background(0);

  // light setting
  lights();
  pointLight(100, 100, 100, sin(srot) * 4000, -1300, cos(srot) * 100 - 100);

  srot += 0.01;
  spotPos.x = 200 * cos(srot);
  spotPos.y = 200 * sin(srot);
  spotDir = p5.Vector.sub(modelPos, spotPos);
  spotLight(0, 100, 100, spotPos, spotDir, radians(90), 1);

  // camera setting
  camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);

  // scene control
  if (scene === 0) {
    // walks to the door
  } else if (scene === 1) {
    // ending
  }

  human.render();
  drawDoor();
  drawBottomMark();
  molphobj.render();

  /*if (!sounds.bgm.isPlaying()) {
    getAudioContext().resume();
    sounds.bgm.play();
  }*/

  //handleDisplay();
  handleKeyDown();
  handlePov();
}

function handlePov() {
  if (pov_mode === 0) {
    /*X = -160;
    Y = -160;
    Z = 550;
    centerX = 0;
    centerY = -100;
    centerZ = 0;*/
  }
}

function handleKeyDown() {
  // handle rot speed of propeller to control altitude
  if (scene === 1 || molphobj.show) return;

  if (keyIsDown(UP_ARROW)) {
    // W: go forward
    human.direction = 'forward';
    human.pos.z -= 2;
    /*Z -= 10;
    Y = cos(Z / 50) * 60 - 100 - 200;  // walk effect
    centerX = 0;
    centerY = -100;
    centerZ = 0;*/
  } else if (keyIsDown(DOWN_ARROW)) {
    // S: go backward
    human.direction = 'backward';
    human.pos.z += 2;
    /*Z += 10;
    Y = cos(Z / 50) * 60 - 100 - 200;  // walk effect
    centerX = 0;
    centerY = -100;
    centerZ = 0;*/
  }
  if (keyIsDown(LEFT_ARROW)) {
    // A: turn your head to the left
    human.direction = 'left'

    /*X -= 20;
    centerX = 0;
    centerY = -100;
    centerZ = 0;*/
  } else if (keyIsDown(RIGHT_ARROW)) {
    // D: turn your head to the right
    human.direction = 'right';

    /*X += 20;
    centerX = 0;
    centerY = -100;
    centerZ = 0;*/
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    if (scene === 1 || molphobj.show) return;
    human.walk = true;
    /*handleHumanPos(keyCode);
    if (!sounds.walk.isPlaying()) {
      sounds.walk.play();
    }*/
  }
  if (keyCode === 80) {
    saveImage();
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    human.rot = 0;
    human.walk = false;
    /*if (sounds.walk.isPlaying()) {
      sounds.walk.stop();
    }*/
  }
}

function mouseClicked() {
  // mouse click event to control pov mode
  if (pov_mode === 0) {
    pov_mode = 1;
  } else {
    pov_mode = 0;
  }
}

function saveImage() {
  saveCanvas("image", "jpg");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}