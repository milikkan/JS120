// What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

let qux = { foo: 1 };
let baz = Object.create(qux);
baz.foo = 2;

console.log(baz.foo + qux.foo);

// The code logs 2.
// When `foo` property is set on the `baz` object, its own `baz` property is created and its value
// is assigned. When `baz.foo` is accessed on line 7, it is the value of the `baz` object's own `foo` 
// property, which is 2. `qux` object has a `foo` property that has a value of `1`. Assignin a value
// to a property that prototype has, does not affect the prototype's value.

// Property assignment does not use prototype chain, it creates a new property in the `baz` object instead.
