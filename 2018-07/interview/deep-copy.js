var o1 = {
    a: 1,
    b: [{b1: 1, b2: 2}, 1, 2],
    c: {
        c1: 1,
        c2: 2
    },
    d: function() {
        console.log("Hello, world!");
    },
    e: [1, 2, 3]
};

function deepCopy(source) {
    var obj = Object.prototype.toString.call(source).slice(8, -1) === 'Array' ? [] : {};
    for (var key in source) {
        if (typeof source[key] !== 'object'
            && source.hasOwnProperty(key)) {
            obj[key] = source[key];
        }
        else if (Object.prototype.toString.call(source[key]).slice(8, -1) === 'Array') {
            obj[key] = deepCopy(source[key]);
        }
        else {
            obj[key] = deepCopy(source[key]);
        }
    }
    return obj;
}

var r = deepCopy(o1);


JSON.parse(JSON.stringify());