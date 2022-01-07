---
title: "call、apply、bind模拟实现"
date: "2022-01-07"
---

主要思路：

- call, apply 就是变成对象的方法去调用，this 指向这个对象。
- bind 使用闭包保存 context 和 function

```javascript
Function.prototype.call = function (context = window, ...arg) {
  const fn = Symbol();
  // this指向函数实例
  context[fn] = this;
  const ret = context[fn](...arg);
  delete context[fn];
  return ret;
};
```

```javascript
Function.prototype.apply = function (context = window, arg) {
  const fn = Symbol();
  // this指向函数实例
  context[fn] = this;

  // 处理空参数
  let ret;
  if (Array.isArray(arg)) {
    ret = context[fn](...arg);
  } else {
    ret = context[fn]();
  }

  delete context[fn];
  return ret;
};
```

```javascript
Function.prototype.bind = function (context = window, ...arg) {
  const fn = this;
  return function (...newArg) {
    fn.apply(context, [...arg, ...newArg]);
  };
};
```
