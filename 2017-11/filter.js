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