<?php

    $a = 5;
    function fun () {
        $a = 6;
        echo $a; // 6
    }
    fun();
    echo $a; // 5

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

    echo '<br />';
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

    // 错误抑制符号@
    // echo 5/0; // Warning: Division by zero in
    echo @(5/0); // 不会报错

    // 执行操作符
    $out = `ls -la`;
    echo '<pre>'.$out.'</pre>';
    echo "<pre>$out</pre>";


    $a1 = array(1, 2, 3);
    $a2 = array(8, 9, 7, 4, 4, 6);
    var_dump($a1 + $a2);
    echo '<br />';
    // 判读数组是否相等，全等
    // 数组相等：两个数组含有相同的键值对，返回true
    // 数组全等：两个数组含有相同的键值对且顺序相同，返回true
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

    echo '<hr />';
    // 测试和设置变量类型
    $int = 5;
    echo $int, gettype($int);
    // 5integer
    settype($int, 'double');
    echo $int, gettype($int);
    // 5double

    echo '<hr />isset/empty<br />';
    // 测试变量状态。isset()测试变量是否存在，empty()测试变量是否存在及其值的真假
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

    echo '<hr />变量类型转换<br />';
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

    echo '<hr />文件读取<br />';
    // 文件读取
    $DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
    echo $DOCUMENT_ROOT;
    $fp = fopen("$DOCUMENT_ROOT/test01/index.html", 'r');
    while (!feof($fp)) {
        echo fgets($fp, 999);
    }
    // echo $fp;
?>