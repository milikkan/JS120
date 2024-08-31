// What will the following code log to the console?

let obj = {
  message: 'JavaScript',
};

function foo() {
  console.log(this.message);
}

foo.bind(obj);

// It will not log anything. We call `bind` method on the `foo` function to change its execution context
// permanently. This method returns a new function but we didn't invoke the newly returned function yet.