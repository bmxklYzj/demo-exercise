# 第1章 js简介

JavaScript实现：

1. ECMAScript
2. DOM

     dom 1 级：dom核心：文档结构、dom html：对html访问的对象和方法

     dom 2级：事件、遍历树

3. BOM：浏览器相关navagitor、location、screen等

# 第2章 script

顺序执行，前一个执行完了才会执行后一个。

defer 和 sync 都只能用于外部脚本。都不会阻塞其它资源的加载，不会阻塞页面渲染，文档完全呈现之后再执行。区别是：defer保证顺序，async不保证顺序。

[defer ascyn 详解](https://github.com/bmxklYzj/demo-exercise/blob/master/js/script-defer-async.md)

# 第3章 基本概念

1. 严格模式：一种编译指示，让js引擎切换到严格模式。

    严格模式特点：不用var声明变量，eval作用域，不能用with，重名 变量/函数名/函数参数等等。 [ref: 阮一峰](http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html)

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
    console.log(Number(null));  // 只有此为 0，其余全为 NaN
    console.log(Number(''));    // 只有此为 0，其余全为 NaN
    console.log(parseInt(undefined));
    console.log(parseInt(null));
    console.log(parseInt(''));
    console.log(parseFloat(undefined));
    console.log(parseFloat(null));
    console.log(parseFloat(''));
    ```

7. String 类型：

    1. String():

        ```
        有toString() 方法则调用 toString()方法
        null -> 'null'
        undefined -> 'undefined'
        ```

    2. toSting(); 参数为基数
    3. `+ ''`

    注意：
    1. 字符串一旦创建就不能改变
    2. 基本数据类型中，只有 null 和 undefined 没有 toString() 方法。如果不知道要转换的只是不是 null 或 undefined，可以调用转型函数String()

8. Object 类型：

    Object每个实例都有的属性和方法：

    1. construction
    2. hasOwnProperty(propertyName)：当前对象实例是否有此属性
    3. isPrototypeOf(Object)：a.isPrototypeOf(b), a是否是b的原型
    4. propertyIsEnumerable(propertyName)：当前对象是否可枚举，即 是否能用 for-in 枚举
    5. toLocalString
    6. toString
    7. valueOf

9. 操作符:

    1. 短路操作符: `&& ||`
    2. 加性操作符在处理字符串时: 1. 如果两边都是字符串则直接拼接. 2. 如果有一个操作数是字符串,则把另一个操作数先转换成字符串,再进行拼接

10. 函数：

    函数作用域

    arguments.length/callee

    call/apply

    ```js
    Array.prototype.slice.call(arguments);
    Array.apply(arguments);

    Math.max.apply(Math, [1, 2, 5, 4]);
    ```

## 第4章 变量、作用域、内存

基本类型值保存在栈内存中，引用类型值Object保存在堆内存中。

变量的引用方式：5种基本类型 按值访问；Object是按引用访问

函数传参是按值传递，[注意：Object传递的值是地址。](https://github.com/bmxklYzj/demo-exercise/blob/master/2017-11/params-parse-by-value.js)

数据类型检测：
1. 5种基本类型： 使用typeof操作符
2. Object：instanceof（任意对象 instanceof 返回true，任意基本类型值 instanceof 返回false）

执行环境、变量对象、作用域链：

1. 执行环境定义了变量和函数可以访问的数据，决定了他们各自的行为
2. 变量对象保存着当前环境中定义的变量和函数
3. 代码在每个环境中运行时都会生成基于变量对象的作用域链，用于访有序地问变量和函数（代码当前执行的变量对象是作用域链的前端，全局环境对应的变量对象是作用域链的顶端。每个环境都可以通过作用域链向上来查询变量和函数）

延长作用域链：通过把变量对象临时插入到当前作用域链的前端中，在代码执行后被立即移除
1. try-catch 的catch块
2. with语句

垃圾收集：

1. 标记清除：标记不需要的变量，定期运行垃圾收集
2. 引用计数（针对对象）：一个变量被复制则 +1， 变量被重新赋值则 -1，如果===0则表示变量没有用处了，应该清除。但是会有循环引用的问题。

全局变量不需使用应该置为null，以告知垃圾收集在下一次清除时清理
