// What does the following code log to the console? Try to answer without running the code. Can you explain why the code produces the output it does?

let RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area();
  this.perimeter = RECTANGLE.perimeter();
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);
console.log(rect1.perimeter);

// it logs NaN NaN
// When we call RECTANGle.area() and perimeter() methods, the value of `this` will be implicitly
// set as the RECTANGLE object. Since this object do not weight and height properties, these values will be `undefined`.