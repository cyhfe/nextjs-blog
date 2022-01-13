---
title: "webpack"
date: "2022-01-13"
---

## why webpack

javascript 是在 web 中通过 script 标签引入，通过 http 协议获取并执行。它存在以下问题：

1. 无法规模化
   比如分割成太多 script，像 chrome 只能并发请求 6 个文件
2. 无法维护
   作用域、包大小、可读性、IIFE

why webpack：

我觉得最重要的一点就是与 npm 生态集成。

库的作者会选择他们喜欢的模块化方案（ESM、CJS 等）。

我们有时还需要用到很多预处理库（比如 sass 等）

## introducing webpack

3 种方式使用 webpack

1. webpack.config.js

```js
module.exports = {
  entry: {
    vendor: "./src/vendors.ts",
    main: "./src/main.browser.ts",
  },
  output: {
    path: "dist/",
    filename: "[name].bundle.js",
  },
}
```

2. webpack CLI

```bash
 webpack <entry.js> <result.js> --colors --progress
```

3. node Api

```js
var webpack = require("webpack")

// returns a Compiler instance
webpack(
  {
    // configuration object here!
  },
  function (err, stats) {
    // …
    // compilerCallback
    console.error(err)
  }
)
```

## webpack from scratch
