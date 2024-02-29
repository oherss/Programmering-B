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
  //Dette emne er en kommunikation mellem vores joystick og vores program her, som fortæller vores enheder om de er forbundet.

  connection.subscribe('SynthDirectionServer')
  connection.on("message", (topic, ms) => {
    sensorData = ms.toString() //Vi konverterer outputtet som vi får fra MQTT til en string som JS kan forstå som tal og tekst.
      //vores program leder efter ordet "waiting" fra M5'eren med joysticket, 
      //og når den modtager det, sender den en besked tilbage til M5'eren, som får den til at spytte data tilabge til programmet.
    if(sensorData == "Waiting" && topic == 'SynthDirectionServer'){
      connection.publish('SynthDirectionServer','Ready')
    }

    //Når vi modtager en besked fra M5'eren som siger at den sender data, viser vi i vores UI at vi har oprettet forbindelse til Joysticket.
    if(sensorData == "Connected" && topic == 'SynthDirectionServer'){
      infoDiv.html("Joystick forbundet")  
      JoyConn = true  
    }

  })
  //vi abonnerer på et emne - her "SynthHeightServer"
  //Dette emne er en kommunikation mellem vores afstandssensor og vores program her, som fortæller vores enheder om de er forbundet.
  connection.subscribe('SynthHeightServer') 
  connection.on("message", (topic, ms) => {
    sensorData = ms.toString()//Vi konverterer outputtet som vi får fra MQTT til en string som JS kan forstå som tal og tekst.
      //vores program leder efter ordet "waiting" fra M5'eren med afstanssensoren, 
      //og når den modtager det, sender den en besked tilbage til M5'eren, som får den til at spytte data tilabge til programmet.
    if(sensorData == "Waiting" && topic == 'SynthHeightServer'){
      connection.publish('SynthHeightServer','Ready')
    }
    //Når vi modtager en besked fra M5'eren som siger at den sender data, viser vi i vores UI at vi har oprettet forbindelse til afstanssensoren.
    if(sensorData == "Connected" && topic == 'SynthHeightServer'){
      infoDiv.html("Afstandssensor forbundet")  
      DistConn = true  
    }
  })

  //Her forbinder vi til datakanalerne, hvor afstandssensorens og joysticket's data sendes.
  connection.subscribe('SynthHeight')
  connection.subscribe('SynthDirection')
  connection.on("message", (topic, ms) => {
    
    if(topic =='SynthHeight'){ //Da vi abbonerer på 2 kanaler, for at kunne snakke med 2 enheder, skal vi tjekke hvilken kanal vi får vores data fra
      sensorData = ms.toString()//Vi konverterer outputtet som vi får fra MQTT til en string som JS kan forstå som tal og tekst.
      Dist = sensorData
      console.log(Dist)
    }
    if(topic == 'SynthDirection'){//Da vi abbonerer på 2 kanaler, for at kunne snakke med 2 enheder, skal vi tjekke hvilken kanal vi får vores data fra
      sensorData = JSON.parse(ms) //Da vores data fra joysticket består af 2 tal i en JSON pakke (X & Y), skal vi ikke lave det til en string, men istedet importere det som en JSON pakke.
      JoyX = sensorData.x
      JoyY = sensorData.y
      console.log('X: ' + JoyX)
      console.log('Y: ' + JoyY)
    
    }
  })


  //Her opsættes oscillatoren, her vælger vi trekants-bølger som vores udgangspunkt, samt andre standard værdier.
  osc = new p5.TriOsc();
  osc.amp(0.5);
  fft = new p5.FFT();
  osc.start();

  //Her laver jeg de fire knapper hvor man kan vælge hvilken bølgeform der ønskes af brugeren

  let Tri = createButton('Tri')
  let Sin = createButton('Sin')
  let Sqr = createButton('Sqr')
  let Saw = createButton('Saw')

  Tri.position(330, 310) 
  Sin.position(430, 310) 
  Sqr.position(530, 310) 
  Saw.position(630, 310) 

//Her tilføjes knappernes funktion:

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

  //Her tegnes alle kasserne som opgør vores UI

  background('lightblue')
  fill(255, 255, 255, 0) 
  rect(30, 30, 110, 350) // Kasse omkring status & barer
  rect(140, 30, 60, 350) // Kasse omkring barer for joystick 
  rect(30,30,170,50) // Kasse omkring status
  rect(200,30,600,250) // Kasse omkring oscilloskob
  rect(200,280,600,100) // kasse omkring knapper
  rect(30,400,170,170) // kasse omkring joystick X-Y visualisering
  rect(30,680, 80, 10) // Kasse omkring Pan visualisering


  let waveform = fft.waveform(); // Her analyserer oscilloskobet bølgeformen for vores oscillator
  beginShape();
  strokeWeight(5);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 200, 800);
    let y = map(waveform[i], -1, 1, 200, 0)+50;
    vertex(x, y);
  }
  endShape();
  if(Dist < 10) //På baggrund af sensorstøj, har jeg valgt at hvis afstanden målt er mindre end 10, sættes den til 0
  Dist=0
  // Her defineres frekvens, volumen og pan ud fra vores 3 variable
  let freq = map(JoyY, 0, 255, 880, 80); //Y på joystick bestemmer frekvens
  osc.freq(freq);

  let amp = map(Dist, 0, 255, 0, 1); //Afstandssensor bestemmer volumen
  osc.amp(amp);
  
  let pan = map(JoyX,0,255,1,-1) //X på joystick bestemmer pan
  osc.pan(pan)





// Her visualiseres forbinselsen til vores sensorer med 2 firkanter som enten er røde (ikke forbundet), eller grønne (forbundet)
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

// her tegnes alt vores forklarende tekst på vores UI
    fill(0)
    //Frekvens
    text('880 Hz',210, 410 )
    text('80 Hz',210, 570 )
    //Pan
    text('L',30, 395 )
    text('R',190, 395 )
    text('L         C           R ' , 30, 710)
    text('Pan: ' , 30, 660)
    //Bølgeform
    text('Waveform:',230, 330 )
    //Her vises vores udregnede frekvens samt volumen
    text('Frequency: ' + ceil(freq) +' Hz', 30, 600)
    text('Volume: ' + ceil(map(amp,0,1,0,100)) + "%" , 30, 630)
    
    //Her visualiseres alle vores bargrafer, samt vores pointer for x-y af vores joystick

    fill('blue')
    //Her visualiseres vore pan, med en firkant som enten går mog højre eller venstre
    rect(30+40,680, map(JoyX,0,255,40,-40), 10)

    strokeWeight(3)
    //Her tegnes pointeren for x-y koordinaterne for joysticket
    ellipse(map(JoyX,0,255,160,0)+35,map(JoyY,0,255,0,160)+405,10)
    //Her tegnes vores 3 variable, så man kan se den rå data
    rect(50,100, 20, JoyX)
    rect(100,100, 20, JoyY)
    rect(160,100, 20, Dist)
}