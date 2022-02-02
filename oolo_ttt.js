/* Comp AI defense:

Explicit:
  If there is an immediate thread on the board,
    block that space

DS:
  obj -> array -> obj

PSEUDO:
  document the moves of both players
  check whether the human player has numbers that seem like the winning pair,
  check if the last number is empty
    if it is then make the move
    If there are NO moves to make, select random

  find the unused squares
    check if the squares across, below, or diagonal of it has x marks
    filter the possible wins array to find if the winning combos that have a unused square number in it
    convert the filtered sub arrays to their marker equivilant
    check which sub array has two of the human markers in it
    choose that unmarked sub

  START no parameter
  DECLARE 'avaliableSpots' and initialize it to unusedSquares()
  SELECT sub arrays from 'Winning combo' that includes 'avaliableSpots'
  TRANSFORM the elements to marker equivalient
  EVALUATE which sub array has two human markers in it
    IF found, select that that avaliable space
    If not, choose nothing and move to randomized choice.
  */



const readline = require('readline-sync');

let Square = {
  UNUSED_SQUARE:   " ",
  HUMAN_MARKER:    "X",
  COMPUTER_MARKER: "O",

  init(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
    return this;
  },

  toString() {
    return this.marker;
  },

  setMarker(marker) {
    this.marker = marker;
  },

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  },

  getMarker() {
    return this.marker;
  },
};

let Board = {
  init() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = Object.create(Square).init();
    }

    return this;
  },

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
    },

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker)
  },

  isFull() {
    return this.unusedSquares().length === 0;
  },

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused())
  },

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    })

    return markers.length;
  },

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  },
};

const PlayerPrototype = {
  initialize(marker) {
    this.marker = marker;
    return this;
  },

  getMarker(marker) {
    return this.marker;
  },
}

let Human = Object.create(PlayerPrototype);

Human.init = function () {
  return this.initialize(Square.HUMAN_MARKER);
};

let Computer = Object.create(PlayerPrototype);

Computer.init = function () {
  return this.initialize(Square.COMPUTER_MARKER);
};

let TTTGame = {
  POSSIBLE_WINNING_ROWS: [
  [ "1", "2", "3" ],
  [ "4", "5", "6" ],
  [ "7", "8", "9" ],
  [ "1", "4", "7" ],
  [ "2", "5", "8" ],
  [ "3", "6", "9" ],
  [ "1", "5", "9" ],
  [ "3", "5", "7" ],
  ],

  init() {
    this.board = Object.create(Board).init();
    this.human = Object.create(Human).init();
    this.computer = Object.create(Computer).init();
    return this;
  },

  play() {
    this.displayWelcomeMessage();

    while (true) {

      while (true) {
        this.board.display();

        this.humanMoves();
        if (this.gameOver()) break;

        this.computerMoves();

        // let tester = readline.question('pause for testing');

        if (this.gameOver()) break;
        this.board.displayWithClear();
      }

      this.board.display();
      this.displayResults();
      
      let playAgain = readline.question('Do you want to play again? y/n?: ')
      if (playAgain.toLowerCase()[0] !== 'y') break;
      this.board.displayWithClear();
      
      this.init();
    }

    this.board.displayWithClear();
    this.displayGoodbyeMessage();
  },

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  },

  displayGoodbyeMessage() {
    console.log("Bon Voyeur, thanks for playing friend.");
  },

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won, I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  },

  joinOr(avaliableSpaces, conjunction) {
    let length = avaliableSpaces.length;
    
    switch (length) {
      case 1: 
        return avaliableSpaces.join('');
      case 2:
        avaliableSpaces.splice(length -1, 0, conjunction);
        return avaliableSpaces.join(' ');
      default:
        return avaliableSpaces.map((num, idx) => {
          if (idx + 1 === length) return conjunction + ' ' + num;
          return num + ',';
        }).join(' ');
    }
  },

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinOr(validChoices, 'or')}): `
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  },

  compDefenseToOffense(playersMarker) {
    let marker = playersMarker;
    let choice;
    let winArray = this.POSSIBLE_WINNING_ROWS;
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
  },

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    if (this.compDefenseToOffense(Square.HUMAN_MARKER) !== undefined) {
      choice = this.compDefenseToOffense(Square.HUMAN_MARKER);
    }

    if (this.compDefenseToOffense(Square.COMPUTER_MARKER) !== undefined) {
      choice = this.compDefenseToOffense(Square.COMPUTER_MARKER);
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  },

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  },

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  },

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  },
};

let game = Object.create(TTTGame).init();
console.log(game);
game.play();
