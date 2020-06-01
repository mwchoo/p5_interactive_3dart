let endingIndex = 0;
let tintVal = 0;

function drawEnding() {
  push();
  noStroke();
  endingPlane.noStroke();

  if (endingIndex === 0) {
    /*tint(255, tintVal);
    image(endingImg[endingIndex], -width/2, -height/2, width, height);*/
    endingPlane.tint(255, tintVal);
    //endingPlane.background(endingImg[endingIndex]);
    endingPlane.image(endingImg[endingIndex], 0, 0, width, height);
  } else if (endingIndex === 1 || endingIndex === 2) {
    /*image(endingImg[endingIndex - 1], -width/2, -height/2, width, height);
    tint(255, tintVal);
    image(endingImg[endingIndex], -width/2, -height/2, width, height);*/
    //endingPlane.background(endingImg[endingIndex - 1]);
    endingPlane.image(endingImg[endingIndex - 1], 0, 0, width, height);
    endingPlane.tint(255, tintVal);
    //endingPlane.background(endingImg[endingIndex]);
    endingPlane.image(endingImg[endingIndex], 0, 0, width, height);
  } else if (endingIndex === 3) {
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