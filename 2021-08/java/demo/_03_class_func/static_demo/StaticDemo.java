package static_demo;

public class StaticDemo {
    public static void main(String[] args) {
        Person ming = new Person("ming", 18);
        Person.number = 1;
        System.out.println(Person.number);
        Person hong = new Person("hong", 18);
        Person.number = 2;
        System.out.println(Person.number);
    }
}

class Person {
    String name;
    int age;
    public static int number;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

}