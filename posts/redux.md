---
title: "Redux简单实现"
date: "2022-01-08"
---

## flow

![https://d33wubrfki0l68.cloudfront.net/01cc198232551a7e180f4e9e327b5ab22d9d14e7/b33f4/assets/images/reduxdataflowdiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif](https://d33wubrfki0l68.cloudfront.net/01cc198232551a7e180f4e9e327b5ab22d9d14e7/b33f4/assets/images/reduxdataflowdiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

## 简单实现

```javascript
function createStore(recuder, preloadState){
  let currentState = preloadedState
  let listeners: []

  return {
      getState(){
          return currentState
      }
      dispatch(action){
          currentState = reducer(currentState, action)
          // 每次状态更新， 通知subscribers(观察者模式)
          listeners.forEach(fn => fn())
      }
      subscribe(newListener){
          listeners.push(newListener);
          const unsubscribe = () => {
            listeners = listeners.filter((l) => l !== newListener);
          };

          return unsubscribe;
      }
  }
}

```

```javascript
// 中间件
const asyncFunctionMiddleware = (storeAPI) => (next) => (action) => {
  // If the "action" is actually a function instead...
  if (typeof action === "function") {
    // then call the function and pass `dispatch` and `getState` as arguments
    return action(storeAPI.dispatch, storeAPI.getState);
  }

  // Otherwise, it's a normal action - send it onwards
  return next(action);
};
```

```javascript
// async
const fetchSomeData = (dispatch, getState) => {
  // Make an async HTTP request
  client.get("todos").then((todos) => {
    // Dispatch an action with the todos we received
    dispatch({ type: "todos/todosLoaded", payload: todos });
    // Check the updated store state after dispatching
    const allTodos = getState().todos;
    console.log("Number of todos after loading: ", allTodos.length);
  });
};

// Pass the _function_ we wrote to `dispatch`
store.dispatch(fetchSomeData);
```
