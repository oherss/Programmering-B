console.log("Node is here")

const express = require("express")
const app = express()

app.get("/guests", (req, res)=>{
    console.log("nyt besøg fra /Guests")
    res.send("Velkommen til Gæstesiden")
})

app.listen(3000, function(){
    console.log("Lytter nu på port 3000")
})