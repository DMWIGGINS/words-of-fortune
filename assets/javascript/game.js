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

puzzlesSelection = [puzzles.p1, puzzles.p2, puzzles.p3, puzzles.p4, puzzles.p5, puzzles.p6, puzzles.p7, puzzles.p8, puzzles.p9, puzzles.p10];

var wins = 0;
var losses = 0;
var playerGuess = "";
var guessesRemaining = "";
var newPuzzle = [];


function newGame() {
    currentPuzzle = Math.floor(Math.random() * 10);
    console.log(currentPuzzle);
    document.querySelector("#category").innerHTML = puzzlesSelection[currentPuzzle][0];
    for (i = 0; i < puzzlesSelection[currentPuzzle][1].length; i++) {
        if (puzzlesSelection[currentPuzzle][1].charAt(i) === " ") {
            console.log("It's a space");
            newPuzzle.push(" ");
        } else {
            console.log("It's a letter.");
            newPuzzle.push("____");
        }
        // document.querySelector("#puzzleDisplay").innerHTML = newPuzzle[i];
        console.log(newPuzzle[i]);
        var puzzleDisplay = document.getElementById("puzzleDisplay");


        var newDiv = document.createElement("div");
        newDiv.innerHTML = newPuzzle[i];

        // Now we use the ".appendChild" method to combine the two divs together on the page.
        puzzleDisplay.appendChild(newDiv);
    }
    // document.querySelector(".card-text").innerHTML = "  ";
    // console.log(puzzlesSelection[currentPuzzle][1].charAt(8));
};

alert("Press any key to play!");

newGame();