let UserIndex
let BankIndex
let Users = []
let UsersFile = []
let BankFile =[]
let Bank = []
let CurrentUserBank = []
let LogOutButton
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

}



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
