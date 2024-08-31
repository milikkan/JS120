// Take a look at the following code snippet.
// Use call to invoke the add method but with foo as execution context.
// What will this return?

let foo = {
  a: 1,
  b: 2,
};

let bar = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};

// without using call
// foo.add = bar.add;
// console.log(foo.add());

// using call
let result = bar.add.call(foo);
console.log(result);

