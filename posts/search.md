---
title: "搜索算法"
date: "2022-01-14"
---

## 顺序搜索

```js
function sequentialSearch(array, target) {
  const DO_NOT_EXIST = -1
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i
    }
  }
  return DO_NOT_EXIST
}
```

## 二分搜索

前提： 数组已排序

```js
function binarySearch(nums, target) {
  let start = 0
  let end = nums.length - 1

  while (start <= end) {
    let middle = Math.floor((end + 1 - start) / 2) + start
    if (nums[middle] === target) return middle
    if (target > nums[middle]) {
      start = middle + 1
    } else {
      end = middle - 1
    }
  }
  return -1
}
```

## 用分治的思想实现二分搜索

```js
function binarySearch(nums, target) {
  let start = 0
  let end = nums.length - 1

  return search(nums, start, end, target)
}

function search(nums, start, end, target) {
  if (start <= end) {
    let middle = Math.floor((end + 1 - start) / 2) + start
    if (nums[middle] === target) return middle
    if (target > nums[middle]) {
      start = middle + 1
      return search(nums, start, end, target)
    } else {
      end = middle - 1
      return search(nums, start, end, target)
    }
  } else {
    return -1
  }
}
```

## BFS V DFS

BFS(内存大) DFS(时间长)

具体实现在数据结构那篇博客
