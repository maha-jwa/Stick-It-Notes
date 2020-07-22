if ('serviceWorker' in navigator) {
    // register service worker
    navigator.serviceWorker.register('/service-worker.js');
}

const hitSound = new Audio('swish.m4a');
const winSound = new Audio('cash.mp3');
const lossSound = new Audio('aww.mp3');
let triesNos = [];
let showYourScore = 0;
let lostNos = 0;
let testCase = false;
let rpsImageDataBase = {
    "rock": document.getElementById("rock").src,
    "paper": document.getElementById("paper").src,
    "scissor": document.getElementById("scissor").src,
}
let userDiv = document.createElement("div");
let messageDiv = document.createElement("div");
let computerDiv = document.createElement("div");

function clearGameDiv() {
    document.getElementById("gamePhotos").innerHTML = "";
}

function resetCounters() {
    document.getElementById('yourTries').innerHTML = 0;
    document.getElementById('yourScore').innerHTML = 0;
    document.getElementById('yourlosses').innerHTML = 0;
}

function rpsGame(yourchoice) {
    let arr = ["rock", "paper", "scissor"];
    let userChoice = yourchoice.id;
    let betchoice = arr[Math.floor(Math.random() * 3)];
    let result = decideWinner(userChoice, betchoice);
    let message = finalMessage(result);
    gameResult(userChoice, betchoice, message);

    function decideWinner(yourchoice, computerchoice) {
        var rpsdatabase = {
            "rock": { "scissor": 1, "rock": 0.5, "paper": 0 },
            "paper": { "rock": 1, "paper": 0.5, "scissor": 0 },
            "scissor": { "paper": 1, "scissor": 0.5, "rock": 0 }
        };
        var yourScore = rpsdatabase[yourchoice][computerchoice];
        var computerScore = rpsdatabase[computerchoice][yourchoice];
        // console.log(yourScore, computerScore);
        return [yourScore, computerScore];
    }

    function finalMessage([yourScore, computerScore]) {
        if (yourScore === 0) {
            lossSound.play();
            if (lostNos >= 0) {
                lostNos += 1;
            } else if (testCase === true) {
                lostNos = 0;
            }
            console.log(lostNos);
            return { "message": "you lost", "color": "#ea220d" };
        } else if (yourScore === 0.5) {
            hitSound.play();
            return { "message": "you tied!", "color": "#81bc4e" };
        } else {
            winSound.play();
            if (showYourScore >= 0) {
                showYourScore += 1;
            } else if (testCase === true) {
                showYourScore = 0;
            }
            return { "message": "you won!", "color": "#68368f" };
        }
    }

}

function gameResult(userChoiceImage, computerChoiceImage, finalMessage) {
    clearGameDiv();
    userDiv.innerHTML = "<img src=' " + rpsImageDataBase[userChoiceImage] +
        "' width=150  height=130  style='box-shadow: 0 10px 50px " + finalMessage.color + " ; margin:35px;' /> ";
    messageDiv.innerHTML = "<h2 style='color: " + finalMessage.color + " ; font-size: 40px;  margin: 35px;' >" + finalMessage.message + "</h2>";
    computerDiv.innerHTML = "<img src=' " + rpsImageDataBase[computerChoiceImage] +
        "' width=150  height=130  style='box-shadow: 0 10px 50px " + finalMessage.color + " ; margin: 35px;' />";
    document.getElementById("gamePhotos").appendChild(userDiv);
    document.getElementById("gamePhotos").appendChild(messageDiv);
    document.getElementById("gamePhotos").appendChild(computerDiv);
    triesNos.push(1);
    document.getElementById('yourTries').innerHTML = triesNos.length;
    document.getElementById('yourScore').innerHTML = showYourScore;
    document.getElementById('yourlosses').innerHTML = lostNos;
}

function playAgain() {
    if (testCase === true) {
        triesNos = [];
        lostNos = 0;
        showYourScore = 0;
        testCase = false;
        document.getElementById('score').style.display = "block";
        document.getElementById("bt4").innerHTML = "Try Again";
    }
    clearGameDiv();
    let rockImg = document.createElement('img');
    let paperImg = document.createElement('img');
    let scissorImg = document.createElement('img');
    rockImg.src = rpsImageDataBase.rock;
    rockImg.id = "rock";
    paperImg.src = rpsImageDataBase.paper;
    paperImg.id = "paper";
    scissorImg.src = rpsImageDataBase.scissor;
    scissorImg.id = "scissor";
    rockImg.addEventListener('click', sendRock);
    paperImg.addEventListener('click', sendPaper);
    scissorImg.addEventListener('click', sendScissor);

    function sendRock() {
        rpsGame(rockImg);
    }

    function sendPaper() {
        rpsGame(paperImg);
    }

    function sendScissor() {
        rpsGame(scissorImg);
    }
    document.getElementById("gamePhotos").appendChild(rockImg);
    document.getElementById("gamePhotos").appendChild(paperImg);
    document.getElementById("gamePhotos").appendChild(scissorImg);
    gameOverMessage();
}

function gameOverMessage() {


    function gameOverProcess() {
        clearGameDiv();
        h1 = document.createElement('h1');
        h1.id = "gameFinalMessage";
        document.getElementById("gamePhotos").appendChild(h1);
        document.getElementById('score').style.display = "none";
    }
    if (lostNos === 5) {
        gameOverProcess();
        document.getElementById("gameFinalMessage").innerText = ' Game Over :( \n  You Lost \n RPS Game!';
        document.getElementById("gameFinalMessage").style.color = "#ea220d";
        document.getElementById("gameFinalMessage").style.border = "thick solid #ea220d";
        document.getElementById("bt4").innerHTML = "Play another Game";
        resetCounters();
        testCase = true;
    } else if (showYourScore === 5) {
        gameOverProcess();
        document.getElementById("gameFinalMessage").innerText = ' Congratulation :) \n You won \n RPS Game! ';
        document.getElementById("gameFinalMessage").style.color = "#960cc3";
        document.getElementById("gameFinalMessage").style.border = "thick solid #960cc3";
        document.getElementById("bt4").innerHTML = "Play another Game";
        resetCounters();
        testCase = true;
    }
}