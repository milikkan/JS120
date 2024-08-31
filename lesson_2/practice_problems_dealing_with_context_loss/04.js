const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();

// Will this code produce the following output? Why or why not?

// The Elder Scrolls: Arena
// The Elder Scrolls: Daggerfall
// The Elder Scrolls: Morrowind
// The Elder Scrolls: Oblivion
// The Elder Scrolls: Skyrim

// This code will output:
// undefined: Arena
// undefined: Daggerfall
// undefined: Morrowind
// undefined: Oblivion
// undefined: Skyrim

// When we pass a function argument to `forEach`, it looses its context. `this` inside the callback
// is bound to the global object, not the `TESgames` object.

// To fix this, we can:
// 1. Save the `this` reference before
// 2. Use bind to set the context explicitly
// 3. Use an arrow function
// 4. Pass `thisArg`