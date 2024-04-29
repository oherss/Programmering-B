let UserIndex
let BankIndex
let Users = []
let UsersFile = []
let BankFile =[]
let Bank = []
let CurrentUserBank = []

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


  let totalFastInd = 0
    let totalAndreInd = 0
    let totalInd = 0

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

    console.log("Total faste indtægter: " + totalFastInd + " Andre indtægter: " + totalAndreInd + " Total Indtægt: " + totalInd)
    let FastIdtægter = "<b>Faste indtægter: " + totalFastInd + "</b> <br>"

    for(let i = 0; i < CurrentUserBank.length; i++){
      if(CurrentUserBank[i].Type == 'FastIndtægt'){
        FastIdtægter += (CurrentUserBank[i].Name + ": " + CurrentUserBank[i].Amount + "<br>")
      }
    }
    FastIdtægter += "<b>Andre: " + totalAndreInd + "</b> <br>"
    for(let i = 0; i < CurrentUserBank.length; i++){
      if(CurrentUserBank[i].Type == 'Indtægt'){
        FastIdtægter += (CurrentUserBank[i].Name + ": " + CurrentUserBank[i].Amount + "<br>")
      }
    }
    FastIdtægter += ("<b>Total: " + totalInd + "</b> <br>")
    
    RegularIncomesText = select('#IncomeText')
    RegularIncomesText.html(FastIdtægter);


    let totalFastUd = 0
    let totalAndreUd = 0
    let totalUd = 0

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
    
    let FastUdgifter = "<b>Faste Udgifter: " + totalFastUd + "</b><br>"
    for(let i = 0; i < CurrentUserBank.length; i++){
      if(CurrentUserBank[i].Type == 'FastUdgift'){
        FastUdgifter += (CurrentUserBank[i].Name + ": " + CurrentUserBank[i].Amount + "<br>")
      }
    }
    FastUdgifter += ("<b>Andre: " + totalAndreUd + "</b> <br>")
    for(let i = 0; i < CurrentUserBank.length; i++){
      if(CurrentUserBank[i].Type == 'Udgift'){
        FastUdgifter += (CurrentUserBank[i].Name + ": " + CurrentUserBank[i].Amount + "<br>")
      }
    }
    FastUdgifter += ("<b>Total: " + totalUd + "</b> <br>")
    
    ExpensesText = select('#ExpensesText')
    ExpensesText.html(FastUdgifter);

    //Categorized things, first incomes:
    let incomeCategories = []
    for (let i = 0; i < CurrentUserBank.length; i++) {
      if(CurrentUserBank[i].Type == 'Indtægt'||CurrentUserBank[i].Type == 'FastIndtægt'){
        if(!isInArray(incomeCategories,CurrentUserBank[i].Category)){
          incomeCategories.push(CurrentUserBank[i].Category)

        }
      }
    }
    let CategorizedIncomes = ""
    for (let i = 0; i < incomeCategories.length; i++) {
      let CurrentCategory = incomeCategories[i]
      CategorizedIncomes += ("<b>" + CurrentCategory + "</b><br>")
      for (let v = 0; v < CurrentUserBank.length; v++) {
        if(CurrentUserBank[v].Category == CurrentCategory && (CurrentUserBank[v].Type == 'Indtægt'||CurrentUserBank[v].Type == 'FastIndtægt')){
          CategorizedIncomes += (CurrentUserBank[v].Name + ": " + CurrentUserBank[v].Amount + "<br>")
        }
      }
      
    }
console.log(incomeCategories)
CategorizedIncomesText = select('#IncomeCat')
CategorizedIncomesText.html(CategorizedIncomes);

//Now the expenses:
let expsenseCategories = []
    for (let i = 0; i < CurrentUserBank.length; i++) {
      if(CurrentUserBank[i].Type == 'Udgift'||CurrentUserBank[i].Type == 'FastUdgift'){
        if(!isInArray(expsenseCategories,CurrentUserBank[i].Category)){
          expsenseCategories.push(CurrentUserBank[i].Category)

        }
      }
    }
    let CategorizedExpenses = ""
    for (let i = 0; i < expsenseCategories.length; i++) {
      let CurrentCategory = expsenseCategories[i]
      CategorizedExpenses += ("<b>" + CurrentCategory + "</b><br>")
      for (let v = 0; v < CurrentUserBank.length; v++) {
        if(CurrentUserBank[v].Category == CurrentCategory && (CurrentUserBank[v].Type == 'FastUdgift'||CurrentUserBank[v].Type == 'Udgift')){
          CategorizedExpenses += (CurrentUserBank[v].Name + ": " + CurrentUserBank[v].Amount + "<br>")
        }
      }
      
    }
console.log(expsenseCategories)
CategorizedExpenseText = select('#ExpensesCat')
CategorizedExpenseText.html(CategorizedExpenses);

}


function isInArray(Array, value){
  let val = false
  for (let i = 0; i < Array.length; i++) {
    if(Array[i]==value){
    val = true
    }
  }
  return(val)
}
function deleteAllCookies() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
  }
  showCookies()
}
function areCookiesStored() {
  let storedUsername = document.cookie;
  if(storedUsername != "")
  return(true)
  else
  return(false)
}
function showCookies (){
  let storedUsername = document.cookie;
console.log("Stored username:", storedUsername);
}
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
function setCookie(name, value, minutes) {
  const now = new Date();
  const expirationTime = new Date(now.getTime() + minutes * 60 * 1000); // Add 30 minutes
  document.cookie = `${name}=${value}; expires=${expirationTime.toUTCString()}; path=/`;
}
function draw() {
  
}
