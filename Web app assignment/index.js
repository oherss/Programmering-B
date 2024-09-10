console.log("JS is loaded");
let pages; 
let textElements = [];
let AboutPepper;
let sources = [];
let menuitems;
let totalPages;
let currentPage = 0;
let collectionModel;

function preload(){
    AboutPepper = loadStrings("./Assets/AboutPepper.txt")
    sources = loadStrings("./Assets/Sources.txt")
}

function setup(){

    fetchCollection("collection name").then( d => {
        collectionModel = d
        console.log(collectionModel)
        //change properties
        collectionModel['Mandag']['transport'] = 32
        //update or create docs 
        //createDocument('collection name', collectionModel['Mandag'], 'Tirsdag')
        //updateDocument('collection name', collectionModel['Mandag'], 'Mandag')
    })

    pages = selectAll(".Page");
    let TempText = selectAll("p")
    menuitems = selectAll(".menuitem");
    



    totalPages = pages.length-1;
    switchPage(currentPage);

    for (let i = 0; i < sources.length; i++) {
        sources[i] = JSON.parse(sources[i])
    }
    for (let i = 0; i < AboutPepper.length; i++) {
        AboutPepper[i] = JSON.parse(AboutPepper[i])
    }

    for(m of menuitems){
        let pnum = m.elt.id.slice(-1) - 1;
        m.mouseClicked(()=>{switchPage(pnum);});
    }

    for(p of TempText){
        if(p.id =! null){
            textElements.push(p)
        }
    }

    for(p of textElements){
        console.log("Total loaded amount of text lines: " + AboutPepper.length)
        console.log("P id is: " + p.elt.id)
        for(t of AboutPepper){
            console.log("text id is: "+ t.id)
            if(t.id == p.elt.id)
            {
                console.log("Found matching text for element: " + p.elt.id)
                p.elt.innerHTML = t.text
            }
            if(p.elt.id == t.pageid+"Contents"){
                let TempText =""
                for(i of AboutPepper){
                    TempText += ("- " + i.name +"<br>")
                }
                p.elt.innerHTML = TempText
            }
            if(p.elt.id == t.pageid+"Sources"){
                let TempText =""
                for(s of sources){
                    if(s.pageid == t.pageid){
                        TempText += "  -Segment: " + s.name + "<br>"
                        TempText += "   Source: <a href='" + s.source + "'>" + s.text + "</a> <br>"
                    }
                }
                p.elt.innerHTML = TempText
            }
        }
        
    }
}

function switchPage (pageNum){
    pages[currentPage].removeClass("visible");
    pages[pageNum].addClass("visible");

    menuitems[currentPage].removeClass("active");
    menuitems[pageNum].addClass("active");
    currentPage = pageNum;
}

function keyPressed(){
    console.log(key)
    if(key == "ArrowLeft"){
        if(currentPage > 0){
            switchPage(currentPage -1);
        }
    }
    else if(key == "ArrowRight"){
        if(currentPage < totalPages){
            switchPage(currentPage +1);
        }
    }
}
    