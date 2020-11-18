function deepCopy(val) {
  if (typeof val !== 'object') {
    return val;
  }

  let res = Array.isArray(val) ? [] : {};
  for (let key in val) {
    res[key] = deepCopy(val[key]);
  }
  return res;
}

let val1 = 5;
let val2 = deepCopy(val1);
console.log(val2);

let val3 = {key1: 5};
let val4 = deepCopy(val3);
console.log(val4, val3 === val4);