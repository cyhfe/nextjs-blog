---
title: "在 React 中使用 emotion 组织清晰的 css 代码"
date: "2021-10-01"
---

# 在 React 中使用 emotion 组织清晰的 css 代码

在 React 编写 css 一直是让我头疼的一件事.我尝试过以下几种方式。

- scss
  全局样式，依靠命名避免样式冲突。学习成本低，写起来也比较爽，但是如何组织类名是比较麻烦的。bootstrap 的 scss 我觉得是最好的学习资源

- css module
  编写普通 css 文件，通过类名在 react 中使用。不是很直观，写起来很繁琐。

- styled-component
  看过的课程中使用最多的 css-in-js 解决方案，功能强大。但是有一个问题，我会经常需要写`Wrap`, `Container`之类的无意义的组件。

- emotion
  可以像 style-component 那样组织代码，我最中意的点是可以像写 inline css 那样写 css， 不用考虑命名，babel 会生成 className。还可以使用 CSSObject 写样式，更方便我们通过 js 来组织样式。

最近在学习写[React 组件库](https://github.com/cyhfe/react-ui)，emotion 很适合组件场景使用，并且我有意深入学习使用它。在[epic-react](https://epicreact.dev/)中 kent 也是使用 emotion， 并且偏好 CSSObject 的方式。我这里也主要参考了他组织 css 代码的方式。

在 React 中， 通过 props 切换不同样式是很常见的场景。这里拿 button 组件举例:

```ts
import styled, { CSSObject } from "@emotion/styled";
import * as colors from "../styles/colors"; //定义一个通用的色板 例：export const blue = '#0d6efd';
import { DISABLED_OPACITY } from "../styles";
import { ButtonProps } from "./Button";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "danger";
  isFullWidth?: boolean;
}

// 这里定义button基础的样式
const base: CSSObject = {
  cursor: "pointer",
  display: "inline-block",
  fontWeight: "normal",
  textAlign: "center",
  verticalAlign: "middle",
  userSelect: "none",
  border: "1px solid transparent",
  padding: ".4rem .75rem",
  fontSize: "1rem",
  lineHeight: 1.5,
  borderRadius: "4px",
  transition: "all .15s ease-in-out",
  "&:focus": {
    outline: "0",
  },
  "&:disabled": {
    cursor: "inherit",
    opacity: DISABLED_OPACITY,
  },
};

// 我们可以根据不同的props值对应一个CSSObject样式
type EnumStyles = Record<string, CSSObject>;

const buttonVariant: EnumStyles = {
  primary: {
    color: colors.white,
    backgroundColor: colors.primary,
  },
  secondary: {
    color: colors.white,
    backgroundColor: colors.secondary,
  },
  danger: {
    color: colors.white,
    backgroundColor: colors.danger,
  },
};

const buttonSize: EnumStyles = {
  small: {
    fontSize: ".75rem",
    padding: ".2rem .75rem",
  },
  medium: {
    fontSize: "1rem",
    padding: ".4rem 1rem",
  },
  large: {
    fontSize: "1.25rem",
    padding: ".6rem 1.25rem",
  },
};

// 函数接受props， 根据props的值返回不同的CSSObject
const color = ({ variant = "primary" }: ButtonProps) => buttonVariant[variant];

const size = ({ size = "medium" }: ButtonProps) => buttonSize[size];

const fullWidth = ({ isFullWidth = false }: ButtonProps) =>
  isFullWidth
    ? {
        display: "block",
        width: "100%",
      }
    : null;

// emotion可以接受数组， 对象， 函数。
export const StyledButton = styled.button<ButtonProps>(
  base,
  color,
  size,
  fullWidth
);
```

在参考了多篇博客和大佬的编码习惯，总结了下我觉得最清晰且易于维护的 css 方案。

我的 emotion 和 ts 属于刚上车的水平，边看文档边实践，如有错误欢迎指正。

关于 ts，目前来看，可以说是大大降低了我的开发体验。有时候报错无从下手，解决一个问题花老半天，很打击信心，嵌套范型看得头皮发麻。但是还是得继续用吧，说不定过了这段阵痛期后就能愉悦地享受 type-safe 了。

想找一份 react+ts 的工作！
写博客会有帮助吗？
这是我的[毛坯房](https://chenyuhao.vercel.app/)
