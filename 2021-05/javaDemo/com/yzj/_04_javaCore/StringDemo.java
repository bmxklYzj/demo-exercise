package com.yzj._04_javaCore;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;

public class StringDemo {
    public static void main(String[] args) {
        baseStringDemo();
    }

    static void baseStringDemo() {
        // 实际上字符串在String内部是通过一个char[]数组表示的，因此，按下面的写法也是可以的：
        String s1 = "hello!";
        String s2 = new String(new char[] {'h', 'e', 'l', 'l', 'o', '!'});
        System.out.println(s1 == s2); // false
        System.out.println(s1.equals(s2)); // true

        // 字符串不可变
        String s3 = "Hello";
        System.out.println(s3); // Hello
        String s4 = s3.toUpperCase();
        System.out.println(s3); // Hello
        System.out.println(s4); // HELLO

        // 字符串是引用类型，比较要用equals
        String s5 = "hello";
        String s6 = "hello";
        // 这里的相等仅仅是巧合，编译期间会把所有相同字符串当成一个对象放入常量池，千万不要依赖此特性
        System.out.println(s5 == s6); // true
        System.out.println(s5.equals(s6)); // true

        String s7 = "hello";
        String s8 = "HELLO".toLowerCase(Locale.ROOT);
        System.out.println(s7 == s8); // false
        System.out.println(s7.equals(s8)); // true

        /**
         * 若干api方法：
         * contains
         * indexOf
         * lastIndexOf
         * startsWith
         * endsWith
         * substring
         * trim
         * strip 类似中文的空格字符\u3000也会被移除
         * stripLeading
         * stripTrailing
         * isEmpty 是否equals ""
         * isBlank 是否全为空白字符
         * replace
         * replaceAll
         * split
         * formatted/String.fromat 格式化
         */

        // 任意类型转字符串
        List<String> strings = Arrays.asList(
                String.valueOf(123),
                String.valueOf(12.3),
                String.valueOf(true),
                String.valueOf(new Object())
        );
        System.out.println(strings);

        // 字符串转其它类型
        System.out.println(Integer.parseInt("123"));
        System.out.println(Double.parseDouble("12.3"));
        System.out.println(Boolean.parseBoolean("TRue"));
    }
}