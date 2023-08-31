public class Demo {
    public static void main(String[] args) {
        Person p1 = new Student();
        p1.run();
    }
}

class Person {
    private String name;
    public void run() {
        System.out.println("person run");
    }

    @Override
    public String toString() {
        return "Person name:" + name;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Person) {
            return name.equals(((Person) obj).name);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }

    
}

class Student extends Person {
    @Override
    public void run() {
        System.out.println("student run");
    }
}
