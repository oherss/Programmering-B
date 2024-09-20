
let currentPage = 1
let data = []
let pages //array med alle elementer med class = page 
let menuItems //array med alle menupunkterne  

function setup(){
  Drinkname = select("#DrinkName")
  Subtitle = select("#SubTitle")
  Ingredient = select("#Ingredients")
  glass = select("#glass")
  instruction = select("#Instructions")
  img = select("#DrinkImg")
    setupMenuStructure()
}

function setupMenuStructure(){
    pages = selectAll('.page')
    menuItems = selectAll('.menuitem')

    //menu items skal reagere ved at skifte side
    for( m of menuItems ){
        m.mousePressed( function(e) {
            //e.target er selve html div'en 
            console.log(e.target.id)
            //slice -1 henter det sidste bogstav i en string
            let nr = e.target.id.slice(-1)
            //nu kan vi kalde shiftPage som skifter side
            shiftPage(nr)
        })
    }

    //shiftPage er funktionen der tager et tal og skifter til en side        
    shiftPage(currentPage)
    //vent to sekunder og sæt så klassen "hidden" på headeren - så menuen bliver væk
    setTimeout(function(){
        select('header').addClass('hidden')
    }, 10000)

}

function pageTwo(){

  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then( function(response){
    console.log(response)
    return response.json()
  })
    .then( function(json){
      console.log(json)
      data = json.drinks
      console.log(data)
      Drinkname.elt.innerHTML = data[0].strDrink
      Subtitle.elt.innerHTML = data[0].strAlcoholic + " " + data[0].strCategory
      img.elt.src = data[0].strDrinkThumb
  
      let Ingredients = []
  
      for (const key in data[0]){
          if(`${key}`.includes("strMeas") && `${data[0][key]}` != "null"){
            Ingredients.push(" - " + `${data[0][key]}` + " of ")
            //console.log(`${key} : ${data[0][key]}`)
          }
          else if(`${key}`.includes("strMeas") && `${data[0][key]}` == "null"){
            Ingredients.push(" - ")
          }
      }
      let indx = 0
      for (const key in data[0]){
        
        if(`${key}`.includes("strIngre") && `${data[0][key]}` != "null"){
          Ingredients[indx]+=(`${data[0][key]}` + "<br>")
          indx++
          //console.log(`${key} : ${data[0][key]}`)
        }
        else if(`${key}`.includes("strIngre") && `${data[0][key]}` == "null"){
          Ingredients[indx] = ""
          indx++
        }
        
    }
  
  let IngrString =""
      for (let i = 0; i < Ingredients.length; i++) {
        IngrString += Ingredients[i]
        
      }
    Ingredient.elt.innerHTML=IngrString
  
    glass.elt.innerHTML = data[0].strGlass
    instruction.elt.innerHTML = data[0].strInstructions
    console.log(Ingredients)
      //brug data resultaterne...
    })
}

function pageThree(){
  fetch("./Assets/SampleData.json")
  .then(function(response){
    console.log(response)
    return response.json()
  
  })
  .then( function(json){
    let newDiv = createElement("div")
    let newHeader = createElement("h1", json.name)
    let newP =createElement("p", json.job)
    newDiv.child(newHeader)
    newDiv.child(newP)
    select("#localData").html("")
    select("#localData").child(newDiv)
  })

}

function pageFour(){
}

function shiftPage(num){
    if(num == "ArrowLeft"){
        num = currentPage - 1
    }
    if(num == "ArrowRight"){
        num = currentPage + 1
    }

    if(isNaN(num) || num > pages.length || num == 0){
        return
    }

    select("#page" + currentPage).removeClass('visible')
    select("#menu" + currentPage).removeClass('active')
    currentPage = num
    select("#page" + currentPage).addClass('visible')
    select("#menu" + currentPage).addClass('active')

    if(currentPage == 2) {
        pageTwo()
    }
    if(currentPage == 3) {
        pageThree()
    }
}

function keyPressed(){
    console.log(key)
    shiftPage(key)
}

