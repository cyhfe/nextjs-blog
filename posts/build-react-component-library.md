---
title: "React组件库环境搭建"
date: "2021-09-30"
---

包含功能:

- Typescript 支持
- storybook 文档编写
- jest 测试
- prettier 格式化
- eslint 代码检查
- rollup 打包 cjs, esm
- github actions 自动发布部署

## 环境设置

**依赖类型**

- dependencies

  这个包运行时的依赖, 用户需要安装

- devDependencies

  本地开发和测试需要的包, 用户不需要安装

- peerDependencies

  用户安装这个包时本地环境需要有的依赖

1. 创建 github 仓库, 添加`.gitignore(node)`, `README`

2. clone 到本地

3. 初始化包

```bash
npm init -y
```

4. packages.json

```json
{
  "name": "@cyhfe/react-component",
  "version": "0.0.0",
  ...
}
```

5. 安装依赖

```bash
npm install --save-peer react react-dom

# ts
npm install --save-dev --save-exact typescript@4.2.2

npm install --save-dev @types/react @types/react-dom
```

6. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"]
}
```

7. 第一个组件

```tsx
// src/buttons/Button.tsx
import React from "react";

export const Button = () => {
  return <button>Hello world</button>;
};
```

```bash
# 确保tsc正确编译不报错，暂时没有输出
npx tsc
```

```bash
# 包初始化就完成了，提交代码
git add -A
git commit -m "inital package"
git push
```

## Storybook 配置

1. storybook CLI

```bash
npx sb init
npm run storybook
```

2. 编写 story

```bash
# 删除示例代码
rm -rf src/stories/*
```

添加 Introduction,把 README 作为首页

```tsx
// src/stories/Introduction.stories.mdx

import { Meta, Description } from '@storybook/addon-docs/blocks';
import README from '../../README.md';

<Meta title="Example/Introduction" />

<Description>{README}</Description>
```

为 Button 编写文档

```tsx
// File: src/stories/Button.stories.tsx

import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Button } from "../buttons/Button";

export default {
  title: "Example/Button",
  component: Button,
} as Meta;

const Template: Story = (args) => <Button {...args} />;

export const Default = Template.bind({});
```

```bash

```

文档使用 bootstrap reboot 作为基底, 保持跨浏览器 UI 的一致性

```js
// File: .story/preview.js

import "bootstrap/dist/css/bootstrap-reboot.min.css";
```

## prettier

```bash
npm install --save-dev prettier
```

```json
// File: .prettierrc

{
  "singleQuote": true
}
```

```json
// File: package.json

{
  "scripts": {
    "format": "prettier --write .",
    "lint:format": "prettier --check ."
  }
}
```

```bash
npm run format
```

## eslint

- `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` allow ESLint to parse and apply rules to TypeScript.

- `eslint-config-prettier` disable all style rules that conflict with Prettier.

- `eslint-plugin-react` and `eslint-plugin-react-hooks` enable React-specific linting rules.

```bash
npm install --save-dev eslint eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

```json
// File: .eslintrc

{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "react/prop-types": 0
  }
}
```

```json
// File: package.json

{
  "scripts": {
    "lint": "eslint src/**"
  }
}
```

```bash
npm run lint
```

## 测试

**jest**

```bash
npm install --save-dev jest@26 ts-jest@26 @types/jest@26
```

```javascript
// File: jest.config.js

/* eslint-env node */

module.exports = {
  preset: "ts-jest",
};
```

```json
// File: package.json

{
  "scripts": {
    "test": "jest"
  }
}
```

**React Testing Library**

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

```ts
// File: jest-setup.ts

import "@testing-library/jest-dom";
```

```
// File: jest.config.js

module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
```

```
// File: tsconfig.json

{
  "include": ["src/**/*", "./jest-setup.ts"]
}
```

## 打包

- CommonJS (CJS)

  - The module system that Node.js has used historically

  - Server-side only

  - require and module.exports

- ESModules (ES)

  - The official specification for a standard module system

  - Can work in server and modern browser environments

  - import and export

  - Supports tree-shaking

  - Tree-shaking allows modern bundlers, like Webpack and RollupJS, to remove JavaScript that isn't required for your application to run.

- Universal Module Definition (UMD)

  - Allows many different module formats to interact with your library

  - Can work in server and browser environments

  - Unable to tree-shake

当我们打包的时候,我们可以提供多分发版本并且在`package.json`中引用.

- main - cjs
- module - esm
- browser - umd

我们还需要 babel 提供对低版本浏览器的支持, 对 jsx 的解析等

```ts
// File: src/index.ts

export * from "./buttons/Button";
```

## babel

storybook cli 已经安装了一些 babel 依赖, 我们还需要部分其他依赖

```bash
npm install --save-dev @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime babel-plugin-styled-components

npm install @babel/runtime
```

- @babel/preset-env allows us to target specific browser environments when transpiling our code

- @babel/preset-react a combination of plugins that allows us to use JSX and other React features

- @babel/preset-typescript allows Babel to consume TypeScript (without type checking)

- babel-plugin-styled-components improves debugging and minification of styles in production environments

- @babel/plugin-transform-runtime and @babel/runtime. When a library is transpiled with Babel there are several helper functions and utilities that are included with the output. As you consume more packages these helpers are duplicated and increase the bundle size of your application. By including a runtime dependency to @babel/runtime this will ensure that our package doesn't duplicate them locally.

```json
// File: .babelrc

{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": ">0.2%, not dead, not op_mini all"
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "babel-plugin-styled-components"
  ]
}
```

## RollupJS

```bash
npm install --save-dev rollup rollup-plugin-delete rollup-plugin-node-externals @rollup/plugin-babel @rollup/plugin-commonjs @rollup/plugin-node-resolve
```

```javascript
// File: rollup.config.js

/* eslint-env node */

import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import externals from "rollup-plugin-node-externals";
import del from "rollup-plugin-delete";
import pkg from "./package.json";

export default [
  {
    input: "./src/index.ts",
    plugins: [
      del({ targets: "dist/*" }),
      externals({ deps: true }),
      nodeResolve({
        extensions: [".js", ".ts", ".tsx"],
      }),
      commonjs(),
      babel({
        babelHelpers: "runtime",
        exclude: "**/node_modules/**",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
    ],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
];
```

rollup 配置主要分 3 个部分 `input`, `output`, `plugins`

- Input

  The input section references the entry-point that we defined above. This determines what modules will be bundled in our output.

- Output

  output defines where the bundled and transpiled output will be placed when the build is complete. It also receives a format configuration which determines the module format. By providing an array of outputs we can create a multi-distribution build which includes ESModule and CommonJS output types.

  The output file paths are determined by the main and module entry-points within our package.json.

- Plugins

  The plugins are what allow Rollup to understand our code and bundle it correctly.

  - del

    Deletes any existing build files that exist.

  - externals

    Ensures that any dependencies we rely on are not bundled within our library.

    This allows common dependencies to be de-duped with other packages, reducing bundle size.

  - nodeResolve

    Allows Rollup to find third party modules in node_modules

  - commonjs

    Converts CommonJS modules into ESModules within Rollup

  - babel

    Uses our Babel config defined earlier to transpile our code into a format that is consumable by a wider set of browsers.

更新我们的 scripts

```json
// File: package.json
{
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "sideEffects": false,
  "scripts": {
    "build": "npm run build:js",
    "build:js": "rollup -c rollup.config.js",
    "test": "npm run test:ts && npm run test:jest",
    "test:jest": "jest",
    "test:ts": "tsc",
    "lint": "npm run lint:format && npm run lint:js",
    "lint:format": "prettier --check \"src/**/*\"",
    "lint:js": "eslint src/**",
    "format": "prettier --write \"src/**/*\"",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  }
}
```

```bash
npm run build
```

## 打包 ts 类型声明文件

虽然我们现在开发环境已经拥有良好的 ts 支持,但是我们的用户并不能得到类型检查.
为了支持这个功能, 我们需要单独打包类型声明文件.

```json
// File: tsconfig.build.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "dist/typings",
    "noEmit": false,
    "emitDeclarationOnly": true
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.spec.*", "**/*.stories.*"]
}
```

```json
// File: package.json
{
  "types": "dist/typings/index.d.ts",
  "scripts": {
    "build": "npm run build:js && npm run build:types",
    "build:types": "tsc -p tsconfig.build.json"
  }
}
```

## 使用 github actions 持续集成

```
# File: .github/workflows/publish.yml

name: Publish

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
      with:
        node-version: '16.x'
        registry-url: 'https://npm.pkg.github.com'
        scope: '@cyhfe'
    - run: npm ci
    - run: npm run lint
    - run: npm run test
    - run: npm run build
    - run: npm publish
      env:
        NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

This Publish workflow will run whenever a new tag is pushed that matches the v\* format. It will:

- Checkout our code

- Setup the latest Node v15 release

- Configure NPM to use the Github Packages registry

- Use npm ci to ensure consistent dependencies are installed

- Lint, test, and build our library

- Publish our package to the Github Packages registry

IMPORTANT: Ensure that scope: '@GITHUBUSERNAME' is updated to match your GitHub organization or account name. For my library this will be scope: '@austingreendev'.

```bash
npm version minor
git push --follow-tags
```

github actions 还没搞明白,搭这个组件库也是为了学习之用,有空再来研究

## 手动部署

```json
{ "prepare": "npm run format && npm run lint && npm run test && npm rbuild" }
```

改版本号

```bash
npm publish
```
