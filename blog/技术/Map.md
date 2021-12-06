## Map

## HashMap

`HashMap`之所以能根据`key`直接拿到`value`，原因是它内部通过空间换时间的方法，用一个大数组存储所有`value`，并根据key直接计算出`value`应该存储在哪个索引。

通过`key`计算索引的方式就是调用`key`对象的`hashCode()`方法，它返回一个`int`整数。`HashMap`正是通过这个方法直接定位`key`对应的`value`的索引，继而直接返回`value`。

```ascii
  ┌───┐
0 │   │
  ├───┤
1 │ ●─┼───> Person("Xiao Ming")
  ├───┤
2 │   │
  ├───┤
3 │   │
  ├───┤
4 │   │
  ├───┤
5 │ ●─┼───> Person("Xiao Hong")
  ├───┤
6 │ ●─┼───> Person("Xiao Jun")
  ├───┤
7 │   │
  └───┘
```

因此，要正确使用Map需要保证：

1. 作为key的对象必须正确覆写`equals`方法，相等的key调用equals方法必须返回true
2. 作为key的对象必须正确覆写`hashcode`方法，且满足一下2个条件：
   1. 两个相等的key，他们的`hashcode`**必须相等**
   2. 两个不相等的key，他们的`hashcode`**尽量不要相等**

换种说法即：

1. 如果a和b相等，则`a.equals(b) == true`且`a.hashcode`必须等于`b.hashcode`
2. 如果a和b不相等，则`a.equals(b) == false`且`a.hashcode`尽量不要相等`b.hashcode`

`HashMap`初始化时默认的数组大小只有16，添加超过时每次会翻倍扩容，所以如果map的容量是确定的，应该在创建HashMap时就指定容量：`Map<String, Integer> map = new HashMap<>(1000);`

我们把不同的key具有相同的`hashCode()`情况成为哈希冲突，此时value就会变成一个List

```ascii
  ┌───┐
0 │   │
  ├───┤
1 │   │
  ├───┤
2 │   │
  ├───┤
3 │   │
  ├───┤
4 │   │
  ├───┤
5 │ ●─┼───> List<Entry<String, Person>>
  ├───┤
6 │   │
  ├───┤
7 │   │
  └───┘
```

显然，如果冲突的概率越大，List越长，Map的get效率就会越低。

```java
public class MapDemo {
    public static void main(String[] args) {
        Map<Person, Integer> map = new HashMap<>();

        long startTime = System.currentTimeMillis();
        for (int i = 0; i < 100000; i++) {
            map.put(new Person("firstname", "lastname", i), i);
            map.get(new Person("firstname", "lastname", i));
        }
        System.out.printf("costs: %d", System.currentTimeMillis() - startTime);
    }

}
class Person {
    String firstName;
    String lastName;
    int age;

    public Person(String firstName, String lastName, int age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{" + "firstName='" + firstName + '\'' + ", lastName='" + lastName + '\'' + ", age=" + age + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Person person = (Person) o;
        return age == person.age && Objects.equals(firstName, person.firstName) && Objects.equals(lastName,
            person.lastName);
    }

    @Override
    public int hashCode() {
        int h = 0;
        h = 31 * h + firstName.hashCode();
        h = 31 * h + lastName.hashCode();
        h = 31 * h + age;
        // 当for循环为10000时，return h耗时5ms，return 1耗时1307
        // 当for循环为100000时，return h耗时20ms，return 1半天都跑不出结果。
        // 可见没有覆写hashCode对HashMap是致命的
        return h;
    }
}
```

## EnumMap

HashMap通过key计算`hashCode()`，以空间换时间，但内存有冗余。

如果key是已知固定的enum，则可以使用`EnumMap`，他直接根据enum类型的key定位到内部数组的索引，而不用计算`hashCode()`，效率高且没有空间浪费。

```java
public class EnumMapDemo {
    public static void main(String[] args) {
        Map<DayOfWeek, String> map = new EnumMap<>(DayOfWeek.class);

        map.put(DayOfWeek.MONDAY, "星期一");
        map.put(DayOfWeek.TUESDAY, "星期二");
        map.put(DayOfWeek.WENDESDAY, "三");
        map.put(DayOfWeek.THURSDAY, "星期四");
        map.put(DayOfWeek.FRIDAY, "星期四");
        map.put(DayOfWeek.SATURDAY, "星期六");
        map.put(DayOfWeek.SUNDAY, "星期日");

        System.out.println(map);
        System.out.println(map.get(DayOfWeek.FRIDAY));
    }
}

enum DayOfWeek {
    MONDAY,
    TUESDAY,
    WENDESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY,
}
```

## TreeMap

HashMap是通过计算key的`hashCode()`来直接找到内部数组的下标，由于key对应的`hashCode()`没有规律是乱序的，所以遍历HashMap的时候也是乱序的，只能保证每个key都只遍历一遍，但无法保证顺序。

TreeMap可以保证表里顺序，通过制定Compator指定key的排序规则，可以保证遍历的时候按照key的排序规则来遍历。

> `Comparator`接口要求实现一个比较方法，它负责比较传入的两个元素`a`和`b`，如果`a<b`，则返回负数，通常是`-1`，如果`a==b`，则返回`0`，如果`a>b`，则返回正数，通常是`1`。`TreeMap`内部根据比较结果对Key进行排序。

```java
public class TreeMapDemo {
    public static void main(String[] args) {
        Map<String, Integer> map = new TreeMap<>();
        map.put("apple", 1);
        map.put("pear", 3);
        map.put("orange", 2);

        System.out.println(map);
        for (Map.Entry<String, Integer> entry: map.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        // String 默认已经实现了Compator方法
        // {apple=1, orange=2, pear=3}
        // apple: 1
        // orange: 2
        // pear: 3

        Map<Person, Integer> map2 = new TreeMap<>((o1, o2) -> o1.age - o2.age);
        map2.put(new Person("a", "lastname", 1), 1);
        map2.put(new Person("c", "lastname", 3), 3);
        map2.put(new Person("b", "lastname", 2), 2);

        System.out.println(map2);
        System.out.println(map2.get(new Person("c", "lastname", 3)));
        for (Map.Entry<Person, Integer> entry: map2.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        // 自定义类作为key，必须要实现Compator方法
        // {learn.collect.TreeMapDemo$Person@12edcd21=1, learn.collect.TreeMapDemo$Person@34c45dca=2, learn.collect.TreeMapDemo$Person@52cc8049=3}
        // 3
        // learn.collect.TreeMapDemo$Person@12edcd21: 1
        // learn.collect.TreeMapDemo$Person@34c45dca: 2
        // learn.collect.TreeMapDemo$Person@52cc8049: 3
    }

    static class Person {
        private String firstName;
        private String lastName;
        private int age;

        public Person(String firstName, String lastName, int age) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
        }
    }
}
```

