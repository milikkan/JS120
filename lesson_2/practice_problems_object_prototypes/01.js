// What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

let qux = { foo: 1 };
let baz = Object.create(qux);
console.log(baz.foo + qux.foo);

// The code logs `2`.
// Object `baz` has object `qux` as its prototype. Therefore, when we access property `foo`
// it is searched through the prototype chain. Since `baz` doesn't have its own `foo` property,
// next place up on the prototype chain is object `qux`.