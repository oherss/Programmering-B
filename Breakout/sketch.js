//BREAKOUT Made by Sproxxy
//2024 March/April

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


let LevelFile = [] //An array that stores the raw file with all the levels.
let Levels = [] //An array that will store the processed levels as JSON objects.
let LevelsInFile

let CurrentLevel = 1 //Keeps track of the currently selected level.
let BlocksInLevel = [] //An array that stores all the targets to be drawn in the current level.

let PlatformSpeed = 10 // An integer that dictates the speed of the platform.

let lives //An integer that dictateb how many lives the player should have, can be changed by the level loaded.
let CurrentLives //An integer that counts how many lives you've got left.

let BlocksLeft //An integer that counts the remaning blocks left in the level.

let IsPlaying = false //A bool that tells the code wheather we're playing or not.

//Objects


//Ball gets x and y coordinates as well as a radius and a speed. As well as a show function, which draws the platform.
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

//Platform gets x and y coordinates as well and width and height. As well as a show function, which draws the platform.
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
  LevelFile = loadStrings('Levels.txt') //Loads the levels file into an array that we can read from

}

function ParseLevels(){
  console.log("Parsing Levels into obects...")
  console.log(LevelFile)
  for (let i = 0; i < LevelFile.length; i++) {
    let obj = JSON.parse(LevelFile[i])
    console.log(obj)
    if(obj.Type == "LevelInfo"){
      lives = obj.Lives
    }
    if(obj.Type == "FileInfo"){
      LevelsInFile = obj.Levels
    }

    

    if(obj.Type == "Target"){
      Levels[i-2] = obj
    }

  }  
}

function setup() {
 
  ParseLevels()
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
  //GenerateLevel()
  HomePage()
  
  


}

function HomePage (){
  createCanvas(ScreenRes.w,ScreenRes.h)
  background(220)
  textSize(50)
  fill(0)
  textAlign(CENTER)
  text("BREAKOUT - The Knockoff", ScreenRes.w/2,ScreenRes.h/5)
  textSize(30)
  text("Made by Sproxxy 2024 v0.1", ScreenRes.w/2,ScreenRes.h/4)

  //Start button
    StartButton = createButton("Start Game")
    StartButton.style('width',"50%")
    StartButton.style('height',"20%")

    StartButton.position(ScreenRes.w/4,ScreenRes.h/2 )

  //Levels Button
    LevelsButton = createButton ("Level Select")
    LevelsButton.style('width',"20%")
    LevelsButton.style('height',"10%")

    LevelsButton.position(ScreenRes.w/4,ScreenRes.h/1.4 )

  //Settings Button
    SettingsButton = createButton ("Settings")
    SettingsButton.style('width',"20%")
    SettingsButton.style('height',"10%")

    SettingsButton.position(ScreenRes.w/1.82,ScreenRes.h/1.4 )

  //Next Level Button, for when game is won
    NextLevelButton = createButton("Next Level")
    NextLevelButton.style('width',"50%")
    NextLevelButton.style('height',"20%")
    NextLevelButton.position(ScreenRes.w/4,ScreenRes.h/2 )
    NextLevelButton.hide()

    StartButton.mouseClicked(()=>{

      GenerateLevel(1)

    })
    NextLevelButton.mouseClicked(()=>{
      GenerateLevel(CurrentLevel+1)
      
    })
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
        platform.x -= (ScreenRes.w/100)
      }
      if(key == "ArrowRight" && platform.x < ScreenRes.w-platform.w/2)
      {
        platform.x += (ScreenRes.w/100)
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
    ball.speed++
    console.log("Hit right wall")
    ball.directionx = -ball.directionx
    if(ball.directiony == 0)
      ball.directiony = ball.directiony + random(-1,1)
  }

  if(ball.x - ball.r<0){
    ball.speed++
    console.log("Hit left wall")
    ball.directionx = -ball.directionx
    if(ball.directiony == 0)
      ball.directiony = ball.directiony + random(-1,1)
  }

  //check collision with ceiling

  if(ball.y - ball.r < 0){
    ball.speed++
      console.log("hit ceiling")
      ball.directiony = -ball.directiony
      if(ball.directionx == 0)
        ball.directionx = ball.directionx + random(-1,1)
  }

  //Check collision with platform
  
  if(ball.y + ball.r >= platform.y - platform.h/2 && ball.y - ball.r <= platform.y - platform.h/2 && ball.x + ball.r < platform.x + platform.w/2 && ball.x - ball.r > platform.x - platform.w/2){
    ball.speed++
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
  StartButton.show()
  StartButton.html("Try Again")
  IsPlaying = false
  createCanvas(ScreenRes.w, ScreenRes.h)
  background(220);
  fill(0)
  textAlign(CENTER,CENTER)
  textSize(ScreenRes.w/10)
  text("Game Over", ScreenRes.w/2,ScreenRes.h/2)
}

function LevelWon(){
  //StartButton.show()
  IsPlaying = false
  createCanvas(ScreenRes.w, ScreenRes.h)
  background(220);
  fill(0)
  textAlign(CENTER,CENTER)
  textSize(ScreenRes.w/10)
  text("You Win", ScreenRes.w/2,ScreenRes.h/2)

  if(CurrentLevel == LevelsInFile)
    HomePage()
  else
    NextLevelButton.show()
}

function GenerateLevel(LevelNum){

  CurrentLevel = LevelNum
  StartButton.hide()
  SettingsButton.hide()
  LevelsButton.hide()
  NextLevelButton.hide(4)



  //Makes a new canvas at the desired resolution.
  createCanvas(ScreenRes.w, ScreenRes.h);
  BlocksInLevel = []
  CurrentLives = lives
  ParseLevels()
console.log(Levels)
  for (let i = 0; i < Levels.length; i++) {
    if(Levels[i].Level == CurrentLevel && Levels[i].Type == "Target"){
      BlocksInLevel.push(Levels[i])
      BlocksInLevel[i]['Hit'] = 'false'
      console.log(BlocksInLevel[i])
      console.log(Levels[i])
    }
    
  }
  console.log(Levels)
    console.log(BlocksInLevel)
  for (let i = 0; i < BlocksInLevel.length; i++) {
    BlocksInLevel[i].x = parseInt(map(BlocksInLevel[i].x,0,100,0,ScreenRes.w))
    BlocksInLevel[i].y = parseInt(map(BlocksInLevel[i].y,0,100,0,ScreenRes.h))
    BlocksInLevel[i].w = ScreenRes.w/14
    BlocksInLevel[i].h = ScreenRes.h/20
  }
  console.log(BlocksInLevel)
  BlocksLeft = BlocksInLevel.length

  
  
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