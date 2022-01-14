---
title: "数据结构"
date: "2022-01-08"
---

## Array

```javascript
class MyArray {
  constructor() {
    this.length = 0
    this.data = {}
  }

  get(index) {
    return this.data[index]
  }

  push(item) {
    this.data[this.length] = item
    this.length++
    return this.length
  }

  pop() {
    const lastItem = this.data[this.length - 1]
    delete this.data[this.length - 1]
    this.length--
    return lastItem
  }

  remove(index) {
    const item = this.data[index]
    this.shiftItems(index)
    return item
  }

  shiftItems(index) {
    for (let i = index; i < this.data.length - 1; i++) {
      this.data[i] = this.data[i + 1]
    }
    delete this.data[this.length - 1]
    this.length--
  }
}

// 翻转字符串
function reverse(string) {
  const backward = []
  const len = string.length
  for (let i = len - 1; i >= 0; i--) {
    backward.push(string[i])
  }
  return backward.join("")
}

function reverse2(string) {
  return string.split("").reverse().join("")
}

let string = "abc"
console.log(reverse(string))
```

## Hash Table

```javascript
class HashTable {
  constructor(size) {
    this.data = new Array(size)
    // this.data = [];
  }

  _hash(key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length
    }
    return hash
  }

  set(key, value) {
    let address = this._hash(key)
    if (!this.data[address]) {
      this.data[address] = []
    }
    this.data[address].push([key, value])
    return this.data
  }

  get(key) {
    const address = this._hash(key)
    const currentBucket = this.data[address]
    if (currentBucket) {
      for (let i = 0; i < currentBucket.length; i++) {
        if (currentBucket[i][0] === key) {
          return currentBucket[i][1]
        }
      }
    }
    return undefined
  }

  keys() {
    const keysArray = []
    console.log(this.data.length)
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        keysArray.push(this.data[i][0][0])
      }
    }
    return keysArray
  }
}

// const myHashTable = new HashTable(50);
// myHashTable.set("grapes", 10000);
// myHashTable.set("grapes", 10000);
// myHashTable.get("grapes");
// myHashTable.set("apples", 9);
// myHashTable.get("apples");
// myHashTable.keys();

function findFirstRepeat(array) {
  const map = {}
  for (let i = 0; i < array.length; i++) {
    if (!map[array[i]]) {
      map[array[i]] = true
    } else {
      return array[i]
    }
  }
  return undefined
}

function findFirstRepeat2(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        return array[i]
      }
    }
  }
  return undefined
}

const array = [1, 2, 3, 4, 4]
const ret1 = findFirstRepeat(array)
const ret2 = findFirstRepeat2(array)
console.log(ret1, ret2)
```

## Link List

```javascript
// 1 - 2 - 3

// const ll = {
//   head: {
//     value: 1,
//     next: {
//       value: 2,
//       next: {
//         value: 3,
//         next: null,
//       },
//     },
//   },
// };

class Node {
  constructor(value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

class LinkedList {
  constructor(value) {
    this.head = new Node(value)
    this.tail = this.head
    this.length = 1
  }
  append(value) {
    const newNode = new Node(value)
    newNode.prev = this.tail
    this.tail.next = newNode
    this.tail = newNode
    this.length++
    return this
  }
  prepend(value) {
    const newNode = new Node(value)
    this.head.prev = newNode
    newNode.next = this.head
    this.head = newNode
    this.length++
    return this
  }
  printList() {
    const array = []
    let currentNode = this.head
    while (currentNode !== null) {
      array.push(currentNode.value)
      currentNode = currentNode.next
    }
    console.log(array)
  }
  insert(value, index) {
    if (index >= this.length) {
      return this.append(value)
    }
    if (index === 0) {
      return this.prepend(value)
    }
    const leader = this.traverseToIndex(index - 1)
    const fllower = leader.next
    const newNode = new Node(value)
    newNode.prev = leader
    fllower.prev = newNode
    newNode.next = fllower
    leader.next = newNode
    this.length++
  }
  remove(index) {
    const leader = this.traverseToIndex(index - 1)
    const removedItem = leader.next
    removedItem.next.prev = leader
    leader.next = removedItem.next
    this.length--
  }

  traverseToIndex(index) {
    let target = this.head
    let count = 0
    while (count < index) {
      if (target.next === null) return undefined
      target = target.next
      count++
    }
    return target
  }
  reverse() {
    let prev = null
    let current = this.head
    while (current) {
      let temp = current.next
      current.next = prev
      prev = current
      current = temp
    }

    this.head = prev
    this.printList()
    return prev
  }
}

const list = new LinkedList(1)
list.append(2)
list.append(3)
list.prepend(0)

list.printList()
list.reverse()

// console.log(list);
```

## queque

```javascript
class Node {
  constructor(value) {
    this.next = null
    this.value = value
  }
}

class Queque {
  constructor() {
    this.first = null
    this.last = null
    this.length = 0
  }

  peek() {
    return this.first
  }

  enqueque(value) {
    const newNode = new Node(value)
    if (this.length === 0) {
      this.first = newNode
      this.last = newNode
    } else {
      this.last.next = newNode
      this.last = this.last.next
    }
    this.length++
    return this
  }

  dequeque() {
    if (!this.first) return null
    if (this.first === this.last) {
      this.first = null
    } else {
      this.first = this.first.next
    }
    this.length--
  }
}

const instance = new Queque()
instance.enqueque("a")
instance.enqueque("b")
instance.enqueque("c")
instance.dequeque()
instance.dequeque()
instance.dequeque()

// array
class Stack {
  constructor() {
    this.stack = []
  }

  peek() {
    return this.stack[this.stack.length - 1]
  }

  push(value) {
    return this.stack.push(value)
  }

  pop() {
    return this.stack.pop()
  }
}

//stack
class Queque2 {
  constructor() {
    this.stack1 = new Stack()
    this.stack2 = new Stack()
  }
  peek() {
    while (this.stack1.stack.length > 0) {
      let pop = this.stack1.pop()
      this.stack2.push(pop)
    }

    const pop = this.stack2.pop()
    this.stack2.push(pop)
    this.stack1.push(this.stack2.pop())
    return pop
  }
  push(value) {
    this.stack1.push(value)
  }

  pop() {
    for (let i = 0; i < this.stack1.stack.length; i++) {
      this.stack2.push(this.stack1.pop())
    }
    const pop = this.stack2.pop()
    this.stack1.push(this.stack2.pop())
    return pop
  }
}

const myQueue = new Queque2()

myQueue.push(1) // queue is: [1]
myQueue.push(2) // queue is: [1, 2] (leftmost is front of the queue)
debugger
const a = myQueue.peek() // return 1
const b = myQueue.pop() // return 1, queue is [2]

console.log(a, b, myQueue.stack1)
```

## stack

```javascript
class Node {
  constructor(value) {
    this.next = null
    this.value = value
  }
}

// LinkedList
class Stack {
  constructor() {
    this.top = null
    this.bottom = null
    this.length = 0
  }

  peek() {
    return this.top
  }

  push(value) {
    const newNode = new Node(value)
    if (this.length === 0) {
      this.top = newNode
      this.bottom = newNode
    } else {
      let temp = this.top
      this.top = newNode
      this.top.next = temp
    }
    this.length++
    return this
  }

  pop() {
    if (!this.top) return null
    const temp = this.top
    this.top = this.top.next
    this.length--
    return temp
  }
}

const instance = new Stack()

instance.push("a")
instance.push("b")
instance.push("c")
instance.pop()
console.log(instance)

// array
class Stack2 {
  constructor() {
    this.stack = []
  }

  peek() {
    return this.stack[this.stack.length - 1]
  }

  push(value) {
    return this.stack.push(value)
  }

  pop() {
    return this.stack.pop()
  }
}
```

```javascript
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null
  }
  insert(value) {
    const newNode = new Node(value)
    if (this.root === null) {
      this.root = newNode
      return
    }

    this.insertNode(this.root, newNode)
  }
  insertNode(root, node) {
    if (node.value < root.value) {
      if (!root.left) {
        root.left = node
        return
      }
      this.insertNode(root.left, node)
    } else {
      if (!root.right) {
        root.right = node
        return
      }
      this.insertNode(root.right, node)
    }
  }
  lookup(value) {
    if (this.root === null) {
      return false
    }
    return this.searchNode(this.root, value)
  }

  searchNode(root, value) {
    let current = root
    if (current.value === value) {
      return true
    }
    if (value < current.value) {
      if (!current.left) return false
      current = current.left
      return this.searchNode(current, value)
    } else {
      if (!current.right) return false
      current = current.right
      return this.searchNode(current, value)
    }
  }
  BreadthFirstSearch() {
    let currentNode = this.root
    let list = []
    let queue = []
    queue.push(currentNode)

    while (queue.length > 0) {
      currentNode = queue.shift()
      list.push(currentNode.value)
      if (currentNode.left) {
        queue.push(currentNode.left)
      }
      if (currentNode.right) {
        queue.push(currentNode.right)
      }
    }
    return list
  }
  BreadthFirstSearchR(queue, list) {
    if (!queue.length) {
      return list
    }
    const currentNode = queue.shift()
    list.push(currentNode.value)

    if (currentNode.left) {
      queue.push(currentNode.left)
    }
    if (currentNode.right) {
      queue.push(currentNode.right)
    }

    return this.BreadthFirstSearchR(queue, list)
  }

  DFTPreOrder(currentNode, list) {
    return traversePreOrder(this.root, [])
  }
  DFTPostOrder() {
    return traversePostOrder(this.root, [])
  }
  DFTInOrder() {
    return traverseInOrder(this.root, [])
  }
}

function traversePreOrder(node, list) {
  list.push(node.value)
  if (node.left) {
    traversePreOrder(node.left, list)
  }
  if (node.right) {
    traversePreOrder(node.right, list)
  }
  return list
}

function traverseInOrder(node, list) {
  if (node.left) {
    traverseInOrder(node.left, list)
  }
  list.push(node.value)
  if (node.right) {
    traverseInOrder(node.right, list)
  }
  return list
}

function traversePostOrder(node, list) {
  if (node.left) {
    traversePostOrder(node.left, list)
  }
  if (node.right) {
    traversePostOrder(node.right, list)
  }
  list.push(node.value)
  return list
}

const ins = new BinarySearchTree()

ins.insert(6)
ins.insert(2)
ins.insert(5)
ins.insert(1)
ins.insert(9)

debugger
const r2 = ins.lookup(2)
console.log(r2)
//     6
//   2    9
// 1   5

let r = traverse(ins.root)

function traverse(node) {
  const tree = { value: node.value }
  tree.left = node.left === null ? null : traverse(node.left)
  tree.right = node.right === null ? null : traverse(node.right)
  return tree
}
```
