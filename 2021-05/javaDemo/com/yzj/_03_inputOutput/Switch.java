public class Switch {
  public static void main(String[] args) {
    String fruit = "apple";
    switch (fruit) {
      case "apple" -> System.out.println("Selected apple");
      case "pear" -> System.out.println("Selected pear");
      case "mango" -> {
        System.out.println("Selected mango");
        System.out.println("Good choice!");
      }
      default -> System.out.println("No fruit selected");
    }

    String fruit2 = "banana";
    int opt = switch (fruit2) {
      case "apple" -> 1;
      case "pear" -> 2;
      default -> {
        int code = fruit.hashCode();
        yield code;
      }
    };
    System.out.printf("opt: %s\n", opt);
  }
}
