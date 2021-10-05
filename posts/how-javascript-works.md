---
title: "Javascript是如何工作的"
date: "2021-10-05"
---

## JS 引擎

javscript 不能直接被计算机执行，需要 js 引擎编译成机器码（machine code）执行。

![code](/images/how-js-work/code.png)

在 v8 中，这分成 3 个阶段

- 从源码到抽象语法树
- 从抽象语法树到字节码
- 从字节码到机器码

[v8 wiki](<https://en.wikipedia.org/wiki/V8_(JavaScript_engine)>)

> V8 first generates an abstract syntax tree with its own parser. Then, Ignition generates bytecode from this syntax tree using the internal V8 bytecode format. TurboFan compiles this bytecode into machine code.

我们用一张图来更直观的了解下：

![v8](https://v8.dev/_img/scanner/overview.svg)

- AST

[AST explorer](https://astexplorer.net/): 在这个网站，我们可以看到 AST 的结构

![jsEngine](/images/how-js-work/ast.png)

从 AST 到 machine code 需要经过两个阶段：

- Interpreter（解释）
- Complier（编译）

```javascript
// complier vs Interpreter
function someCalculation(x, y) {
  return x + y;
}

// Interpreter 一行一行解释编译执行。编译快，运行慢
for (let i = 0; i < 1000; i++) {
  someCalculation(4, 5);
}

// complier 优化后编译运行。编译慢，运行快
for (let i = 0; i < 1000; i++) {
  9;
}
```

现代浏览器采用的是即时编译(JIT)：

> 即时编译（英语：just-in-time compilation，缩写为 JIT；是一种执行计算机代码的方法，这种方法涉及在程序执行过程中（在运行期）而不是在执行之前进行编译。通常，这包括源代码或更常见的字节码到机器码的转换，然后直接执行。实现 JIT 编译器的系统通常会不断地分析正在执行的代码，并确定代码的某些部分，在这些部分中，编译或重新编译所获得的加速将超过编译该代码的开销。

> JIT 编译是两种传统的机器代码翻译方法——提前编译（AOT）和解释——的结合，它结合了两者的优点和缺点。

![jsEngine](/images/how-js-work/engine.png)

## JS 是怎么执行的

对 js 引擎的工作方式有了一定理解后，让我们回到 js 本身来，
js 是怎么执行的？

这里有几个很重要的概念

- 执行上下文
- 作用域
- 闭包

### 执行上下文

[推荐博客: JavaScript Execution Context](https://www.javascripttutorial.net/javascript-execution-context/)

![scope](/images/how-js-work/scope.png)

js 引擎执行一个 js 脚本（或者调用一个函数），就会创建一个执行上下文。每个执行上下文有 2 个阶段： 创建阶段和执行阶段。

- 创建阶段

  - 创建一个全局对象 Global（在浏览器里是 window， node 中是 Global）
  - 创建 this 对象指向 Global(在函数调用的上下文中， this 指向调用这个函数的对象)
  - 设置内存对来保存变量和函数引用
  - 初始化函数声明，变量初始值为 undefind

- 执行阶段
  一行一行执行。包括赋值操作和函数调用

当函数退出后这个执行上下文就会被销毁。

箭头函数没有 this 绑定和 arguments。因为它是赋值操作，执行阶段才定义的。

### 作用域和作用域链

在执行上下文的创建阶段，作用域链是在变量对象之后创建的。作用域链本身包含变量对象。

作用域链用于解析变量。当要求解析一个变量时，JavaScript 总是从代码嵌套的最内层开始，并不断跳回到父作用域，直到找到该变量。

### 词法作用域

一句话解释： 函数可以在任意地方调用，但是函数中的变量查找，取决于函数定义时的作用域。

```javascript
function outerFunc() {
  // the outer scope
  let outerVar = "I am from outside!";
  function innerFunc() {
    // the inner scope
    console.log(outerVar); // 'I am from outside!'
  }
  return innerFunc;
}
const inner = outerFunc();
inner();
```

## 闭包

```javascript
let count = 10;
function outer() {
  let other = "other";
  let count = 0;
  return function () {
    count++;
  };
}

const fn = outer();

fn();
fn();
```

![scope](/images/how-js-work/closure.png)

在 chrome 中断点调试，可以看到 fn 有个`[[scopes]]`属性`[Closure, Script, Global]`

我的理解是：

函数执行完推出调用栈， 执行上下文被销毁。

如果函数返回值是函数（或者对象， 有属性值为内部函数）

这个返回值函数被赋值给外部变量

这个返回值函数保持对外部函数的变量引用

这些变量不会被销毁，而是保存在闭包中

## 总结

这些概念很重要又晦涩难懂，实际场景中使用也更复杂。
所以首先要理解它的机制，多接触一些实践，在碰到有疑惑的地方断点调试，慢慢就会有更多的理解了吧。
