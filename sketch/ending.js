let endingIndex = 0;
let tintVal = 0;

function drawEnding() {
  push();
  camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  noStroke();
  endingPlane.noStroke();
  if (!sounds.beep.isPlaying()) {
    sounds.beep.play();
  }

  if (endingIndex === 0) {
    endingPlane.tint(255, tintVal);
    endingPlane.background(endingImg[endingIndex]);
  } else if (endingIndex === 1 || endingIndex === 2) {
    endingPlane.background(endingImg[endingIndex - 1]);
    endingPlane.tint(255, tintVal);
    endingPlane.background(endingImg[endingIndex]);
  } else if (endingIndex === 3) {
    bgColor = color(0, 0, 0);
    scene = 2;
  }
  tintVal += 5;
  if (tintVal >= 255) {
    endingIndex++;
    tintVal = 0;
  }
  texture(endingPlane);
  plane(width, height);
  pop();
}