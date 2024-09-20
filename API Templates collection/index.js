
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
  DrinkIDText = select("#DrinkIDT")
  DrinkIDInput = select("#DrinkIDInp")
  DrinkIDButton = select("#DrinkIDBut")
  DrinkSearchButton = select("#DrinkSearchBut")
  DrinkNameSearchButton =select("#SearchDrinkNameButton")
  DrinkNameSearchInput = select("#SearchDrinkNameInput")
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
DrinkIDButton.mousePressed(function(){
  fetch(('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + DrinkIDInput.elt.value.toString()))
  .then( function(response){
    console.log(response)
    console.log(DrinkIDInput)
    return response.json()
  })
  .then( function(json){
    console.log(json)
    LoadDrink(json)
    
  })
})
DrinkSearchButton.mousePressed(function(e){
  
  shiftPage(5)
})

  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then( function(response){
    console.log(response)
    return response.json()
  })
    .then( function(json){
      LoadDrink(json)
    })
}

function pageThree(){
  fetch("./Assets/mydata.json")
  .then(function(response){
    console.log(response)
    return response.json()
  
  })
  .then( function(data){
    console.log(data)
            //p5 funktion der laver en ny div
            let newDiv = createElement('div')
            //så laver vi en overskrift
            let newHeader = createElement('h1', data.Name)
            //så laver vi et p-element
            let newP = createElement('p', data.Description)
            //nu laver vi en underoverskrift
            let hairHeader = createElement('h3', 'Tidligere hårfarver')
            //nu skal jeg løbe et array igennem fra json
            let hairList = createElement('ul')
            for( color of data.formerHairColors ){
                //console.log(color)
                let listItem = createElement('li', color)
                hairList.child(listItem)
            } 
            //til sidst lægger vi de nye elementer ind i den div vi oprettede
            newDiv.child(newHeader)
            newDiv.child(newP)
            newDiv.child(hairHeader)
            newDiv.child(hairList)
            //newDiv.child(createElement("img", data.image ))

            //tag fat i html elementet med id = localData
            //tøm det
            select('#localData').html('')
            //og sæt data ind i det 
            select('#localData').child(newDiv)
  })

}

function pageFour(){
}

function LoadDrink(json){
  console.log(json) //Logging the raw data recieved
      data = json.drinks //
      console.log(data)
      Drinkname.elt.innerHTML = data[0].strDrink
      Subtitle.elt.innerHTML = data[0].strAlcoholic + " " + data[0].strCategory
      img.elt.src = data[0].strDrinkThumb
      DrinkIDText.elt.innerHTML = "Drink ID: " + data[0].idDrink

  
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
}
function pageFive(){
  console.log("page 5")
  DrinkNameSearchButton.mousePressed(function(){
    fetch(('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + DrinkNameSearchInput.elt.value.toString()))
      .then( function(response){
      console.log(response)
      console.log(DrinkIDInput)
      return response.json()
    })
    .then( function(json){
      const Drinks = json.drinks
      console.log(Drinks)
      //select('#localData').html('')
      for(drink of Drinks){
        console.log(drink)
        let newDiv = createElement('div')
        newDiv.addClass("ListItem")
        let newImg = createImg(drink.strDrinkThumb)
        let newHeader = createElement('p', drink.strDrink)
        newHeader.addClass("ListItem")
        let newP = createElement('p', drink.idDrink)
        newP.style("font-size", "1rem")
        newImg.style("width","5rem")
        newDiv.child(newImg)
        newDiv.child(newHeader)
        newDiv.child(newP)
        select('#DrinkList').child(newDiv)
      }
      
    })
  })
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
    if(currentPage == 5) {
        pageFive()
    }
}

function keyPressed(){
    console.log(key)
    shiftPage(key)
}

