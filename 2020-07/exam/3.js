
  const calc = (line) => {
  
    return line.split(' ').reverse().map(item => item.split('').reverse().join('')).join(' ');
  }
while(line=readline()){
  
  console.log(calc(line));
}