const calc = (arr) => {
  var res = [];
  arr.forEach((item) => {
    while (item.length > 8) {
      res.push(item.slice(0, 8));
      item = item.slice(8);
    }
    if (item) {
      res.push(item.concat('0'.repeat(8 - item.length)));
    }
  });
  return res.join('\n');
};

while ((line = readline())) {
  var count = +line;
  var arr = [];
  while (count--) {
    line = readline();
    arr.push(line);
  }
  var res = calc(arr);
  console.log(res);
}
