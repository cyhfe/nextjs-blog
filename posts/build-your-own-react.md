---
title: "实现一个小而全的react"
date: "2021-10-6"
---

> 行文思路参考https://pomb.us/build-your-own-react/

## 环境搭建

我们需要一个可以转换 jsx 的 vanilla js 环境，使用 vite 可以很方便设置好我们的开发环境

```bash
yarn create vite .
#选择vanilla js

# 安装依赖
yarn

touch vite.config.js
```

```javascript
// vite.config.js
export default {
  esbuild: {
    jsxFactory: "createElement",
  },
};
```

这里我们还是安装下 react 的依赖，方便对比我们实现版本和调试

```bash
yarn add react react-dom
```

```html
<body>
  <div id="root"></div>
  <script type="module" src="/main.jsx"></script>
</body>
```

```javascript
// main.jsx
import React, { createElement } from "react";
import ReactDom from "react-dom";

const element = <h1>hello world</h1>;
const root = document.getElementById("root");

ReactDom.render(element, root);
```

```bash
yarn dev
```

可以看到我们的项目跑起来了。

## createElement

在我们实现 createElement 之前， 我们需要理解 JSX 是什么。

[babel:try it out](https://babeljs.io/repl)

我们来看 babel 是如何把 jsx 转换成 js 的

![Screen Shot 2021-10-06 at 10.45.03.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4204ce79880b4f63a198d36e7a88c07f~tplv-k3u1fbpfcp-watermark.image?)

我们打印返回值 `console.log(element)`

![Screen Shot 2021-10-06 at 10.47.26.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98620af7112b4e92a345e084b4598e0c~tplv-k3u1fbpfcp-watermark.image?)

接下来我们再看 createElement 的文档：

```javascript
React.CreateElement(type, [props], [...children]);
```

创建并返回指定类型的新  [React 元素](https://zh-hans.reactjs.org/docs/rendering-elements.html)。其中的类型参数既可以是标签名字符串（如  `'div'`  或  `'span'`），也可以是  [React 组件](https://zh-hans.reactjs.org/docs/components-and-props.html)  类型 （class 组件或函数组件），或是  [React fragment](https://zh-hans.reactjs.org/docs/react-api.html#reactfragment)  类型。

总结：
JSX 转换成`createElement`, 返回一个 js 对象(React Element)

我们来实现`createElement`

```javascript
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        if (typeof child === "string") {
          return createTextElement(child);
        }
        return child;
      }),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
```

这里我们特殊处理下了文本节点，方便后面的代码组织。

React：
![Screen Shot 2021-10-06 at 10.58.42.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec73b4f807fc4d0ba8c287f82fc6acf2~tplv-k3u1fbpfcp-watermark.image?)

我们的：

![Screen Shot 2021-10-06 at 11.02.52.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/539a7185f4f240c788180f12e8bda9eb~tplv-k3u1fbpfcp-watermark.image?)

https://github.com/pomber/didact/blob/v3.1-create-element/didact.js

## render

有了 React Element， 我们来实现 render。
现在我们只关心创建 DOM， 更新和删除会在后续实现。

```javascript
function createDom(element) {
  // 创建节点
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  // 添加属性
  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  return dom;
}

function render(element, container) {
  const dom = createDom(element);

  // 递归渲染child
  element.props.children.forEach((child) => {
    render(child, dom);
  });

  container.appendChild(dom);
}
```

![Screen Shot 2021-10-06 at 11.31.53.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38444e58ea814c7a895667ed7b8f4300~tplv-k3u1fbpfcp-watermark.image?)

![Screen Shot 2021-10-06 at 11.32.24.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8f567708ba64a6eba26cf3a9274a300~tplv-k3u1fbpfcp-watermark.image?)

https://github.com/pomber/didact/blob/v3.2-render/didact.js

## concurrent mode

以上的 render 有一个问题：如果渲染树很大，render 会占据主线程一段时间。而在此期间，动画、处理用户输入等优先级更高的操作就会被阻塞。（event loop）

我们把 render 分成一个个小的任务单元

这会用到浏览器的 api：`requestIdleCallback`,react 则是自己实现了这个方法

> **`window.requestIdleCallback()`** 方法插入一个函数，这个函数将在浏览器空闲时期被调用。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。

```
let nextUnitOfWork = null

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(nextUnitOfWork) {
  // TODO
}
```

要让这个 workloop 跑起来

我们要设置第一个`unitOfWork`

`performUnitOfWork(nextUnitOfWork) `返回下一个`unitOfWork`.

https://github.com/pomber/didact/blob/v3.3-concurrent-mode/didact.js

## fiber

为了组织`unitOfWork`, 我们需要一种数据结构：`fiber树`

![Screen Shot 2021-10-06 at 12.42.51.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b959e0ec639f4fe3832581a6d243cee2~tplv-k3u1fbpfcp-watermark.image?)

我们的 render 函数只做一件事， 设置 root fiber 为 nextUnitOfWork

```javascript
function render(element, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}
```

在我们`performUnitOfWork(nextUnitOfWork)`函数中，需要做三件事

1. 把元素添加到 dom
2. 创建这个元素的所有 children 的 fiber 结构
   - child 指向首个子 fiber
   - sibling 指向兄弟 fiber
   - parent 指向父 fiber
3. 返回下一个 fiber
   如何设置下一个 fiber 呢？这里使用的是深度优先遍历，先找 child，没有 child，找 sibling，没有 sibling， 找 parent 的 sibling ，一直到 root，此次渲染完成.

```javascript
function performUnitOfWork(fiber) {
  //1. 把元素添加到dom
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  //2. 创建这个元素的所有children的fiber结构
  //    - child 指向首个子fiber
  //    - sibling 指向兄弟fiber
  //    - parent 指向父fiber
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    // 根据是否是第一个child，设置child或者sibling
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }

  // 有child
  if (fiber.child) {
    return fiber.child;
  }

  // 没有child找sibling或者parent的sibling
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}
```

https://github.com/pomber/didact/blob/v3.4-fibers/didact.js

### Render and Commit Phases

以上实现还有一个问题： 我们是一个一个节点渲染的，每次`performUnitOfWork(nextUnitOfWork)`浏览器都会渲染一次，所以用户会看到不完整的 ui。

所以我们需要把渲染分为两个阶段： `commit`和`render`

```javascript

// 设置wipRoot, 并把nextUnitOfWork设为wipRoot
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  }
  nextUnitOfWork = wipRoot
}

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  // unitWork全部执行完后commit
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}


function commitRoot() {
  commitWork(wipRoot.child)
  wipRoot = null
}

function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  domParent.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}


function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

   //不用渲染， 交给commitRoot统一处理
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom)
  // }
 ...
```

https://github.com/pomber/didact/blob/v3.5-render-and-commit/didact.js

## Reconciliation

至此，我们已经实现了首次渲染过程。接下来，要实现的是更新

1. 在每个 fiber 节点（包括 root）新增一个 alternate 属性，存储上一个更新的 oldFiber

2. 两次更新，fiber.type 相同，就认为是同一个元素，标记为`UPDATE`。
   element 存在但 type 不同，标记为`PLACEMENT`。old filber 存在但 type 不同，标记为`DELETION`。

```javascript
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

// preformNextUnitOfWork对所有child添加fiber
function reconcileChildren(wipFiber, elements) {
  let index = 0;

  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;

  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    // compare oldFiber to element
    const sameType = oldFiber && element && element.type === oldFiber.type;
    if (sameType) {
      // update
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }
    if (element && !sameType) {
      // add this node
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }
    if (oldFiber && !sameType) {
      // TODO delete the oldFiber's node
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }
    // const newFiber = {
    //   type: element.type,
    //   props: element.props,
    //   parent: fiber,
    //   dom: null,
    // }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}
```

3. 在`commitWork`时，根据 tag 处理 dom

```javascript
function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
```

https://github.com/pomber/didact/blob/v3.6-reconciliation/didact.js

## 函数组件

函数组件有 2 个不同的地方

- 没有 dom 节点
- 函数的 children 是通过调用返回而不是`props.children`直接获取的

```javascript
updateFunctionComponent(fiber){
  const elements = [fiber.type(fiber.props)]
  reconcileChildren(fiber, elements)
}

updateHostComponent(fiber){
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  const elements = fiber.props.children
  reconcileChildren(fiber, elements)
}

function performUnitOfWork(fiber) {
  const isFunctionComponent =
    fiber.type instanceof Function
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}
```

在`commitWork`中，如果父元素没有 dom 继续往上查找

```javascript
function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  // const domParent = fiber.parent.dom
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;

  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
```

https://github.com/pomber/didact/blob/v3.7-function-components/didact.js

## Hooks

```javascript
let wipFiber = null;

// 每次调用useState 加1
let hookIndex = null;

function updateFunctionComponent(fiber) {
  wipFiber = fiber;

  // 每次更新，重置为0
  hookIndex = 0;

  // 使用hookIndex跟踪多次调用useState的结果
  wipFiber.hooks = [];

  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function useState(initial) {
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });

  // action保存在hook.queque中，然后触发更新
  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}
```

https://github.com/pomber/didact/blob/v3.8-hooks/didact.js
