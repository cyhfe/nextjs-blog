---
title: "javascript中的Map、Set"
date: "2022-01-21"
---

不同场景下，选择合适的数据结构非常重要。它影响到你如何操作数据、组织代码，代码的易读性。

在 javascript 中，存储集合占据主导地位的是 Object 和 Array

- Object 根据 hash 地址存储[key, value]，key 值可以是 string 或者 symbol
- Array 基于索引的集合，有大量的工具函数

为了合适的时候有更多的选择，是时候学习理解 Map、Set 的特性和适用场景了。

## Map

Map 同 Object 类似，都是键值对的集合。

不同的是：

- Map 是有序的唯一键值对集合
- Map 的值可以是任意类型，object 会把 key 转为 string

```js
const map = new Map()

map.set("firstName", "Luke")
map.set("lastName", "Skywalker")
map.set("occupation", "Jedi Knight")

// 类型互相转化

// 数组转map
const map = new Map([
  ["firstName", "Luke"],
  ["lastName", "Skywalker"],
  ["occupation", "Jedi Knight"],
])

// map转化为数组
const arr = Array.from(map)

// map转化为对象

const obj = Object.fromEntries(map)

// 对象转map
const luke = {
  firstName: "Luke",
  lastName: "Skywalker",
  occupation: "Jedi Knight",
}

const map = new Map(Object.entries(luke))
```

```js
// map的key可以是任何类型，但是不能重复，会覆盖。

const map = new Map()

map.set("1", "String one")
map.set(1, "This will be overwritten")
map.set(1, "Number one")
map.set(true, "A Boolean")
```

### map 和 object 选择

map：

- size
- 迭代
- 灵活性：操作数据
- 有序

object：

- JSON JSON.parse() 和 JSON.stringify()与服务端交互

## Set

与数组类似，但是它的值是唯一的。

```js
//转化为数组
const arr = [...set]

// 数组去重
const uniqueArray = [...new Set([1, 1, 2, 2, 2, 3])] // (3) [1, 2, 3]
```
