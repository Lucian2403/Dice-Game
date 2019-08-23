var activePlayer, curentScore, globalScore, gameActive;

function newGameSound() {document.getElementById("newGame").play();}

function holdSound() {document.getElementById("holdSound").play();}

function winSound() {document.getElementById("winSound").play();}

function rollSound() {document.querySelector(".rollSound").play();}

function init() {
    gameActive = true;
    activePlayer = 0;
    curentScore = 0;
    globalScore = [0,0];

    newGameSound();

    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";

    document.querySelector("#current_score-0 span").textContent = "0";
    document.querySelector("#current_score-1 span").textContent = "0";

    document.querySelector("#global_score-0 span").textContent = "0";
    document.querySelector("#global_score-1 span").textContent = "0";

    document.querySelector("#player-0 h2").textContent = "Player 1";
    document.querySelector("#player-1 h2").textContent = "Player 2";

    document.querySelector("#player-0 h2").classList.remove("winner");
    document.querySelector("#player-1 h2").classList.remove("winner");
    document.querySelector(".player_area-0").classList.remove("active");
    document.querySelector(".player_area-1").classList.remove("active");
    document.querySelector(".player_area-0").classList.add("active");
}

function nextPlayer() {
    if (activePlayer === 0) { activePlayer = 1 } else { activePlayer = 0 }
    curentScore = 0;

    document.querySelector("#current_score-0 span").textContent = "0";
    document.querySelector("#current_score-1 span").textContent = "0";

    document.querySelector(".player_area-0").classList.toggle("active");
    document.querySelector(".player_area-1").classList.toggle("active");

    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
}

init();


document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gameActive) {
        rollSound();
        //Random Number
        var dice1 = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);

        //Display the numbers on dices
        document.querySelector(".dice1").style.display = "block";
        document.querySelector(".dice2").style.display = "block";

        var dice1DOM = document.querySelector(".dice1");
        dice1DOM.src = "dice-" + dice1 +".png";
        var dice2DOM = document.querySelector(".dice2");
        dice2DOM.src = "dice-" + dice2 +".png";

        //Add the sum to the Curent Score if the dices are not 1
        var diceSum = dice1 + dice2;

        if (dice1 !== 1 && dice2 !== 1) {
            curentScore += diceSum;
            document.querySelector("#current_score-" + activePlayer + " span").textContent = curentScore;
        } else {
            nextPlayer();
        }
    }
});


document.querySelector(".btn-hold").addEventListener("click", function(){
    if (gameActive) {
        globalScore[activePlayer] += curentScore;

        document.querySelector("#global_score-" + activePlayer + " span").textContent = globalScore[activePlayer];
    
        var scoreInput = document.querySelector(".score_input").value;

        var winningScore;

        if (scoreInput) {
            winningScore = scoreInput
        } else {
            winningScore = 100;
        }
    
        if (globalScore[activePlayer] >= winningScore) {
            winSound();
            document.querySelector("#player-" + activePlayer + " h2").textContent = "Winner!";
            document.querySelector("#player-" + activePlayer + " h2").classList.add("winner");
    
            document.querySelector(".dice1").style.display = "none";
            document.querySelector(".dice2").style.display = "none"; 

            gameActive = false;
    
        } else  {
            nextPlayer();
        }

        holdSound();
    }
});

document.querySelector(".btn-new").addEventListener("click", init);