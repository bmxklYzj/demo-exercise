// js 中函数参数是按值传递而不是按地址传递 例子

function setName(obj) {
    obj.name = 'a';
    obj = new Object();
    obj.name = 'b';
}

var person = new Object();
setName(person);
console.log(person.name); // 'a'

// 如果函数参数是按引用传递，那么person将会是一个新对象，
// 且其值是 'b'。但结果不是这样，说明是函数参数是按值传递的
