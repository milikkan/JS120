// How do you create an object that doesn't have a prototype? How can you determine whether an object has a prototype?

// We can create an object that doesn't have a prototype by passing a `null` argument to
// the `Object.create` method.

// We can determine whether an object has a prototype or not by using the
// `Object.getPrototypeOf` method. If this method returns `null` then the object
// passed to this method does not have a prototype.

// Object that has a default prototype:
let foo = {};
console.log(Object.getPrototypeOf(foo)); // [Object: null prototype] {}

let bar = Object.create(null);
console.log(Object.getPrototypeOf(bar)); // null