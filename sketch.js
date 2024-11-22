let Links = []


function preload(){
  Links = loadStrings('subdirectories.txt');
}

function setup() {
  
  Div = createDiv("")
  Div.addClass("MainDiv")

  for (let i = 0; i < Links.length; i++) {
    let d = createDiv("")
    let a = createA(Links[i],Links[i])
    d.addClass("Link")
    d.child(a)
    Div.child(d)
  }
}


