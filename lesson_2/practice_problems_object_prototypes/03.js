// What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

let qux = { foo: 1 };
let baz = Object.create(qux);
qux.foo = 2;

console.log(baz.foo + qux.foo);

// The code logs `4`.
// On `line 5`, the `foo` property of object `qux` is reassigned to the number `2`.
// On `line 7`, when we access `foo` property of the `baz` object, it returns the value
// from `qux` since `baz` does not have such a property. JavaScript uses the prototype chain
// to look up the value of `baz.foo` and returns `2`.
// Object `qux` has an own `foo` property and it also returns `2`.

// Objects hold a reference to their prototype objects. If the object's prototype changes,
// this change is visible in the inheriting object too.