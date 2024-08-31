// Consider the following two loops:

// for (let property in foo) {
//   console.log(`${property}: ${foo[property]}`);
// }

// Object.keys(foo).forEach(property => {
//   console.log(`${property}: ${foo[property]}`);
// });

// If foo is an arbitrary object, will these loops always log the same results 
// to the console? Explain why they do or do not. 
// If they don't always log the same information, show an example of when the results differ.

// These two loops do not always log the same results.
// for-in loop iterates over all properties of an object, including inherited properties.
// Object.keys method only returns object's own properties. When an object inherits some enumerable
// properties from its prototype, for-in takes these properties into account.
// These two loops produce the same output only when the prototype chain does not contain
// enumerable properties.

// Example:

let parent = {
  a: 1,
  b: 2
};

let foo = Object.create(parent); // foo inherites enumerable properties 'a' and 'b'
foo.c = 3; // foo's own 'c' property

for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}

console.log('---');

Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});