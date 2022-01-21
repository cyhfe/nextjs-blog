---
title: "javscript异步编程"
date: "2022-01-21"
---

## callback queue

```js
while (true) {
  const task = taskQueue.dequeue()
  task()
}
```

event loop 维护一个队列（callback queue），依次取出执行 callback。

事件回调、定时器等通过 web api 调用，由浏览器执行，完成后将 callback 放入队列，随后会被 event loop 执行。

## microtask queue

微任务的执行顺序在所有浏览器挂起的任务完成之后，在 callback queue 之前。

```js
queueMicrotask(function)
```

Promise 使用的就是微任务队列，fetch 是基于 promise 实现的。

## 回调风格的异步

```js
function main() {
  divideCallback(12, 3, (err, result) => {
    if (err) {
      assert.fail(err)
    } else {
      assert.equal(result, 4)
    }
  })
}

// 调用main
// divideCallback向服务器请求结果
// main推出调用栈
// web api 收到服务器结构，将callback放入callback queue
// event loop 执行 callback
```

## promise 风格的异步

```js
function main() {
  dividePromise(12, 3)
    .then((result) => assert.equal(result, 4))
    .catch((err) => assert.fail(err))
}
```

## await 风格的异步

```js
async function main() {
  try {
    const result = await dividePromise(12, 3)
    assert.equal(result, 4)
  } catch (err) {
    assert.fail(err)
  }
}
```

## Promise

promise 主要用来异步传递结果。

```js
function addAsync(x, y) {
  return new Promise((resolve, reject) => {
    if (x === undefined || y === undefined) {
      reject(new Error("Must provide two parameters"))
    } else {
      resolve(x + y)
    }
  })
}

addAsync(3, 4)
  .then((result) => {
    // success
    assert.equal(result, 7)
  })
  .catch((error) => {
    // failure
    assert.fail(error)
  })
```

构造函数会立刻执行

resolve is used for delivering a result (in case of success).
reject is used for delivering an error (in case of failure).

Method .then() registers callbacks that handle results.
Method .catch() registers callbacks that handle errors.

once a Promise is settled, its state and settlement value can’t change anymore

Promise.resolve 创建一个 fulfilled 状态的 promise

## then 的返回值

.then()处理 promise 的完成状态。他返回一个新的 promise。这个新 promise 的状态取决于 then 的返回值

1. 返回非 promise 的值

```js
Promise.resolve("abc")
  .then((str) => {
    return str + str // (A)
  })
  .then((str2) => {
    assert.equal(str2, "abcabc") // (B)
  })

//  then回调返回一个非promise的值，then返回的promise直接变成完成且传递这个值。
```

2. 返回 promise

```js
Promise.resolve("abc")
  .then((str) => {
    return Promise.resolve(123) // (A)
  })
  .then((num) => {
    assert.equal(num, 123)
  })

// 第一个then的返回值就是Promise.resolve(123)
```

可以利用这个特性拍平嵌套 then 调用

```js
// Flat
asyncFunc1()
  .then((result1) => {
    /*···*/
    return asyncFunc2()
  })
  .then((result2) => {
    /*···*/
  })

// Nested
asyncFunc1().then((result1) => {
  /*···*/
  asyncFunc2().then((result2) => {
    /*···*/
  })
})
```

## 错误处理

```js
// 抛出的错误被catch callback处理
const myError = new Error("My error!")
Promise.resolve("abc")
  .then((str) => {
    throw myError
  })
  .catch((err) => {
    assert.equal(err, myError)
  })
```

```js
const err = new Error()

Promise.reject(err)
  .catch((e) => {
    assert.equal(e, err)
    // Something went wrong, use a default value
    return "default value" // (A)
  })
  .then((str) => {
    assert.equal(str, "default value")
  })
```
