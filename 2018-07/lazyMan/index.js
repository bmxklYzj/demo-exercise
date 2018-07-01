/**
 * @file 面试题： LazyMan
 *
 * @author yangzongjun
 * @date 2018-07-01
 */

function _LazyMan(name) {
    this.name = name;
    this.task = [];
    var self = this;
    var fn = function () {
        console.log('Hi! This is %s!', self.name);
        self.next();
    };
    this.task.push(fn);

    setTimeout(function () {
        self.next();
    }, 0);

    return this;
}

_LazyMan.prototype.next = function () {
    var fn = this.task.shift();
    // console.log(1, fn);
    fn && fn();
};

_LazyMan.prototype.eat = function (type) {
    var self = this;
    var fn = function () {
        console.log('Eat %s~', type);
        self.next();
    };
    this.task.push(fn);
    return this;
};

_LazyMan.prototype.sleep = function (time) {
    var self = this;
    var fn = function () {
        setTimeout(function () {
            console.log('Wake up after %d', time);
            self.next();
        }, time * 1000);
    };
    this.task.push(fn);
    return this;
};

_LazyMan.prototype.sleepFirst = function (time) {
    var self = this;
    var fn = function () {
        setTimeout(function () {
            console.log('Wake up after %d', time);
            self.next();
        }, time * 1000);
    };
    // this.task.unshift(fn);
    var pos = this.task.length - 1;
    this.task.splice(pos >= 0 ? pos : 0, 0, fn);
    return this;
};

var LazyMan = function (name) {
    return new _LazyMan(name);
};

// LazyMan('Hank');
// LazyMan('Hank').sleep(10).eat('dinner');
// LazyMan('Hank').eat('dinner').eat('supper');
// LazyMan('Hank').sleepFirst(5).eat('supper');
LazyMan('Hank').sleep(2).eat('supper').sleepFirst(1).eat('dinner');
// LazyMan('Hank').sleep(2).eat('supper').sleep(1).eat('dinner');
