/**
 * 递归求数组的最大值
 * @param arr array
 */
function getMaxValue(arr) {
  if (arr.length <= 1) {
    return arr[0];
  }
  const head = arr.shift();
  const maxValueInLeftArr = getMaxValue(arr);
  return head > maxValueInLeftArr ? head : maxValueInLeftArr;
}

console.log(getMaxValue([]));
console.log(getMaxValue([2]));
console.log(getMaxValue([2, 3]));
console.log(getMaxValue([2, 3, 5]));

