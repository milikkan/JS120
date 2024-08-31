let scissors = {
  id: 0,
  name: 'Scissors',
  stock: 8,
  price: 10,

  describe() {
    console.log(`Name: ${this.name}`);
    console.log(`ID: ${this.id}`);
    console.log(`Price: $${this.price}`);
    console.log(`Stock: $${this.stock}`);  
  },

  setPrice(newPrice) {
    if (newPrice < 0) {
      console.log('Invalid price');
    } else {
      this.price = newPrice;
    }
  }
};

let drill = {
  id: 1,
  name: 'Cordless Drill',
  stock: 15,
  price: 45,

  describe() {
    console.log(`Name: ${this.name}`);
    console.log(`ID: ${this.id}`);
    console.log(`Price: $${this.price}`);
    console.log(`Stock: $${this.stock}`);  
  },

  setPrice(newPrice) {
    if (newPrice < 0) {
      console.log('Invalid price');
    } else {
      this.price = newPrice;
    }
  }
};


scissors.setPrice(-33);
scissors.describe();
drill.setPrice(62)
drill.describe();