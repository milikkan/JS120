// What will the value of foo.a be after this code runs?

let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

// The value of `foo.a` will not change, it will stay as `0`.

console.log(foo.a);

// Whwn we invoke `increment()` as an inner function inside the `incrementA` method, its execution context will be
// the global object, not the `foo` object.