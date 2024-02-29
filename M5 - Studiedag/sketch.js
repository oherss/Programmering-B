//connection variablen bruges til at forbinde til MQTT serveren 
let connection 
//info er en tekst variabel til at vise info på skærmen
let info = "String som bruges til at vise info på skærmen"
//sensorData indeholder de data vi får fra M5'eren
let sensorData = 0
//Conn- variablerne benyttes til at holde styr på om vi har oprettet forbindelse til vores M5'ere
let JoyConn = false
let DistConn = false
//Her defineres variablene som vi kommer til at have vores 3 værdier i.
let JoyX = 0
let JoyY = 0
let Dist = 0
//Disse to varible bruges af oscillatoren til at lave lyd
let osc, fft;




function setup() {
  //Vi opretter et canvas med opløsningen 1000 * 800
  createCanvas(1000, 800)  
  background(220)


  //lav en div til infoteksten
  infoDiv = createDiv(info)
  //sæt den nederst på canvas
  infoDiv.position(20, height-40)


  //Opret forbindelse til MQTT serveren
  connection = mqtt.connect("wss://mqtt.nextservices.dk")

  
  //Når serveren kommer tilbage til os og siger KLAR
  connection.on("connect", (m) => {
    console.log(m)
    //vis i inforteksten at der er forbindelse 
    infoDiv.html("Er nu forbundet til Next's MQTT server")    
    connection.publish('SynthDirectionServer','Reboot')
    connection.publish('SynthHeightServer','Reboot')
    infoDiv.html("Forbinder til Sensorer...")   
  })
  //vi abonnerer på et emne - her "SynthDirectionServer"
   

  connection.subscribe('SynthDirectionServer')
  //hver gang vi får en besked på emnet "current"  
  connection.on("message", (topic, ms) => {
    sensorData = ms.toString()

    if(sensorData == "Waiting" && topic == 'SynthDirectionServer'){
      connection.publish('SynthDirectionServer','Ready')
    }
    if(sensorData == "Connected" && topic == 'SynthDirectionServer'){
      infoDiv.html("Joystick forbundet")  
      JoyConn = true  
    }

  })
  
  connection.subscribe('SynthHeightServer')
  //hver gang vi får en besked på emnet "current"  
  connection.on("message", (topic, ms) => {
    sensorData = ms.toString()
    if(sensorData == "Waiting" && topic == 'SynthHeightServer'){
      connection.publish('SynthHeightServer','Ready')
    }
    if(sensorData == "Connected" && topic == 'SynthHeightServer'){
      infoDiv.html("Afstandssensor forbundet")  
      DistConn = true  
    }
    

  })
  connection.subscribe('SynthHeight')
  connection.on("message", (topic, ms) => {
    sensorData = ms.toString()
    if(topic =='SynthHeight')
      Dist = sensorData
      console.log(Dist)
    

  })
  connection.subscribe('SynthDirection')
  connection.on("message", (topic, ms) => {    
    if(topic == 'SynthDirection'){
      sensorData = JSON.parse(ms)
      JoyX = sensorData.x
      JoyY = sensorData.y
      console.log('X: ' + JoyX)
      console.log('Y: ' + JoyY)
    
    }
  })

  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(0.5);

  fft = new p5.FFT();
  osc.start();


  let Tri = createButton('Tri')
  let Sin = createButton('Sin')
  let Sqr = createButton('Sqr')
  let Saw = createButton('Saw')

  Tri.position(330, 310) 
  Sin.position(430, 310) 
  Sqr.position(530, 310) 
  Saw.position(630, 310) 

  Tri.mouseClicked(()=>{
    osc.setType('triangle')
  })
  Sin.mouseClicked(()=>{
    osc.setType('sine')
  })
  Sqr.mouseClicked(()=>{
    osc.setType('square')
  })
  Saw.mouseClicked(()=>{
    osc.setType('sawtooth')
  })

}

function draw() {
  background('lightblue')
  fill(255, 255, 255, 0) 
  rect(30, 30, 110, 350)
  
  rect(140, 30, 60, 350)
  rect(30,30,170,50)
  rect(200,30,600,250)
  rect(200,280,600,100)
  rect(30,400,170,170)
  

  rect(30,680, 80, 10)


  let waveform = fft.waveform(); // analyze the waveform
  beginShape();
  strokeWeight(5);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 200, 800);
    let y = map(waveform[i], -1, 1, 200, 0)+50;
    vertex(x, y);
  }
  endShape();

  // change oscillator frequency based on mouseX
  let freq = map(JoyY, 0, 255, 880, 80);
  osc.freq(freq);

  let amp = map(Dist, 0, 255, 0, 1);
  osc.amp(amp);
  
  let pan = map(JoyX,0,255,1,-1)
  osc.pan(pan)


if(Dist < 10)
Dist=0



  if(DistConn){
    fill(0,255,0)
    square(160,45,20)
    
  }
  else{
    fill(255,0,0)
    square(160,45,20)
  }
  if(JoyConn){
    fill(0,255,0)
    square(50,45,20)
  }
  else{
    fill(255,0,0)
    square(50,45,20)
  }


    fill(0)
    text('880 Hz',210, 410 )
    text('80 Hz',210, 570 )
    text('L',30, 395 )
    text('R',190, 395 )

    text('Waveform:',230, 330 )

text('Frequency: ' + ceil(freq) +' Hz', 30, 600)
text('Volume: ' + ceil(map(amp,0,1,0,100)) + "%" , 30, 630)
text('Pan: ' , 30, 660)

text('L         C           R ' , 30, 710)


  fill('blue')
  //noStroke()
  rect(30+40,680, map(JoyX,0,255,40,-40), 10)
  //stroke(0)
  strokeWeight(3)
  ellipse(map(JoyX,0,255,160,0)+35,map(JoyY,0,255,0,160)+405,10)
  rect(50,100, 20, JoyX)
  rect(100,100, 20, JoyY)
  rect(160,100, 20, Dist)
}