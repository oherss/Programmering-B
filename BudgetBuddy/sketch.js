let canvas

let UserIndex
let BankIndex
let Users = []
let UsersFile = []
let BankFile =[]
let Bank = []

function preload(){
  UsersFile = loadStrings('Users.txt')
  BankFile = loadStrings('TotallyLegitBankAPI.txt')
}

function setup() {
  console.log(UsersFile.length)
  for (let i = 0; i < UsersFile.length; i++) {
    Users[i] = JSON.parse(UsersFile[i])
  }
  for (let i = 0; i < BankFile.length; i++) {
    Bank[i] = JSON.parse(BankFile[i])
  }
  console.log(Bank)
  console.log(Users)


  canvas = createCanvas(windowWidth, windowHeight - document.body.clientHeight);
  WelcomeScreen()
  
}

function draw() {
  
}

function WelcomeScreen (){
  //Baggrund tegnes
  background(100);

  //Introtekst
  textAlign(CENTER, CENTER)
  textFont("Helvetica")
  textSize(canvas.width/20)
  fill(255)
  text("Velkommen til BudgetBuddy",canvas.width/2, canvas.height/10) 
  textSize(canvas.width/35)
  text("Din assistent til dagligdagens budget!",canvas.width/2, canvas.height/10 + canvas.width/20) 


  
  
  rectMode(CENTER)


  //Loginboks
    fill(170)
    rect(canvas.width/2 - canvas.width/5,canvas.height/1.8,canvas.width/6,canvas.height/2)
    fill(0)
    textSize(canvas.width/50)
    text("Log ind",canvas.width/2 - canvas.width/5,canvas.height/1.8 - canvas.height/5 )
  //Inputfelter
    UserNameInputLogin = createInput("Brugernavn")
    UserNameInputLogin.position(canvas.width/2 - canvas.width/4,canvas.height/1.6 - canvas.height/15 )

    UserPassInputLogin = createInput("Adgangskode")
    UserPassInputLogin.position(canvas.width/2 - canvas.width/4,canvas.height/1.45 - canvas.height/15 )
  //Knapper 
    LoginButton = createButton("Log ind")
    ForgotPass = createButton("Glemt kodeord?")
    LoginButton.position(canvas.width/2 - canvas.width/4,canvas.height/1.3 - canvas.height/11 )
    ForgotPass.position(canvas.width/2 - canvas.width/4,canvas.height/1.25 - canvas.height/16 )
  //Funktion for knapper
  LoginButton.mouseClicked(()=>{
    let NewUserName = UserNameInputLogin.value().toString()
    let NewPassWord = UserPassInputLogin.value().toString()
    let CorrectPassword
    let IsUser = false
    

    console.log(NewUserName)
    for (let i = 0; i < Users.length; i++) {
      console.log(Users[i].UserName)
      if(NewUserName == Users[i].UserName){
      CorrectPassword = Users[i].PassWord
      UserIndex = i
      IsUser = true
      }
    }
    if(!IsUser){
      console.log("No such user found")
      fill(170)
      rect(canvas.width/2 - canvas.width/5,canvas.height/1.8,canvas.width/6,canvas.height/2)
      fill(0)
      textSize(canvas.width/50)
      text("Log ind",canvas.width/2 - canvas.width/5,canvas.height/1.8 - canvas.height/5 )
      text("Bruger findes ikke",canvas.width/2 - canvas.width/5,canvas.height/1.2 - canvas.height/11)
      
    }
    else if(NewPassWord != CorrectPassword){
      console.log("Wrong Password for user: " + Users[UserIndex].UserID)
      fill(170)
      rect(canvas.width/2 - canvas.width/5,canvas.height/1.8,canvas.width/6,canvas.height/2)
      fill(0)
      textSize(canvas.width/50)
      text("Log ind",canvas.width/2 - canvas.width/5,canvas.height/1.8 - canvas.height/5 )
      text("Forkert adgangskode",canvas.width/2 - canvas.width/5,canvas.height/1.2 - canvas.height/11)
    }
    else if(NewPassWord == CorrectPassword){
      console.log("Correct password for user: " + Users[UserIndex].UserID)
      fill(170)
      rect(canvas.width/2 - canvas.width/5,canvas.height/1.8,canvas.width/6,canvas.height/2)
      fill(0)
      textSize(canvas.width/50)
      text("Log ind",canvas.width/2 - canvas.width/5,canvas.height/1.8 - canvas.height/5 )
      text("Velkommen tilbage",canvas.width/2 - canvas.width/5,canvas.height/1.2 - canvas.height/11)
      MainPage()
    }
  })


  //Opret bruger boks
    fill(170)
    rect(canvas.width/2 + canvas.width/5,canvas.height/1.8,canvas.width/6,canvas.height/2)
    fill(0)
    textSize(canvas.width/50)
    text("Opret Bruger",canvas.width/2 + canvas.width/5,canvas.height/1.8 - canvas.height/5 )
  //Inputfelter
    UserNameInputNew = createInput("Brugernavn")
    UserNameInputNew.position(canvas.width/2 + canvas.width/6.5,canvas.height/1.6 - canvas.height/15 )

    UserPassInputNew = createInput("Adgangskode")
    UserPassInputNew.position(canvas.width/2 + canvas.width/6.5,canvas.height/1.45 - canvas.height/15 )
  //Knapper
    SignUpButton = createButton("Opret bruger")
    SignUpButton.position(canvas.width/2 + canvas.width/6.5,canvas.height/1.3 - canvas.height/11)
    //Funktion for knap
      SignUpButton.mouseClicked(()=>{
        let NewUserName = UserNameInputNew.value()
        let NewPassWord = UserPassInputNew.value()
        
        let NewUserID = (parseInt(Users[Users.length - 1].UserID) + 1).toString()

        Users.push({
          UserID: NewUserID,
          UserName: NewUserName,
          PassWord: NewPassWord
        })
        console.log(Users)

        text("Bruger oprettet!",canvas.width/2 + canvas.width/5,canvas.height/1.2 - canvas.height/11)

      })
}

function MainPage(){
  //Baggrund tegnes
  background(100);
  //UI fra login skærm skjules
  UserNameInputNew.hide()
  UserPassInputNew.hide()
  UserNameInputLogin.hide()
  UserPassInputLogin.hide()
  SignUpButton.hide()
  LoginButton.hide()
  ForgotPass.hide()
  //Data hentes fra brugerens bank
  for (let i = 0; i < Bank.length; i++) {
    if(Bank[i].UserID == UserIndex)
    BankIndex = i
  }
  for (let i = 1; i < parseInt(Bank[0].AntalIntægter)+1; i++) {
    console.log(Bank[i])
    
  }



  //Nyt UI tegnes
  UserNameField = select('#UserNameText')
  UserNameField.html(Users[UserIndex].UserName)
  //Indtægter
  IncomeText = createElement("h1","Indtægter")
  IncomeText.position(canvas.width/4.3,canvas.height/4)
  fill(170)
    rect(canvas.width/2 - canvas.width/5,canvas.height/1.8,canvas.width/6,canvas.height/1.3)
    fill(0)
    line(canvas.width/2 - canvas.width/5-canvas.width/6/2,canvas.height/1.8-canvas.height/3.5,canvas.width/2 - canvas.width/5+canvas.width/6/2,canvas.height/1.8-canvas.height/3.5)
    RegularIncomes = createElement("h4","Faste indtægter")
    RegularIncomes.position(canvas.width/2 - canvas.width/5-canvas.width/12,canvas.height/1.7-canvas.height/4 )
    line(canvas.width/2 - canvas.width/5-canvas.width/6/2,canvas.height/1.6-canvas.height/3.5,canvas.width/2 - canvas.width/5+canvas.width/6/2,canvas.height/1.6-canvas.height/3.5)
  //Udgifter
  ExpensesText = createElement("h1","Udgifter")
  ExpensesText.position(canvas.width/1.95,canvas.height/4)
  fill(170)
    rect(canvas.width/1.3 - canvas.width/5,canvas.height/1.8,canvas.width/6,canvas.height/1.3)
    fill(0)
    line(canvas.width/1.3 - canvas.width/5-canvas.width/6/2,canvas.height/1.8-canvas.height/3.5,canvas.width/1.3 - canvas.width/5+canvas.width/6/2,canvas.height/1.8-canvas.height/3.5)

  //Budget
  BudgetText = createElement("h1","Budget")
  BudgetText.position(canvas.width/1.3,canvas.height/4)
  fill(170)
    rect(canvas.width/0.98 - canvas.width/5,canvas.height/1.8,canvas.width/6,canvas.height/1.3)
    fill(0)
    line(canvas.width/0.98 - canvas.width/5-canvas.width/6/2,canvas.height/1.8-canvas.height/3.5,canvas.width/0.98 - canvas.width/5+canvas.width/6/2,canvas.height/1.8-canvas.height/3.5)


  }