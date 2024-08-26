console.log("JS is loaded");
let pages; 
let menuitems;
let totalPages;
let currentPage = 0;

function setup(){
    pages = selectAll(".Page");
    menuitems = selectAll(".menuitem");
    totalPages = pages.length-1;
    switchPage(currentPage);

    for(m of menuitems){
        let pnum = m.elt.id.slice(-1) - 1;
        m.mouseClicked(()=>{switchPage(pnum);});
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
    