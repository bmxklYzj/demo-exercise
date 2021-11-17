public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("hello world");

        // 整数的除法对于除数为0时运行时将报错，但编译不会报错。
        // System.out.println(5 / 0);

        // int x = 2147483647;
        // int y = 1;
        // int sum = x + y;
        // System.out.println(sum); // -2147483641

        // double x = 1.0 / 10;
        // double y = 1 - 9.0 / 10;
        // // 观察x和y是否相等:
        // System.out.println(x);
        // System.out.println(y);

        // char a = 'A';
        // char a1 = '中';
        // System.out.println((int) a);
        // System.out.println((int) a1);
        // char c3 = '\u0041';
        // System.out.println(c3);

        // 创建数组的2中方式
        int[] arr = new int[5];
        int[] arr2 = new int[] {1, 2, 3};
        int[] arr3 = {1, 2};
        System.out.printf("%s, %s, %s\n", arr, arr2, arr3);
    }
}