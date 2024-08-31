// What will the following code output? Try to determine the results without running the code.

function func() {
  return this;
}

let context = func();

console.log(context);

// The code will output global object.
// When we invoke a function as a normal function (not a method), 
// the global object is implicity bound to `this`. The implicit context
// of the function `func` is the global object.