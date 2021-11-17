package com.yzj._04_javaCore;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;

public class RecordDemo {
    public static void main(String[] args) {
        BigInteger i1 = new BigInteger("2147483647");
        BigInteger i2 = new BigInteger("214748364712");
        BigInteger sum = i1.add(i2);
        System.out.println(sum);

        System.out.println(i2.longValue());
//        System.out.println(i2.multiply(i2).longValueExact()); // 抛异常 ArithmeticException

        BigDecimal d1 = new BigDecimal("123.4567");
        System.out.println(d1.multiply(d1));

        BigDecimal d2 = new BigDecimal("123.45");
        BigDecimal d3 = new BigDecimal("123.4500");
        BigDecimal d4 = new BigDecimal("12345");
        BigDecimal d5 = new BigDecimal("1234500");
        System.out.println(d2.scale()); // 2
        System.out.println(d3.scale()); // 4
        System.out.println(d4.scale()); // 0
        BigDecimal d5_ = d5.stripTrailingZeros();
        System.out.println(d5.scale()); // 0
        System.out.println(d5_.scale()); // 02

        BigDecimal d6 = new BigDecimal("123.456");
        BigDecimal d7 = new BigDecimal("23.456789");
        // 除不尽的情况，必须指定精度和mode
        BigDecimal d8 = d6.divide(d7, 10, RoundingMode.HALF_UP);
        System.out.println(d8);

        BigDecimal d9 = new BigDecimal("123.456");
        BigDecimal d10 = new BigDecimal("123.45600");
        System.out.println(d9.equals(d10)); // true
        System.out.println(d9.equals(d10.stripTrailingZeros())); // false
        System.out.println(d9.compareTo(d10)); // 0
    }

}
