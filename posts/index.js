// Challenge 1
// Create a function createFunction that creates and returns a function. When that created function is called, it should print "hello".
// When you think you completed createFunction, un-comment out those lines in the code and run it to see if it works.
// function createFunction() {
//   return function sayHello() {
//     console.log("hello");
//   };
// }

// const sayHello = createFunction();
// sayHello();

// Challenge 2
// Create a function createFunctionPrinter that accepts one input and returns a function.
// When that created function is called, it should print out the input that was used when the function was created.

// function createFunctionPrinter(input) {
//   return function print() {
//     console.log(input);
//   };
// }

// const printSample = createFunctionPrinter("sample");
// printSample(); // => should console.log('sample');
// const printHello = createFunctionPrinter("hello");
// printHello(); // => should console.log('hello');

// Challenge 3
// Examine the code for the outer function. Notice that we are returning a function and that function is using variables that are outside of its scope.
// Uncomment those lines of code. Try to deduce the output before executing. Now we are going to create a function addByX that returns a function that will add an input by x.

// function outer() {
//   let counter = 0; // this variable is outside incrementCounter's scope
//   function incrementCounter() {
//     counter++;
//     console.log("counter", counter);
//   }
//   return incrementCounter;
// }

// const willCounter = outer();
// const jasCounter = outer();

// willCounter(); //1
// willCounter(); //2
// willCounter(); //3

// jasCounter(); //1
// willCounter(); //4

// Challenge 4
// Write a function once that accepts a callback as input and returns a function.
// When the returned function is called the first time, it should call the callback and return that output.
// If it is called any additional times, instead of calling the callback again it will simply return the output value from the first time it was called.

// function addByX(x) {
//   return function add(y) {
//     console.log(x + y);
//     return x + y;
//   };
// }

// const addByTwo = addByX(2);
// addByTwo(1); // => should return 3
// addByTwo(2); // => should return 4
// addByTwo(3); // => should return 5

// const addByThree = addByX(3);
// addByThree(1); // => should return 4
// addByThree(2); // => should return 5

// const addByFour = addByX(4);
// addByFour(4); // => should return 8
// addByFour(5); // => should return 9

// CHALLENGE 4
// Write a function once that accepts a callback as input and returns a function.
// When the returned function is called the first time, it should call the callback and return that output.
// If it is called any additional times, instead of calling the callback again it will simply return the output value from the first time it was called.
// function once(func) {
//   let firstCall = false;
//   let firstResult = null;
//   return function (x) {
//     if (!firstCall) {
//       firstResult = func(x);
//       firstCall = true;
//       return firstResult;
//     }
//     return firstResult;
//   };
// }

// const onceFunc = once(addByTwo);
// console.log(onceFunc(4)); // => should log 6
// console.log(onceFunc(10)); // => should log 6
// console.log(onceFunc(9001)); // => should log 6

// CHALLENGE 5
// Write a function after that takes the number of times the callback needs to be called before being executed as the first parameter and the callback as the second parameter.
// function after(count, func) {
//   let calledTime = 0;
//   return function () {
//     calledTime++;
//     if (calledTime >= count) {
//       func();
//     }
//   };
// }

// // /*** Uncomment these to check your work! ***/
// const called = function () {
//   console.log("hello");
// };
// const afterCalled = after(3, called);
// afterCalled(); // => nothing is printed
// afterCalled(); // => nothing is printed
// afterCalled(); // => 'hello' is printed

// Challenge 6
// Write a function delay that accepts a callback as the first parameter and the wait in milliseconds before allowing the callback to be invoked as the second parameter.
//  Any additional arguments after wait are provided to func when it is invoked. HINT: research setTimeout();

// function delay(func, wait, ...rest) {
//   setTimeout(() => {
//     func(...rest);
//   }, wait);
// }

// Challenge 7
// Write a function rollCall that accepts an array of names and returns a function.
// The first time the returned function is invoked, it should log the first name to the console.
// The second time it is invoked, it should log the second name to the console, and so on, until all names have been called.
// Once all names have been called, it should log 'Everyone accounted for'.

// function rollCall(names) {
//   let count = 0;
//   let len = names.length;
//   return function () {
//     if (count < len) {
//       console.log(names[count]);
//     } else {
//       console.log("Everyone accounted for");
//     }
//     count++;
//   };
// }

// const rollCaller = rollCall(["Victoria", "Juan", "Ruth"]);
// rollCaller(); // => should log 'Victoria'
// rollCaller(); // => should log 'Juan'
// rollCaller(); // => should log 'Ruth'
// rollCaller(); // => should log 'Everyone accounted for'

// Challenge 8
// Create a function saveOutput that accepts a function (that will accept one argument), and a string (that will act as a password).
// saveOutput will then return a function that behaves exactly like the passed-in function, except for when the password string is passed in as an argument.
// When this happens, the returned function will return an object with all previously passed-in arguments as keys, and the corresponding outputs as values.

// function saveOutput(func, magicWord) {
//   const map = {};
//   return function (arg) {
//     if (arg === magicWord) {
//       console.log(map);
//       return;
//     }

//     const ret = func(arg);
//     map[arg] = ret;
//     console.log(ret);
//   };
// }

// // /*** Uncomment these to check your work! ***/
// const multiplyBy2 = function (num) {
//   return num * 2;
// };
// const multBy2AndLog = saveOutput(multiplyBy2, "boo");
// console.log(multBy2AndLog(2)); // => should log 4
// console.log(multBy2AndLog(9)); // => should log 18
// console.log(multBy2AndLog("boo")); // => should log { 2: 4, 9: 18 }

// CHALLENGE 9
// Create a function cycleIterator that accepts an array, and returns a function.
// The returned function will accept zero arguments. When first invoked, the returned function will return the first element of the array.
// When invoked a second time, the returned function will return the second element of the array, and so forth.
// After returning the last element of the array, the next invocation will return the first element of the array again, and continue on with the second after that, and so forth.
// function cycleIterator(array) {
//   let index = 0;
//   return function () {
//     if (index >= array.length) {
//       index = 0;
//     }
//     console.log(array[index]);
//     index++;
//   };
// }

// const threeDayWeekend = ["Fri", "Sat", "Sun"];
// const getDay = cycleIterator(threeDayWeekend);
// console.log(getDay()); // => should log 'Fri'
// console.log(getDay()); // => should log 'Sat'
// console.log(getDay()); // => should log 'Sun'
// console.log(getDay()); // => should log 'Fri'

// Challenge 10
// Create a function defineFirstArg that accepts a function and an argument.
// Also, the function being passed in will accept at least one argument.
// defineFirstArg will return a new function that invokes the passed-in function with the passed-in argument as the passed-in function's first argument.
// Additional arguments needed by the passed-in function will need to be passed into the returned function.

function defineFirstArg(func, arg) {}

// /*** Uncomment these to check your work! ***/
// const subtract = function(big, small) { return big - small; };
// const subFrom20 = defineFirstArg(subtract, 20);
// console.log(subFrom20(5)); // => should log 15
