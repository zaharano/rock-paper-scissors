// init textDisplay        
const textDisplay = document.getElementById('read-out');

// on page load, create object containing scores
const state = {
    userScore: 0,
    computerScore: 0,
    draws: 0,
    firstTo: 5,
    reset() {
        this.userScore = 0;
        this.computerScore = 0;
        this.draws = 0;
    }
}

// button handlers
let rockButton = document.getElementById('rock');
rockButton.addEventListener('click', () => { 
    handleResult(playRound('rock'))
});
let paperButton = document.getElementById('paper');
paperButton.addEventListener('click', () => { 
    handleResult(playRound('paper'))
});
let scissorsButton = document.getElementById('scissors');
scissorsButton.addEventListener('click', () => { 
    handleResult(playRound('scissors'))
});
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => { 
    resetGame();
});

function drawScoreDisplay() {
    document.getElementById('user-score').textContent = state.userScore;
    document.getElementById('computer-score').textContent = state.computerScore;
    document.getElementById('draw-score').textContent = state.draws;
}

// when the reset button is pressed, reset game state and game display
function resetGame() {
    state.reset();
    drawScoreDisplay();
    document.getElementById('overlay').classList.add('hide');
    // let winContainer = document.getElementsByClassName('win-container');
    // winContainer[0].classList.remove('win');
    while (textDisplay.firstChild) {
        textDisplay.removeChild(textDisplay.firstChild);
    }
}

// add a result line to the display,
// tallies the result to state,
// redraws the score display,
// checks for a winner
function handleResult(result) {
    let newResultLine = document.createElement('div');
    newResultLine.textContent = result[1];
    textDisplay.appendChild(newResultLine);

    if(result[0] === 'win') {
        state.userScore++;
    } else if (result[0] === 'lose') {
        state.computerScore++;
    } else {
        state.draws++;
    }

    drawScoreDisplay();
    checkForWinner();
}

// checks state for a game win
function checkForWinner() {
    if (state.userScore >= state.firstTo) {
        displayWinner('You are')
    } else if (state.computerScore >= state.firstTo) {
        displayWinner('Computer is')
    }
}

// pops the game end overlay and announces winner
function displayWinner(winner) {
    document.getElementById('overlay').classList.remove('hide');
    // let winContainer = document.getElementsByClassName('win-container');
    // winContainer[0].classList.add('win');
    // couldn't ever get this animation to work - there's something I haven't learned yet
    // about how to apply transition timing to javascript css changes.
    document.getElementById('win-dialog').textContent = `${winner} the winner!`;
}

// randomly picks a play for computer
function computerPlay() {
    let picker = Math.floor(Math.random() * 3);

    switch(picker) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}

// determines the outcome of a round. 
// returns an array [result for player, result string for printing]
function playRound(input) {
    let playerSelection = input;
    let computerSelection = computerPlay();
    if (playerSelection === 'rock') {
        if (computerSelection === 'rock') {
            return ['draw',"It's a draw! You both selected Rock."]
        } else if (computerSelection === 'paper') {
            return ['lose',"You lose! Paper covers Rock."]
        } else {
            return ['win',"You win! Rock crushes Scissors."]
        }
    } else if (playerSelection === 'paper') {
        if (computerSelection === 'rock') {
            return ['win',"You win! Paper covers Rock."]
        } else if (computerSelection === 'paper') {
            return ['draw',"It's a draw! You both selected Paper."]
        } else {
            return ['lose',"You lose! Scissors cut up Paper."]
        }
    } else {
        if (computerSelection === 'rock') {
            return ['lose',"You lose! Rock crushes Scissors."]
        } else if (computerSelection === 'paper') {
            return ['win',"You win! Scissors cut up Paper."]
        } else {
            return ['draw',"It's a draw! You both selected Scissors."]
        }
    }
}

// Pre GUI functions follow

// function getInput() {
//     let input = prompt("What's it gonna be? Rock, paper, or scissors?").toLowerCase();
//     if (input === 'rock' || input === 'paper' || input === 'scissors')
//         return input;
//     else {
//         console.log("That doesn't appear to be a valid play. Enter rock, paper, or scissors.")
//         return getInput();
//     }
// }

// function suddenDeath() {
//     let roundResult = playRound();
//     switch(roundResult[0]) {
//         case 'win':
//             return `Wooooooooohoo!!! ${roundResult[1]} You take the game in a thrilling finish!`
//         case 'lose':
//             return `Oof. ${roundResult[1]} You lose the game in a crushing defeat!`
//         case 'draw':
//             console.log(`${roundResult[1]} We'll have to give it another go! Sudden death continues...`)
//             return suddenDeath()
//     }
// }

// function game() {
//     const ROUNDS = 5;
//     let playerScore = 0, 
//         computerScore = 0;
        
//     for (let i = 0; i < ROUNDS; i++)
//     {
//         let roundResult = playRound();
//         console.log(roundResult[1]);
//         switch(roundResult[0]) {
//             case 'win':
//                 playerScore++;
//                 break;
//             case 'lose':
//                 computerScore++;
//                 break;
//         }
//     }

//     if (playerScore > computerScore) {
//         console.log(`You won the game! You took ${playerScore} rounds to the computer's ${computerScore}.`);
//         return;
//     } else if (computerScore > playerScore) {
//         console.log(`You lost the game! The computer took ${computerScore} rounds to your ${playerScore}.`);
//         return;
//     } else {
//         console.log(`A draw! You and the computer both took ${playerScore}. Time for s-s-s-s-sudden death!`)
//         console.log(suddenDeath())
//         return;
//     }
// }
