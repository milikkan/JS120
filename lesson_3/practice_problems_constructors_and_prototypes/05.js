// What will the following code output and why? Try to answer without running the code.

function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

console.log(ninja.swingSword());

// logs TypeError
// After creating the `ninja` object, we are reassigning its prototype to a completely new object.
// The prototype of the `ninja` object is not changed and it does not have a `swingSword()` method.
// In summary, we are not adding a new method to the `Ninja.prototype` here, we are reassigning it.