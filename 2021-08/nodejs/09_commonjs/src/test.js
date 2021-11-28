var module = {
  exports: {},
};

exports = module.exports;

exports.add = (a, b) => a + b;
module.exports.minus = (a, b) => a - b;

console.log(module.exports, exports);

exports = {
  key1: 1,
};
console.log(module.exports, exports);
