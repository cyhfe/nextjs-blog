---
title: "防抖和节流"
date: "2022-01-20"
---

```js
// 一段时间后执行， 期间再执行则重新计时

function debounce(func, duration) {
  let timeout
  return function (...args) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      return func.apply(this, args)
    }, duration)
  }
}
```

```js
// 一段时间内只执行一次

function throttle(func, duration) {
  let shouldWait = false
  return function (...args) {
    if (!shouldWait) {
      func.apply(this, args)
      shouldWait = true
      setTimeout(function () {
        shouldWait = false
      }, duration)
    }
  }
}
```
