


//Tomt array til alle vores objekter
let bubbles = []
let names = []
let BubblesAmmount = 0

//JSON: JavaScript Object

//JSON Objekt med 4 atributter:
let bubble = {
  x: 100,
  y: 80,
  size: 40,
  name: names[1]
}

function preload(){
  names = loadStrings('first-names.txt');
    
}

function setup() {
  BubblesAmmount = 500
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER)

  for (let i = 0; i < BubblesAmmount; i++) {
    let b ={
      x: random(width),
      y: random(height),
      name: random(names),
     size: random(12,120),
     color: color(random(255),random(255),random(255),random(255))
    }
    //indsætter objektet "b" ind i vores array
    bubbles.push(b)
  }
  console.log(bubbles)

}

function draw() {
  background(220);
  //her tegnes "Bubble" manuelt
  bubble.x += random(1,-1)
  bubble.y += random(1,-1)
fill(0)
ellipse(bubble.x, bubble.y, bubble.size)
fill(255)
text(bubble.name, bubble.x,bubble.y)





//her tegnes de automatisk
for (let i = 0; i < bubbles.length; i++) {
  let b = bubbles[i]
 // b.size = b.name.length*10
  fill(b.color)
ellipse(b.x, b.y, b.size)
fill(255)
text(b.name, b.x,b.y)
}

//vibrationer ;3

for (let i = 0; i < bubbles.length; i++) {
  let b = bubbles[i]
  b.x += random(1,-1)
  b.y += random(1,-1)
}

}
