//Code written for verbal exam in programmning in Denmark by Sproxxy May 2024

let Lyrics = ["Lille", "Peter", "Abraham", "Edderkop", "kravlede", "op", "af"]; //The array with curent lyrics 
let WordsToRemove = ["Abraham"]; //The array of the words in the lyric to remove
let WordsToAdd = ["muren"]; //The array of words to add to the lyric, in order

function setup() {

  PrintArray(Lyrics, "Current lyric:") //Prints current lyrics to the console
  PrintArray(WordsToRemove, "Words to remove:") //Prints words to remove to console
  PrintArray(WordsToAdd, "Words to add:") //Prints words to remove to console

  RemoveWords(WordsToRemove); //Runs the function to remove words, fed with our array of words to remove
  AddWords(WordsToAdd);       //Runs the function to add words, fed with our array of words to add

  PrintArray(Lyrics, "Final Lyric:") //Prints current lyrics to the console
}

function RemoveWords(words){
  for (let i = 0; i < words.length; i++) {  //For-loop that goes through every word in the "WordsToRemove array, in case more than one word is present"
    let word = words[i]; //Saves current working word into a variable
    for (let n = 0; n < Lyrics.length; n++) { //For-loop that goes through every word in our "Lyrics" array
      if(Lyrics[n] == word){ //Checks if the word to remove is in the "Lyrics" array
        console.log("Found word " + word + " to remove from lyric."); //Tells the user which word it removed
        Lyrics.splice(n,1); //Removes the word from the "Lyrics" array
      }
    }
  }
  PrintArray(Lyrics, "New lyric:") //Prints newly changed lyrics to the console
}


function AddWords(words){
  for (let i = 0; i < words.length; i++) { //For-loop that goes through every word to be added to our "Lyrics" array
    let word = words[i]; //Saves current working word into a variable
    console.log("Found word " + word + " to add to lyric."); //Tells the user which word it added
    Lyrics.push(word) //Adds the word to the array
  }

  PrintArray(Lyrics, "New lyric:") //Prints newly changed lyrics to the console
}

function PrintArray(array, text){
  let CurrentText = "";                     //Creates empty string variable to add array elements to
  for (let i = 0; i < array.length; i++) {  //Goes through every element in given array
    CurrentText += array[i] + " ";          //Adds current elemt to the string variable, seperated with a space
  }
  console.log(text + " " + CurrentText);    //Prints result to the console
}
