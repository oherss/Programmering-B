let UserIndex
let BankIndex
let Users = []
let UsersFile = []
let BankFile =[]
let Bank = []
let CurrentUserBank = []
let LogOutButton
let totalFastInd = 0
let totalAndreInd = 0
let totalInd = 0
let totalFastUd = 0
let totalAndreUd = 0
let totalUd = 0
let JobSalary
let fun
let shopping
let Saving
let SavingsText
let SavningGoal
let DifColor
const now = new Date();
function preload(){
  
  UsersFile = loadStrings('../Users.txt')
  BankFile = loadStrings('../TotallyLegitBankAPI.txt')
}

function setup() {
  if(areCookiesStored() == false)
  {
    console.log("Not logged in")
    window.location.href = '/..'
  }
  else{
    console.log("Logged in")
  }
  
  LogOutButton = select('#LogOut')
  LogOutButton.mouseClicked(()=>{
    console.log("Logging out...")
    deleteAllCookies()
    window.location.href = '/..'
  })

  UserIndex = document.cookie.split("=")[1];
  BankIndex = UserIndex

  for (let i = 0; i < UsersFile.length; i++) {
    Users[i] = JSON.parse(UsersFile[i])
  }
  for (let i = 0; i < BankFile.length; i++) {
    Bank[i] = JSON.parse(BankFile[i])
  }
  console.log(Bank)
  console.log(Users)

  for (let i = 0; i < Bank.length; i++) {

    console.log("Current User ID: "+  Users[UserIndex].UserID+ " Current bank ID: "+Bank[i].UserID)
    if(Bank[i].UserID == Users[UserIndex].UserID)
    CurrentUserBank.push(Bank[i])
  }

  UserNameField = select('#UserNameText')
  UserNameField.html(Users[UserIndex].UserName)
  SavingsText = select("#SavingsText")
  fun = select("#FunUsage")
  shopping = select("#ShoppingUsage")
  SavningGoal = select("#SavingGoal")

  UserInfoField = select("#UserInfo")
  UpdateText()


  let UpdateButton = select('#UpdateButton')
  UpdateButton.mouseClicked(()=>{
    UpdateText()
  })
}


function UpdateText(){
  console.log("Updating text")
  UserInfo = "Navn: " + Users[UserIndex].RealName +" (" +Users[UserIndex].Age + " år)" + "<br> Tilknyttet bank: " + Users[UserIndex].Bank
  totalFastInd = 0
  totalAndreInd = 0
  totalInd = 0

  for(let i = 0; i < CurrentUserBank.length; i++){
    if(CurrentUserBank[i].Type == 'FastIndtægt'){
      totalFastInd += parseInt(CurrentUserBank[i].Amount)
    }
    if(CurrentUserBank[i].Type == 'Indtægt'){
      totalAndreInd += parseInt(CurrentUserBank[i].Amount)
    }
    if(CurrentUserBank[i].Type == 'FastIndtægt'||CurrentUserBank[i].Type == 'Indtægt'){
      totalInd += parseInt(CurrentUserBank[i].Amount)
    }
  }
  totalFastUd = 0
  totalAndreUd = 0
  totalUd = 0

    for(let i = 0; i < CurrentUserBank.length; i++){
      if(CurrentUserBank[i].Type == 'FastUdgift'){
        totalFastUd += parseInt(CurrentUserBank[i].Amount)
      }
      if(CurrentUserBank[i].Type == 'Udgift'){
        totalAndreUd += parseInt(CurrentUserBank[i].Amount)
      }
      if(CurrentUserBank[i].Type == 'FastUdgift'||CurrentUserBank[i].Type == 'Udgift'){
        totalUd += parseInt(CurrentUserBank[i].Amount)
      }
    }
  UserInfo += "<br><br> Gennemsnitlig indkomst: " + totalFastInd + "DKK"
  UserInfo += "<br><br> Total Frikort: " + Users[UserIndex].Frikort + "DKK"
  
  for (let i = 0; i < CurrentUserBank.length; i++) {
    if(CurrentUserBank[i].Category == "Job")
    JobSalary = CurrentUserBank[i].Amount
    
  }
  UserInfo += "<br> Total resterende: " + (Users[UserIndex].Frikort - (JobSalary * now.getMonth())) + "DKK"
  UserInfo += "<br><br> Angivet indtjæning: " + Users[UserIndex].SelvtastIncome  + "DKK"
  UserInfo += "<br> Forventet indtjæning: " + totalFastInd*12  + "DKK"
  
  if(Users[UserIndex].SelvtastIncome- totalFastInd*12 > 1000)
  DifColor = "Red"
  else if(Users[UserIndex].SelvtastIncome- totalFastInd*12 > 500)
  DifColor = "Orange"
  else if(Users[UserIndex].SelvtastIncome- totalFastInd*12 < 500)
  DifColor = "Green"

  UserInfo += "<br> Difference: <span style= 'color: " +DifColor + ";'>"  +(Users[UserIndex].SelvtastIncome- totalFastInd*12)  + "DKK</span>"

  Saving = "Overskud: "
  

  Saving += totalInd-totalUd-fun.value()- shopping.value() + "DKK <br><br> Beløb på opsparing: "  + Users[UserIndex].Savings
  Saving += "<br><br> Estimeret tid til osparingsmål: <br>" + Math.round((SavningGoal.value()-Users[UserIndex].Savings)/(totalInd-totalUd-fun.value()- shopping.value())) + " Måneder"

  SavingsText.html(Saving)
  UserInfoField.html(UserInfo)
}
/*
function draw(){
  let Saving = "Overskud: "
  Saving += totalInd-totalUd-fun.value()- shopping.value() + "DKK <br><br> Beløb på opsparing: "  + Users[UserIndex].Savings
  Saving += "<br><br> Estimeret tid til osparingsmål: <br>" + Math.round((SavningGoal.value()-Users[UserIndex].Savings)/(totalInd-totalAndreUd-fun.value()- shopping.value())) + " Måneder"
  SavingsText.html(Saving)
}
*/
function areCookiesStored() {
  let storedUsername = document.cookie;
  if(storedUsername != "")
  return(true)
  else
  return(false)
}
function deleteAllCookies() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
  }
  if(areCookiesStored()){
    console.log("Error deleting cookies, the following cookies were unable to be deleted")
    showCookies()
  }
  else
  console.log("Cookies deleted")
}
function showCookies (){
  if(areCookiesStored()){
  let storedUsername = document.cookie;
console.log("Stored username: ", storedUsername);
}
else
console.log("No cookies stored")
}
function showCookiesForce (){
  let storedUsername = document.cookie;
console.log("Stored username:", storedUsername);
}
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  console.log("Cookie deleted")

}
function setCookie(name, value, minutes) {
  const now = new Date();
  const expirationTime = new Date(now.getTime() + minutes * 60 * 1000); // Add 30 minutes
  document.cookie = `${name}=${value}; expires=${expirationTime.toUTCString()}; path=/`;
}
