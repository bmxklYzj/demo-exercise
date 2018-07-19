function test(resolve, reject) {
    var num = Math.random() * 2;

    setTimeout(function () {
        if (num < 1) {
            console.log('success');
            resolve('200, ok');
        }
        else {
            console.log('fail');
            reject('fail');
        }
    }, 1000)
}

var p = new Promise(test);
p.then((result) => {
    console.log('成功： ' + result);
})
.catch(result => {
    console.log('失败：' + result);
})