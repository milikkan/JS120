let scissors = {
  id: 0,
  name: 'Scissors',
  stock: 8,
  price: 10
};

let drill = {
  id: 1,
  name: 'Cordless Drill',
  stock: 15,
  price: 45
};

function setProductPrice(product, newPrice) {
  if (price < 0) {
    console.log('Invalid price');
  }
  product.price = newPrice;
}

function describeProduct(product) {
  console.log(`Name: ${product.name}`);
  console.log(`ID: ${product.id}`);
  console.log(`Price: $${product.price}`);
  console.log(`Stock: $${product.stock}`);
}

describeProduct(scissors);