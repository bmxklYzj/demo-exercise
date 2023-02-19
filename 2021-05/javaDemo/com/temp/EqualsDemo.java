package com.temp;

import java.util.ArrayList;
import java.util.List;

public class EqualsDemo {
    public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException {
        Student e1 = new Student("a");

        System.out.println(e1);
        repeat(5, () -> System.out.println("hello"));

        ArrayList<String> strings = new ArrayList<>();
        strings.add("apple");
        strings.add("pear");
        printArr(strings);

        printArr(new ArrayList<>() {
            {
                add("banana");
                add("orange");
            }
        });
    }

    public static void repeat(int n, Runnable action) {
        for (int i = 0; i < n; i++) {
            action.run();
        }
    }

    public static void printArr(List<String> list) {
        System.out.println(list);
    }

}
