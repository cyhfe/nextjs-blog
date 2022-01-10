function reduce(array, cb, init) {
  let acc = init;
  for (let i = 0; i < array.length; i++) {
    acc = acc !== undefined ? cb(acc, array[i]) : array[0];
  }
  return acc;
}

const arr = [3, 4, 5, 0, -1];

console.log(reduce(arr, (acc, cur) => acc + cur));
