// What will the following code output? Explain the difference, if any, between this output and that of problem 1.

let obj = {
  func: function() {
    return this;
  },
};

let context = obj.func();

console.log(context);

// The code will output obj. Since we are invoking the `func` function as a method
// of the `obj` object, its context is the `obj` itself and `this` is bound to the `obj`.