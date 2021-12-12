package com.yzj._06_Collection;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class ListDemo {
    public static void main(String[] args) {
        // 数组 长度不可变
        String[] arr = new String[]{"apple", "pear", "banana"};
        System.out.println(Arrays.toString(arr));

        // list可以添加重复元素和`null`
        List<String> list = new ArrayList<>();
        list.add("apple");
        list.add("pear");
        list.add("apple");
        list.add(null);
        System.out.println(list);

        // 使用iterator遍历list
        for (Iterator<String> ite = list.iterator(); ite.hasNext(); ) {
            String item = ite.next();
            System.out.println(item);
        }
        // foreach循环内部
        for (String item : list) {
            System.out.println(item);
        }

        // List转array
        List<Integer> list1 = List.of(1, 2, 3);
        Object[] nums2 = list1.toArray(); // 注意toArray没传类型得到的是Object
        System.out.println(Arrays.toString(nums2));

        Integer[] nums3 = list1.toArray(new Integer[3]);
        System.out.println(Arrays.toString(nums3));

        Integer[] nums4 = list1.toArray(new Integer[list1.size()]);
        System.out.println(Arrays.toString(nums4));

        Integer[] nums5 = list1.toArray(Integer[]::new);
        System.out.println(Arrays.toString(nums5));

        // array转List
        Integer[] array = new Integer[] {1, 2, 3, 4};

        List<Integer> list2 = List.of(array);
        System.out.println(list2);
        // list2.add(5); // 错误用法，List.of 返回的是 ImmutableCollections

        List<Integer> list3 = Arrays.asList(array);
        System.out.println(list3);
        // list2.add(5); // 错误用法，Arrays.asList 返回的是 一个内部类ArrayList，没有实现add等mutable操作

    }
}
