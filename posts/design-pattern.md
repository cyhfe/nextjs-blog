# 设计模式

## Singleton Pattern

整个应用共享一个全局实例

```javascript
let instance
let counter = 0

class Counter {
  constructor(){
    if(instance) {
      throw new Error('只能实例化一次')
    }
    instance = this
  }

  getInstance() {
    return this
  }

  getCount() {
    return counter
  }

  increment() {
    return ++counter
  }

  decrement() {
    return --counter
  }
}

const singletonCounter = Object.freeze(new Counter())

// React中的状态管理
// 在 React 中，我们经常通过Redux或React Context等状态管理工具来依赖全局状态，而不是使用 Singleton。尽管它们的全局状态行为可能看起来类似于 Singleton 的行为，但这些工具提供只读状态而不是Singleton的可变状态。

```
