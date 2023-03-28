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