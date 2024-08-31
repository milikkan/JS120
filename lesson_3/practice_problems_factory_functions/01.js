// What are two disadvantages of working with factory functions?

// 1. Every object that is created by the factory function will have its own copy of all the methods.
//    This may cause memory workload if too many objects are created with lots of methods.
// 2. There is no type information for the created object. This makes debugging hard. Since there is no
//    way to tell which factory function created an object, there is no way to be sure that you are working
//    with the right kind of object.