---
title: "React设计模式：深入复合组件"
date: "2022-01-12"
---

我们来实现一个`Toggle`组件，他有 3 个子组件
<ToggleOn /> 当状态为 true 时渲染子节点
<ToggleOff /> 当状态为 false 时渲染子节点
<ToggleButton /> 渲染一个 Switch，根据状态显示不同样式，并有一个 click 回调改变状态

复合组件有一个属性传递问题， 我们不能直接给 children 添加属性.
需要使用 React.Children.map 和 React.cloneElement:

```jsx
function Foo({ children }) {
  return React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      id: `i-am-child-${index}`,
    });
  });
}

function Bar() {
  return (
    <Foo>
      <div>I will have id "i-am-child-0"</div>
      <div>I will have id "i-am-child-1"</div>
      <div>I will have id "i-am-child-2"</div>
    </Foo>
  );
}
```

现在我们来实现 Toggle

```jsx
function Toggle({ children }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { on, toggle })
  );
}

function ToggleOn({ on, children }) {
  return on ? children : null;
}

function ToggleOff({ on, children }) {
  return on ? null : children;
}

function ToggleButton({ on, toggle, ...props }) {
  return <Switch on={on} onClick={toggle} {...props} />;
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  );
}
```

```jsx
// 让组件支持原生标签
<Toggle>
  <ToggleOn>The button is on</ToggleOn>
  <ToggleOff>The button is off</ToggleOff>
  <span>Hello</span>
  <ToggleButton />
</Toggle>;

// Toggle
return React.Children.map(children, (child) => {
  // 给原生标签添加特殊属性会报错，如下处理
  return typeof child.type === "string"
    ? child
    : React.cloneElement(child, { on, toggle });
});
```

```jsx
//如果我们要支持嵌套的调用呢？
<Toggle>
  <ToggleOn>The button is on</ToggleOn>
  <ToggleOff>The button is off</ToggleOff>
  <div>
    <ToggleButton />
  </div>
</Toggle>;

// 我们可以用context解决这个问题
const ToggleContext = React.createContext();
// 让devtool显示友好
ToggleContext.displayName = "ToggleContext";

function Toggle({ children }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

function useToggle() {
  const context = React.useContext(ToggleContext);
  // 如果组件直接使用（没有Provider），抛出错误
  if (context === undefined) {
    throw new Error("useToggle must be used within a <Toggle />");
  }
  return context;
}

function ToggleOn({ children }) {
  const { on } = useToggle();
  return on ? children : null;
}

function ToggleOff({ children }) {
  const { on } = useToggle();
  return on ? null : children;
}

function ToggleButton({ ...props }) {
  const { on, toggle } = useToggle();
  return <Switch on={on} onClick={toggle} {...props} />;
}
```

## Prop Collections and Getters（属性收集和获取）

```jsx
// 如果我们的ui组件需要一些通用用例。比如给button加上aria-pressed: on属性，
// 或者一个原生button可以触发toggle
<div>
  <Switch on={on} {...togglerProps} />
  <hr />
  <button aria-label="custom-button" {...togglerProps}>
    {on ? "on" : "off"}
  </button>
</div>;

// 实现
function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);
  return {
    on,
    toggle,
    togglerProps: {
      "aria-pressed": on,
      onClick: toggle,
    },
  };
}
```

```jsx
// 这个按钮已经有了click handler，如果我们需要另外的handler呢？
// 这样写并不会奏效，后来的会覆盖前面的
<div>
  <Switch on={on} {...togglerProps} />
  <hr />
  <button
    aria-label="custom-button"
    {...togglerProps}
    onClick={() => console.info("onButtonClick")}
  >
    {on ? "on" : "off"}
  </button>
</div>

// 实现
```
