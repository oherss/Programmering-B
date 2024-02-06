let pageheader, HTMLpageheader;

function setup() {
  createCanvas(400, 400);
  pageheader = createElement('h1', 'lagkage')
  HTMLpageheader = select('#Overskrift')
  HTMLpageheader.mouseClicked(() => alert("hallå!"))
}
const alertstuff = () => alert("daws du")
windowResized()
{
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  background(220);
}
