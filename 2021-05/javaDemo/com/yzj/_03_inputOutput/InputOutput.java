import java.util.Scanner;

public class InputOutput {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    System.out.println("Input your name: ");
    String name = scanner.nextLine();
    System.out.println("Input your age: ");
    int age = scanner.nextInt();

    System.out.printf("%s's age is: %s\n", name, age);
  }
}
