let arr = [1, 2, 3];

function filterArray(arr, callback) {
    let temp = [];
    arr.map(item => {
        if (callback(item)) {
            temp.push(item);
        }
    });

    console.log(arr);
    return temp;
}

function isBigEnough(val) {
    return val > 1;
}

console.log(filterArray(arr, isBigEnough));


// 奇偶数
let arr = [1, 2, 3, 4, 5, 6];
let res = arr.filter(item => item % 2);
console.log(arr, res);


// 数组去重
let arr = [1, 2, 3, 4, 5, 6, 3, 4, 5];
let res = arr.filter((item, index, array) =>
    array.indexOf(item) === index
);
console.log(arr, res);


// 去除 纯空字符串，注意是纯！
let arr = ['a', 'b', '', null, undefined, NaN, '  c  ', '   '];
console.log(arr);
let res = arr.filter(item => {
    return (item && item.trim());
});
console.log(arr, res);
// [ 'a', 'b', '', null, undefined, NaN, '  c  ', '   ' ] [ 'a', 'b', '  c  ' ]
