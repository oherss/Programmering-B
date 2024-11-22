class Clock{
    //when a class's objects can behave differently it's called polymophy 
    constructor(div, style ){ //The constructor is equal to the setup() function, which is called when a new object is made
        this.div = div;
        this.style = style;
        this.shape = this.style.shape;
        this.background = this.style.background;
        //Hours, mintues and seconds DIVs
        this.hDiv = createDiv();
        this.mDiv = createDiv();
        this.sDiv = createDiv();
        this.div.child(this.hDiv);
        this.div.child(this.mDiv);
        this.div.child(this.sDiv);
        //interval to update time
        this.interval;
        //this.start is in internal function which starts the clock
        //this.start();
        //styles
        this.div.style("width", "12rem")
        this.div.style("height", "6rem")
        this.div.style("border", "4px dotted gray")
        this.div.style("display", "grid")
        this.div.style("place-items", "center")
        this.div.style("padding", "0.5rem")
        this.div.style("border-radius", "2rem")

        console.log("Color chosen: " + this.style.background)
        console.log("Shape chosen: " + this.style.shape)
        //React upon the style argument given
        

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
        }

        
    }
    start(){
        this.interval = setInterval(() => {
            this.hDiv.html(hour() < 10 ? "0" + hour() : hour()); // compact IF/ELSE statement to ensure the formate stays consistant eg. 01 hrs instead of 1 hrs
            this.mDiv.html(minute() < 10 ? "0" + minute() : minute()); // compact IF/ELSE statement to ensure the formate stays consistant eg. 01 mins instead of 1 mins
            this.sDiv.html(second() < 10 ? "0" + second() : second()); // compact IF/ELSE statement to ensure the formate stays consistant eg. 01 secs instead of 1 secs

        }, 1000);
    }
    stop(){
        clearInterval(this.interval);
    }
}