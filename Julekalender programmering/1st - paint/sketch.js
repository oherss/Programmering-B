//Color and brush variables
let brushColor = 'red'
let brushSize = 5;
let UIupdated = false
let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "white"];
//UI elements
let BrushCircle;
let sizeSlider;
let colorPicker;
let ClearButton;
let PrintButton;
let BackButton;
function setup() {
  //defines the canvas to the size of the window
   c = createCanvas(windowWidth, windowHeight*0.9);
  background(255);
  //Creates UI Elements
  BackButton = select('#BackButton')
  ClearButton = createButton("Clear Canvas");
  PrintButton = createButton("Share")
  sizeSlider = createSlider(5, 25, 10); // min, max, default value
  colorPicker = createColorPicker('#ed225d');
  ClearButton.mousePressed(clearCanvas);
  PrintButton.mousePressed(saveImage);
  BackButton.mousePressed(GetTheFuckBack);
  DrawUI(); //calls the fuction which draws the UI
  updateSetting(); //calls the function that checks all settings made
  
}
function GetTheFuckBack(){
  var currentPath = window.location.pathname;
  var newPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
  window.location.href = newPath + "/../index.html";
}
windowResized()
{
  resizeCanvas(windowWidth, windowHeight)
  DrawUI()
}
function DrawUI(){
  //UI background
  rectMode(CORNER)
  noStroke()
  fill(100)
  rect(0, height-(height/5), width, height/5)
  //Color & Size preview
  fill(255)
  rectMode(CENTER)
  square(width/20, height-(height/8), width/20)
  fill(brushColor)
  BrushCircle = circle(width/20, height-(height/8), brushSize)
  //Size slider
  sizeSlider.position(30, height+ height /20); // x, y coordinates
  //Color picker
  colorPicker.position(width/10, height);
  print("UI finished updating")//debug line, to check how often code runs
  //colors
   for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rectMode(CORNER)
    rect(i * (height/15 + 10) + width/4, height-height/10, height/15, height/15);
     //Clear canvas button
     ClearButton.position(width - width/8, height - height/20)
     PrintButton.position(width - width/8, height - height/40)
  }
}
function updateSetting(){
  //checks if the brushsize was changed by the user, and then changes the brush size and updates the UI to show this
  if(sizeSlider.value() != brushSize) 
    {
      brushSize = sizeSlider.value()
      DrawUI()
    }
  //Color picker code
  let color1 = colorPicker.value();
  let r1 = red(color1);
  let g1 = green(color1);
  let b1 = blue(color1);
  let r2 = red(colors[0]);
  let g2 = green(colors[0]);
  let b2 = blue(colors[0]);
  //Checks if the picked color is different to the one stored in the array, and if so updates it
   if( r1 !=r2 ||g1 != g2 || b1 != b2)
    {
     colors[0] = colorPicker.color()
      DrawUI()
      print("custom color stored: " + colors[0])
      print("custom color chosen: " + colorPicker.color())
      print("Updated custom color")
      brushColor = colors[0];
    }
}
function mouseClicked(){
  //Checks if you clicked a color button
  if (mouseY > height-(height/5)) {
    // Loop through the color buttons
    for (let i = 0; i < colors.length; i++) {
      
      // Check if the mouse is inside the button
      if (mouseX > i * (height/15 + 10) + width/4 & mouseX < (i + 1) * (height/15 + 10)+ width/4) {
        // Set the current color to the corresponding color
        print("clicked on color " + colors[i])
        brushColor = colors[i];
        DrawUI()
        
      }
    }
  }
}

function clearCanvas(){
  background(255);
  DrawUI();
}
//Function which saves the image drawn as a jpg to your computer
function saveImage (){
  //Hides UI for the image save
  sizeSlider.position(width, height)
  colorPicker.position(width, height)
  ClearButton.position(width, height)
  PrintButton.position(width, height)
  rectMode(CORNER)
  noStroke()
  //makes a watermark to fille the now empty space
  fill(200)
  rect(0, height-(height/5), width, height/5)
  fill(0)
  textSize(30)
  text("Made with 'pain' drawing software", width/20 , height - height/12)
  textSize(20)
  text("© Sproxxy", width/20,height - height/20 )
  saveCanvas(c, 'myCanvas', 'jpg');
  DrawUI()
}
function draw() {
   updateSetting()
  //Checks if you've had your cursor in the UI, and then updates it, to make sure it is up to date
  if(mouseY > height-(height/5) & !UIupdated)
    {
      DrawUI()
      UIupdated = true
    }
  //makes sure the pointer is within the canvas, so you can't draw on the UI
  if(mouseIsPressed & mouseY < height-(height/5))
    {
      UIupdated = false
      stroke(brushColor);
      strokeWeight(brushSize);
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
}