/**
 * @param {string} num
 * @return {string}
 */
var largestGoodInteger = function(num) {
  const res = [];
  
  for (let i = 2; i < num.length; i++) {
    const item = num[i];
    if (num[i] === num[i - 1] && num[i] === num[i - 2]) {
      res.push(num[i] + num[i - 1] + num[i - 2])
    }
  }
  const arr = res.sort();
  return arr[arr.length - 1] || '';
  
};

console.log(largestGoodInteger("6777133339"));
console.log(largestGoodInteger("2300019"));
console.log(largestGoodInteger("42352338"));