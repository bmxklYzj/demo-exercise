import java.util.Arrays;

public class Array {
  public static void main(String[] args) {
    int[] arr = { 0, 1, 2, 3, 4, 5 };
    /*********数组遍历的两种方式：************/
    // 1. 使用下标
    for (int i = 0; i < arr.length; i++) {
      System.out.println(i);
    }

    // 2. 使用for each直接迭代数组元素
    for (int item: arr) {
      System.out.println(item);
    }

    /********* 打印数组 Arrays.toString ************/
    // 直接打印数组变量，得到的是地址
    System.out.println(arr);
    // 快速打印数组内容
    System.out.println(Arrays.toString(arr));

    /********* 数组排序 Arrays.sort ************/
    int[] arr2 = {3, 2, 4, 1};
    System.out.println(arr2); // 数组的指向不便，但数组元素的指向可能会变（如数组元素为string）
    Arrays.sort(arr2); // 改变原数组，无返回值
    System.out.println(arr2);
    System.out.println(Arrays.toString(arr2));

    /********* 多维数组打印 Arrays.deepToString ************/
    int[][] arr3 = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8},
        {9}
    };
    System.out.println(Arrays.deepToString(arr3));

    /********* 接收命令行参数 ************/
    System.out.println(Arrays.toString(args));
    for (String arg: args) {
      if (arg.equals("-version")) {
        System.out.println("0.0.1");
      }
    }
  }
}
