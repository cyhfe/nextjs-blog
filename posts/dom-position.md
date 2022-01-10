---
title: "数组reduce方法的实现"
date: "2022-01-10"
---

reduce 方法，可以理解为将一个数组归并为一个返回值

![image](/images/reduce/reduce.png)

```javascript
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

## reduce 应用

```javascript
// 1. 按顺序运行Promise
function runPromiseInSequence(array, value) {
  return array.reduce((acc, cur) => {
    return acc.then(cur);
  }, Promise.resolve(value));
}

// 2. pipe
const pipe = (fns) => (input) => fns.reduce((acc, cur) => cur(acc), input);
```

## 实现 reduce

```javascript
function reduce(array, cb, init) {
  let acc = init;
  for (let i = 0; i < array.length; i++) {
    acc = acc !== undefined ? cb(acc, array[i]) : array[0];
  }
  return acc;
}

const arr = [3, 4, 5, 0, -1];

console.log(reduce(arr, (acc, cur) => acc + cur));
```
