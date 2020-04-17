var wins = 0;
var losses = 0;
var playerGuess = "";
var guessesRemaining = 15;
var newPuzzle = [];
var dashesandSpaces = 0;
var unsolvedPuzzle = [];
var puzzleProgress = [];
var lettersGuessed = [];




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



function newGame() {

    // randomly select new puzzle from puzzle object index (0-9)
    currentPuzzle = Math.floor(Math.random() * 10);

    console.log(currentPuzzle);

    // display category of puzzle on screen
    document.querySelector("#category").innerHTML = puzzlesSelection[currentPuzzle][0];


    // test to see how long the puzzle is including spaces between words
    dashesandSpaces = puzzlesSelection[currentPuzzle][1].length;
    console.log(dashesandSpaces);

    // grab div where we will disply the unsolved puzzle
    var targetDiv = document.getElementById("puzzleDisplay");

    // create div to append after filling with the corresponding number of blank rectangles and spaces of the chosen puzzle
    var puzzleDiv = document.createElement("div");

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
            var spaceDiv = document.createElement("div");
            spaceDiv.innerHTML = " ";
            spaceDiv.setAttribute("class", "space");
            spaceDiv.setAttribute("ID", i);
            puzzleDiv.appendChild(spaceDiv);
            console.log("It's a space");

            // if the character is a letter, create a letterDiv and append to our puzzleDiv
            // add a _ to our unsolved Puzzle array to mark the letter

        } else if (puzzlesSelection[currentPuzzle][1].charAt(i) !== " ") {
            unsolvedPuzzle.push("_");
            letterCounter++;
            var letterDiv = document.createElement("div");
            letterDiv.innerHTML = "";
            letterDiv.setAttribute("class", "dis");
            letterDiv.setAttribute("ID", i);
            puzzleDiv.appendChild(letterDiv);
            console.log("It's a letter");
        }


    }

    // confirm that our unsolvedPuzzle has the correct number of * and _ in the correct position
    console.log(unsolvedPuzzle);

    console.log("LetterCounter = " + letterCounter);
    console.log("SpaceCounter = " + spaceCounter);


    // send our puzzle display to the user by appending to the targetDiv that we pulled from the HTML
    targetDiv.appendChild(puzzleDiv);

};





document.onkeyup = function(event) {
    var userGuess = event.key.toUpperCase();
    var letterInPuzzle = false;
    console.log(userGuess)
    for (i = 0; i < puzzlesSelection[currentPuzzle][1].length; i++) {
        if (puzzlesSelection[currentPuzzle][1].charAt(i) === userGuess) {
            unsolvedPuzzle[i] = userGuess;
            letterInPuzzle = true;
            console.log(letterInPuzzle);
            document.getElementById(i).innerHTML = userGuess;
            console.log("index is " + unsolvedPuzzle.indexOf("_"));
            if (unsolvedPuzzle.indexOf("_") === -1) {

                wins++;
                document.getElementById("wins").innerHTML = wins;
            }
        }
    }
    if (letterInPuzzle === false) {
        console.log(letterInPuzzle);
        lettersGuessed.push(userGuess);
        guessesRemaining = guessesRemaining - 1;
        document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(",");
        document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
        if (guessesRemaining === 0) {
            losses++;
            document.getElementById("losses").innerHTML = losses;
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