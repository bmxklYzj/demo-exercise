/**
 * 递归求列表中元素个数
 * @param arr Array
 */
function count(arr) {
  if (arr[0] === undefined) {
    return 0;
  }
  arr.shift();
  return 1 + count(arr);
}

console.log(count([]));
console.log(count([, 1]));
console.log(count([2]));
console.log(count([2, 3]));
console.log(count([2, 3, 5]));
