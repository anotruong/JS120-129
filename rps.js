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
        choice = readline.question();
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

  compCounterAttack() {
    let losingChoice = Object.entries(this.recordOfCompLosses)
                             .sort((a, b) => b[1] - a[1])[0][0];
    return losingChoice;
  },

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors, Lizard, SPOCK!');
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

    while (computerMove === this.compCounterAttack()) {
      computerMove = this.computer.move;
      if (computerMove !== this.compCounterAttack()) break;
    }

    this.humanMoves.push(this.human.move);
    this.compMoves.push(this.computer.move);

    console.log(`\nYou chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if (winningPair(humanMove, computerMove)) {
          console.log('You win!');
          this.humanScore += 1;
        } else if ((computerMove === 'rock' && humanMove === 'scissors') ||
                   (computerMove === 'rock' && humanMove === 'lizard') ||
                   (computerMove === 'paper' && humanMove === 'rock') ||
                   (computerMove === 'paper' && humanMove === 'spock') ||
                   (computerMove === 'scissors' && humanMove === 'paper') ||
                   (computerMove === 'scissors' && humanMove === 'lizard') |
                   (computerMove === 'lizard' && humanMove === 'paper') ||
                   (computerMove === 'lizard' && humanMove === 'spock') ||
                   (computerMove === 'spock' && humanMove === 'rock') ||
                   (computerMove === 'spock' && humanMove === 'scissors')){
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

  play() {
    console.clear();

    this.displayWelcomeMessage();
    while(true) {
      this.displayScoreboard();
      this.human.choose();
      this.computer.choose();

      console.clear();

      this.displayScoreboard();
      this.displayWinner();
      if (!this.playAgain()) break;

      console.clear();
    }

    this.displayGoodbyeMessage();
  },
}

RPSGame.play();