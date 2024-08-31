// What built-in methods have we learned about that we can use to specify a function's execution context explicitly?

// We can use `Function.prototype.call` or `Function.prototype.apply` methods to specift a function's
// execution context explicitly.

// `call` takes two arguments: first argument is the context we want to set, remaining are arguments that we 
// needs to be passed to this context.
// `apply` is same, only difference is that `apply` takes arguments as an array.