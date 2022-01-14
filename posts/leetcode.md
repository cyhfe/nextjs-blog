---
title: "LeetCode"
date: "2022-01-11"
---

## 2022/1/10

1. 两数之和

```typescript
// O(n^2)
function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}

// O(n)
function twoSum(nums: number[], target: number): number[] {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      return [map.get(nums[i]), i]
    }
    map.set(target - nums[i], i)
  }
}
```

2. 两数相加

```typescript
// 两数相加
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let List = new ListNode()
  let head = List
  let sum = 0
  let carry = 0
  while (l1 || l2 || sum > 0) {
    if (l1 !== null) {
      sum = sum + l1.val
      l1 = l1.next
    }

    if (l2 !== null) {
      sum = sum + l2.val
      l2 = l2.next
    }

    if (sum > 9) {
      sum = sum % 10
      carry = 1
    }

    head.next = new ListNode(sum)
    head = head.next
    sum = carry
    carry = 0
  }
  return List.next
}
```

## 2022/1/12

3. 无重复字符的最长子串

```typescript
function lengthOfLongestSubstring(s: string): number {
  let maxLen = 0
  // 迭代每一项
  for (let i = 0; i < s.length; i++) {
    let noRepeat = s[i]
    for (let j = i + 1; j < s.length; j++) {
      // 不重复就累加
      if (noRepeat.indexOf(s[j]) < 0) {
        noRepeat += s[j]
      } else {
        break
      }
    }
    // 比较每一项的无重复长度， 保存最大值
    maxLen = Math.max(maxLen, noRepeat.length)
  }
  return maxLen
}
```

4. 寻找 2 个正序数组的中位数

```js
//参考归并排序

var findMedianSortedArrays = function (nums1, nums2) {
  let i = 0
  let j = 0
  let result = []
  while (i < nums1.length && j < nums2.length) {
    const less = nums1[i] < nums2[j] ? nums1[i++] : nums2[j++]
    result.push(less)
  }
  const rest = i < nums1.length ? nums1.slice(i) : nums2.slice(j)
  result = result.concat(rest)
  const middle =
    result.length % 2 === 0
      ? [result.length / 2 - 1, result.length / 2]
      : Math.floor(result.length / 2)
  if (Array.isArray(middle)) {
    return (result[middle[0]] + result[middle[1]]) / 2
  } else {
    return result[middle]
  }
}
```
