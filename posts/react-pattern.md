---
title: "React设计模式"
date: "2022-01-08"
---

[advanced-react-patterns](https://github.com/kentcdodds/advanced-react-patterns)

## 反转控制

当你想写一个可复用的代码时，你可能会把所有功能封装，通过参数去配置。

这时来了个新需求，你把功能加上。再加参数去配置新功能。

重复这个步骤，会使代码的维护成为噩梦。

1. 包大小/性能
2. 过度维护
3. 实现逻辑复杂
4. api 繁琐

什么是反转控制： 让你的抽象做更少的事情，让你的用户去做

这里举个例子

```javascript
// 第一个需求： 过滤 undefined 和 null
function filter(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element !== null && element !== undefined) {
      newArray.push(element);
    }
  }
  return newArray;
}

// 第二个需求： 我希望filter能通过配置过滤

function filter(
  array,
  {
    filterNull = true,
    filterUndefined = true,
    filterZero = false,
    filterEmptyString = false,
  } = {}
) {
  let newArray = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (
      (filterNull && element === null) ||
      (filterUndefined && element === undefined) ||
      (filterZero && element === 0) ||
      (filterEmptyString && element === "")
    ) {
      continue;
    }

    newArray[newArray.length] = element;
  }
  return newArray;
}

// 用控制反转重构。filter只负责过滤， 将具体的事情交给使用者去做
function filter(array, filterFn) {
  let newArray = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (filterFn(element)) {
      newArray[newArray.length] = element;
    }
  }
  return newArray;
}

// 你可能会说，这样我用起来更复杂了呀

// before
filter([0, 1, undefined, 2, null, 3, "four", ""]);

// after
filter(
  [0, 1, undefined, 2, null, 3, "four", ""],
  (el) => el !== null && el !== undefined
);

// 是的，配置型的更容易使用。我们可以再封装一层，实现之前的用法
function filterWithOptions(
  array,
  {
    filterNull = true,
    filterUndefined = true,
    filterZero = false,
    filterEmptyString = false,
  } = {}
) {
  return filter(
    array,
    (element) =>
      !(
        (filterNull && element === null) ||
        (filterUndefined && element === undefined) ||
        (filterZero && element === 0) ||
        (filterEmptyString && element === "")
      )
  );
}
```

## 复合组件

在 React 中，复合组件就是反转控制的一种形式。

现在有一个需求： 一个 Menu 组件，该组件有一个按钮用来显示隐藏，还有一个列表链接。

```jsx
// 单组件
function App() {
  return (
    <Menu
      buttonContents={
        <>
          Actions <span aria-hidden>▾</span>
        </>
      }
      items={[
        { contents: "Download", onSelect: () => alert("Download") },
        { contents: "Create a Copy", onSelect: () => alert("Create a Copy") },
        { contents: "Delete", onSelect: () => alert("Delete") },
      ]}
    />
  );
}
```

```jsx
// 复合组件
function App() {
  return (
    <Menu>
      <MenuButton>
        Actions <span aria-hidden>▾</span>
      </MenuButton>
      <MenuList>
        <MenuItem onSelect={() => alert("Download")}>Download</MenuItem>
        <MenuItem onSelect={() => alert("Copy")}>Create a Copy</MenuItem>
        <MenuItem onSelect={() => alert("Delete")}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
```

这里要注意的关键是组件的用户看不到任何状态。状态在这些组件之间隐式共享。这是复合组件模式的主要价值。通过使用该功能，我们为组件的用户提供了一些渲染控制，现在在其中添加额外的内容非常简单和直观。无需查找 API 文档，也无需添加额外的功能、代码或测试。
