package com.yzj._04_javaCore;

import java.util.Arrays;
import java.util.stream.Collectors;

public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder(1024);
        sb.append("MR ")
                .append("Bob")
                .append("!")
                .insert(0, "Hello, ");
        System.out.println(sb); // Hello, MR Bob!

        String[] fields = {"name", "position", "salary"};
        String table = "employee";
        String insert = buildInsertSql(table, fields);
        System.out.println(insert);
        String s = "INSERT INTO employee (name, position, salary) VALUES (?, ?, ?)";
        System.out.println(s.equals(insert) ? "测试成功" : "测试失败");
    }

    static String buildInsertSql(String table, String[] fields) {
        StringBuilder sb = new StringBuilder();
        sb.append("INSERT INTO ")
                .append(table)
                .append(" (")
                .append(Arrays.stream(fields).collect(Collectors.joining((", "))))
                .append(") VALUES ")
                .append("(?, ?, ?)");
        return sb.toString();
    }
}
