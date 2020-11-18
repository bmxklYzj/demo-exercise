const calc = (arr) => {
  var maxRes = new Array(arr.length).fill(1);
  for (var i = 1; i < arr.length; i++) {
    var j = i;
    while (--j) {
      if (arr[i] > arr[j]) {
        maxRes[i] = Math.max(maxRes[i], maxRes[j] + 1);
      }
    }
  }
  return Math.max.apply(Math, maxRes);
};

while ((line = readline())) {
  var count = +line;
  line = readline();
  var arr = line.split(' ');

  console.log(calc(arr));
}
