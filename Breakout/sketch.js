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

let CurrentLevel = 1
let BlocksInLevel = []

let PlatformSpeed = 10

//Objects


//Ball gets x and y coordinates as well as a radius and a speed.
let ball = {
  x: 0,
  y: 0,
  r: 0,
  speed: 0,
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
  Levels = loadStrings('Levels.txt')
}



function setup() {
 
  console.log("Parsing Levels into obects...")
  console.log(Levels)
  for (let i = 0; i < Levels.length; i++) {
    Levels[i] = JSON.parse(Levels[i])
  }
  GenerateLevel()
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


  
  


}

//Input handling:
/*
function keyPressed(LEFT_ARROW) {
  if(platform.x > platform.w/2)
  platform.x--
}
*/


function draw() {
  background(220);
  ball.show()
  platform.show()

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



  for (let i = 0; i < BlocksInLevel.length; i++) {
    obj = BlocksInLevel[i]
    fill(obj.R,obj.G,obj.B)
    rect(obj.x,obj.y,obj.w,obj.h)
    fill(255)
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


function GenerateLevel(){
  //Makes a new canvas at the desired resolution.
  createCanvas(ScreenRes.w, ScreenRes.h);

  
  for (let i = 0; i < Levels.length; i++) {
    if(Levels[i].Level == CurrentLevel){
      BlocksInLevel.push(Levels[i])
      //BlocksInLevel[i]['Show()'] = '{fill(this.R,this.G,this.B);rect(this.x,this.y,this.w,this.h)}'
      console.log(BlocksInLevel[i])
    }
    
  }
  
  for (let i = 0; i < BlocksInLevel.length; i++) {
    BlocksInLevel[i].x = map(BlocksInLevel[i].x,0,100,0,ScreenRes.w)
    BlocksInLevel[i].y = map(BlocksInLevel[i].y,0,100,0,ScreenRes.h)
    BlocksInLevel[i].w = ScreenRes.w/14
    BlocksInLevel[i].h = ScreenRes.h/20
  }
  //Calculate size of ball from screen resolution.
  ball.r = ScreenRes.h/40
  console.log("Calculated ball:")
  console.log(ball)
  //Platform gets x and y coordinates as well and width and height based on screen resolution.
  
   platform.x = ScreenRes.w/2
   platform.y = ScreenRes.h - ScreenRes.h/4
   platform.w = ScreenRes.w/8
   platform.h = ScreenRes.h/20
   console.log("Calculated Platform:")
   console.log(platform)
 
  


}