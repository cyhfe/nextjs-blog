---
title: '算法复杂度'
date: '2022-01-04'
---

## big O（时间复杂度）

如何评价代码的效率？

```javascript
const large = new Array(100000).fill('nemo');

function findNemo(array) {
  const t1 = process.uptime();
  for (let i = 0; i < array.length; i++) {
    if (array[i] === 'nemo') {
      console.log('found nemo');
    }
  }
  const t2 = process.uptime();
  console.log('call to find nemo took ' + (t2 - t1) + ' ms');
}

findNemo(large);
```

执行以上代码，每次耗费的时间都不同，不同机器上的执行时间差异更大。我们不能通过执行时间来判断代码的效率。big O（时间复杂度）就是用来评估代码的效率。

图示：https://www.bigocheatsheet.com/

## 如何计算 big O

回到上面 findNemo 函数， 假设输入 n 个元素， 函数就要执行 n 次， big O 为 O(n)

![liner-time](/images/bigO/liner-time.png)

```javascript
function findFirstBox(boxes) {
  console.log(boxes[0]);
}

//  输入n个元素， 函数永远只执行一次， big O 为 O(1)
```

```javascript
function findFirstTwoBox(boxes) {
  console.log(boxes[0]);
  console.log(boxes[1]);
}
// 每次输入都会执行两次，但是永远是个常量。big O 还是 O(1)
```

```javascript
function logAllPairsOfArray(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      console.log(array[i], array[j]);
    }
  }
}

// 嵌套循环相乘， 复杂度为O(n^2)
```

复杂度只取影响最大的那一部分
比如`O(n^2 + 3n + 100 + n/2)`,可以简化为`O(n^2)`

![rule](/images/bigO/rule.png)

## 练习

```javascript
// 给定2个数组，判断是否有相同元素

// O(a * b)
function hasCommonItem(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) return true;
    }
  }
  return false;
}

// O(a + b)
function hasCommonItem2(array1, array2) {
  const map = {};
  for (let i = 0; i < array1.length; i++) {
    map[array1[i]] = true;
  }
  for (let i = 0; i < array2.length; i++) {
    if (map[array2[i]]) return true;
  }
  return false;
}

// more readable
function hasCommonItem3(array1, array2) {
  return array1.some((val) => array2.includes(val));
}
```

```javascript
// 判断数组两项和

// Naive
function hasPairWithSum(arr, sum) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = i + 1; j < len; j++) {
      if (arr[i] + arr[j] === sum) return true;
    }
  }

  return false;
}

// Better
function hasPairWithSum2(arr, sum) {
  const mySet = new Set();
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (mySet.has(arr[i])) {
      return true;
    }
    mySet.add(sum - arr[i]);
  }
  return false;
}

hasPairWithSum2([6, 4, 3, 2, 1, 7], 9);
```
