public abstract class AbstractDemo {
    public static void main(String[] args) {
        Student s = new Student("student");
        s.run();
    }
}

interface Person {
    String getName();
    default void run() {
        System.out.println(getName() + ": run.");
    }
}

class Student implements Person {
    private String name;
    
    public Student(String name) {
      this.name = name;
    }
    
    public String getName() {
        return name;
    }
}

