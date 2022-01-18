/* Assignment: OO Rock Paper Scissors Bonus Features
*/

const readline = require('readline-sync');

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();
  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('\nPlease choose rock, paper, scissors, lizard or spock:');
        choice = readline.question().toLowerCase();

        if ((['rock', 'paper', 'scissors', 'spock', 'lizard']).includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createPlayer() {
  return {
    move: null,
  };
}

function compCounterAttack () {
  let badHand = RPSGame.recordOfCompLosses;

  badHand = Object.entries(badHand)
                  .sort((a, b) => b[1] - a[1])[0][0];
  return badHand;
}

function winningPair (winHand, loseHand) {
  if ((winHand === 'rock' && loseHand === 'scissors') ||
  (winHand === 'rock' && loseHand === 'lizard') ||
  (winHand === 'paper' && loseHand === 'rock') ||
  (winHand === 'paper' && loseHand === 'spock') ||
  (winHand === 'scissors' && loseHand === 'paper') ||
  (winHand === 'scissors' && loseHand === 'lizard') ||
  (winHand === 'lizard' && loseHand === 'paper') ||
  (winHand === 'lizard' && loseHand === 'spock') ||
  (winHand === 'spock' && loseHand === 'rock') ||
  (winHand === 'spock' && loseHand === 'scissors')) {
    return true;
  } else {
    return false;
  }
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  humanScore: 0,
  compScore: 0,
  humanMoves: [],
  compMoves: [],
  recordOfCompLosses: {
      rock: 0,
      paper: 0,
      scissors: 0,
      lizard: 0,
      spock: 0
    },    

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors, Lizard, SPOCK!'); 
    console.log('This is a game of infinite rounds and only 5 options.');
    console.log(`\nYes folks, I said only ** 5 options ** because another option would just be too crazy.
    ...and too much work.\n`);
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors, Lizard, Spock. Goodbye!');
  },

  displayScoreboard() {
    let dashLength = (this.humanScore + this.compScore);
    dashLength = dashLength.toString().length + 27;
    
    console.log(`   +${'-'.repeat(dashLength)}+`);
    console.log(`   |  computer: ${this.compScore}  |  human: ${this.humanScore}  |`)
    console.log(`   +${'-'.repeat(dashLength)}+`);
    
    this.humanMoves.forEach((move, idx) => {
      let humanWhtSpc = 9 - (move.length);
      let compWhtSpc = 11 - (this.compMoves[idx].length);
      let roundWhtSpc = (idx + 1).toString().length=== 1 ? 1 : 0;

      console.log(`R${idx+ 1}${' '.repeat(roundWhtSpc)}|    ${this.compMoves[idx]}${' '.repeat(compWhtSpc)}|   ${move}${' '.repeat(humanWhtSpc)}|`);
    })
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    let isGoodCompMove = compCounterAttack();

    // while (computerMove === isGoodCompMove) {
    //   computerMove = this.computer.move;
    //   if (computerMove !== compCounter) break;
    // }

    if (computerMove === isGoodCompMove) {
      computerMove = this.computer.move;
    }

    this.humanMoves.push(humanMove);
    this.compMoves.push(computerMove);

    console.log(`\nYou chose: ${humanMove}`);
    console.log(`The computer chose: ${computerMove}`);

    if (winningPair(humanMove, computerMove)) {
          console.log('You win!');
          this.humanScore += 1;
        } else if (winningPair(computerMove, humanMove)){
          console.log('Computer wins!');
          this.recordOfCompLosses[computerMove] += 1;
          this.compScore += 1;
        } else {
          console.log("It's a tie.");
        }
  },

  playAgain() {
    console.log(`\nWould you like to play again? (y/n)`);
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  startButton() {
    console.log("So let's get started shall we? \nPress 'any key' to start.");
    let start = readline.question();
    return start;
  },

  play() {
    console.clear();
    this.displayScoreboard();
    this.displayWelcomeMessage();
    this.startButton();

    while(true) {
      console.clear();

      this.displayScoreboard();
      this.human.choose();
      this.computer.choose();

      console.clear();

      this.displayScoreboard();
      this.displayWinner();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },
}

RPSGame.play();