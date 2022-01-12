---
title: "React设计模式： context"
date: "2022-01-12"
---

context 模式： 封装复杂的状态变化到一个工具函数，

```javascript
// src/context/counter.js
const CounterContext = React.createContext();

function CounterProvider({ step = 1, initialCount = 0, ...props }) {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      const change = action.step ?? step;
      switch (action.type) {
        case "increment": {
          return { ...state, count: state.count + change };
        }
        case "decrement": {
          return { ...state, count: state.count - change };
        }
        default: {
          throw new Error(`Unhandled action type: ${action.type}`);
        }
      }
    },
    { count: initialCount }
  );

  const value = [state, dispatch];
  return <CounterContext.Provider value={value} {...props} />;
}

function useCounter() {
  const context = React.useContext(CounterContext);
  if (context === undefined) {
    throw new Error(`useCounter must be used within a CounterProvider`);
  }
  return context;
}

export { CounterProvider, useCounter };
```

```javascript
// src/screens/counter.js
import { useCounter } from "context/counter";

function Counter() {
  const [state, dispatch] = useCounter();
  const increment = () => dispatch({ type: "increment" });
  const decrement = () => dispatch({ type: "decrement" });
  return (
    <div>
      <div>Current Count: {state.count}</div>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

```javascript
// src/index.js
import { CounterProvider } from "context/counter";

function App() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
}
```
