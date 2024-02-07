
let connection 

let sensordata = 0

function setup() {
  createCanvas(800,800)
  //Opret forbindelse til NEXT MQTT server
  connection = mqtt.connect("wss://mqtt.nextservices.dk")
  //Når serveren svarer
  connection.on("connect", () => {
    console.log("Er nu forbundet til Next's MQTT server")    
  })


  //vi abonnerer på et emne 
  connection.subscribe('DataSpam')
  //hver gang vi får en besked på emnet 
  connection.on("message", (topic, ms) => {
    console.log("Modtager data: " + ms) 
    sensordata = ms.toString()
  })

}

function draw(){
background(255)
ellipse(400,400, sensordata/10)
}
