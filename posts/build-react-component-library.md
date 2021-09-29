---
title: "搭建自己的React组件库"
date: "2021-09-27"
---

## 环境设置

**依赖类型**

- dependencies

  这个包运行时的依赖

- devDependencies

  本地开发和测试需要的包

- peerDependencies

  用户安装这个包时需要的环境

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
// src/button/Button.tsx
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


