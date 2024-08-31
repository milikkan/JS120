let readline = require('readline-sync');

class Square {
  static UNUSED_SQUARE = ' ';
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

  getMarker() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Board {
  constructor() {
    this.squares = {};
    this.reset();
  }

  reset() {
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[String(counter)] = new Square();
    }
  }

  display() {
    console.log('');
    console.log('     |     |');
    console.log(`  ${this.squares['1']}  |  ${this.squares['2']}  |  ${this.squares['3']}`);
    console.log('     |     |');
    console.log('-----+-----+-----');
    console.log('     |     |');
    console.log(`  ${this.squares['4']}  |  ${this.squares['5']}  |  ${this.squares['6']}`);
    console.log('     |     |');
    console.log('-----+-----+-----');
    console.log('     |     |');
    console.log(`  ${this.squares['7']}  |  ${this.squares['8']}  |  ${this.squares['9']}`);
    console.log('     |     |');
    console.log('');
  }

  displayWithClear() {
    console.clear(); // commented temporarily for testing purposes
    console.log('');
    console.log('');
    this.display();
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });
    return markers.length;
  }

  // getSquareAt(square) {
  //   return this.squares[square];
  // }
  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }
}


class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
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
  static POSSIBLE_WINNING_ROWS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    this.displayWelcomeMessage();
    this.board.display();

    while (true) {
      this.playSingleRound();

      if (this.playAgain().charAt(0) === 'n') break;
      this.board.reset();
      this.board.displayWithClear();
    }

    this.displayGoodbyeMessage();
  }

  playSingleRound() {
    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }
    this.board.displayWithClear();
    this.displayResults();
  }

  playAgain() {
    let choice;
    console.log('Do you want to play again? (y/n)');
    while (true) {
      choice = readline.question().toLowerCase();
      if (['yes', 'no', 'y', 'n'].includes(choice)) break;
      console.log('Invalid choice! Please enter yes (y) or no (n)...');
    }
    return choice;
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
    console.log('');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log('You won! Congratulations!');
    } else if (this.isWinner(this.computer)) {
      console.log('I won! I won! Take that, human!');
    } else {
      console.log('A tie game. How boring.');
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log('Sorry, that\'s not a valid choice.');
      console.log('');
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    // defensive move
    let choice = this.defensiveComputerMove();

    // random move
    if (!choice) {
      let validChoices = this.board.unusedSquares();

      do {
        choice = Math.floor((9 * Math.random()) + 1).toString();
      } while (!validChoices.includes(choice));
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  defensiveComputerMove() {
    let choice;

    let possibleThreatRow = TTTGame.POSSIBLE_WINNING_ROWS.find(row => {
      let humanMarkerCount = this.board.countMarkersFor(this.human, row);
      let computerMarkerCount = this.board.countMarkersFor(this.computer, row);
      return humanMarkerCount === 2 && computerMarkerCount === 0;
    });

    if (possibleThreatRow) {
      choice = possibleThreatRow.find(key => this.board.isUnusedSquare(key));
    }

    return choice;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  static joinOr(list, delimiter = ', ', joiningWord = 'or') {
    if (list.length === 0) return '';
    if (list.length === 1) return String(list[0]);
    if (list.length === 2) return `${list[0]} ${joiningWord} ${list[1]}`;

    let head = list.slice(0, -1).join(delimiter);
    let lastElement = list.slice(-1);

    return `${head}${delimiter}${joiningWord} ${lastElement}`;
  }
}

let game = new TTTGame();
game.play();


// TODO: computer AI, offense
// TODO: computer move improvement, pick center square
// TODO: refactor move methods
// TODO: keep score
// TODO: take turns going first
