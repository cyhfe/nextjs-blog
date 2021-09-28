---
title: "TypeScript 基础"
Date: "2021-09-27"
---

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
    // "module": "CommonJS", // node env
  },
  "include": ["src"] // which files to compile
```

## 为 JSON 定义类型

JSON的值可以是
- object
- array
- string
- number

还可以是字面量
- true
- false
- null

```typescript
type JSONPrimitive = string | number | boolean 
type JSONObject = { [k: string]: JSONValue }
type JSONArray = JSONValue[]

type JSONValue = JSONArray | JSONObject | JSONPrimitive | null
```

## 函数

**interface**和**type**都可以定义函数调用签名(call signatures)

``` typescript
interface Foo {
  (a: number, b: number): number
}

type Bar = (a: number, b: number) => number
```

**void**
```typescript
() => undefined //必须显式返回undefined
() => void // 可以无返回值
```

## any 和 unknown

any: 任意值

unknown: 在应用类型守卫前不能使用,适合运行时获取的值

```typescript
if (typeof myUnknown === "string") {
  console.log(myUnknown, "is a string")
}
```

## 参考资源

[FrontendMasters - TypeScript Fundamentals](https://frontendmasters.com/courses/typescript-v3)

[resource](https://www.typescript-training.com/course/fundamentals-v3)
