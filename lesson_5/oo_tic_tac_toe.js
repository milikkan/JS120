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
    console.clear();
    console.log('');
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

  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }
}


class Player {
  constructor(marker) {
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

  static MATCH_GOAL = 3;
  static PLAY_AGAIN_CHOICES = ['yes', 'no', 'y', 'n']
  static CENTER_SQUARE = '5';

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.firstPlayer = Math.random() > 0.5 ? this.human : this.computer;
    this.displayWelcome = true;
  }

  renderDisplay(welcome, roundResult, gameOver) {
    if (welcome) {
      this.displayWelcomeMessage();
      this.board.display();
    } else {
      this.board.displayWithClear();
    }

    if (roundResult) {
      this.displayRoundResult();
    } else {
      console.log('');
    }

    this.displayMatchScore();

    if (gameOver) {
      this.displayMatchResult();
      this.displayGoodbyeMessage();
    }
  }

  play() {
    this.renderDisplay(this.displayWelcome, false, false);
    this.playMatch();
    this.renderDisplay(this.displayWelcome, false, true);
  }

  playMatch() {
    this.renderDisplay(this.displayWelcome, false, false);

    while (true) {
      this.playSingleRound();

      this.updateMatchScore();
      this.renderDisplay(this.displayWelcome, true, false);

      if (this.matchOver()) break;
      if (this.playAgain().charAt(0) === 'n') break;

      this.board.reset();
      this.renderDisplay(this.displayWelcome, false, false);
    }
  }

  updateMatchScore() {
    if (this.isWinner(this.human)) {
      this.human.incrementScore();
    } else if (this.isWinner(this.computer)) {
      this.computer.incrementScore();
    }
  }

  displayMatchScore() {
    console.log('');
    console.log(`PLAYER: ${this.human.getScore()} - ${this.computer.getScore()} :COMPUTER`);
    console.log('');
  }

  matchOver() {
    return this.human.getScore() >= TTTGame.MATCH_GOAL ||
      this.computer.getScore() >= TTTGame.MATCH_GOAL;
  }

  displayMatchResult() {
    if (this.human.getScore() > this.computer.getScore()) {
      console.log('YOU won the match!');
    } else if (this.computer.getScore() > this.human.getScore()) {
      console.log('COMPUTER won the match!');
    }
  }

  playSingleRound() {
    let currentPlayer = this.firstPlayer;
    while (true) {
      this.playerMoves(currentPlayer);
      if (this.gameOver()) break;

      this.renderDisplay(this.displayWelcome, false, false);
      this.displayWelcome = false;

      currentPlayer = this.alternatePlayer(currentPlayer);
    }
    this.renderDisplay(this.displayWelcome, true, false);
  }

  playerMoves(currentPlayer) {
    if (currentPlayer === this.human) {
      this.humanMoves();
    } else {
      this.computerMoves();
    }
  }

  alternatePlayer(currentPlayer) {
    return currentPlayer === this.human ?
      this.computer : this.human;
  }

  playAgain() {
    let choice;
    console.log('Do you want to play again? (y/n)');
    while (true) {
      choice = readline.question().toLowerCase();
      if (TTTGame.PLAY_AGAIN_CHOICES.includes(choice)) break;
      console.log('Invalid choice! Please enter yes (y) or no (n)...');
    }
    return choice;
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
    console.log(`${this.firstPlayer === this.human ? 'You play' : 'Computer plays'} first...`);
    console.log('');
  }

  displayGoodbyeMessage() {
    console.log('');
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  displayRoundResult() {
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
    let choice = this.offensiveComputerMove() ||
                 this.defensiveComputerMove() ||
                 this.centerSquareComputerMove() ||
                 this.randomComputerMove();
    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  offensiveComputerMove() {
    return this.findTargetSquareFor(this.computer);
  }

  defensiveComputerMove() {
    return this.findTargetSquareFor(this.human);
  }

  findTargetSquareFor(player) {
    let choice;

    let targetRow = TTTGame.POSSIBLE_WINNING_ROWS.find(row => {
      return this.board.countMarkersFor(player, row) === 2;
    });

    if (targetRow) {
      choice = this.findEmptySquareOn(targetRow);
    }

    return choice;
  }

  findEmptySquareOn(row) {
    return row.find(key => this.board.isUnusedSquare(key));
  }

  centerSquareComputerMove() {
    return this.board.isUnusedSquare(TTTGame.CENTER_SQUARE) ?
      TTTGame.CENTER_SQUARE : undefined;
  }

  randomComputerMove() {
    let choice;
    let validChoices = this.board.unusedSquares();

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

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