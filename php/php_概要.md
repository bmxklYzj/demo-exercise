# php 概要

php与mySql web开发 学习笔记，方便快速回忆起php的基本语法。

## 第一章： php快速入门

1. 语句
	
	1. xml风格：<?php ?>
	2. 简约风格：<? ?>
	3. script风格：<script language="php"></script>
	4. asp风格：<% %>

2. 注释：

	1. 单行注释： `//`
	2. 多行注释： `/* */`
	
3. 获取表单的值：
	1. $_GET['name']
	2. $_POST['name']
	3. $_REQUEST['name'] // REQUEST	可以获取get或者post类型的提交参数，但最好做一个区分，以尽可能避免安全漏洞

4. 字符串连接

	`.`可以连接字符串，这样可以避免输入多个echo语句，如 `echo "name is: ".$name;`
	
5. 双引号和单引号
	
	在上面这个例子中也可以把变量插入到双引号内部去，如`echo "name is: $name";`，在双引号中变量名称将被变量值所替代，因此效果是一样的，但是这里不能使用单引号，单引号的内容会直接输出。
	
	```
	<?php
	    $name = 'yzj';
	    echo 'name is: '.$name; //name is: yzj
	    echo "name is: $name"; //name is: yzj
	    echo 'name is: $name'; // name is: $name
	?>
	```
	
	php会计算双引号自字符串，而单引号字符串会被当成真正的文本。
	
6. 变量申明： php不要求在使用变量之前申明变量。变量的命名允许数字（不能以数字开始）、字母、下划线、$符号组成
7. 变量类型：
	1. Integer：整数
	2. Float：所有实数，也叫Double
	3. String：字符串
	4. Boolean：布尔值
	5. Array：数组
	6. Object：对象，保存类的实例
	7. Null
	8. Resource： 特定的内置函数（如数据库函数）返回resourse类型，表示某种资源。
	
8. php变量是弱类型的，同js类似。是动态类型，变量类型随时可变
9. 类型转换：与c类似，在变量前面用圆括号插入数据类型。
	
	```
	// PHP 变量类型转换
	$number = 0;
	$numbFloat = (float)$number;
	```
	
10. 可变变量：

	```
	$name = 'firstName';
	$$name = 'zj';		// 其实是$firstName='zj'
	```

	主要用处是在表单中用循环来处理变量

11. 申明和使用常量：使用define函数来定义常量，字母建议大写，但不是必须的，注意变量前面不能用$。

	```
	define('CONSTNUMBER', 10);
    echo CONSTNUMBER;
	```

12. 变量的作用域

	php的6个基本作用域规则：
	1. 内置超级全局变量在脚本任何地方可见，如`$_GET/$_POST/$_REQUEST/$_SERVER`
	2. 常量，在全局可见，既在函数内外都可见
	3. 在脚本中申明的全局变量在整个脚本中是可见的，但是在函数内部不可见（注意：这和js不同）
	4. 函数内部的变量申明为全局变量时，其名称要与全局变量一致
	5. 函数内部的静态变量在函数外不可见，在函数的多次执行中始终保持该值
	6. 函数内部的普通变量对函数来说是本地的，函数执行结束后变量也就不存了，因此在函数外也是无法访问的
	
	```
	// 规则3、4、6的示例
    $a = 5;
    function fun () {
        $a = 6;
        echo $a; // 6
    }
    fun();
    echo $a; // 5
	```
	
13. 变量的直接赋值与引用操作符

	```
	// 变量的直接赋值与引用操作符，&引用操作符实际上是给变量起了一个别名，两个变量指向同一个内存地址
    $a = 5;
    $b = $a;
    echo $a;
    echo $b;
    $b = 7;
    echo $a;
    echo $b;
    // 5557

    $a = 5;
    $b = &$a;
    echo $a;
    echo $b;
    $b = 7;
    echo $a;
    echo $b;
    // 5577
    unset($a);
    if (isset($a)) {
        echo $a;
    } else  {
        echo '$a is null';
    }
    echo $b;
    // $a is null7
	```
	
14. 相等==和全等===，和js一样

	```
    echo 0 == '0' ? 1 : 0;
    echo 1 == '1' ? 1 : 0;
    echo 1 == true ? 1 : 0;
    echo '1' == true ? 1 : 0;
    // 1111

    echo '<br />';
    echo 0 === '0' ? 1 : 0;
    echo 1 === '1' ? 1 : 0;
    echo 1 === true ? 1 : 0;
    echo '1' === true ? 1 : 0;
    // 0000
	```
	
15. 通过`@`符号可以抑制错误警告

	```
	// 错误抑制符号@
    // echo 5/0; // Warning: Division by zero in
    echo @(5/0); // 不会报错
	```
	
16. 执行操作符: ` ，php会把此反向单引号中的命令当成服务器端的命令来执行

	```
	// 执行操作符
    $out = `ls -la`;
    echo '<pre>'.$out.'</pre>';
    echo "<pre>$out</pre>
    
    // result
    total 24
	drwxr-xr-x   5 baidu  admin   170 Jun 13 20:12 .
	drwxrwxr-x  10 root   admin   340 Jun 13 14:08 ..
	-rw-r--r--   1 baidu  admin   451 Jun 13 15:15 index.html
	-rw-r--r--   1 baidu  admin   573 Jun 13 15:34 index.php
	-rw-r--r--   1 baidu  admin  1107 Jun 13 20:58 test.php
	```
	
17. 判断两个数组是否相等、全等：数组相等：**两个数组含有相同的键值对**，返回true；数组全等：**两个数组含有相同的键值对且顺序相同**，返回true

	```
	$a1 = array(1, 2, 3);
    $a2 = array(1, 2, 3);
    $a3 = array(1, 3, 2);
    var_dump($a1);
    echo $a1 == $a2;
    echo $a1 === $a2;
    echo $a1 == $a3 ? 1 : 0;
    echo $a1 === $a3 ? 1 : 0;
    // 1100

    $a1 = array('a' => 1, 'b' => 2, 'c' => 3);
    $a2 = array('a' => 1, 'b' => 2, 'c' => 3);
    $a3 = array('a' => 1, 'c' => 3, 'b' => 2);
    var_dump($a1);
    echo $a1 == $a2;
    echo $a1 === $a2;
    echo $a1 == $a3 ? 1 : 0;
    echo $a1 === $a3 ? 1 : 0;
    // 1110
	```
	
18. 测试和设置变量类型：gettype()/settype()

	```
	// 测试和设置变量类型
    $int = 5;
    echo $int, gettype($int);
    // 5integer
    settype($int, 'double');
    echo $int, gettype($int);
    // 5double
	```
	
19. 测试变量状态。isset()测试变量是否存在(相对应的unset()可以用来销毁一个变量)，empty()测试变量是否存在及其值的真假

	```
	$varibaleA;
    echo isset($varibaleA) ? 1 : 0; // 0
    echo empty($varibaleA) ? 1 : 0; // 1
    $varibaleB = '';
    echo isset($varibaleB) ? 1 : 0; // 1
    echo empty($varibaleB) ? 1 : 0; // 1
    $varibaleC = 5;
    echo isset($varibaleC) ? 1 : 0; // 1
    echo empty($varibaleC) ? 1 : 0; // 0
    var_dump($varibaleA, $varibaleB, $varibaleC);
    // NULL string(0) "" int(5)

    unset($varibaleC);
    echo isset($varibaleC) ? 1 : 0; // 0
    echo empty($varibaleC) ? 1 : 0; // 1
    var_dump($varibaleC); // NULL
    ```
	
20. 变量类型转换: intval()/floatval()/strval()，和js的parseInt()、parsefloat()、String()比较类似

	```
	// 变量类型转换
    // 第一种方式：类似c语言中，前面圆括号中加上强制转换的类型
    $double = 2.2;
    $int = (int)$double;
    echo $int, gettype($int); // 2integer

    // 第二种方式：使用三个函数转换intval()/floatval()/strval()
    $int2 = intval($double);
    echo $int2, gettype($int2); // 2integer
    $int2 = intval('23.3adsf');
    echo $int2, gettype($int2); // 23integer
    $int2 = intval('23adsf');
    echo $int2, gettype($int2); // 23integer
    $int2 = intval('0.123adsf');
    echo $int2, gettype($int2); // 0integer
    $int2 = intval('a123dsf456');
    echo $int2, gettype($int2); // 0integer
    // intval指定转换基数
    $int2 = intval('0xa');
    echo $int2, gettype($int2); // 0integer
    $int2 = intval('0xa', 16);
    echo $int2, gettype($int2); // 10integer

    $float2 = floatval('2.2asdf');
    echo $float2, gettype($float2); // 2.2double
	```
	
21. 从控制结构或者脚本中退出:
	1. 退出单次循环使用continue
	2. 退出全部循环使用break
	3. 退出脚本使用exit;
	
## 文件读取

1. php读写文件，具体可以参考api，这里举个读取的例子

	```
	// 文件读取
    $DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
    echo $DOCUMENT_ROOT;
    $fp = fopen("$DOCUMENT_ROOT/test01/index.html", 'r');
    while (!feof($fp)) {
        echo fgets($fp, 999);
    }
	```
	
## 数组

1. 