<?php
    // 数组分两种：数字索引数组、关联数组

    // 先示例一下php中的一些输出方式，真是多，令人眼花缭乱！
    $a = 2.2;
    echo $a;
    print($a);
    printf($a);
    sprintf($a);
    print_r($a);
    var_dump($a);

    $a = array(1, 2, 3);
    var_dump($a);

    echo '<hr>';    
    // range() 函数: mixed $start , mixed $limit [, number $step = 1 ]
    var_dump(
        range(1, 10),
        range(1, 10, 3),
        range(1, 10, -1),
        range('A', 'z')
    );

    echo '<hr>';
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
    

    echo '<hr>';
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

    echo '<hr>';
    // 数组的联合（相加）：如果元素具有相同的索引，将不会被添加
    $a1 = array(1, 2, 3);
    $a2 = array(8, 9, 7, 4, 4, 6);
    var_dump($a1 + $a2);
    // array(6) { [0]=> int(1) [1]=> int(2) [2]=> int(3) [3]=> int(4) [4]=> int(4) [5]=> int(6) }

    echo '<hr>';
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

    echo '<hr>';
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

    echo '<hr>';
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

    echo '<hr>';
    // extract()函数将关联数组转化成一系列的标量变量 
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
    

    echo '<hr>';
    // 字符串操作
    // 过滤空白符
    $s = '  asdf  a  ';
    var_dump(
        trim($s), // string(7) "asdf a"
        chop($s), // string(9) " asdf a"  chop()等价于rtrim()
        ltrim($s), // string(9) "asdf a "
        rtrim($s) // string(9) " asdf a"
    );
    
    echo '<hr>';
    // 将换行符替换为html中的<br />
    $s = "a\r\nb";
    echo $s;
    var_dump($s);
    var_dump(nl2br($s), $s);

    echo '<hr>';
    // explode()/implode()/join()
    $s = 'adsf@123.com';
    var_dump(
        $r = explode('@', $s), // array(2) { [0]=> string(4) "adsf" [1]=> string(7) "123.com" }
        join('@', $r),         // string(12) "adsf@123.com"
        implode('@', $r)       // string(12) "adsf@123.com"
    );
    
    echo '<hr>';
    $s = 'adsf@123.com';
    var_dump(
        strstr($s, '@12'), // string(8) "@123.com"
        strpos($s, '@12'), // int(4) 
        strpos($s, 'ads')  // int(0) 如果用在判断条件中，没找到应该判断是否全等于false
    );

    echo '<hr>';
    // 正则
    $s = 'adsfa@123.com';
    $reg = 'ds';
    var_dump(
        ereg($reg, $s, $rr), // int(2)
        $rr                  // array(1) { [0]=> string(2) "ds" }
    );

    // require('a.php');
    include('a.php');
    echo 'asdf';


    echo '<hr>';
    // function
    // fun();
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

    echo '<hr>';
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

    echo '<hr>';
    // 函数参数的引用传递和值传递
    function func_address(&$value) {
        $value++;
    }
    $amount = 10;
    func_address($amount);
    echo $amount;
    // 如果参数中没有&则输出10， 有&则输出11

 ?>