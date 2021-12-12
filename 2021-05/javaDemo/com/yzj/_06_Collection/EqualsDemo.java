package com.yzj._06_Collection;

import java.util.List;
import java.util.Objects;

public class EqualsDemo {
    public static void main(String[] args) {
        List<Person> personList = List.of(new Person("Alice"), new Person("Bob"));
        System.out.println(personList.contains(new Person("Bob"))); // true
        System.out.println(personList.indexOf(new Person("Bob"))); // 1
    }

    private static class Person {
        private String name;

        Person(String name) {
            this.name = name;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Person person = (Person) o;
            return Objects.equals(name, person.name);
        }
    }
}
