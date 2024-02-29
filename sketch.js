let Links = []


function preload(){
  Links = loadStrings('subdirectories.txt');
}

function setup() {
  

  for (let i = 0; i < Links.length; i++) {
    createA(Links[i],Links[i])
    createDiv(" ")
  }
}


