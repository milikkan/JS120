// The code below should output "Christopher Turk is a Surgeon".
// Without running the code, what will it output?
// If there is a difference between the actual and desired output, explain the difference.

let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);

// The output will be 'undefined undefined is a undefined'
// We are passing `getDescription` method to the `logReturnVal` function. Inside `logReturnVal` function
// getDescription is invoked as a regular function. The methods context is removed here.
// In this case, its context is global object.