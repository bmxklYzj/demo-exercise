# typescript

- hello world:

    ```js
    // index.ts
    function sayHello(person: string) {
        console.log('hello ' + person);
    }
    sayHello('xiaoming')
    ```

    执行`tsc index.ts`结果：

    ```js
    // index.js
    function sayHello(person) {
        console.log('hello ' + person);
    }
    sayHello('xiaoming');

    ```

    编译为 js 之后，并没有什么检查的代码被插入进来。
    TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。如果把`sayHello('xiaoming')`修改为`sayHello(['xiaoming'])`编译时候会报错：
    ```
    index.ts:5:10 - error TS2345: Argument of type 'string[]' is not assignable to parameter of type 'string'.

    5 sayHello(['xiaoming'])
            ~~~~~~~~~~~~


    Found 1 error.
    ```
    但仍旧能生成对应的`index.js`