---
title: "排序算法"
date: "2022-01-10"
---

```javascript
// 冒泡排序
// 内循环： 逐个比较大小， 交换位置
// 外循环： 每次外循环都将最大的树移至末尾

function bubbleSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }
  return array;
}

function swap(array, a, b) {
  return ([array[a], array[b]] = [array[b], array[a]]);
}

function createNonSortedArray(size) {
  const array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }
  return array;
}
// let array = createNonSortedArray(5);
// console.log(array);
// array = bubbleSort(array);
// console.log(array);

// 选择排序
// 找到最小值放第一项， 依次类推
function selectionSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      swap(array, i, minIndex);
    }
  }
  return array;
}

// let array = createNonSortedArray(5);
// // console.log(array);
// array = selectionSort(array);
// // console.log(array);

// 插入排序

function insertionSort(array) {
  const { length } = array; // {1}
  let temp;
  for (let i = 1; i < length; i++) {
    let j = i; // 就是要插入的index
    temp = array[i]; // 取出的数
    while (j > 0 && array[j - 1] > temp) {
      array[j] = array[j - 1]; // {6}
      j--;
    }
    array[j] = temp; // {7}
  }
  return array;
}

// let array = createNonSortedArray(5);
// console.log(array);
// sorted = insertionSort(array);
// console.log(sorted);

// 归并排序
function mergeSort(array) {
  if (array.length > 1) {
    const middle = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, middle));
    const right = mergeSort(array.slice(middle));
    array = merge(left, right);
  }
  return array;
}

function merge(left, right) {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    const less = left[i] < right[j] ? left[i++] : right[j++];
    result.push(less);
  }
  const rest = i < left.length ? left.slice(i) : right.slice(j);
  return result.concat(rest);
}

// let array = createNonSortedArray(5);
// console.log(array);
// sorted = mergeSort(array);
// console.log(sorted);

const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function quickSort(array, left, right) {
  const len = array.length;
  let partitionIndex;

  if (left < right) {
    // partition 取一个标杆（总是最右侧的一个）， 返回新标杆（左边数都比标杆小，右边数都比标杆大）的位置
    partitionIndex = partition(array, left, right);

    //sort left and right
    quickSort(array, left, partitionIndex - 1);
    quickSort(array, partitionIndex + 1, right);
  }
  return array;
}

function partition(array, left, right) {
  let pivot = right;
  let pivotValue = array[pivot];
  let partitionIndex = left;

  for (let i = left; i < right; i++) {
    if (array[i] < pivotValue) {
      swap(array, i, partitionIndex);
      partitionIndex++;
    }
  }
  swap(array, right, partitionIndex);
  return partitionIndex;
}

function swap(array, firstIndex, secondIndex) {
  var temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
}

//Select first and last index as 2nd and 3rd parameters
quickSort(numbers, 0, numbers.length - 1);
console.log(numbers);
```
