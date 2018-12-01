# babel compiler

在浏览[babel 官网](https://babeljs.io/docs/en/) 时候有推荐一个github链接[the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler) ，举了简单的例子来描述js compiler的原理，以下是我的总结。

## 编译的阶段：解析、转换、代码生成（Parsing, Transformation, and Code Generation）

### 解析

分为词法解析和语法解析。

词法解析是把代码拆分成最小的标识符token（They could be numbers, labels, punctuation, operators, whatever.）。

语法分析则是把词法分析再整理成AST（abstract synax tree），让每个token之间有了特定联系。

比如代码：

```js
(add 2 (subtract 4 2))
```

转换成token：

```js
[
  { type: 'paren',  value: '('        },
  { type: 'name',   value: 'add'      },
  { type: 'number', value: '2'        },
  { type: 'paren',  value: '('        },
  { type: 'name',   value: 'subtract' },
  { type: 'number', value: '4'        },
  { type: 'number', value: '2'        },
  { type: 'paren',  value: ')'        },
  { type: 'paren',  value: ')'        },
]
```

转换成AST：
```js
{
  type: 'Program',
  body: [{
    type: 'CallExpression',
    name: 'add',
    params: [{
      type: 'NumberLiteral',
      value: '2',
    }, {
      type: 'CallExpression',
      name: 'subtract',
      params: [{
        type: 'NumberLiteral',
        value: '4',
      }, {
        type: 'NumberLiteral',
        value: '2',
      }]
    }]
  }]
}
```
### 转换

把解析的AST作为输入，遍历AST对其进行任意操作


### 代码生成

产出目标代码