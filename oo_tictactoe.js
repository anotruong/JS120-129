let readline = require('readline-sync');

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  getMarker() {
    return this.marker;
  }
}

class Board {
  constructor() { 
    this.reset();
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log( "     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  // scoreBoard() {
  //   console.log('|----------- SCORE BOARD ----------|');
  //   console.log(`|   Human: ${this.Human.score}    |    Computer: ${this.Computer.score}   |`);
  //   console.log('|----------------------------------|\n');
  // }

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker)
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused())
  }

  reset() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }
}

class Player {
  constructor (marker) {
    this.marker = marker;
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  getScore() {
    return this.score;
  }

  incrementScore() {
    this.score += 1;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static MATCH_GOAL = 3;
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],
    [ "4", "5", "6" ],
    [ "7", "8", "9" ],
    [ "1", "4", "7" ],
    [ "2", "5", "8" ],
    [ "3", "6", "9" ],
    [ "1", "5", "9" ],
    [ "3", "5", "7" ],
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.firstPlayer = this.human;
  }

  play() {
    this.displayWelcomeMessage();
    this.playMatch();
    this.displayGoodbyeMessage();
  }

  playAgain() {
    let answer;

    while(true) {
      answer = readline.question("Play again (y/n)? ").toLowerCase();

      if (['y', 'n'].includes(answer)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    console.clear();
    return answer === 'y';
  }

  playOneGame() {
    let currentPlayer = this.firstPlayer;

    this.board.reset();
    this.board.display();

    while (true) {
      this.playerMOves(currentPlayer);
      if (this.gameOver()) break;

      this.board.displayWithClear();
      currentPlayer = this.togglePlayer(currentPlayer);
    }

    this.board.displayWithClear();
    this.displayResults();
  }

  playMatch() {
    console.log('Listen up shrimp!');
    console.log(`First player to get to win ${TTTGame.MATCH_GOAL} games wins the match.`)
    while (true) {
      this.playOneGame();
      this.updateMatchScore();
      this.displayMatchScore();

      if (this.matchOver()) break;
      if (!this.playAgain()) break;
      this.firstPlayer = this.togglePlayer(this.firstPlayer);
    }

    this.displayMatchResults();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Bon Voyeur, thanks for playing friend.");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won, I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }

  joinOr(avaliableSpaces, conjunction) {
    let length = avaliableSpaces.length;
    
    switch (length) {
      case 1: 
        return avaliableSpaces.join('');
      case 2:
        avaliableSpaces.splice(length - 1, 0, conjunction);
        return avaliableSpaces.join(' ');
      default:
        return avaliableSpaces.map((num, idx) => {
          if (idx + 1 === length) return conjunction + ' ' + num;
          return num + ',';
        }).join(' ');
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${this.joinOr(validChoices, 'or')}): `
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  compCenterPlay() {
    return this.board.squares['5'].marker === ' ' ? true : false;
  }

  compDefenseToOffense(playersMarker) {
    let choice;
    let marker = playersMarker;
    let winArray = TTTGame.POSSIBLE_WINNING_ROWS;
    let threatLvlMidnight = winArray.map(subArrays => {
      return subArrays.map(ele => this.board.squares[ele].marker)
    });
    
    threatLvlMidnight.forEach((row, rowIdx) => {
      if (row.includes(' ')) {
        if (row.indexOf(marker) !== row.lastIndexOf(marker)){
          let position = threatLvlMidnight[rowIdx].indexOf(' ');
          row = rowIdx;
          choice = winArray[row][position];
        }
      }
    })
    return choice;
  }

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    if (this.compDefenseToOffense(Square.HUMAN_MARKER) !== undefined) {
      choice = this.compDefenseToOffense(Square.HUMAN_MARKER);
    } else if (this.compDefenseToOffense(Square.COMPUTER_MARKER) !== undefined) {
      choice = this.compDefenseToOffense(Square.COMPUTER_MARKER);
    }

    if (this.compCenterPlay()) choice = 5;

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  displayMatchScore() {
    let human = this.human.getScore();
    let computer = this.computer.getScore();
    console.log(`Current match score: [human: ${human}] [computer: ${computer}]`);
  }

  displayMatchResults() {
    if (this.human.getScore() > this.computer.getScore()) {
      console.log('You won this match! Congratulations!');
    } else if (this.human.getScore() < this.computer.getScore()) {
      console.log("Oh, boo hoo  You lost the match!");
    }
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  matchOver() {
    return this.isMatchWinner(this.human) || this.isMatchWinner(this.computer);
  }

  isMatchWinner(player) {
    return player.getScore() >= TTTGame.MATCH_GOAL;
  }

  roundOver() {
    return this.board.isFull() || this.someoneWon();
  }

  boardIsFull() {
    let unusedSquares = this.board.unusedSquares();
    return unusedSquares.length === 0;
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  togglePlayer(player) {
    return player === this.human ? this.computer : this.human;
  }

  playerMOves(currentPlayer) {
    if (currentPlayer === this.human) {
      this.humanMoves();
    } else {
      this.computerMoves();
    }
  }

  updateMatchScore() {
    if (this.isWinner(this.human)) {
      this.human.incrementScore();
    } else if (this.isWinner(this.computer)) {
      this.computer.incrementScore();
    }
  }
}

let game = new TTTGame();
game.play();