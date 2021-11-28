console.log('hello lib.js');

exports.add = (a, b) => {
  return a + b;
};

exports.geek = { name: 'geek' };

module.exports = minus = (a, b) => {
  return a - b;
};

setTimeout(() => {
  console.log(exports);
}, 2000);

setTimeout(() => {
  console.log(module.exports);
}, 2000);