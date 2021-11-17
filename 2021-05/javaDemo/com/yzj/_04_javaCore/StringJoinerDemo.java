package com.yzj._04_javaCore;

import java.util.StringJoiner;

public class StringJoinerDemo {
    public static void main(String[] args) {
        String[] names = {"Bob", "Alice", "Grace"}; // Bob,Alice,Grace
        System.out.println(String.join(",", names));
        StringJoiner sj = new StringJoiner(",", "Hello ", "!");
        for (String name: names) {
            sj.add(name);
        }
        System.out.println(sj.toString()); // Hello Bob,Alice,Grace!
    }
}
