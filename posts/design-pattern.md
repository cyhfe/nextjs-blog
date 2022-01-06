---
title: "设计模式"
date: "2022-01-06"
---

# 设计模式

## Singleton Pattern

整个应用共享一个全局实例

```javascript
let instance
let counter = 0

class Counter {
  constructor(){
    if(instance) {
      throw new Error('只能实例化一次')
    }
    instance = this
  }

  getInstance() {
    return this
  }

  getCount() {
    return counter
  }

  increment() {
    return ++counter
  }

  decrement() {
    return --counter
  }
}

const singletonCounter = Object.freeze(new Counter())

// React中的状态管理
// 在 React 中，我们经常通过Redux或React Context等状态管理工具来依赖全局状态，而不是使用 Singleton。尽管它们的全局状态行为可能看起来类似于 Singleton 的行为，但这些工具提供只读状态而不是Singleton的可变状态。

```

## Proxy pattern
```javascript
const person = {
  name: "john",
  age: 18
}

const personProxy = new Proxy(person, {
    get: (obj, prop) => {
        console.log(`the value of ${prop} is ${Reflect.get(obj, prop)}`)
    },
    set: (obj, prop, value) => {
        console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
        return Reflect.set(obj, prop, value)
    }
})

personProxy.name; // the value of name is john
personProxy.age = 43; // Changed age from 18 to 43
personProxy.name = "Jane Doe"; // Changed name from john to Jane Doe

// 代理可以在对象上多了一层控制。
// 可以校验、格式化、通知、debugging等

```

## Provider Pattern
```javascript
import React, { useState, createContext, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import moment from "moment";

import "./styles.css";

const CountContext = createContext(null);

function useCountContext() {
  const context = useContext(CountContext);
  if (!context)
    throw new Error(
      "useCountContext has to be used within CountContextProvider"
    );
  return context;
}

function CountContextProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

function Reset() {
  const { setCount } = useCountContext();

  return (
    <div className="app-col">
      <button onClick={() => setCount(0)}>Reset count</button>
      <div>Last reset: {moment().format("h:mm:ss a")}</div>
    </div>
  );
}

function Button() {
  const { count, setCount } = useCountContext();

  return (
    <div className="app-col">
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <div>Current count: {count}</div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <CountContextProvider>
        <Button />
        <Reset />
      </CountContextProvider>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
// Provider模式提供了一个很好的状态管理方式。
// 但是要小心副作用。
// 每当context变化，所有consumer组件都会重新渲染。
// 可以把context分割成多个部分，只在需要的地方使用。
```

## Prototype Pattern
```javascript
class Dog {
  constructor(name){
    this.name = name
  }
  bark(){
    console.log('woof!')
  }
}

class SuperDog extends Dog {
  constructor(name){
    super(name)
  }

  fly(){
    console.log('flying')
  }
}

const dog1 = new SuperDog("Daisy");
dog1.bark();
dog1.fly();

```

![原型链](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1609056523/patterns.dev/Screen_Shot_2020-12-24_at_1.09.36_PM_isgkmt.png)

Object.create()
以一个对象为原型创建一个新对象

## Container/Presentational Pattern

react类组件经常用到这个方法，把组件分成容器组件和展示组件，逻辑在容器组件中，展示组件渲染ui。实现关注点分离。

在hooks中，可以使用自定义hook，更简洁的实现逻辑分离复用

```javascript
import React from "react";
import useDogImages from "./useDogImages";

export default function DogImages() {
  const dogs = useDogImages();

  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}

export default function useDogImages() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    async function fetchDogs() {
      const res = await fetch(
        "https://dog.ceo/api/breed/labrador/images/random/6"
      );
      const { message } = await res.json();
      setDogs(message);
    }

    fetchDogs();
  }, []);

  return dogs;
}
```

## Observer Pattern

目标收集事件，通知所有的观察者

```javascript
class Observable {
  constructor(){
    this.observers = []
  }
  
  subscribe(fn){
    this.observers.push(fn)
  }

  unsubscribe(fn){
    this.observers.filter(f => f!== fn)
  }

  notify(data) {
    this.observers.forEach(fn => fn(data))
  }
}
```

## PubSub Pattern

发布订阅
```javascript
class Pubsub {
  constructor() {
    this.eventBus = {};
  }

  subscribe(event, fn) {
    if (!this.eventBus[event]) {
      this.eventBus[event] = [];
    }
    this.eventBus[event].push(fn);
  }

  unsubscribe(event, fn) {
    if (this.eventBus[event]) return false;
    this.eventBus[event].filter((f) => f !== fn);
  }

  publish(event, data) {
    if (!this.eventBus[event]) return false;
    this.eventBus[event].forEach((fn) => fn(data));
  }
}

const pubsub = new Pubsub();

const eat = function () {
  console.log("I am eating");
};

const drink = function () {
  console.log("I am drinking");
};
const running = function () {
  console.log("I am running");
};

pubsub.subscribe("dinner", eat);
pubsub.subscribe("dinner", drink);
pubsub.subscribe("sports", running);

pubsub.publish("dinner");
// should log
// I am drinking
// I am eating

pubsub.publish("sports");
// should log
// I am running

```

## Mediator/Middleware Pattern
通过媒介对象通信
```javascript
class ChatRoom {
  logMessage(user, message) {
    const sender = user.getName();
    console.log(`${new Date().toLocaleString()} [${sender}]: ${message}`);
  }
}

class User {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  getName() {
    return this.name;
  }

  send(message) {
    this.chatroom.logMessage(this, message);
  }
}

const chatroom = new ChatRoom();

const user1 = new User("John Doe", chatroom);
const user2 = new User("Jane Doe", chatroom);

user1.send("Hi there!");
user2.send("Hey!");

```
