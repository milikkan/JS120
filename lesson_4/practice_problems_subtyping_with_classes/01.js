class Game {
  play() {
    return 'Start the game!';
  }
}

class Bingo extends Game {
  rulesOfPlay() {
    // rules of play
  }
}

// What would happen if we added a play method to the Bingo class,
// keeping in mind that there is already a method of this name in the Game class
// from which the Bingo class inherits?
// Explain your answer. What do we call it when we define a method like this?

// When we add a `play()` method to the `Bingo` class, the objects created by the `Bingo`
// class will use its own `play()` method. Before adding this method, the objects would use the
// `play()` method from the `Game` class because `Game` is the superclass of `Bingo`. 
// When a method is called, JavaScript looks for the method in the calling object's prototype.
// If it cannot find the method, JavaScript will keep looking up the prototype chain.
// When a subclass redefines a method that its superclass also defines, this is called method overriding.