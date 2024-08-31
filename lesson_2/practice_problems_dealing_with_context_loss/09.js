// Use one of the methods we learned in this lesson to invoke increment with an explicit context
// such that foo.a gets incremented with each invocation of incrementA.

let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a);