/* 
In the last question, we used a mix-in named Speed that contained a goFast method. We included the mix-in in the Car class and then called the goFast method from an instance of the Car class. You may have noticed that the string printed when we call goFast includes the name of the type of vehicle we are using. How is that done?
*/

// It is done by the usage of `constructor` property.
// When we invoke the `goFast` method, `this` refers to the object that invoked that method.
// The constructor property of an object references the class that the object belongs to. This constructor has a `name` property that contains the name of the class as a string value.

class Foo {}

let foo = new Foo();
console.log(foo.constructor); // [class Foo]
console.log(foo.constructor.name); // Foo