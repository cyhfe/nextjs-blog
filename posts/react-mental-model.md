---
title: "React心智模型"
date: "2022-01-04"
---

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>increment</button>
    </div>
  );
}

ReactDOM.render(<Counter />, root);
```

react 是如何将应用渲染到屏幕上的：

1. 触发一次渲染（Trigger a render）：

- 初次渲染：调用 render 函数
- 更新渲染： 更新 state（setState）

2. React 渲染组件

**“Rendering” is React calling your components.**
这里所谓渲染其实是调用你的组件

- 首次渲染：递归调用根组件
- 更新渲染：递归调用状态更新的组件

3. 提交变化到真实 DOM 上

首次渲染： 将 node 树 appendChild 到 container 上
重新渲染： 只会改变两次渲染间不同的节点（diff）

4. 最后是浏览器绘制 DOM

## 状态作为快照

在事件处理函数中，虽然事件是异步的，但是 state 使用的是当时渲染时的状态

```javascript
<button
  onClick={() => {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
  }}
>
  +3
</button>;

// setState只会在下一次渲染时改变，这里的number都是 0
// react会等待事件处理函数全部运行完才会开始重新渲染（批量更新）

// 上面的例子，要是想实现+3的效果，可以传递一个函数（updater function）

setNumber((n) => n + 1);
setNumber((n) => n + 1);
setNumber((n) => n + 1);

// 1. React queues this function to be processed after all the other code in the event handler has run.

// 2. During the next render, React goes through the queue and gives you the final updated state.

｜queued ｜update	｜n	 ｜returns
｜n =>   ｜ n + 1	｜0	 ｜0 + 1 = 1
｜n =>   ｜ n + 1	｜1	 ｜1 + 1 = 2
｜n =>   ｜ n + 1	｜2	 ｜2 + 1 = 3

```
