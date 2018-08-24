// 为一个函数写个测试

function execTest() {
    const inputOutpuMap = [
        // 每项中：第一个为输入值，第二个为输出值
        ['', {}],
        ['  ', '  '],
        [1, 1],
        [NaN, null],
        [Infinity, null],
        [-1, -1],
        [false, {}],
        [true, true],
        [undefined, {}],
        [null, {}],
        [{ obj: {k: 'v'}}, {obj: {k: 'v'}}],
        [function f() {}, undefined],
        [[1, 2, 3], [1, 2, 3]],
        [new Array(1, 2, 3), [1, 2, 3]],
        [new RegExp('abc'), {}]
    ];

    inputOutpuMap.forEach(item => {
        let res = transformDataFormat(item[0]);
        // 对象需要stringify一下，否则引用不同没法判断
        if (typeof res === 'object' || typeof item[1] === 'object') {
            res = JSON.stringify(res);
            item[1] = JSON.stringify(item[1]);
        }
        if (res !== item[1]) {
            console.log(`unit test ${item[0]} failed: expected: ${item[1]}, but got ${JSON.stringify(res)}`);
        }
    })
    console.log('all done');
}
execTest();

 /**
  * 转换数据格式
  *
  * @param {any} data 输入数据
  * @return {any} 保持返回值类型和微信一致
  */
 function transformDataFormat(data) {
    // 先按大类分，再按小类分，减少分支判断
    // String： '' 返回 {}，其余原样返回
    let dataType = typeof data;
    if (dataType === 'string') {
        if (data === '') {
            return {};
        }
        return data;
    }
    // Boolean： true返回true，false返回{}
    else if (dataType === 'boolean') {
        if (data === true) {
            return true;
        }
        return {};
    }
    // Number：直接返回（和微信有区别，微信返回的比较怪异）
    else if (dataType === 'number') {
        return data;
    }
    // Undefined: 返回{}
    else if (dataType === 'undefined') {
        return {};
    }
    // Object:
    else {
        // function返回undefined
        let objectPrototypeToString = Object.prototype.toString;
        if (objectPrototypeToString.call(data) === '[object Function]') {
            return undefined;
        }
        // regexp和null返回{}
        else if (objectPrototypeToString.call(data) === '[object RegExp]'
            || objectPrototypeToString.call(data) === '[object Null]') {
            return {};
        }
        // 其它原样返回
        return data;
    }
}
