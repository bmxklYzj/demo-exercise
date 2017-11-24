# php-1-概要

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
	
	```php
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
	
	```php
	// PHP 变量类型转换
	$number = 0;
	$numbFloat = (float)$number;
	```
	
10. 可变变量：

	```php
	$name = 'firstName';
	$$name = 'zj';		// 其实是$firstName='zj'
	```

	主要用处是在表单中用循环来处理变量

11. 申明和使用常量：使用define函数来定义常量，字母建议大写，但不是必须的，注意变量前面不能用$。

	```php
	define('CONSTNUMBER', 10);
    echo CONSTNUMBER;
	```

12. 变量的作用域

	php的6个基本作用域规则：
	1. 内置超级全局变量在脚本任何地方可见，如$_GET/$_POST/$_REQUEST/$_SERVER
	2. 常量，在全局可见，既在函数内外都可见
	3. 在脚本中申明的全局变量在整个脚本中是可见的，但是在函数内部不可见（注意：这和js不同）
	4. 函数内部的变量申明为全局变量时，其名称要与全局变量一致并且变量前使用global关键字
	5. 函数内部的静态变量在函数外不可见，在函数的多次执行中始终保持该值
	6. 函数内部的普通变量对函数来说是本地的，函数执行结束后变量也就不存了，因此在函数外也是无法访问的
	
	```php
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

	```php
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

	```php
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

	```php
	// 错误抑制符号@
    // echo 5/0; // Warning: Division by zero in
    echo @(5/0); // 不会报错
	```
	
16. 执行操作符: ` ，php会把此反向单引号中的命令当成服务器端的命令来执行

	```php
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

	```php
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

	```php
	// 测试和设置变量类型
    $int = 5;
    echo $int, gettype($int);
    // 5integer
    settype($int, 'double');
    echo $int, gettype($int);
    // 5double
	```
	
19. 测试变量状态。isset()测试变量是否存在(相对应的unset()可以用来销毁一个变量)，empty()测试变量是否存在及其值的真假

	```php
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

	```php
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

	```php
	// 文件读取
    $DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
    echo $DOCUMENT_ROOT;
    $fp = fopen("$DOCUMENT_ROOT/test01/index.html", 'r');
    while (!feof($fp)) {
        echo fgets($fp, 999);
    }
	```
	
## 数组

1. 数组分两种：数字索引数组、关联数组（关联数组其实类似于js中的对象，只是键是自定义的内容）
2. 创建数字索引数组：
	1. 使用array：`$a = array(1, 2, 3);
    var_dump($a);`
    2. 使用range: `range(1, 10);
        range(1, 10, 3);`
    3. 自动创建数组：
    
    ```php
    // 自动创建数组
    $a1 = array(1);
    var_dump($a1);
    $a1[3] = 3;
    var_dump($a1);
    // array(1) { [0]=> int(1) } array(2) { [0]=> int(1) [3]=> int(3) }
    
    $a2[0] = 1;
    var_dump($a2);
    $a2[4] = 4;
    var_dump($a2);
    // array(1) { [0]=> int(1) } array(2) { [0]=> int(1) [4]=> int(4) }
    
    ```

3. 关联数组：创建、遍历

	```php
	// 关联数组
    $a = array('key1' => 1, 'key2' => 2, 'key3' => 3);
    var_dump($a);
    // array(3) { ["key1"]=> int(1) ["key2"]=> int(2) ["key3"]=> int(3) }
    echo $a['key2']; // 2

    // 遍历关联数组：foreach循环或者list()&each()
    foreach ($a as $key => $value) {
        echo $key.'-'.$value;
    }
    // key1-1key2-2key3-3

    reset($a);
    while ($element = each($a)) {
        // 下面两行是等价的
        echo $element['key'].'-'.$element['value'];
        echo $element[0].'-'.$element[1];
    }
    // key1-1key2-2key3-3

    reset($a);
    while (list($key, $value) = each($a)) {
        echo $key.'-'.$value;
    }
    // key1-1key2-2key3-3
	```
	
4. 数组的联合：如果元素具有相同的索引，将不会被添加

	```php
	// 数组的联合（相加）：如果元素具有相同的索引，将不会被添加
    $a1 = array(1, 2, 3);
    $a2 = array(8, 9, 7, 4, 4, 6);
    var_dump($a1 + $a2);
    // array(6) { [0]=> int(1) [1]=> int(2) [2]=> int(3) [3]=> int(4) [4]=> int(4) [5]=> int(6) }
	```
	
5. 数组排序函数: 
	1. sort()正序排序
	2. rsort()反向排序
	3. usort()用户自定义排序
	4. asort()关联数组：根据value值正序排序
	5. ksort()关联数组：根据key值正序排序
	6. arsort()关联数组：根据value值反序排序
	7. krsort()关联数组：根据key值反序排序

	```php
	// 数组排序：sort、rsort、usort、asort、ksort、arsort、krsort
    // 注意：这些函数会直接改变原数组！
    $alphabet = array('ads', 'afd', 'bdc', 'abc');
    $number = array(1, 12, 13, 2, 3);
    var_dump(
        sort($alphabet),
        $alphabet
    );
    // bool(true) array(4) { [0]=> string(3) "abc" [1]=> string(3) "ads" [2]=> string(3) "afd" [3]=> string(3) "bdc" }
    var_dump(
        $number,
        sort($number),
        $number // array(5) { [0]=> int(1) [1]=> int(2) [2]=> int(3) [3]=> int(12) [4]=> int(13) }
    );
    var_dump(
        $number,
        sort($number, SORT_STRING), // sort函数第二个参数指定排序方式
        $number // array(5) { [0]=> int(1) [1]=> int(12) [2]=> int(13) [3]=> int(2) [4]=> int(3) }
    );

    echo '<hr>';
    // asort()和ksort()对关联数组排序
    $a = array('key1' => 1, 'key2' => 2, 'key10' => 10, 'key5' => 5);
    var_dump(
        asort($a),
        $a
    );
    // bool(true) array(4) { ["key1"]=> int(1) ["key2"]=> int(2) ["key5"]=> int(5) ["key10"]=> int(10) }
    var_dump(
        ksort($a),
        $a
    );
    // bool(true) array(4) { ["key1"]=> int(1) ["key10"]=> int(10) ["key2"]=> int(2) ["key5"]=> int(5) }
    // 注意：如果对关联数组用sort()函数进行排序，则会丢失key值，根据value排序，如下所示：
    var_dump(
        sort($a),
        $a
    );
    // bool(true) array(4) { [0]=> int(1) [1]=> int(2) [2]=> int(5) [3]=> int(10) }
	```
	
6. 对数组进行 反向排序 array_reverse()（**注意：此函数不改变原数组**），随机排序数组 shuffle()

	```php
	// 对数组进行 反向排序 array_reverse(),返回副本，原数组不变
    $a = array(1, 12, 13, 2, 3);
    var_dump(
        $a,
        array_reverse($a), // array(5) { [0]=> int(3) [1]=> int(2) [2]=> int(13) [3]=> int(12) [4]=> int(1) } 
        $a                 // array(5) { [0]=> int(1) [1]=> int(12) [2]=> int(13) [3]=> int(2) [4]=> int(3) }
    );

    // 随机排序数组 shuffle()，与sort()函数一样，改变了原数组
    $a = array(1, 12, 13, 2, 3);
    var_dump(
        $a,
        shuffle($a), 
        $a
    );
	```
	
7. 统计数组个数: 
	1. count()统计数组总个数
	2. sizeof()同count()等价的
	3. array_count_values()统计每个值（value）出现的次数，返回一个数组

	```php
	// 统计数组个数： 
    $a1 = array(1, 12, 13, 2, 2);
    $a2 = array('key1' => 1, 'key2' => 2, 'key10' => 10, 'key5' => 1);
    var_dump(
        count($a1),
        sizeof($a1),
        array_count_values($a1)
    );
    // int(5) int(5) array(4) { [1]=> int(1) [12]=> int(1) [13]=> int(1) [2]=> int(2) }
    var_dump(
        count($a2),
        sizeof($a2),
        array_count_values($a2)
    );
    // int(4) int(4) array(3) { [1]=> int(2) [2]=> int(1) [10]=> int(1) }

	```	
	
8. 其它一些数组方法：
	
	```php
	// extract()函数将关联数组转化成一系列的标量变量，
	// 其第二个参数指定转化模式，如是否覆盖已存在的变量，第三个参数指定前缀
    $a2 = array('key1' => 1, 'key2' => 2, 'key10' => 10, 'key5' => 1);
    $key1 = 'key1';
    var_dump($key1); // string(4) "key1"
    extract($a2);
    var_dump($key1); // int(1)

    echo '<hr>';
    // array_push(), array_pop()
    $a = array(1, 3);
    var_dump(
        array_push($a, 2, 4, 8), // int(5)，此为数组的 总个数
        $a                      // array(5) { [0]=> int(1) [1]=> int(3) [2]=> int(2) [3]=> int(4) [4]=> int(8) }
    );
    var_dump(
        array_pop($a), // int(8)，此为弹出的 元素
        $a             // array(4) { [0]=> int(1) [1]=> int(3) [2]=> int(2) [3]=> int(4) }
    );
	```
	
## 字符串与正则

1. 过滤空白字符

	```php
	// 过滤空白符
    $s = '  asdf  a  ';
    var_dump(
        trim($s), // string(7) "asdf a"
        chop($s), // string(9) " asdf a"  chop()等价于rtrim()
        ltrim($s), // string(9) "asdf a "
        rtrim($s) // string(9) " asdf a"
    );
	```
	
2. 字符串转换：
	1. 将换行符替换为html中的`<br />:nl2br()`
	2. 转化为大写strtoupper()
	3. 转化为小写strtolower()
	4. 若字符串第一个字符是字母则字母转化为大写 ucfirst()
	5. 字符串的每个单词首字母大写 ucwords()
3. 分割与链接：exmplode()、implode()/join()

	```php
	// explode()/implode()/join()
    $s = 'adsf@123.com';
    var_dump(
        $r = explode('@', $s), // array(2) { [0]=> string(4) "adsf" [1]=> string(7) "123.com" }
        join('@', $r),         // string(12) "adsf@123.com"
        implode('@', $r)       // string(12) "adsf@123.com"
    );
	```
	
4. substr()截取字符串: `string substr(string $string, int $start [, int $length])`

5. 字符串比较：
	1. strcmp() 返回两个参数比较大小的结果，按字典序排序（如'2'大于'12'）
	2. strcasecmp() 同上，不区分大小写
	3. strnatcmp()返回两个参数比较大小的结果，按自然排序方式排序（如'12'大于'2'）
	4. strnatcasecmp()同上，不区分大小写
	
6. strlen()测试长度
7. 查找：strstr()，查找子字符串的位置strpos()

	```php
	$s = 'adsf@123.com';
    var_dump(
        strstr($s, '@12'), // string(8) "@123.com"
        strpos($s, '@12'), // int(4) 
        strpos($s, 'ads')  // int(0) 如果用在判断条件中，没找到应该判断是否全等于false
    );
	```
8. 替换子字符串可以使用字符串方法：str_replace()/substr_replace()或者正则方法: exeg_repalce()/exegi_replace()函数
9. php中正则表达式模块最好写在一个单引号字符串中，因为如果写在双引号字符串中，表示一个包含了反斜杠的正则表达式字符串需要4个反斜杠，因为php解释器先把4个反斜杠解释成2个，之后正则表达式计时器解析为1个。

	```php
	// 正则
    $s = 'adsfa@123.com';
    $reg = 'ds';
    var_dump(
        ereg($reg, $s, $rr), // int(2)
        $rr                  // array(1) { [0]=> string(2) "ds" }
    );
	```
	
## 函数

1. 引用其他php脚本：
	1. require()失败后会抛出致命错误fatal error
	2. include()失败后会抛出警告warning
	3. require_once()
	4. include_once()
	
	fatal error出现后后面的代码都不会执行，而warning出现后后面的代码仍旧会执行。
	
2. 函数名不区分大小写，变量区分大小写。不能定义同名的函数，否则会报错Fatal error。可变函数和可变变量类似：

	```php
	// 可变函数
    function fun () {
        echo 'a';
    }
    $name = 'fun';
    $name(); // a

    // 与可变变量类似：
    $a = 1;
    $b = 'a';
    var_dump(
        $$b     // int(1)
    );
	```
	
3. 可变参数函数：func_num_args()/func_get_args()/func_get_arg(int $num)

	```php
	// 可变参数函数
    function fun_args() {
        echo func_num_args();   // 3
        $args = func_get_args();
        var_dump(
            $args
        );
        echo func_get_arg(0), func_get_arg(1); // 1 2
        foreach($args as $item) {
            var_dump($item);
        }
    }
    fun_args(1, 2, 3); // array(3) { [0]=> int(1) [1]=> int(2) [2]=> int(3) } int(1) int(2) int(3)
	```	
	
4. 函数参数的引用传递和值传递，使用`&`进行引用传递

	```php
	// 函数参数的引用传递和值传递
    function func_address(&$value) {
        $value++;
    }
    $amount = 10;
    func_address($amount);
    echo $amount;
    // 如果参数中没有&则输出10， 有&则输出11
	```

