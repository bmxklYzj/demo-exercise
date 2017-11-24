# 第1章 js简介

JavaScript实现：

1. ECMAScript
2. DOM

     dom 1 级：dom核心、domhtml
     dom 2级：事件、遍历树

3. BOM：浏览器相关navagitor、location、screen等

# 第2章 script

顺序执行，一个执行完了才会执行另一个。

defer 和 sync 都只能用于外部脚本。都不会阻塞其它资源的加载。区别是：defer保证顺序，async不保证顺序。

# 第3章 基本概念

1. 严格模式：一种编译指示，让js引擎切换到严格模式。

    严格模式特点：不用var声明变量，eval作用域，不能用with，重名变量函数名函数参数等等。 [ref: 阮一峰]([http://www.ruanyifeng.com/blog/2013/01/javascript\_strict\_mode.html](http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html))

2. 变量。非严格模式省略a = 3变成全部变量
3. 数据类型，6种：Undefined、Null、Sting、Number、Boolean、Object
    typeof 操作符（非函数）返回值，6种：
    1. 'undefined'
    2. 'string'
    3. 'number'
    4. 'boolean'
    5. 'object': 对象 和 null
    6. 'function'

4. Undefined类型：声明未赋值

    变量声明未赋值 和 未声明 的区别

5. Null类型：空对象指针。

    没必要把变量显示的声明为undefined，但应该把意在保存对象的变量声明为null

    undefined 派生自 null
    `undefined == null`
    `undefined !== null`

6. Boolean

    数值：0 NaN 为fale
    字符串：空 为false
    对象：null 为false，任意对象（包括 `{} 和 []`）为true

    1. Boolan()
    2. `!!`

6. Number 类型：

    特殊的值：NaN(not a number)/Infinity

    1. Number()
    2. parseInt()：第二个参数指定转化位数。如果首位不是 数字或负号，则为 NaN
    3. parseFloat()：只能转换十进制数
    4. isNaN(): `isNaN(NaN) === true;isNaN('blue') === true; isNaN(1) === false`
    5. isFinite(): `isFinite(1) === true;isFinite(finite)`

    ```js
    console.log(Number(undefined));
    console.log(Number(null));  // 只有此为 0，其余全为 NaN
    console.log(Number(''));    // 只有此为 0，其余全为 NaN
    console.log(parseInt(undefined));
    console.log(parseInt(null));
    console.log(parseInt(''));
    console.log(parseFloat(undefined));
    console.log(parseFloat(null));
    console.log(parseFloat(''));
    ```

7. String 类型：

    1. String():
    2. toSting(); 参数为基数
    3. `+ ''`

8. Object 类型：

    Object每个实例都有的属性和方法：

    1. construction
    2. hasOwnProperty
    3. isPrototypeOf
    4. propertyIsEnumerable
    5. toLocalString
    6. toString
    7. valueOf

9. 函数：

    函数作用域

    arguments.length/callee
    
    call/apply

    ```js
    Array.prototype.slice.call(arguments);
    Array.apply(arguments);
    
    Math.max.apply(Math, [1, 2, 5, 4]);
    ```

