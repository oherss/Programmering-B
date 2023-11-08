function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  for(i = 0; i < mouseX; i+=10)
  {
    rect(mouseX - i, 200, 20)
  }
}
