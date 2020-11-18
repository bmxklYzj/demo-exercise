function foo(a, b) {
  const gcd = (a, b) => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const gcdNumber = gcd(a, b);
  if (gcdNumber === 1) {
    return a * b;
  }
  return (a * b) / gcdNumber;
}


while(line=readline()){
    var lines = line.split(' ');
    var a = parseInt(lines[0]);
    var b = parseInt(lines[1]);
    console.log(foo(a,b));
}