---
title: "函数式编程"
date: "2022-01-08"
---

纯函数：稳定输入输出，没有副作用
副作用：所有影响函数外部的操作，或者 Math.random 这种不确定的操作
不可变: 解构，object.assign, concat 等

## curry

```javascript
// f(a, b, c) === f(a)(b)(c)
function curry(fn) {
  return function curried(...args) {
    // fn.length 形参的个数
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert(curriedSum(1, 2, 3)); // 6, still callable normally
alert(curriedSum(1)(2, 3)); // 6, currying of 1st arg
alert(curriedSum(1)(2)(3)); // 6, full currying
```

## compose

```javascript
const compose =
  (...functions) =>
  (x) =>
    functions.reduceRight((acc, fn) => fn(acc), x);
const user = { name: "Gianmarco", password: 1234 };
const getUserName = (user) => user.name;
const upperCase = (string) => string.toUpperCase();
const firstFour = (string) => string.substring(0, 4);
compose(firstFour, upperCase, getUserName)(user);
```
