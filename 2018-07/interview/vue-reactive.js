var obj = {};
Object.defineProperty(obj, 'a', {
    get: function (val) {
        console.log('getter', val);
        // TODO: fix 这里还有问题，会循环读取，爆栈了
        return this.a;
    },
    set: function (val, oldVal) {
        console.log('setter', val, oldVal);
        return val;
    }
});

obj.a = 1;
obj.a
obj.b = 2;
obj.a = 2;
obj.a


arr = [1, 2, 3, 4, 5];
arr.reduce((accumulator, item, index, arr) => {
    return accumulator + item;
}, 4) // 19