# todo-simple

原生js简单todo demo，[体验地址](http://104.223.1.205/my_project/todo/simple/dist)

1. 手动从0配置webpack dev/prod，

    ```bash
    npm run dev
    npm run build
    ```
    
    其实功能就一个首页：index。其它的页面detail只是为了练习webpack的多页面配置，可忽略
    
    配置babel遇到的坑: 
    
    babel-loader 8 `"babel-loader": "^8.0.4",` 需要安装
    
    ```bash
       "@babel/core": "^7.1.6",
       "@babel/preset-env": "^7.1.6",
    ``` 
    
    然后webpack这样写：
    ```json
     use: {
         loader: 'babel-loader',
             options: {
                 presets: ['@babel/env']
             }
         },
    ```
    
    babel 7对应才要安装 `babel-preset-env`

2. 样式

    - input框样式自定义：
    
        ```css
        input {
            outline: none;
            border: none
        }
        ```
    - checkbox样式：
    
        ```css
        .checkbox {
            -webkit-appearance: none; // 去掉checkbox默认样式
            outline: 0; // focus时会有outline，去掉
        }
        ```

3. 原生js中添加节点 [appendChild和append的区别](https://developer.mozilla.org/zh-CN/docs/Web/API/ParentNode/append)

    1. appendChild 是ES5就支持的，ie6都支持，可以认为没有兼容性；但append兼容性很差，因为它是新api，chrome 54才支持。
    2. appendChild 只能追加一个 `Node` 对象，并且返回该Node对象； append可以几个节点和字符串，其参数可以是 `String/Node`，没有返回值
    
        ```js
           var child = ParentNode.appendChild(Node);
        ```
        
        ```js
           void ParentNode.append((Node or DOMString)... nodes);
        ```