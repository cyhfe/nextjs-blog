---
title: "Redux实现"
date: "2022-01-08"
---

## flow

![https://d33wubrfki0l68.cloudfront.net/01cc198232551a7e180f4e9e327b5ab22d9d14e7/b33f4/assets/images/reduxdataflowdiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif](https://d33wubrfki0l68.cloudfront.net/01cc198232551a7e180f4e9e327b5ab22d9d14e7/b33f4/assets/images/reduxdataflowdiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

## 精简实现

```js
function createStore(reducer, preloadState, enhancer) {
  if (typeof enhancer === "function") {
    return enhancer(createStore)(reducer, preloadState)
  }
  let currentState = preloadState
  let listeners = []

  function getState() {
    return currentState
  }

  function subscribe(listener) {
    listeners.push(listener)
    return function unsubscribe() {
      listeners.filter((l) => l !== listener)
    }
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    listeners.forEach((l) => l())
    return action
  }

  const store = {
    getState,
    subscribe,
    dispatch,
  }

  return store
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => {
    return a(b(...args))
  })
}

function applayMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadState) => {
    const store = createStore(reducer, preloadState)

    // middleware函数不能调用dispatch
    let dispatch = () => {
      throw new Error(
        "Dispatching while constructing your middleware is not allowed. " +
          "Other middleware would not be applied to this dispatch."
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    }
    const chain = middlewares.map((middleware) => middleware(middlewareAPI))
    // 当调用dispatch时，调用所有中间间
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch,
    }
  }
}

function logger({ getState }) {
  // dispatch({ type: "add" })
  // 不能在这里调dispatch

  // (store.dispatch)
  return (next) => (action) => {
    console.log("will dispatch", action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log("state after dispatch", getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

const asyncFunctionMiddleware = (storeAPI) => (next) => (action) => {
  // If the "action" is actually a function instead...
  if (typeof action === "function") {
    // then call the function and pass `dispatch` and `getState` as arguments
    return action(storeAPI.dispatch, storeAPI.getState)
  }

  // Otherwise, it's a normal action - send it onwards
  return next(action)
}

function reducer(state = 0, action) {
  switch (action.type) {
    case "add": {
      return ++state
    }
    default: {
      return state
    }
  }
}

const store = createStore(
  reducer,
  0,
  applayMiddleware(asyncFunctionMiddleware, logger)
)

store.subscribe(() => {
  console.log(store.getState())
})

// store.dispatch({ type: "add" })

function asyncDispatch(dispatch) {
  setTimeout(() => {
    dispatch({ type: "add" })
  }, 3000)
}

store.dispatch(asyncDispatch)

// function foo() {
//   console.log("foo")
// }

// function bar() {
//   console.log("bar")
// }

// function baz() {
//   console.log("baz")
//   console.log(arguments)
// }

// let r = compose(foo, bar, baz)

// r()

// const compose =
//   (...funcs) =>
//   (x) =>
//     functions.reduceRight((acc, fn) => fn(acc), x);
// const user = { name: "Gianmarco", password: 1234 }
// const getUserName = (user) => {
//   console.log("name")
//   return user.name
// }
// const upperCase = (string) => {
//   console.log("up")
//   return string.toUpperCase()
// }
// const firstFour = (string) => string.substring(0, 4)
// let r = compose(firstFour, upperCase, getUserName)(user)
// console.log(r)
```
