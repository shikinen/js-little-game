/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

document.addEventListener('DOMContentLoaded', () => {

    let scores, roundScore, activePlayer, gamePlaying, lastDice;
    const diceImage1 = document.getElementById('dice-1');
    const diceImage2 = document.getElementById('dice-2');
    const score0 = document.getElementById("score-0");
    const score1 = document.getElementById("score-1");
    const current0 = document.getElementById("current-0");
    const current1 = document.getElementById("current-1");

    newGame();


    //EVENTS
    document.querySelector(".btn-roll").addEventListener("click", rollDice);
    document.querySelector(".btn-hold").addEventListener("click", holdScore);
    document.querySelector(".btn-new").addEventListener("click", newGame);

    //FUNCTIONS

    function hideDice() {
        diceImage1.style.display = "none";
        diceImage2.style.display = "none";
    }
    function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        current0.textContent = '0';
        current1.textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        hideDice();
    }

    function rollDice() {

        if (gamePlaying) {
            //Random Number
            let dice1 = Math.floor(Math.random() * 6) + 1;
            let dice2 = Math.floor(Math.random() * 6) + 1;

            //Display the dice
            diceImage1.style.display = 'block';
            diceImage2.style.display = 'block';
            diceImage1.src = `img/dice-${dice1}.png`;
            diceImage1.src = `img/dice-${dice2}.png`;

            //Update the round score if the rolled number was not 1
            /*if (dice === 6 && lastDice === 6) {
                //Player looses score
                scores[activePlayer] = 0;
                document.getElementById(`score-${activePlayer}`).textContent = 0;
                nextPlayer();
            } else if (dice !== 1) {
                //Add score
                roundScore += dice1 + dice2;
                document.getElementById(`current-${activePlayer}`).textContent = roundScore;
            } else {
                nextPlayer();
            }

            lastDice = dice;
            */

            if (dice1 !== 1 && dice2 !== 1) {
                //Add score
                roundScore += dice1 + dice2;
                document.getElementById(`current-${activePlayer}`).textContent = roundScore;
            } else {
                nextPlayer();
            }


        }
    }

    function holdScore() {

        if (gamePlaying) {
            //Add the current score up to the global score
            scores[activePlayer] += roundScore;
            //Update the UI
            document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

            const input = document.getElementById('score').value;
            let winningScore;

            if (input) {
                winningScore = input;
            } else {
                winningScore = 100;
            }

            if ( scores[activePlayer] >= winningScore) {
                const playerName = document.getElementById(`name-${activePlayer}`);
                playerName.classList.add('winner');
                document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
                playerName.textContent = 'WINNER!';

                hideDice();

                gamePlaying = false;

            } else {
                //Next player
                nextPlayer();
            }
        }
    }

    function newGame() {
        gamePlaying = true;
        scores = [0, 0];
        activePlayer = 0;
        roundScore = 0;

        hideDice();

        score0.textContent = '0';
        score1.textContent = '0';
        current0.textContent = '0';
        current1.textContent = '0';
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    }

    

});

