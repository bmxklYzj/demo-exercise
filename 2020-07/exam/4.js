const calc = (arr) => {
  var negCount = 0;
  var noneNegSum = 0;
  arr.forEach((item) => {
      item = +/[-\d]+$/.exec(item)[0];
    if (item < 0) {
      negCount++;
    } else {
      noneNegSum += item;
    }
  });
  return {
    negCount,
    noneNegAvarge:
      !(arr.length - negCount)
        ? Number(0).toFixed(1)
        : (noneNegSum / (arr.length - negCount)).toFixed(1),
  };
};

while ((line = readline())) {
  var arr = line.split(' ');
  var res = calc(arr);
  console.log(res.negCount, '\n', res.noneNegAvarge);
}

