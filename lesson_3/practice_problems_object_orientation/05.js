function createProduct(id, name, stock, price) {
  let newProduct = {};
  newProduct.id = id;
  newProduct.name = name;
  newProduct.stock = stock;
  newProduct.price = price;
  
  newProduct.describe = function() {
    console.log(`Name: ${this.name}`);
    console.log(`ID: ${this.id}`);
    console.log(`Price: $${this.price}`);
    console.log(`Stock: ${this.stock}`);  
  };
  
  newProduct.setPrice = function(newPrice) {
    if (newPrice < 0) {
      console.log('Invalid price');
    } else {
      this.price = newPrice;
    }
  };

  return newProduct;
}