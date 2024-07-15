const readline = require('readline-sync');
const WINNING_SCORE = 3;
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const ABBR_CHOICES = ['r', 'p', 'sc', 'l', 'sp'];
const YES_NO_ANSWERS = ['yes', 'y', 'no', 'n'];

function capitalize(str) {
  return str.charAt(0)
    .toUpperCase()
    .concat(str.slice(1));
}

function prompt(str, newLine = false) {
  console.log(`${newLine ? '\n' : ''}=> ${str}`);
}

function createMove() {
  return {
    beats(moveName) {
      return this.winsAgainst.includes(moveName);
    },

    message(otherMove) {
      return `${this.name.toUpperCase()} ${this.winningMsg[otherMove.name]} ${otherMove.name.toUpperCase()}!`;
    },
  };
}

function createRock() {
  let moveObject = createMove();

  let rockObject = {
    name: 'rock',
    winsAgainst: ['scissors', 'lizard'],
    winningMsg: {
      scissors: 'crushes',
      lizard: 'crushes'
    },
  };

  return Object.assign(moveObject, rockObject);
}

function createPaper() {
  let moveObject = createMove();

  let paperObject = {
    name: 'paper',
    winsAgainst: ['rock', 'spock'],
    winningMsg: {
      rock: 'covers',
      spock: 'disproves'
    },
  };

  return Object.assign(moveObject, paperObject);
}

function createScissors() {
  let moveObject = createMove();

  let scissorsObject = {
    name: 'scissors',
    winsAgainst: ['paper', 'lizard'],
    winningMsg: {
      paper: 'cuts',
      lizard: 'decapitates'
    },
  };

  return Object.assign(moveObject, scissorsObject);
}

function createLizard() {
  let moveObject = createMove();

  let lizardObject = {
    name: 'lizard',
    winsAgainst: ['paper', 'spock'],
    winningMsg: {
      paper: 'eats',
      spock: 'poisons'
    },
  };

  return Object.assign(moveObject, lizardObject);
}

function createSpock() {
  let moveObject = createMove();

  let spockObject = {
    name: 'spock',
    winsAgainst: ['scissors', 'rock'],
    winningMsg: {
      scissors: 'smashes',
      rock: 'vaporizes'
    },
  };

  return Object.assign(moveObject, spockObject);
}

function createPlayer() {
  return {
    move: null,
    history: [],

    createMove(name) {
      let moves = {
        rock: createRock,
        paper: createPaper,
        scissors: createScissors,
        lizard: createLizard,
        spock: createSpock
      };
      this.move = moves[name]();
      this.history.push(this.move);
    }
  };
}

function validChoice(choice) {
  return VALID_CHOICES.includes(choice)
    || ABBR_CHOICES.includes(choice);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;
      let choicePrompt = VALID_CHOICES.map((choice, idx) => `${capitalize(choice)}(${ABBR_CHOICES[idx]})`).join(', ');
      prompt(`Please choose: ${choicePrompt}`, true);

      while (true) {
        choice = readline.question().toLowerCase();
        if (validChoice(choice)) break;
        prompt('Invalid choice, please try again...');
      }

      if (ABBR_CHOICES.includes(choice)) {
        choice = VALID_CHOICES[ABBR_CHOICES.indexOf(choice)];
      }
      this.createMove(choice);
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    generateRandomIndex() {
      return Math.floor(Math.random() * VALID_CHOICES.length);
    },

    calculateWinningPercentages(humanHistory) {
      return VALID_CHOICES.map(choice => {
        let winCount = 0;
        humanHistory.forEach(humanMove => {
          if (humanMove.beats(choice)) {
            winCount -= 1;
          } else if (humanMove.name !== choice) {
            winCount += 1;
          }
        });
        return winCount / humanHistory.length;
      });
    },

    calculateBestMoveIndex(humanHistory) {
      let winningPercentages = this.calculateWinningPercentages(humanHistory);
      let maxPercentage = Math.max(...winningPercentages);

      let isAllPercentagesSame = winningPercentages
        .every(percentage => percentage === maxPercentage);

      if (isAllPercentagesSame) {
        return this.generateRandomIndex();
      } else {
        return winningPercentages.indexOf(maxPercentage);
      }
    },

    choose(humanHistory) {
      let moveIndex;

      // choose random
      if (humanHistory.length < 1) {
        moveIndex = this.generateRandomIndex();
      // choose best possible move after analysing human move history
      } else {
        moveIndex = this.calculateBestMoveIndex(humanHistory);
      }

      this.createMove(VALID_CHOICES[moveIndex]);
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createScores(firstPlayer, secondPlayer) {
  return {
    scores: [
      {playerName: firstPlayer, score: 0}, {playerName: secondPlayer, score: 0}
    ],

    findPlayer(name) {
      return this.scores.find(scoreObj => scoreObj.playerName === name);
    },

    getScore(name) {
      return this.findPlayer(name).score;
    },

    increment(name) {
      this.findPlayer(name).score += 1;
    },

    reset() {
      this.scores[0].score = 0;
      this.scores[1].score = 0;
    }
  };
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  scores: createScores('human', 'computer'),

  displayWelcomeMessage() {
    prompt('Welcome to Rock, Paper, Scissors, Lizard, Spock!');
    prompt(`Player reaching the score of ${WINNING_SCORE}, wins the game.`, true);
  },

  displayGoodbyeMessage() {
    prompt('Thanks for playing the game. Goodbye!', true);
  },

  displayRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    prompt(`You chose: ${humanMove.name}`);
    prompt(`The computer chose: ${computerMove.name}`);

    if (humanMove.beats(computerMove.name)) {
      prompt(`You win! ${humanMove.message(computerMove)}`);
      this.scores.increment('human');
    } else if (computerMove.beats(humanMove.name)) {
      prompt(`Computer wins! ${computerMove.message(humanMove)}`);
      this.scores.increment('computer');
    } else {
      prompt('It\'s a tie.');
    }
  },

  displayScores() {
    prompt('Scores:', true);
    prompt(`Human: ${this.scores.getScore('human')} - Computer: ${this.scores.getScore('computer')}`);
  },

  generateHistory(player) {
    return player.history.map(move => move.name).join('-');
  },

  displayMoveHistories() {
    prompt('History of moves:', true);
    prompt(`Human: ${this.generateHistory(this.human)}`);
    prompt(`Computer: ${this.generateHistory(this.computer)}`);
  },

  playAgain() {
    prompt('Would you like to play again? (y/n)', true);
    let answer;
    while (true) {
      answer = readline.question().toLowerCase();
      if (YES_NO_ANSWERS.includes(answer)) break;
      prompt('Invalid input. Please enter yes(y) or no(n)...');
    }
    return answer.toLowerCase()[0] === 'y';
  },

  waitForUserInput(msg) {
    prompt(msg, true);
    readline.prompt();
  },

  gameWon() {
    return this.scores.getScore('human') === WINNING_SCORE
      || this.scores.getScore('computer') === WINNING_SCORE;
  },

  displayMatchWinner() {
    console.log('');
    if (this.scores.getScore('human') === WINNING_SCORE) {
      prompt('You won the match!');
    } else {
      prompt('Computer won the match!');
    }
  },

  playRound() {
    console.clear();
    this.displayWelcomeMessage();
    this.displayScores();
    this.displayMoveHistories();
    this.human.choose();
    this.computer.choose(this.human.history);
    this.displayRoundWinner();
  },

  play() {
    while (true) {
      this.scores.reset();

      while (!this.gameWon()) {
        this.playRound();
        if (this.gameWon()) break;
        this.waitForUserInput('Press enter to play the next round...');
      }

      this.displayMatchWinner();
      this.displayScores();

      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
