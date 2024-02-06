let words;
let word;
let image;
let lives = 5;
let inputField;
let LetterIndex;
let letter;


function preload(){
    words = loadStrings('Words.txt');
    image = loadImage('/./Pictures/OIG.jfif')
}

function setup(){
    canvas = createCanvas(800,800)
    canvas.style('display', 'block');
    canvas.style('margin', 'auto');
    background(image)
    //background(255)
    NewRound();
    inputField = select('#InputField')
}

function draw(){
    
    
}

function keyPressed() {
    if (keyCode == 13) {
        letter = inputField.value();
      print(letter)
        if(TestLetter(letter)){
            
            DrawFoundLetters(IndexesOfLetters(letter))
            inputField.value('')
        }
        else{
            lives--
            alert("Wrong guess! You now have " + lives + " Lives left")
        }
      
    }
}
function NewGuess(){
    alert("Guess a new letter!")
}

function NewRound(){
    word = random(words);
    let wordLength = word.length
    print(word, wordLength);
    DrawLetters(wordLength)

}

function DrawFoundLetters(indexes){
    for(a = 0; a < indexes.length; a++){
        for(i = 0; i < word.length; i++){
            if(i < 6){
                if(i == indexes[a]){
                    print("drew the letter " + letter + " at ", 200 + 50 * i)
                    stroke(0)
                    strokeWeight(1)
                    textSize(50)
                    text(letter, 200 + (50 * (i+1)), 390)
                }
                
            
        }
             else{
                if(i == indexes[a]){
                    print("drew the letter " + letter + " at ", 200 + 50 * i)
                    stroke(0)
                    strokeWeight(1)
                    textSize(50)
                    text(letter, 200 + (50 * (i+1)), 440)
                }
            
        }
    }
    }
}

function DrawLetters(Ammount){
    print("Drawing ", Ammount, " letters")
    
    for(i = 0; i < Ammount; i++){
        if(i < 6){
            print("drew a line from ", 200 + 50 * i, " to ",220 + 50 * i )
            stroke(0)
            strokeWeight(10)
            line(200 + (50 * (i+1)), 400, 230 + (50 * (i+1)), 400 )
            
        }
        else{
            
            print("drew a line 2 from ", 200 + 50 * i, " to ",220 + 50 * i )
            stroke(0)
            strokeWeight(10)
            line(200 + (50 * (i - 5)), 450, 230 + (50 * (i - 5)), 450 )
        }
    }

}

function TestLetter (letter){
    let lowerStr = word.toLowerCase();
    let lowerLetter = letter.toLowerCase();
    let index = lowerStr.indexOf(lowerLetter);
    if (index != -1) {
      console.log("The letter " + letter + " is in the string " + word);
      LetterIndex = index;
      return true;
    } else {
      console.log("The letter " + letter + " is not in the string " + word);
      return false;
    }
}

function IndexesOfLetters(letter){
let regex = new RegExp(letter, "g"); // create a regular expression with the global flag
let matches = word.matchAll(regex); // get an iterator of all matches
let indexes = []; // create an empty array to store the indexes
for (let match of matches) { // loop through the matches
  indexes.push(match.index); // push the index of each match to the array
}
console.log(indexes); // print the array of indexes
return indexes;
}
