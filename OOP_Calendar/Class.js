console.log('OOP is here')
class doorFactory{
  static createDoor(container, obj){
    switch(obj.type){
      case "image":
        return new Door(container, obj.day, obj.content, obj.sound || null)
      case "video":
        return new videoDoor(container, obj.day, obj.content, null)
    }
    
  }
}
class Door {
  //kaldes ved oprettelse af nye objekter 
  constructor(containerDiv, day, content, doorSound) {
    this.parentDiv = containerDiv;
    this.day = day;
    this.content = content;
    this.doorSound = doorSound;
    this.createDoor();

  }
    
  //intern funktion - kaldes internt med this.function()
  createDoor(){
    this.doorDiv = createDiv(this.day);
    this.doorDiv.style(`
        height: 12rem;
        width: 12rem;
        font-size: 3rem;
        background: crimson;
        color: white;
        display: grid;
        place-items: center;
        cursor: pointer;
        transition: all .7s ease-in-out;
      `);
      this.parentDiv.child(this.doorDiv);

      this.doorDiv.mousePressed(()=>{this.openDoor()})
  }

  openDoor(){
    this.doorDiv.style(`
        background: url(${this.content});
        color: transparent;
        background-size: cover;
        pointer-events: none;
      `)
      if(this.doorSound)
      this.doorSound.play();
  }
}

class videoDoor extends Door{
  constructor(containerDiv, day, videoURL, sound){
    super(containerDiv, day, sound, null)
    this.videoURL = videoURL;
    this.videoURL += "?autoplay=1&mute=1&controls=0"
  }
  openDoor(){
    this.doorDiv.style(`
      background: none;
      `)
      this.addVideoBackground()
  }
  addVideoBackground(){
    this.video = createElement("iframe")
    this.video.attribute("src", this.videoURL);
    this.doorDiv.child(this.video);
    this.video.style(`
      width: 12rem;
      height: 12rem;
      position: absolute;
      `)
      
  }

}

