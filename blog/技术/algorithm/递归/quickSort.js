/**
 * 快速排序
 * @param arr Array
 */
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const mid = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= mid) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), mid, ...quickSort(right)];
}

console.log(quickSort([]));
console.log(quickSort([2]));
console.log(quickSort([2, 3]));
console.log(quickSort([3, 2]));
console.log(quickSort([2, 3, 5]));
console.log(quickSort([5, 2, 3]));
