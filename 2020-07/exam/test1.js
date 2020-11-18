

while ((line = readline())) {
  var count = +line;
  line = readline();
  var arr = line.split(' ');

  console.log(calc(arr));
}
