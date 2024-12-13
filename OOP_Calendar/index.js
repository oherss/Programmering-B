let classContainer
let doorSound

function preload() {
  for(d of dataStructure){
    if(d.sound)
      d.sound=loadSound(d.sound)
  }
}

function setup() {
  //HTML containeren
  calendarContainer = select('#class-container')
  
  for(d of dataStructure){
    doorFactory.createDoor(calendarContainer, d)
  }
}