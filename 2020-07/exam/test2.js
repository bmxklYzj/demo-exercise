  // 1 3 5 4 1 4 2
  // 1 3 

  // max(6, 3)

  // S(n) = max(S(n-1), f(n) + S(n-2))

function calculate(arr) {
  if (arr.length <= 2) {
    const maxValue = Math.max.apply(Math, arr);
    return maxValue > 0 ? maxValue : 0;
  }

  const s = [arr[0], Math.max(arr[0], arr[1])];
  let sPrev = arr[0], sCurrent = Math.max(arr[0], arr[1]);
  for (let i = 2; i < arr.length; i++) {
    if (s[0] === arr[0] && i === arr.length - 1) {
      continue;
    }
    s[i] = Math.max(s[i - 1], arr[i] + s[i - 2]);
  }

  return Math.max.apply(Math, s);
}
function calculateMax(arr) {
  return Math.max(calculate(arr), calculate(arr.reverse()));
}

console.log(calculateMax([]));
console.log(calculateMax([2]));
console.log(calculateMax([2, 3]));
console.log(calculateMax([2, 3, 3]));
console.log(calculateMax([1, 2, 3, 1]));
console.log(calculateMax([1, 3, 5, 4, 1, 4, 2]));
console.log(calculateMax([4, 2, 3, 2, 5]));