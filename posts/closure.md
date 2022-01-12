---
title: "闭包练习"
date: "2022-01-07"
---

# 闭包练习

## 如何理解闭包

```javascript
let a = 2;
function outer() {
  let a = 1;
  return function inner() {
    console.log(a);
  };
}
debugger;
const inner = outer();
inner();
```

函数退出后，返回的函数通过变量保存在外部。这个返回的函数会保存当时的变量环境，这就是闭包。

当一个函数被调用，进入调用栈，创建一个执行上下文（this，变量对象等），分配变量（变量、函数提升），最后执行代码（赋值、操作、函数调用等）。

当函数执行完退出，当前的执行上下文也被销毁了。闭包就是通过 return 一个函数（或者作为对象的方法）赋值给外部变量。这个变量会有一个[[scope]]，这就是保存环境变量的地方。

所以闭包是保存在 heap（内存）中，而不是 stack（调用栈）中。

![closure](/images/closure/closure.png)

[http://csbin.io/closures](http://csbin.io/closures)

```javascript
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

// function defineFirstArg(func, arg) {
//   return function (...rest) {
//     console.log(func(arg, ...rest));
//   };
// }

// // /*** Uncomment these to check your work! ***/
// const subtract = function (big, small) {
//   return big - small;
// };
// const subFrom20 = defineFirstArg(subtract, 20);
// console.log(subFrom20(5)); // => should log 15

// Challenge 11
// Create a function dateStamp that accepts a function and returns a function.
// The returned function will accept however many arguments the passed-in function accepts,
// and return an object with a date key that contains a timestamp with the time of invocation,
// and an output key that contains the result from invoking the passed-in function.
// HINT: You may need to research how to access information on Date objects.

// function dateStamp(func) {
//   return function (...arg) {
//     const output = func(...arg);
//     const date = new Date().toLocaleString();
//     const ret = {
//       date,
//       output,
//     };
//     console.log(ret);
//   };
// }

// // /*** Uncomment these to check your work! ***/
// const stampedMultBy2 = dateStamp((n) => n * 2);
// console.log(stampedMultBy2(4)); // => should log { date: (today's date), output: 8 }
// console.log(stampedMultBy2(6)); // => should log { date: (today's date), output: 12 }

// Challenge 12
// Create a function censor that accepts no arguments.
// censor will return a function that will accept either two strings, or one string.
// When two strings are given, the returned function will hold onto the two strings as a pair, for future use.
// When one string is given, the returned function will return the same string,
// except all instances of first strings (of saved pairs) will be replaced with their corresponding second strings (of those saved pairs).

// function censor() {
//   const pair = [];
//   return function (...rest) {
//     if (rest.length === 1) {
//       let ret = null;
//       pair.forEach((p) => {
//         ret = rest[0].replace(new RegExp(p[0]), p[1]);
//       });
//       return ret;
//     }

//     if (rest.length === 2) {
//       pair.push(rest);
//     }
//   };
// }

// // /*** Uncomment these to check your work! ***/
// const changeScene = censor();
// changeScene("dogs", "cats");
// changeScene("quick", "slow");
// console.log(changeScene("The quick, brown fox jumps over the lazy dogs.")); // => should log 'The slow, brown fox jumps over the lazy cats.'

// Challenge 13
// There's no such thing as private properties on a JavaScript object!
// But, maybe there are? Implement a function createSecretHolder(secret) which accepts any value as secret and returns an object with ONLY two methods.
// getSecret() which returns the secret setSecret() which sets the secret

// function createSecretHolder(secret) {
//   return {
//     getSecret() {
//       return secret;
//     },
//     setSecret(x) {
//       secret = x;
//     },
//   };
// }

// // /*** Uncomment these to check your work! ***/
// obj = createSecretHolder(5);
// obj.getSecret(); // => returns 5
// obj.setSecret(2);
// obj.getSecret(); // => returns 2

// Challenge 14
// Write a function, callTimes, that returns a new function. The new function should return the number of times it’s been called.

// function callTimes() {
//   let called = 0;
//   return function () {
//     console.log(++called);
//   };
// }

// // /*** Uncomment these to check your work! ***/
// let myNewFunc1 = callTimes();
// let myNewFunc2 = callTimes();
// myNewFunc1(); // => 1
// myNewFunc1(); // => 2
// myNewFunc2(); // => 1
// myNewFunc2(); // => 2

// Challenge 15
// Create a function russianRoulette that accepts a number (let us call it n),
// and returns a function. The returned function will take no arguments,
// and will return the string 'click' the first n - 1 number of times it is invoked.
// On the very next invocation (the nth invocation), the returned function will return the string 'bang'.
// On every invocation after that, the returned function returns the string 'reload to play again'.

// function russianRoulette(num) {
//   let called = 0;
//   return function () {
//     called++;
//     if (called < num) {
//       console.log("click");
//     } else if (called === num) {
//       console.log("bang");
//     } else {
//       console.log("reload to play again");
//     }
//   };
// }

// const play = russianRoulette(3);
// console.log(play()); // => should log 'click'
// console.log(play()); // => should log 'click'
// console.log(play()); // => should log 'bang'
// console.log(play()); // => should log 'reload to play again'
// console.log(play()); // => should log 'reload to play again'

// Challenge 16
// Create a function average that accepts no arguments, and returns a function (that will accept either a number as its lone argument, or no arguments at all).
// When the returned function is invoked with a number,
// the output should be average of all the numbers have ever been passed into that function (duplicate numbers count just like any other number).
// When the returned function is invoked with no arguments, the current average is outputted.
// If the returned function is invoked with no arguments before any numbers are passed in, then it should return 0.

// function average() {
//   let cache = [];
//   let ret = 0;
//   return function (...arg) {
//     if (arg.length === 0) {
//       console.log(ret);
//     } else if (arg.length === 1) {
//       cache.push(arg[0]);
//       let sum = cache.reduce((accu, curr) => {
//         return accu + curr;
//       });
//       ret = sum / cache.length;
//       console.log(ret);
//     }
//   };
// }

// // /*** Uncomment these to check your work! ***/
// const avgSoFar = average();
// console.log(avgSoFar()); // => should log 0
// console.log(avgSoFar(4)); // => should log 4
// console.log(avgSoFar(8)); // => should log 6
// console.log(avgSoFar()); // => should log 6
// console.log(avgSoFar(12)); // => should log 8
// console.log(avgSoFar()); // => should log 8

// Challenge 17
// Create a function makeFuncTester that accepts an array (of two-element sub-arrays), and returns a function (that will accept a callback).
// The returned function should return true if the first elements (of each sub-array) being passed into the callback all yield the corresponding second elements (of the same sub-array).
// Otherwise, the returned function should return false.

// function makeFuncTester(arrOfTests) {
//   return function (cb) {
//     const ret = arrOfTests.every((arr) => {
//       return cb(arr[0]) === arr[1];
//     });
//     if (ret) return true;
//     return false;
//   };
// }

// // /*** Uncomment these to check your work! ***/
// const capLastTestCases = [];
// capLastTestCases.push(["hello", "hellO"]);
// capLastTestCases.push(["goodbye", "goodbyE"]);
// capLastTestCases.push(["howdy", "howdY"]);
// const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
// const capLastAttempt1 = (str) => str.toUpperCase();
// const capLastAttempt2 = (str) => str.slice(0, -1) + str.slice(-1).toUpperCase();
// console.log(shouldCapitalizeLast(capLastAttempt1)); // => should log false
// console.log(shouldCapitalizeLast(capLastAttempt2)); // => should log true

// Challenge 18
// Create a function makeHistory that accepts a number (which will serve as a limit), and returns a function (that will accept a string).
// The returned function will save a history of the most recent "limit" number of strings passed into the returned function (one per invocation only).
// Every time a string is passed into the function, the function should return that same string with the word 'done' after it (separated by a space).
// However, if the string 'undo' is passed into the function,
// then the function should delete the last action saved in the history, and return that deleted string with the word 'undone' after (separated by a space).
// If 'undo' is passed into the function and the function's history is empty, then the function should return the string 'nothing to undo'.

// function makeHistory(limit) {
//   const history = [];
//   return function (string) {
//     if (string === "undo") {
//       if (history.length === 0) {
//         console.log("nothing to undo");
//         return;
//       }
//       console.log(history[history.length - 1] + "undone");
//       history.pop();
//     } else {
//       history.push(string);
//       if (history.length > limit) history.pop();
//       console.log(string + "done");
//     }
//   };
// }

// const myActions = makeHistory(2);
// console.log(myActions("jump")); // => should log 'jump done'
// console.log(myActions("undo")); // => should log 'jump undone'
// console.log(myActions("walk")); // => should log 'walk done'
// console.log(myActions("code")); // => should log 'code done'
// console.log(myActions("pose")); // => should log 'pose done'
// console.log(myActions("undo")); // => should log 'pose undone'
// console.log(myActions("undo")); // => should log 'code undone'
// console.log(myActions("undo")); // => should log 'nothing to undo'

// function blackjack(array) {}

// /*** Uncomment these to check your work! ***/

// /*** DEALER ***/
// const deal = blackjack([2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11]);

// /*** PLAYER 1 ***/
// const i_like_to_live_dangerously = deal(4, 5);
// console.log(i_like_to_live_dangerously()); // => should log 9
// console.log(i_like_to_live_dangerously()); // => should log 11
// console.log(i_like_to_live_dangerously()); // => should log 17
// console.log(i_like_to_live_dangerously()); // => should log 18
// console.log(i_like_to_live_dangerously()); // => should log 'bust'
// console.log(i_like_to_live_dangerously()); // => should log 'you are done!'
// console.log(i_like_to_live_dangerously()); // => should log 'you are done!'

// /*** BELOW LINES ARE FOR THE BONUS ***/

// /*** PLAYER 2 ***/
// const i_TOO_like_to_live_dangerously = deal(2, 2);
// console.log(i_TOO_like_to_live_dangerously()); // => should log 4
// console.log(i_TOO_like_to_live_dangerously()); // => should log 15
// console.log(i_TOO_like_to_live_dangerously()); // => should log 19
// console.log(i_TOO_like_to_live_dangerously()); // => should log 'bust'
// console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!
// console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!

// /*** PLAYER 3 ***/
// const i_ALSO_like_to_live_dangerously = deal(3, 7);
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 10
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 13
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 'bust'
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
// console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
```
