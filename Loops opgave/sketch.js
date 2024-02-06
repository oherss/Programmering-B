function setup() {
  c = createCanvas(windowWidth, windowHeight);
  background(0);
for(let y = 5; y < height; y += 10){
  for(let x = 5; x < width; x += 10)
  {
    ellipse(x, y, 10)
  }
}
}

