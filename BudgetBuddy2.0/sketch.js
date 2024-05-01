let canvas
let Users = []
let UsersFile = []
//UI elementer for login
let UserNameInputLogin
let UserPassInputLogin
let LoginButton
//let ForgotPass
//UI elementer for ny bruger
let UserNameInputNew
let UserPassInputNew
let SignUpButton
function preload(){
  
  UsersFile = loadStrings('Users.txt')
  console.log("Did preload")
}
function setup() {
  if(areCookiesStored() == true)
  {
    window.location.href = './MainPage'
  }
  canvas = createCanvas(0,0)
  
  for (let i = 0; i < UsersFile.length; i++) {
    Users[i] = JSON.parse(UsersFile[i])
  }
  console.log(Users)
//UI elementer for login
  UserNameInputLogin = select('#UserNameInputLogin')
  UserPassInputLogin = select('#UserPassInputLogin')
  LoginButton = select('#LoginButton')
  //ForgotPass = select('#')
//UI elementer for ny bruger
  UserNameInputNew = select('#UserNameInputNew')
  UserPassInputNew = select('#UserPassInputNew')
  SignUpButton = select('#SignUpButton')


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
      
      
    }
    else if(NewPassWord != CorrectPassword){
      console.log("Wrong Password for user: " + Users[UserIndex].UserID)
      
    }
    else if(NewPassWord == CorrectPassword){
      console.log("Correct password for user: " + Users[UserIndex].UserID)
      setCookie("UserID",UserIndex,10)
      showCookies()
      window.location.href = './MainPage'
    }

    
  })



  SignUpButton.mouseClicked(()=>{
    let NewUserName = UserNameInputNew.value()
    let NewPassWord = UserPassInputNew.value()
    
    /*let NewUserID = (parseInt(Users[Users.length - 1].UserID) + 1).toString()
    
    Users.push({
      UserID: NewUserID,
      UserName: NewUserName,
      PassWord: NewPassWord
    })
*/

    let NewUserID = 3
    Users[2].UserName = NewUserName
    Users[2].PassWord = NewPassWord
    console.log(Users)

   
  })
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

