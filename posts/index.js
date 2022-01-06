const { set } = require("date-fns")

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

personProxy.name;
personProxy.age = 43;
personProxy.name = "Jane Doe";