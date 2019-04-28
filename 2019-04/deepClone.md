# js deepClone

## 纯json数据

使用 `JSON.parse(JSON.stringfy(source))` ，如果有undefined、function JSON.parse会将其丢弃，Date类型的会转换格式

## 纯json+undefined+function

使用自定义的deepClone函数
	
```js
	a = {a: {a1: 1, null: null, undefined: undefined, func: function a() {}}};
	
	var b = a;
	console.log('b === a', b === a);
	
	var c = {...a};
	console.log('c === a', c === a);
	console.log('c.a === a.a', c.a === a.a);
	
	var d = Object.assign({}, a);
	console.log('d === a', d === a);
	console.log('d.a === a.a', d.a === a.a);
	
	var e = JSON.parse(JSON.stringify(a));
	console.log('e === a', e === a);
	console.log('e.a === a.a', e.a === a.a);
	
	function deepCopy(source) {
	    var res = Array.isArray(source) ? [] : {};
	    for (var key in source) {
	        var value = source[key];
	        if (typeof value === 'object' && value !== null) {
	            res[key] = deepCopy(value);
	        }
	        else {
	            res[key] = value;
	        }
	    }
	    return res;
	}
	var f = deepCopy(a);
	console.log('f === a', f === a);
	console.log('f.a === a.a', f.a === a.a);
```

e和f的值如下：
![](https://ws2.sinaimg.cn/large/006tNc79ly1g2gdaye2mrj30te086glr.jpg)

ps：`Object.assign` 和 扩展符 `{...source}`是**浅拷贝** 
查看 [Object.assign pollify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill)
