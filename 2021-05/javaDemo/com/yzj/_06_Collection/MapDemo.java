package com.yzj._06_Collection;

import java.util.HashMap;
import java.util.Map;

public class MapDemo {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("apple", 123);
        map.put("pear", 456);
        map.put("orange", null);

        System.out.println(map.put("banana", 789)); // null
        // put key已存在
        System.out.println(map.put("pear", 789)); // 456
        System.out.println(map.put("orange", 789)); // null
        System.out.println(map);

        // map的遍历
        for (Map.Entry entry: map.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}
