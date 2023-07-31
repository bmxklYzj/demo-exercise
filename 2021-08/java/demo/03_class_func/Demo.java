public class Demo {
    public static void main(String[] args) {
        Person p1 = new Student();
        p1.run();
    }
}

class Person {
    public void run() {
        System.out.println("person run");
    }
}

class Student extends Person {
    @Override
    public void run() {
        System.out.println("student run");
    }
}
