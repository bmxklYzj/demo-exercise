import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;

public class Number {
    public static void main(String[] args) {
        System.out.println(5.0 / 0);
        System.out.println(5.0 / -0);
        System.out.println(-5.0 / 0);
        System.out.println(0.0 / 0);

        char zero = '0';
        char A = 'A';
        char a = 'a';
        System.out.println((int) zero);
        System.out.println((int) A);
        System.out.println((int) a);

        String h = "hello";
        String temp = h;
        h = "world";
        System.out.println(h);
        System.out.println(temp);

        Integer[] intArr = new Integer[]{28, 12, 89, 73, 65, 18, 96, 50, 8, 36};
        Arrays.sort(intArr);
        System.out.println(Arrays.toString(intArr));
        Arrays.sort(intArr, Collections.reverseOrder());
        System.out.println(Arrays.toString(intArr));

        String[] stringArr = new String[]{"banana", "apple", "pear"};
        Arrays.sort(stringArr);
        System.out.println(Arrays.toString(stringArr));

        int[][] ns = {
                {1, 2, 3, 4},
                {5, 6},
                {7, 8, 9}
        };
        for (int[] arr : ns) {
            for (int n : arr) {
                System.out.print(n);
            }
            System.out.print('\n');
        }
        System.out.println(ns);
        System.out.println(Arrays.toString(ns));
        System.out.println(Arrays.deepToString(ns));
    }
}
