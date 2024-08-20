console.log("JS is loaded");
let pages; 
let totalPages;
let currentPage = 0;

function setup(){
    pages = selectAll(".Page");
    totalPages = pages.length-1;
}

function switchPage (pageNum){
    pages[currentPage].removeClass("visible");
    pages[pageNum].addClass("visible");
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
    