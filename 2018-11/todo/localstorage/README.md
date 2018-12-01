# todo-simple

原生js简单todo demo，[体验地址](http://104.223.1.205/my_project/todo/localstorage/dist)

1. 手动从0配置webpack dev/prod，

    ```bash
    npm run dev
    npm run build
    ```
    
    其实功能就一个首页：index。其它的页面detail只是为了练习webpack的多页面配置，可忽略

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