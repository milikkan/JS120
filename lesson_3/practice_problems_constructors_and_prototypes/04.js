// What will the following code log to the console and why?

function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());

// it logs `true`
// All objects created by the `Ninja` constructor shares the same prototype object.
// Even the method `swingSword()` is added after the `ninja` object is created, it is 
// available to the `ninja` object right away.