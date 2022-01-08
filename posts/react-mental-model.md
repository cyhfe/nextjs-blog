---
title: "React心智模型"
date: "2022-01-08"
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

## diff

于是 React 在以下两个假设的基础之上提出了一套 O(n) 的启发式算法：

1. 两个不同类型的元素会产生出不同的树；
2. 开发者可以通过设置 key 属性，来告知渲染哪些子元素在不同的渲染下可以保存不变；

- 不同类型的元素: 销毁替换
- 同一类型的元素： React 会保留 DOM 节点，仅比对及更新有改变的属性

## hook flow

![https://raw.githubusercontent.com/donavon/hook-flow/master/hook-flow.png](https://raw.githubusercontent.com/donavon/hook-flow/master/hook-flow.png)

```javascript
import * as React from "react";

function Child() {
  console.log("%c    Child: render start", "color: MediumSpringGreen");

  const [count, setCount] = React.useState(() => {
    console.log("%c    Child: useState(() => 0)", "color: tomato");
    return 0;
  });

  React.useEffect(() => {
    console.log("%c    Child: useEffect(() => {})", "color: LightCoral");
    return () => {
      console.log(
        "%c    Child: useEffect(() => {}) cleanup 🧹",
        "color: LightCoral"
      );
    };
  });

  React.useEffect(() => {
    console.log(
      "%c    Child: useEffect(() => {}, [])",
      "color: MediumTurquoise"
    );
    return () => {
      console.log(
        "%c    Child: useEffect(() => {}, []) cleanup 🧹",
        "color: MediumTurquoise"
      );
    };
  }, []);

  React.useEffect(() => {
    console.log("%c    Child: useEffect(() => {}, [count])", "color: HotPink");
    return () => {
      console.log(
        "%c    Child: useEffect(() => {}, [count]) cleanup 🧹",
        "color: HotPink"
      );
    };
  }, [count]);

  const element = (
    <button onClick={() => setCount((previousCount) => previousCount + 1)}>
      {count}
    </button>
  );

  console.log("%c    Child: render end", "color: MediumSpringGreen");

  return element;
}

function App() {
  console.log("%cApp: render start", "color: MediumSpringGreen");

  const [showChild, setShowChild] = React.useState(() => {
    console.log("%cApp: useState(() => false)", "color: tomato");
    return false;
  });

  React.useEffect(() => {
    console.log("%cApp: useEffect(() => {})", "color: LightCoral");
    return () => {
      console.log("%cApp: useEffect(() => {}) cleanup 🧹", "color: LightCoral");
    };
  });

  React.useEffect(() => {
    console.log("%cApp: useEffect(() => {}, [])", "color: MediumTurquoise");
    return () => {
      console.log(
        "%cApp: useEffect(() => {}, []) cleanup 🧹",
        "color: MediumTurquoise"
      );
    };
  }, []);

  React.useEffect(() => {
    console.log("%cApp: useEffect(() => {}, [showChild])", "color: HotPink");
    return () => {
      console.log(
        "%cApp: useEffect(() => {}, [showChild]) cleanup 🧹",
        "color: HotPink"
      );
    };
  }, [showChild]);

  const element = (
    <>
      <label>
        <input
          type="checkbox"
          checked={showChild}
          onChange={(e) => setShowChild(e.target.checked)}
        />{" "}
        show child
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 50,
          width: 50,
          border: "solid",
        }}
      >
        {showChild ? <Child /> : null}
      </div>
    </>
  );

  console.log("%cApp: render end", "color: MediumSpringGreen");

  return element;
}

export default App;
```
