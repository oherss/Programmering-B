let data = []

function setup() {
  Drinkname = select("#DrinkName")
  Subtitle = select("#SubTitle")
  Ingredient = select("#Ingredients")
  glass = select("#glass")
  instruction = select("#Instructions")
  img = select("#DrinkImg")
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
    }
    let indx = 0
    for (const key in data[0]){
      if(`${key}`.includes("strIngre") && `${data[0][key]}` != "null"){
        Ingredients[indx]+=(`${data[0][key]}` + "<br>")
        indx++
        //console.log(`${key} : ${data[0][key]}`)
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

