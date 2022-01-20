---
title: "React性能优化"
date: "2022-01-20"
---

## React.memo 优化不必要的 rerender

React 生命周期：

```
→  render → reconciliation → commit
         ↖                   ↙
              state change
```

“渲染”是 React 调用你的函数来获取 React 元素。

“协调”是 React 将这些 React 元素与之前渲染的元素进行比较。

“提交”是 React 接受这些差异并进行 DOM 更新。

React Component 触发 re-render 的因素：

1. 自身状态变化
2. 消费 context 的 value 变化
3. 父组件渲染

这里有几个需要注意的地方（个人经验，通过 profiler 面板调试）：

- 自身状态变化，会导致子组件渲染，不会触发父组件或者兄弟组件

- 直接改变 props 不会触发 re-render

- 直接改变 context 的值并不会触发 rerender，还是得通过改变状态来触发。但是与普通组件不同的是，当 provider 的状态改变，只会触发 consumer 的 rerender，普通组件会触发所有子组件的 rerender

```jsx
import React, { createContext, useContext, useState } from "react"

const Context = createContext()

function Provider({ children }) {
  // not work
  // let count = 0
  // function setCount(val) {
  //   count = val
  // }
  const [count, setCount] = useState(0)
  return (
    <Context.Provider value={{ count, setCount }}>{children}</Context.Provider>
  )
}

function Child() {
  const { count, setCount } = useContext(Context)
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        +
      </button>
      {count}
    </div>
  )
}

function App() {
  const [, setState] = useState({})
  return (
    <div>
      <button onClick={() => setState({})}>force update</button>
      <Provider>
        <NotConsumer />
        <Child />
      </Provider>
    </div>
  )
}

function NotConsumer() {
  return <p>not consumer</p>
}

export default App
```

![context](/images/rerender/context.png)
![app](/images/rerender/app.png)

## 考虑 rerender 之前要先考虑缓慢的渲染

React 中的渲染实际上是调用函数获取 vdom。

渲染的成本并不高。调用函数并不一定会更新 DOM

真正造成‘卡顿’的原因应该是绘制 DOM。

所以我们要优先考虑绘制 DOM 的问题。

比如列表加 key，就是优化绘制 DOM 的问题（重用 DOM）。

## 优化不必要的重新渲染

- React.PureComponent
- shouldComponentUpdate
- React.memo

React.memo 包裹的组件只会在 props 变化的时候更新。默认浅比较，可以传入比较函数

```jsx
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual)
```

内部使用了 useState, useReducer 或 useContext，当状态变化还是会更新

向下面这个例子中，CountButton 的 Props 依赖父组件的 increment 方法，就算加了 memo 也还是会重新渲染（父组件每次都会重新定义 increment， 要配合 useCallback 使用）

```jsx
function Example() {
  const [name, setName] = React.useState("")
  const [count, setCount] = React.useState(0)
  const increment = () => setCount((c) => c + 1)
  return (
    <div>
      <div>
        <CountButton count={count} onClick={increment} />
      </div>
      <div>
        <NameInput name={name} onNameChange={setName} />
      </div>
      {name ? <div>{`${name}'s favorite number is ${count}`}</div> : null}
    </div>
  )
}

function CountButton({ count, onClick }) {
  return <button onClick={onClick}>{count}</button>
}
```

## useMemo 优化昂贵的计算

```jsx
function Distance({ x, y }) {
  const distance = React.useMemo(() => calculateDistance(x, y), [x, y])
  return (
    <div>
      The distance between {x} and {y} is {distance}.
    </div>
  )
}
```

## 优化 context

```jsx
//before
const CountContext = React.createContext()

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]
  return <CountContext.Provider value={value} {...props} />
}
//after
const CountContext = React.createContext()

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = React.useMemo(() => [count, setCount], [count])
  return <CountContext.Provider value={value} {...props} />
}
```

每次 CountProvider 重新渲染的时候，value 都是新的，即使 count 不变，所有的 consumer 都会渲染

## code splitting

```jsx

// 按需加载 + prefetch
const Globe = React.lazy(() => import(/* webpackPrefetch: true */ '../globe'))

<React.Suspense fallback={<div>loadglobe...</div>}>
  {showGlobe ? <Globe /> : null}
</React.Suspense>
```
