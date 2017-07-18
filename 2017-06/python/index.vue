<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <div id="example">{{message.split('').reverse().join('')}}</div>
    
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
    <script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>

    <script>
        var vm = new Vue({
            el: '#example',
            data: {
                message: hello,
            }
        });
    </script>
    <style>
        div {
            color: red;
            width: 200px;
        }
    </style>
    <template>
        <div></div>
    </template>
    
    
</body>
</html>