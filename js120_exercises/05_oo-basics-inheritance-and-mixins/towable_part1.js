class Truck {}

class Car {}

const towMixin = {
  tow: function() {
    return 'I can tow a trailer!';
  }
};

Object.assign(Truck.prototype, towMixin);

let truck = new Truck();
console.log(truck.tow()); // I can tow a trailer!