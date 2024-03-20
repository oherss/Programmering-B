//BREAKOUT Made by Sproxxy
//2024 March

//This is a project I'm doing for my programming class, hope you enjoy!


//Variables
let ScreenRes = {
  w: 1920,
  h: 1080,
  auto: true,
  autoRefresh: false,
  manualw: 1920,
  manualh: 1080,
} 

let Levels = []
let LevelFile = []

let CurrentLevel = 1
let BlocksInLevel = []

let PlatformSpeed = 10

let lives
let CurrentLives

let BlocksLeft

let IsPlaying = false

  //Objects


//Ball gets x and y coordinates as well as a radius and a speed.
let ball = {
  x: 0,
  y: 0,
  r: 0,
  speed: 0,
  directionx: 0,
  directiony: 0,
  show(){
    circle(this.x,this.y,this.r)
  }
}

//Platform gets x and y coordinates as well and width and height.
let platform = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  show(){
    rectMode(CENTER, CENTER)
    rect(this.x,this.y,this.w,this.h)
  }
}

function preload(){
  LevelFile = loadStrings('Levels.txt')
}



function setup() {
 
  console.log("Parsing Levels into obects...")
  console.log(Levels)
  for (let i = 0; i < LevelFile.length; i++) {
    let obj = JSON.parse(LevelFile[i])
    console.log(obj)
    if(obj.Type == "LevelInfo"){
      lives = obj.Lives
    }




    if(obj.Type == "Target"){
      Levels[i-2] = obj
    }

  }
  
console.log(Levels)

  //Checks if resolution is in auto mode, and sets the resolution to either the manual input or the automatic resolution.
  if(ScreenRes.auto){
    ScreenRes.w = windowWidth
    ScreenRes.h = windowHeight
  }
else if(!ScreenRes.auto){
    ScreenRes.w = ScreenRes.manualw
    ScreenRes.h = ScreenRes.manualh
}
  createCanvas(ScreenRes.w, ScreenRes.h);

  console.log(ScreenRes)
  GenerateLevel()

  
  


}

//Input handling:
/*
function keyPressed(LEFT_ARROW) {
  if(platform.x > platform.w/2)
  platform.x--
}
*/


function draw() {
  

  if(IsPlaying){ //Only render gameplay if we're playing the game
    background(220);
    ball.show() //Renders the ball
    platform.show() //Renders the platform
    CeckCollision() //Checks collision of all objects, and calculates their new directions
    BallPhysics() //Calculates the movement of the ball

  //Platform movement

    if(keyIsPressed){
      console.log("key is pressed: " + key)
      if(key == "ArrowLeft" && platform.x > platform.w/2)
      {
        platform.x = platform.x - (ScreenRes.w/100)
      }
      if(key == "ArrowRight" && platform.x < ScreenRes.w-platform.w/2)
      {
        platform.x = platform.x + (ScreenRes.w/100)
      }
    }

    //Drawing blocks (Targets)
    BlockCount = BlocksInLevel.length
    for (let i = 0; i < BlocksInLevel.length; i++) {
      obj = BlocksInLevel[i]
      if(obj.Hit == "false"){
        fill(obj.R,obj.G,obj.B)
        rect(obj.x,obj.y,obj.w,obj.h)
        fill(255)
      }
      else if(obj.Hit)
      {
        BlockCount--
      }
    }

    if(BlockCount == 0)
    {
      console.log("you win :3")
      LevelWon()
    }
  }
}

function ChangeSettings(){

  //Checks if resolution is in auto mode, and sets the resolution to either the manual input or the automatic resolution.
  if(ScreenRes.auto){
    ScreenRes.w = windowWidth
    ScreenRes.h = windowHeight
  }
else if(!ScreenRes.auto){
    ScreenRes.w = ScreenRes.manualw
    ScreenRes.h = ScreenRes.manualh
}

  createCanvas(ScreenRes.w, ScreenRes.h);
}

function CeckCollision(){

  //Check collision with walls
  if(ball.x + ball.r > ScreenRes.w){
    console.log("Hit right wall")
    ball.directionx = -ball.directionx
    if(ball.directiony == 0)
      ball.directiony = ball.directiony + random(-1,1)
  }

  if(ball.x - ball.r<0){
    console.log("Hit left wall")
    ball.directionx = -ball.directionx
    if(ball.directiony == 0)
      ball.directiony = ball.directiony + random(-1,1)
  }

  //check collision with ceiling

  if(ball.y - ball.r < 0){
      console.log("hit ceiling")
      ball.directiony = -ball.directiony
      if(ball.directionx == 0)
        ball.directionx = ball.directionx + random(-1,1)
  }

  //Check collision with platform
  
  if(ball.y + ball.r >= platform.y - platform.h/2 && ball.y - ball.r <= platform.y - platform.h/2 && ball.x + ball.r < platform.x + platform.w/2 && ball.x - ball.r > platform.x - platform.w/2){
      console.log("hit platform")
      ball.directiony = -ball.directiony
      if(ball.directionx == 0)
        ball.directionx = ball.directionx + random(-1,1)
  }

  //Check if ball is lost (Collision with bottom of screen), and then remove a life, untill no lives are left, then the game over screen should be shown

  if(ball.y + ball.r > ScreenRes.h){
    CurrentLives--
    if(CurrentLives == 0)
    GameOver()
    ball.x = platform.x
    ball.y = platform.y - (ScreenRes.h/8)
    ball.directionx = 0
    ball.directiony = 1
    console.log("Ball lost... Lives left: " + CurrentLives)
  }



  for (let i = 0; i < BlocksInLevel.length; i++) {
    obj = BlocksInLevel[i]
    if(obj.Hit == "false"){
      if(ball.y + ball.r >= obj.y - obj.h/2 && ball.y - ball.r <= obj.y - obj.h/2 && ball.x - ball.r < obj.x + obj.w/2 && ball.x + ball.r > obj.x - obj.w/2){
        console.log("hit Block")
        obj.Hit = true
        ball.directiony = -ball.directiony
        if(ball.directionx == 0)
          ball.directionx = ball.directionx + random(-1,1)
      }
    }
  }
}

function BallPhysics(){
  ball.x = ball.x + ball.directionx * ball.speed
  ball.y = ball.y + ball.directiony * ball.speed
}

function GameOver(){
  IsPlaying = false
  createCanvas(ScreenRes.w, ScreenRes.h)
  background(220);
  fill(0)
  textAlign(CENTER,CENTER)
  textSize(ScreenRes.w/10)
  text("Game Over", ScreenRes.w/2,ScreenRes.h/2)
}

function LevelWon(){
  IsPlaying = false
  createCanvas(ScreenRes.w, ScreenRes.h)
  background(220);
  fill(0)
  textAlign(CENTER,CENTER)
  textSize(ScreenRes.w/10)
  text("You Win", ScreenRes.w/2,ScreenRes.h/2)
}

function GenerateLevel(){
  //Makes a new canvas at the desired resolution.
  createCanvas(ScreenRes.w, ScreenRes.h);

  CurrentLives = lives

  for (let i = 0; i < Levels.length; i++) {
    if(Levels[i].Level == CurrentLevel){
      BlocksInLevel.push(Levels[i])
      BlocksInLevel[i]['Hit'] = 'false'
      console.log(BlocksInLevel[i])
    }
    
  }
  
  BlocksLeft = BlocksInLevel.length

  for (let i = 0; i < BlocksInLevel.length; i++) {
    BlocksInLevel[i].x = map(BlocksInLevel[i].x,0,100,0,ScreenRes.w)
    BlocksInLevel[i].y = map(BlocksInLevel[i].y,0,100,0,ScreenRes.h)
    BlocksInLevel[i].w = ScreenRes.w/14
    BlocksInLevel[i].h = ScreenRes.h/20
  }
  
  //Platform gets x and y coordinates as well and width and height based on screen resolution.
  
   platform.x = ScreenRes.w/2
   platform.y = ScreenRes.h - ScreenRes.h/4
   platform.w = ScreenRes.w/8
   platform.h = ScreenRes.h/20
   console.log("Calculated Platform:")
   console.log(platform)
 
  //Calculate size of ball from screen resolution.
  ball.r = ScreenRes.h/40
  ball.x = platform.x
  ball.y = platform.y - (ScreenRes.h/8)
  ball.speed = (ScreenRes.h + ScreenRes.w)/2 /250
  ball.directionx = 0
  ball.directiony = 1
  console.log("Calculated ball:")
  console.log(ball)

  IsPlaying = true //Starts the game rendering 
}