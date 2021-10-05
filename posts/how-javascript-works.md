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

## 调用栈和内存堆（Call Stack & Memory Heap）
