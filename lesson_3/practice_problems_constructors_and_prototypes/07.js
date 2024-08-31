let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else
// first solution
let ninjaB = new ninjaA.constructor();

// second solution
// let ninjaB = Object.create(ninjaA);
console.log(ninjaA);
console.log(ninjaB);
console.log(Object.getPrototypeOf(ninjaB));
console.log(ninjaA.constructor === ninjaB.constructor); // => true