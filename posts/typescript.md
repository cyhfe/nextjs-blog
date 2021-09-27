---
title: TypeScript 基础
Date: 2021-9-27
---

# TypeScript 基础

## 环境配置

1. 安装依赖

```bash
npm init -y
yarn add typescript
```

2. 修改 package.json

```json
  "scripts": {
    "dev": "tsc --watch --preserveWatchOutput"
  }
```

3. 添加 tsconfig.json

```json
  "compilerOptions": {
    "outDir": "dist", // where to put the TS files
    "target": "ESNEXT" // which level of JS support to target
  },
  "include": ["src"] // which files to compile
```

##

## 参考资源

[FrontendMasters - TypeScript Fundamentals](https://frontendmasters.com/courses/typescript-v3)

[resource](https://www.typescript-training.com/course/fundamentals-v3)
