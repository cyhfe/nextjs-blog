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
