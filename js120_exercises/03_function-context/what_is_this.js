// Read the following code carefully. What do you think is logged? Try to answer the question before you run the code.

let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName
};

console.log(person.fullName);

// logs NaN
// `this` is bound to the global object anywhere outside of a function.
// if `this` is used inside a function, its value depends on how the function was invoked.
// Here the value of `firstName` and `lastName` are not defined on the global object, thus they are `undefined`.
// `undefined` + `undefined` = `NaN`

let person2 = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: function() {
    return this.firstName + this.lastName;
  }
};

console.log(person2.fullName()); // Rick Sanchez, this is bound to person2 because it is called on person2