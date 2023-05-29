const arr = [9, 4, 1, 6, 8, 2, 7, 5, 5, 6, 3, 9]
// 冒泡排序：双层循环比较排序，内循环每一次循环比较相邻值，进行换位
function bubbleSort (arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    let flag = false
    for (let j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        flag = true
      }
    }
    if (!flag) return
  }
}
bubbleSort(arr)

// 选择排序：双层循环比较排序，外循环每一次循环指定最小值的下标，内循环的每一次循环比较最小值的下标进行换位
function selectSort (arr) {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j
    }
    if (minIndex !== i) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
}
selectSort(arr)

// 插入排序，双层循环，如果外层循环判断出需要换位，那么就需要在内层循环将换位后之前的数据都比较一边
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    let target = arr[j];
    while (j > 0 && arr[j - 1] > target) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = target;
  }
}
insertSort(arr)

// 快排，核心是递归，指定一个值通过递归分组，直到最后分出长度为1然后返回
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const cur = arr[arr.length - 1];
  const left = arr.filter((v, i) => v <= cur && i !== arr.length - 1);
  const right = arr.filter((v) => v > cur);
  return [...quickSort(left), cur, ...quickSort(right)];
}
quickSort([3, 6, 2, 4, 1])

// 归并
function merge(left, right) {
  let res = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      res.push(left[i]);
      i++;
    } else {
      res.push(right[j]);
      j++;
    }
  }
  if (i < left.length) {
    res.push(...left.slice(i));
  } else {
    res.push(...right.slice(j));
  }
  return res;
}

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);

  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
mergeSort(arr)