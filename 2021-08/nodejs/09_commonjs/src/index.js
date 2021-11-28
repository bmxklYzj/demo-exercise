console.log('start lib');
var lib = require('./lib');
console.log(lib);
console.log('end lib');

lib.additional = "test";

// npx webpack --mode development --devtool inline-source-map