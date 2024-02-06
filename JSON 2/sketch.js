
let objects = []
let colors = ['red', 'lightblue', 'hotpink', 'darkgreen', 'grey']
let names = []
let numobjects = 40

//Variables defined

function preload(){
  names = loadStrings('first-names.txt');
    
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER,CENTER)
  textAlign(CENTER,CENTER)

  let DeleteButton = createButton('Delete a square')
  DeleteButton.position(0,0)
  DeleteButton.mousePressed(MURDER)

  let SpawnButton = createButton('Birth new children')
  SpawnButton.position(0,20)
  SpawnButton.mousePressed(BIRTH)

for (let i = 0; i < numobjects; i++) {
  let o = {
    x: random(width),
    y: random(height),
    size: random(width/12,width/10),
    name: random(names),
    color: color(random(255),random(255),random(255), random(50,255)),
    speedx: random(1,10),
    speedy: random(1,10)
    
}
  objects.push(o)
}

}

function draw() {
  background(220);

  for (let i = 0; i < objects.length; i++) {
    o = objects[i]
    fill(o.color)
    rect(o.x,o.y,o.size)
    fill(255)
    text(o.name,o.x,o.y)

    o.x += o.speedx
    o.y += o.speedy

    if(o.x < 0||o.x > width){
      o.speedx = -o.speedx
    }
    if(o.y < 0||o.y > height){
      o.speedy = -o.speedy
    }
  }
}

function MURDER(){
  objects.splice(round(objects.length)-1,1)
  console.log(objects)
}
function BIRTH(){
  let GodsChildren = prompt("How many shall be birthed?");

  console.log(objects.length - 1,parseInt(GodsChildren) + (objects.length - 1) )
  for (let i = 0; i < parseInt(GodsChildren); i++) {
    let o = {
      
      x: random(width),
      y: random(height),
      size: random(width/12,width/10),
      name: random(names),
      color: color(random(255),random(255),random(255), random(50,255)),
      speedx: random(1,10),
      speedy: random(1,10)
      
  }
    objects.push(o)
  }
}
