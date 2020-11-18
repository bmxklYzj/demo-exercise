const calc = (doubleNumber) => {
  var low = 0.01;
  var high = doubleNumber;
  
  var mid = (low + high) / 2;
  var midRes = mid * mid * mid;
  while(Math.abs(midRes - doubleNumber) > 0.1) {
    if (midRes > doubleNumber) {
      high = mid;
    } else {
      low = mid;
    }
    mid = (low + high) / 2;
    midRes = mid * mid * mid;
  }
  return mid.toFixed(1);
}

while(line=readline()){
  var lines = line.split(' ');
  var doubleNumber = +lines;
  
  console.log(calc(doubleNumber));
}