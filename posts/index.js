let a = 2;
function outer() {
  let a = 1;
  return function inner() {
    console.log(a);
  };
}
debugger;
const inner = outer();
inner();
