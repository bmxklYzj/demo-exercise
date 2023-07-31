import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

public class Demo {
    public static void main(String[] args) {
        Persons p1 = new Persons();
        p1.setNames(new String[] { "Alice" });
        p1.setNames(new String[] { "Alice", "Bob" });
        p1.setNames(new String[] {});
        p1.setNames(null);

        p1.setNames2("Alice");
        p1.setNames2("Alice", "Bob");
        p1.setNames2();
        p1.setNames2(null);
    }
}

class Persons {
    private String[] names;

    public String[] getNames() {
        return names;
    }

    public void setNames(String[] names) {
        if (names == null) {
            System.out.println("names null");
        }
        System.out.println(Arrays.toString(names));
    }

    public void setNames2(String... names) {
        if (names == null) {
            System.out.println("names null");
        }
        System.out.println(Arrays.toString(names));
    }
}