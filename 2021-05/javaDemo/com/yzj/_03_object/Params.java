import java.util.Arrays;

public class Params {
    public static void main(String[] args) {
        // 可变参数
        setVariableParams("1", "2");
        // 调用方自己先构造String[]
        setNonVariableParams(new String[] {"1", "2"});

        // 可变参数可以保证无法传入null，因为传入0个参数时，接收到的实际值是一个空数组而不是null
        setVariableParams(); // []
        // 调用方可以传入null
        setNonVariableParams(null); // null
    }

    static void setVariableParams(String... args) {
        System.out.println(Arrays.toString(args));
    }
    static void setNonVariableParams(String[] args) {
        System.out.println(Arrays.toString(args));
    }
}
