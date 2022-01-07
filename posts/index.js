function foo() {
  function bar() {
    console.log(this);
  }
  bar();
}

foo();
