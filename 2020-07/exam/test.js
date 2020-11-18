const calc = (arr) => {
  var maxRes = new Array(arr.length).fill(1);
  for (var i = 1; i < arr.length; i++) {
    var j = i;
    while (--j) {
      if (arr[i] > arr[j]) {
        maxRes[i] = Math.max(maxRes[i], maxRes[j] + 1);
          console.log(maxRes)
      }
    }
  }
  return Math.max.apply(Math, maxRes);
};

console.log(calc([2, 5, 1, 5, 4, 5]));
