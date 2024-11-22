let m5NameDIV, m5StatusDIV

//MQTT client
let client

function setup() {
    
    m5NameDIV=select("#m5_1 header")
    m5StatusDIV = select("#m5_1 .status")
        //We can use mqtt.connect, beacsue we have the mqtt.js library in the HTML file
    client = mqtt.connect("wss://mqtt.nextservices.dk")

        // .on is an asyncronys event, which is called when we get a resonse from the mqtt server
    client.on("connect", function(response){
        console.log(response, "The server is ready for MQTT communication")
    })

        //now we want to subscribe to a topic
    client.subscribe("programmering")

        //Now we need to set up a listener, to listen for a response from the client
    client.on("message", function(topic, message){
            //the topic is sent as a string
        console.log( topic)
            //the message is sent as an array of ASCII codes
        //console.log(message.toString())
            //our response from an M5 would in this case be a JSON object, we then parse this, to make it into a JSON object we cabn use
        let Json = JSON.parse(message.toString())
            //We then put this data in to our HTML elements
        m5NameDIV.html(Json.name)
        m5StatusDIV.html(Json.status)
        
        if(Json.status == "true"){
            m5StatusDIV.addClass("true")
          
        }
        else if(Json.status == "false"){
           
            m5StatusDIV.removeClass("true")
        }
    })
}