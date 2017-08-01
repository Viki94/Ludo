var content = document.getElementById("content");
var background = document.getElementById("background");
var dice = document.getElementById("dice");
var roll = document.getElementById("roll");
var circle = document.getElementById("circle");
var purple = document.getElementById("active-purple");
var blue = document.getElementById("active-blue");
var start = document.getElementById("start");
var bang = document.getElementById("bang");
var winnerPurple = document.getElementById("winner-purple");
var winnerBlue = document.getElementById("winner-blue");
var path = document.getElementById("path");
var pathNumbers = document.getElementById("pathNumbers");
var logo = document.getElementById("logo");

var pathLenght = 21;
var maxDice = 6;
var number = 6;
var purplePathNumber = 0;
var bluePathNumber = 0;
var playerOnOccupiedPath = "";

var isRollClicked = false;
var isDicePlayed = false;
var isAllowedToStart = false;
var isFirstSixTrown = true;
var isPurpleTurn = true;

//create all path tales and path numbers
for (var i = 1; i < pathLenght; ++i) {
    var pathTile = document.createElement("span");
    pathTile.style.backgroundImage = "url('Images/path.png')";
    pathTile.id = "path" + i;
    pathTile.style.width = "70%";
    pathTile.style.height = "40%";
    pathTile.style.cssFloat = "right";
    pathTile.style.backgroundSize = "contain";
    pathTile.style.backgroundRepeat = "no-repeat";
    path.appendChild(pathTile);

    var numbers = document.createElement("span");
    numbers.className = "numbers";
    numbers.innerHTML = i;
    numbers.style.color = "gray";
    numbers.style.cssFloat = "left";
    numbers.style.fontSize = "152%";
    numbers.style.marginBottom = "15%";
    pathNumbers.appendChild(numbers);
}

//create final tale and final text
var final = document.createElement("span");
final.style.backgroundImage = "url('Images/final.png')";
final.id = "path" + i;
final.style.width = "100%";
final.style.height = "100%";
final.style.marginLeft = "10%";
final.style.backgroundSize = "contain";
final.style.backgroundRepeat = "no-repeat";
path.appendChild(final);

var finalText = document.createElement("span");
finalText.id = "final-text";
finalText.innerHTML = "F I N A L";
content.appendChild(finalText);

//if start is clicked, the game begins
function startGame() {
    start.style.visibility = "hidden";
    winnerPurple.style.visibility = "hidden";
    winnerBlue.style.visibility = "hidden";

    //set purple player settings
    purple.style.backgroundImage = "url('Images/active_purpule.png')";
    purple.style.width = '9%';
    purple.style.height = '9%';
    purple.style.top = "2%";
    purple.style.left = "38%";
    purple.style.backgroundSize = "contain";
    purple.style.backgroundRepeat = "no-repeat";

    //set blue player settings
    blue.style.backgroundImage = "url('Images/blue.png')";
    blue.style.width = '9%';
    blue.style.height = '9%';
    blue.style.top = "2%";
    blue.style.left = "55%";
    blue.style.backgroundSize = "contain";
    blue.style.backgroundRepeat = "no-repeat";

    setBrightness(100);

    roll.style.pointerEvents = "auto";
}

//show active dice when Roll is hovered
function activeDice() {
    dice.style.backgroundImage = "url('Images/" + number + "_active_dise.png')";
}

//show inactive dice when Roll is not hovered
function inactiveDice() {
    dice.style.backgroundImage = "url('Images/" + number + "_dise.png')";
}

function rollDice() {
    //check if dice is clicked    
    isRollClicked = true;

    //check if dice is played    
    isDicePlayed = false;
    roll.style.pointerEvents = "none";

    //set random number between 1 and 6
    var numberOnDice = Math.ceil(Math.random() * maxDice);
    var rememerNumber = numberOnDice;
    number = rememerNumber;

    dice.style.backgroundImage = "url('Images/" + number + "_active_dise.png')";

    checkPlayerTurn();

    //if path is more than final and the dice is not six, the player does not move on this roll
        if ((purplePathNumber + number > pathLenght && isPurpleTurn && number !== maxDice) ||
        (bluePathNumber + number > pathLenght && !isPurpleTurn && number !== maxDice)) {
        isPurpleTurn = !isPurpleTurn;
        isDicePlayed = true;
        roll.style.pointerEvents = "auto";
        return;
    }
    //if path is more than final and the dice is six, the player does not move on this roll but can roll again
    if ((purplePathNumber + number > pathLenght && isPurpleTurn && number === maxDice) ||
        (bluePathNumber + number > pathLenght && !isPurpleTurn && number === maxDice)) {
        isDicePlayed = true;
        roll.style.pointerEvents = "auto";
        return;
    }

    //if dice is not played, the roll can not be clicked
    if (!isDicePlayed) {
        roll.style.pointerEvents = "none";
    }

    //check if this trown six is first; if it is the first six, the player does not play on this turn,
    //he can roll the dice again
    if (number === maxDice && isFirstSixTrown) {
        if (purplePathNumber === 0 && isPurpleTurn) {
            isAllowedToStart = true;
            roll.style.pointerEvents = "auto";
            purple.style.pointerEvents = "none";
            isFirstSixTrown = false;
            return;
        }

        if (bluePathNumber === 0 && !isPurpleTurn) {
            isAllowedToStart = true;
            roll.style.pointerEvents = "auto";
            blue.style.pointerEvents = "none";
            isFirstSixTrown = false;
            return;
        }
    }

    //if player's last roll is six, he can move on this turn
    if (isAllowedToStart && !isFirstSixTrown) {
        if (purplePathNumber === 0 && isPurpleTurn) {
            purple.style.pointerEvents = "auto";
            roll.style.pointerEvents = "none";
            isAllowedToStart = false;
            return;
        }

        if (bluePathNumber === 0 && !isPurpleTurn) {
            blue.style.pointerEvents = "auto";
            roll.style.pointerEvents = "none";
            isAllowedToStart = false;
            return;
        }
    }

    //if one of the player is on the start position and the dice is not six, he can not start moving
    if ((purplePathNumber === 0 && number !== maxDice && isPurpleTurn) ||
        (bluePathNumber === 0 && number !== maxDice && !isPurpleTurn)) {
        purple.style.pointerEvents = "none";
        blue.style.pointerEvents = "none";
        roll.style.pointerEvents = "auto";
        isPurpleTurn = !isPurpleTurn;
        return;
    }
}

function movePurple() {
    if (isPurpleTurn) {
        if (!isRollClicked || isDicePlayed) {
            purple.style.pointerEvents = "none";
            blue.style.pointerEvents = "none";
            return;
        }

        //remember purple player path
        if (purplePathNumber + number <= pathLenght) {
            purplePathNumber += number;
        }

        //move the player
        if (purplePathNumber < pathLenght) {
            purple.style.top = document.getElementById("path" + purplePathNumber).offsetTop + "px";
            purple.style.left = document.getElementById("path").offsetLeft + "px";
        }

        //player wins if he reachs the final tile
        if (purplePathNumber === pathLenght) {
            setBrightness(30);
            resetPlayers();

            winnerPurple.style.visibility = "visible";
        }

        //return hitted player
        if (purplePathNumber === bluePathNumber && purplePathNumber !== 0) {
            setBrightness(30);
            resetStrikedPlayer();

            playerOnOccupiedPath = "purple";
        }

        //if number is 6, next turn plays this player
        if (number === maxDice) {
            isPurpleTurn = true;
        }
        else {
            isPurpleTurn = false;
        }

        roll.style.pointerEvents = "auto";
        isDicePlayed = true;
        isFirstSixTrown = true;
    }
}

function moveBlue() {
    if (!isPurpleTurn) {
        if (!isRollClicked || isDicePlayed) {
            purple.style.pointerEvents = "none";
            blue.style.pointerEvents = "none";
            return;
        }

        //remember purple player path
        if (bluePathNumber + number <= pathLenght) {
            bluePathNumber += number;
        }
        //move the player
        if (bluePathNumber < pathLenght) {
            blue.style.top = document.getElementById("path" + bluePathNumber).offsetTop + "px";
            blue.style.left = document.getElementById("path").offsetLeft + "px";
        }

        //player wins if he reachs the final tile
        if (bluePathNumber === pathLenght) {
            setBrightness(30);
            resetPlayers();
            winnerBlue.style.visibility = "visible";
        }

        //return hitted player
        if (bluePathNumber === purplePathNumber && bluePathNumber !== 0) {
            setBrightness(30);
            resetStrikedPlayer();
            playerOnOccupiedPath = "blue";
        }

        //if number is 6, next turn plays this player
        if (number === maxDice) {
            isPurpleTurn = false;
        }
        else {
            isPurpleTurn = true;
        }

        roll.style.pointerEvents = "auto";
        isDicePlayed = true;
        isFirstSixTrown = true;
    }
}

function checkPlayerTurn() {
    //set active and inactive player
    if (isPurpleTurn) {
        purple.style.pointerEvents = "auto";
        purple.style.backgroundImage = "url('Images/active_purpule.png')";
        blue.style.backgroundImage = "url('Images/blue.png')";
    }
    else {
        blue.style.pointerEvents = "auto";
        purple.style.backgroundImage = "url('Images/purpule.png')";
        blue.style.backgroundImage = "url('Images/active_blue.png')";
    }
}

function startNewGame() {
    startGame();
    winnerPurple.style.visibility = "hidden";
    winnerBlue.style.visibility = "hidden";
    blue.style.visibility = "visible";
    purple.style.visibility = "visible";
}

//set player positions when he is hitted
function continueGame() {
    if (playerOnOccupiedPath === "purple") {
        bluePathNumber = 0;
        blue.style.top = "2%";
        blue.style.left = "55%";
    }
    else if (playerOnOccupiedPath === "blue") {
        purplePathNumber = 0;
        purple.style.top = "2%";
        purple.style.left = "38%";
    }

    setBrightness(100);

    blue.style.visibility = "visible";
    purple.style.visibility = "visible";
    bang.style.visibility = "hidden";
}

function resetPlayers() {
    blue.style.visibility = "hidden";
    purple.style.visibility = "hidden";
    winnerPurple.style.visibility = "hidden";
    winnerBlue.style.visibility = "hidden";
    purplePathNumber = 0;
    bluePathNumber = 0;
}

function resetStrikedPlayer() {
    blue.style.visibility = "hidden";
    purple.style.visibility = "hidden";
    bang.style.visibility = "visible";
}

function setBrightness(n) {
    background.style.filter = "brightness(" + n + "%)";
    path.style.filter = "brightness(" + n + "%)";
    logo.style.filter = "brightness(" + n + "%)";
    dice.style.filter = "brightness(" + n + "%)";
    circle.style.filter = "brightness(" + n + "%)";
    roll.style.filter = "brightness(" + n + "%)";
    finalText.style.filter = "brightness(" + n + "%)";

    for (var i = 0; i < pathLenght - 1; i++) {
        if (n === 30) {
            document.getElementsByClassName("numbers")[i].style.color = "grey";
        }
        if (n === 100) {
            document.getElementsByClassName("numbers")[i].style.color = "white";
        }
    }
}