class Clock{
    //when a class's objects can behave differently it's called polymophy 
    constructor(div, style ){ //The constructor is equal to the setup() function, which is called when a new object is made
        this.mainDiv = div;
        this.style = style;
        this.shape = this.style.shape;
        this.background = this.style.background;
        //Hours, mintues and seconds DIVs
        this.div = createDiv();
        this.hDiv = createDiv();
        this.mDiv = createDiv();
        this.sDiv = createDiv();
        this.div.child(this.hDiv);
        this.div.child(this.mDiv);
        this.div.child(this.sDiv);
        this.mainDiv.child(this.div);
        this.mainDiv.style("place-items", "center")

        this.inpDiv = createDiv();
        this.inpHrs = createInput("12","number");
        this.inpMins = createInput("0","number");
        this.inpSecs = createInput("0","number");
        this.okBtn = createButton("Set alarm");
        this.inpDiv.child(this.inpHrs);
        this.inpDiv.child(this.inpMins);
        this.inpDiv.child(this.inpSecs);
        this.inpDiv.child(this.okBtn);
        this.mainDiv.child(this.inpDiv);
        
        this.inpHrs.style("width", "6rem")
        this.inpMins.style("width", "6rem")
        this.inpSecs.style("width", "6rem")
        this.okBtn.style("color", "white")

        this.inpDiv.hide()

        this.osc = new p5.TriOsc();
        this.osc.amp(0.5);
        this.osc.setType('square')
       
        

        //interval to update time
        this.interval;
        //this.start is in internal function which starts the clock
        //this.start();

        //time variables
        this.CurrHrs =null
        this.CurrMins =null
        this.CurrSecs =null

        //Alarm stuff
        this.setTimeShown = false
        this.alarmSet = false
        this.alarmRinging = false
        this.alarmHrs = null
        this.alarmMins = null
        this.alarmSecs = null

        //styles
        
        
        
        this.div.style(
            `width: 12rem;
            height: 6rem;
            border: 4px dotted gray;
            display: grid;
            place-items: center;
            padding: 0.5rem;
            border-radius: 2rem;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 2rem;`
        )

        console.log("Color chosen: " + this.style.background)
        console.log("Shape chosen: " + this.style.shape)
        //React upon the style argument given
        

        this.updateStyle()

        this.div.mousePressed(()=>{this.clockClicked()});
        this.okBtn.mousePressed(()=>{
            this.setAlarm(this.inpHrs.value(),this.inpMins.value(),this.inpSecs.value())
            this.inpDiv.hide()
            this.setTimeShown = false
        })
        
    }
    clockClicked(){
        
        if(this.alarmRinging){
            clearInterval(this.ringInterval)
            this.alarmSet = false
            this.alarmRinging = false
            this.osc.stop();
            this.updateStyle()
        }
        else if (this.setTimeShown == false){
            this.inpDiv.show()
            this.setTimeShown = true
        }
        else if (this.setTimeShown == true){
            this.inpDiv.hide()
            this.setTimeShown = false
        }
    }

    updateStyle(){
        switch(this.shape){
            case "circle": 
                this.div.style("height", "12rem")
                this.div.style("border-radius", "50%")
                break;
            case "ellipse":
                this.div.style("height", "6rem")
                this.div.style("border-radius", "2rem")
                break;
        }
        switch(this.background){
            case "pink": 
                this.div.style("background", "hotpink");
                break;
            case "black":
                this.div.style("background", "black");
                this.div.style("color", "white");  
                break;
            default:
                this.div.style("background", "rgba(0,0,0,0)");
        }
    }
    start(){
        this.interval = setInterval(() => {
            this.CurrHrs = hour(); this.CurrMins = minute(); this.CurrSecs = second();
            this.hDiv.html(this.CurrHrs < 10 ? "0" + this.CurrHrs : this.CurrHrs); // compact IF/ELSE statement to ensure the formate stays consistant eg. 01 hrs instead of 1 hrs
            this.mDiv.html(this.CurrMins < 10 ? "0" + this.CurrMins : this.CurrMins); // compact IF/ELSE statement to ensure the formate stays consistant eg. 01 mins instead of 1 mins
            this.sDiv.html(this.CurrSecs < 10 ? "0" + this.CurrSecs : this.CurrSecs); // compact IF/ELSE statement to ensure the formate stays consistant eg. 01 secs instead of 1 secs

            //Alarmhandler
            this.checkAlarm();

        }, 1000);
    }
    stop(){
        clearInterval(this.interval);
    }
    setAlarm(h,m,s){
        this.alarmHrs = h
        this.alarmMins = m
        this.alarmSecs = s

        this.alarmSet = true;

        console.log(
            `Alarm has ben set to ${this.alarmHrs} : ${this.alarmMins} : ${this.alarmSecs}`
        )

    }
    checkAlarm(){
        if(this.alarmSet){
            if(this.alarmHrs == this.CurrHrs && this.alarmMins == this.CurrMins && this.alarmSecs == this.CurrSecs){
                console.log("Alarm ringing");
                this.alarmRinging = true;
                this.startRinging();
            }
        }
        
    }
    startRinging(){
        
        
        let val = true
        this.ringInterval = setInterval(() => {
            this.osc.start();
            console.log(val)
            if(val){
                this.osc.freq(400);
                this.div.style("background", "red")
                this.div.style("color", "white")
                val = false
            }
            else{
                this.osc.freq(200);
                this.div.style("background", "white")
                this.div.style("color", "black")
                val = true
            }
            
        }, 1000);
        
    }
    
}