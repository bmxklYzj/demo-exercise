# src 源代码统计工具

## 作用

统计同级 src 目录下面的所有文件的行数。

在 `ignoreFile` 数组中定义不需要列入统计范畴的文件后缀

生成的统计结果如下：

```js
{
    directoryCount: n, // 目录总数
    totalFile: {
        fileCount: n, // 文件总数
        lineCount: n, // 文件总行数
        lineCountWithoutBlankLine: n // 滤出空行后的总行数
    },
    fileList: {
        '.js': {
            fileCount: n, // 文件总数
            lineCount: n, // 该类型文件总行数
            lineCountWithoutBlankLine: n // 滤出空行后的总行数
        },
        '.vue': {
            fileCount: n,
            lineCount: n,
            lineCountWithoutBlankLine: n // 滤出空行后的总行数
        }
    }
}
```

## 如何运行

将`index.js`放置在`src`的同级并执行`node index.js`即可在控制台输出结果

### 关于统计行数的计算

此工具只统计了非空行的所有行数，本来想要统计去除注释后的总行数，想想还是不加此feature，原因有二：

- 注释（包括文档）也是程序员的产出
- 不同语言注释不一样，虽然 c/c++/js 等单行注释用 `//` 或 `/* xxx */` ，多行注释用

    ```
    /**
    *
    */
    ```
    但shell、python又是 `#` ，注释格式多样，如果实现代码逻辑较多