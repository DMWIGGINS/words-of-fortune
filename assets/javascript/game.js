var wins = 0;
var losses = 0;
var playerGuess = "";
var guessesRemaining = 10;
var newPuzzle = [];
var dashesandSpaces = 0;
var unsolvedPuzzle = [];
var puzzleProgress = [];
var lettersGuessed = [];
var allLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


var puzzles = {
    p1: ["Phrase", "YOUR GUESS IS AS GOOD AS MINE"],
    p2: ["Famous Quote", "ALL THAT GLITTERS IS NOT GOLD"],
    p3: ["Place", "MAJESTIC WATERFALL"],
    p4: ["Thing", "INCREDIBLE JOURNEY"],
    p5: ["Around the Kitchen", "SIX QUART CROCK POT"],
    p6: ["Fun and Games", "PLAYING FRISBEE ON THE BEACH"],
    p7: ["What am I doing?", "COUNTING MY CHICKENS BEFORE THEY HATCH"],
    p8: ["Same Letter", "CREATIVE COLORFUL CRAFTS"],
    p9: ["Place", "DETROIT MICHIGAN"],
    p10: ["Occupation", "FORENSIC SCIENTIST"],

};

var puzzlesSelection = [puzzles.p1, puzzles.p2, puzzles.p3, puzzles.p4, puzzles.p5, puzzles.p6, puzzles.p7, puzzles.p8, puzzles.p9, puzzles.p10];

// set up game display

function newGame() {


    guessesRemaining = 10;
    dashesandSpaces = 0;
    unsolvedPuzzle = [];
    puzzleProgress = [];
    lettersGuessed = [];
    // losses = 0;
    // wins = 0;

    // document.getElementById("losses").innerHTML = losses;
    // document.getElementById("wins").innerHTML = wins;

    document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join("");
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;


    var puzzleDiv = document.getElementById("puzzleDisplay");
    document.getElementById("puzzleDisplay").innerHTML = null;


    // randomly select new puzzle from puzzle object index (0-9)

    currentPuzzle = Math.floor(Math.random() * 10);

    console.log(currentPuzzle);

    // display category of puzzle on screen

    document.querySelector("#category").innerHTML = puzzlesSelection[currentPuzzle][0];


    // test to see how long the puzzle is including spaces between words

    dashesandSpaces = puzzlesSelection[currentPuzzle][1].length;
    console.log(dashesandSpaces);

    // grab div where we will disply the unsolved puzzle


    // create div to append after filling with the corresponding number of blank rectangles and spaces of the chosen puzzle

    // var puzzleDiv = document.createElement("div");

    // test to make sure we are collecting the correct amount of letters and spaces in the correct order from our puzzle string

    var letterCounter = 0;
    var spaceCounter = 0;

    // loop through the puzzle string the correct number of times based on the puzzle length

    for (i = 0; i < dashesandSpaces; i++) {

        // if the character is a space, create a spaceDiv and append to our puzzleDiv
        // add a * to our unsolvedPuzzle array to mark the space

        if (puzzlesSelection[currentPuzzle][1].charAt(i) === " ") {
            spaceCounter++;
            unsolvedPuzzle.push("*");
            if (i !== 0) {
                puzzleDiv.appendChild(wordDiv);
            }
            var spaceDiv = document.createElement("div");
            spaceDiv.innerHTML = " ";
            spaceDiv.setAttribute("class", "space");
            spaceDiv.setAttribute("ID", i);
            puzzleDiv.appendChild(spaceDiv);
            console.log("It's a space");

            // if the character is a letter, create a letterDiv and append to our puzzleDiv
            // add a _ to our unsolved Puzzle array to markhold the place for the letter

        } else if (puzzlesSelection[currentPuzzle][1].charAt(i) !== " ") {
            unsolvedPuzzle.push("_");
            letterCounter++;
            if ((i === 0) || unsolvedPuzzle[i - 1] === "*") {
                console.log(i - 1);
                var wordDiv = document.createElement("div");
                wordDiv.setAttribute("class", "word");
            }
            var letterDiv = document.createElement("div");
            letterDiv.innerHTML = "";
            letterDiv.setAttribute("class", "dis");
            letterDiv.setAttribute("ID", i);
            wordDiv.appendChild(letterDiv)
            console.log("It's a letter");
        }


    }

    // confirm that our unsolvedPuzzle has the correct number of * and _ in the correct position

    console.log(unsolvedPuzzle);

    console.log("LetterCounter = " + letterCounter);
    console.log("SpaceCounter = " + spaceCounter);


    // send our puzzle display to the user by appending to the targetDiv that we pulled from the HTML

    puzzleDiv.appendChild(wordDiv);

};


// actions to take when the user presses a key

document.onkeyup = function(event) {

    // convert all letters to uppercase to compare to the solutions which are all uppercase

    var userGuess = event.key.toUpperCase();

    if (allLetters.indexOf(userGuess) === -1) {
        alert("That was not a valid letter. Please try again.");
        return
    }

    // establish letterInPuzzle variable and set it to false
    // this variable will be used to track whether a letter is in the puzzle or not

    var letterInPuzzle = false;
    console.log(userGuess)

    // take the users guess and compare it to each character in the puzzle to see if it matches

    for (i = 0; i < puzzlesSelection[currentPuzzle][1].length; i++) {

        // if the user guess is found in the puzzle then set letterInPuzzle variable to true 

        if (puzzlesSelection[currentPuzzle][1].charAt(i) === userGuess) {
            unsolvedPuzzle[i] = userGuess;
            letterInPuzzle = true;
            console.log(letterInPuzzle);

            // send matched letter to the HTML to be revealed

            document.getElementById(i).innerHTML = userGuess;
            console.log("index is " + unsolvedPuzzle.indexOf("_"));

            // check to see if there are any _ left in the array 
            // if there are no _ left than the index is -1 and user has solved the puzzle

            if (unsolvedPuzzle.indexOf("_") === -1) {

                // add 1 to the wins tally

                wins++;
                document.getElementById("wins").innerHTML = wins;
                $("#winnerModal").modal("show");
            }
        }
    }
    // if the user guess is not matched in the puzzle then the letterInPuzzle variable will still be false

    if (letterInPuzzle === false) {
        console.log(letterInPuzzle);

        // incorrect guesses are updated in our lettersGuessed array and sent to the user view
        // guessesRemaining is decreased by 1

        lettersGuessed.push(userGuess);
        guessesRemaining = guessesRemaining - 1;
        document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(",");
        document.getElementById("guessesRemaining").innerHTML = guessesRemaining;

        // check to see if guessesRemaining has reached 0 ending the game in a loss and adding 1 to the loss tally

        if (guessesRemaining === 0) {
            losses++;
            document.getElementById("losses").innerHTML = losses;
            $("#loserModal").modal("show");
        }
        console.log("Guesses remaining: " + guessesRemaining);
        console.log("Puzzle with correct guesses: " + unsolvedPuzzle);
        console.log("List of incorrect letters: " + lettersGuessed.join(","));

        // test to see if it is the end of the game
    }
};


// prompt user to start the game

alert("Press any key to play!");


newGame();