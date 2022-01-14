---
title: "动态规划"
date: "2022-01-15"
---

动态规划其实就是一个优化策略：有什么是可以缓存的？

把一个问题划分成一系列小问题，只解决这些小问题一次并把结果缓存。 (divide & conquer + memo)

```js
// 假设add8是个需要很多计算的函数
function add8(n) {
  console.log("long time")
  return n + 8
}

const cache = {}

function cachedAdd8(n) {
  if (n in cache) {
    return cache[n]
  } else {
    console.log("long time")
    return (cache[n] = n + 8)
  }
}

// 用闭包优化作用域问题
function cachedAdd8() {
  const cache = {}
  return (n) => {
    if (n in cache) {
      return cache[n]
    } else {
      console.log("long time")
      return (cache[n] = n + 8)
    }
  }
}

const cached = cachedAdd8()
```

![](/images/dynamic/f.png)

```js
// 查找第n个斐波那契数(动态规划优化)
// O(2^n)
let step1 = 0
function f1(n) {
  ++step1
  if (n < 2) return n
  return f1(n - 1) + f1(n - 2)
}

// O(n)
let step2 = 0
function cached() {
  const cache = {}
  return function f2(n) {
    ++step2
    if (cache[n]) {
      return cache[n]
    } else {
      if (n < 2) {
        return (cache[n] = n)
      } else {
        return (cache[n] = f2(n - 1) + f2(n - 2))
      }
    }
  }
}

console.log(f1(30)) //832040
console.log(cached()(30)) //832040
console.log(step1, step2) // 2692537 59
```
