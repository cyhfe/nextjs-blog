---
title: "React-Router"
date: "2022-01-21"
---

## 路由

多页应用的请求流程：

在浏览器输入 url 地址

发送请求到服务器请求资源

通过页面上的 a 链接，再发送请求获取新的页面和资源

单页应用的请求流程：

请求对应服务器，不管 pathname 是什么，固定返回 app 的页面和资源，由前端管理页面和历史栈

## 前端路由

```jsx
<a
  href="/contact"
  onClick={(event) => {
    // stop the browser from changing the URL and requesting the new document
    event.preventDefault()
    // push an entry into the browser history stack and change the URL
    window.history.pushState({}, undefined, "/contact")
  }}
/>
```

这只会改变 url，我们需要页面与 url 对应。所以我们需要订阅 url 的变化，渲染对应的 ui。

```js
window.addEventListener("popstate", () => {
  // URL changed!
})

// 需要注意的是调用history.pushState()或history.replaceState()不会触发popstate事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在Javascript代码中调用history.back()或者history.forward()方法）
```

但是浏览器并没有给我们完全监听路由变化的能力。

ReactRouter 引入 history 库，提供了监听路由变化的能力

```js
let history = createBrowserHistory()
history.listen((location, action) => {
  // this is called whenever new locations come in
  // the action is POP, PUSH, or REPLACE
})
```

## location

浏览器提供的 location 对象。包含当前路由信息，并且可以操作它。

```js
window.location.pathname // /getting-started/concepts/

window.location.hash // #location

window.location.reload() // force a refresh the server
```

ReactRouter 提供的 location 对象

```js
{
  pathname: "/bbq/pig-pickins",
  search: "?campaign=instagram",
  hash: "#menu",

  state: null,
  key: "aefz24ie"
}

// given a location like this:
let location = {
  pathname: "/bbq/pig-pickins",
  search: "?campaign=instagram&popular=true",
  hash: "",
  state: null,
  key: "aefz24ie"
};

// we can turn the location.search into URLSearchParams
let params = new URLSearchParams(location.search);
params.get("campaign"); // "instagram"
params.get("popular"); // "true"
params.toString(); // "campaign=instagram&popular=true",
```

## location state

```js
window.history.pushState("look ma!", undefined, "/contact")
window.history.state // "look ma!"
// user clicks back
window.history.state // undefined
// user clicks forward
window.history.state // "look ma!"
```

ReactRouter 把 state 放在 location 中而不是 history

用途：

- 告诉下一页用户来自哪里

- 将列表中的部分记录发送到下一个屏幕，以便它可以立即渲染部分数据，然后再获取其余数据。

```jsx
;<Link to="/pins/123" state={{ fromDashboard: true }} />

let navigate = useNavigate()
navigate("/users/123", { state: partialUser })

let location = useLocation()
location.state
```
