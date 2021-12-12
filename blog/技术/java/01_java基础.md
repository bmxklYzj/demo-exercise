# Java基础-数据类型

## 运行Java程序

在`JAVA_HOME`的`bin`目录下找到很多可执行文件：

- java：这个可执行程序其实就是JVM，运行Java程序，就是启动JVM，然后让JVM执行指定的编译后的代码；

- javac：这是Java的编译器，它用于把Java源码文件（以`.java`后缀结尾）编译为Java字节码文件（以`.class`后缀结尾）；

- jar：用于把一组`.class`文件打包成一个`.jar`文件，便于发布；

- javadoc：用于从Java源码中自动提取注释并生成文档；

- jdb：Java调试器，用于开发阶段的运行调试。

  

```ascii
┌──────────────────┐
│    Hello.java    │<─── javac命令`javac Hell.java` -> Hello.class:源代码->字节码
└──────────────────┘
          │ compile
          ▼
┌──────────────────┐
│   Hello.class    │<─── java命令 `java Hello`: 执行字节码
└──────────────────┘
          │ execute
          ▼
┌──────────────────┐
│    Run on JVM    │
└──────────────────┘
```

## 数据类型

Java是一种强类型语言。这就意味着必须为每一个变量声明一种类型。在Java中，一共有8种基本类型（primitive type），其中有4种整型、2种浮点类型、1种用于表示Unicode编码的字符单元的字符类型char和1种用于表示真值的boolean类型。

Java定义了以下几种基本数据类型：

- 整数类型：byte，short，int，long
- 浮点数类型：float，double
- 字符类型：char
- 布尔类型：boolean



不同的数据类型占用的字节数不一样。我们看一下Java基本数据类型占用的字节数：

```ascii
       ┌───┐
  byte │   │
       └───┘
       ┌───┬───┐
 short │   │   │
       └───┴───┘
       ┌───┬───┬───┬───┐
   int │   │   │   │   │
       └───┴───┴───┴───┘
       ┌───┬───┬───┬───┬───┬───┬───┬───┐
  long │   │   │   │   │   │   │   │   │
       └───┴───┴───┴───┴───┴───┴───┴───┘
       ┌───┬───┬───┬───┐
 float │   │   │   │   │
       └───┴───┴───┴───┘
       ┌───┬───┬───┬───┬───┬───┬───┬───┐
double │   │   │   │   │   │   │   │   │
       └───┴───┴───┴───┴───┴───┴───┴───┘
       ┌───┬───┐
  char │   │   │
       └───┴───┘
```

![image-20210530171656081](https://tva1.sinaimg.cn/large/008i3skNly1gr0koeay0yj315209yjuy.jpg)

### byte

计算机内存的最小存储单元是字节（byte），一个字节就是一个8位二进制数，即8个bit。它的二进制表示范围从`00000000`~`11111111`，换算成十进制是0~255，换算成十六进制是`00`~`ff`

### char

`char`类型使用单引号`'`，且仅有一个字符，要和双引号`"`的字符串类型区分开：

```
 char b = '中';
 String c = "中国";
```

### bool

Java语言对布尔类型的存储并没有做规定，因为理论上存储布尔类型只需要1 bit，但是通常JVM内部会把`boolean`表示为4字节整数。

### 引用类型

引用类型的变量类似于C语言的指针，它内部存储一个“地址”，指向某个对象在内存的位置，



常量：定义变量的时候，如果加上`final`修饰符，这个变量就变成了常量



注意数据转换：如果参与运算的两个数其中一个是整型，一个是浮点型，那么整型可以自动提升到浮点型。如果是两个整型这不会发生类型提升。

```
int n = 5;
double m = 1.2 + 24.0 / 5; // 6.0
double k = 1.2 + 24 / 5; // 5.2
```



数组：数组一旦创建后，大小就不可改变。创建数组的两种方式(不能同时指定大小又初始化)：

1. 在创建时候就指定数组长度： `int arr = new int[5];`
2. 直接指定数组的元素，不需要指定数组长度：`char[] arr = new char[]{'a', 'b'};` 或 `char[] arr = {'a', 'b'}`

## 输入输出

```java
System.out.print
System.out.println
System.out.printf

Scanner scanner = new Scanner(System.in);
scanner.netLine();
scanner.netInt();
```

## 数组

```java

int[] arr = { 0, 1, 2, 3, 4, 5 };
/*********数组遍历的两种方式：************/
// 1. 使用下标
for (int i = 0; i < arr.length; i++) {
  System.out.println(i);
}

// 2. 使用for each直接迭代数组元素
for (int item: arr) {
  System.out.println(item);
}

/********* 打印数组 Arrays.toString ************/
// 直接打印数组变量，得到的是地址
System.out.println(arr);
// 快速打印数组内容
System.out.println(Arrays.toString(arr));

/********* 数组排序 Arrays.sort ************/
int[] arr2 = {3, 2, 4, 1};
System.out.println(arr2); // 数组的指向不便，但数组元素的指向可能会变（如数组元素为string）
Arrays.sort(arr2); // 改变原数组，无返回值
System.out.println(arr2);
System.out.println(Arrays.toString(arr2));

/********* 多维数组打印 Arrays.deepToString ************/
int[][] arr3 = {
  {1, 2, 3},
  {4, 5, 6},
  {7, 8},
  {9}
};
System.out.println(Arrays.deepToString(arr3));

/********* 接收命令行参数 ************/
System.out.println(Arrays.toString(args));
for (String arg: args) {
  if (arg.equals("-version")) {
    System.out.println("0.0.1");
  }
}
```

## 类

### this

在方法内部，可以使用一个隐含的变量`this`，它始终指向当前实例。因此，通过`this.field`就可以访问当前实例的字段。如果没有命名冲突，可以省略`this`。例如：

```java
class Person {
    private String name;

    public String getName() {
        return name; // 相当于this.name
    }
}
```

### 函数

可变参数：

```java
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
```

### 构造函数

由于构造方法是如此特殊，所以构造方法的名称就是类名。构造方法的参数没有限制，在方法内部，也可以编写任意语句。但是，和普通方法相比，构造方法没有返回值（也没有`void`），调用构造方法，必须用`new`操作符。

任何`class`都有构造方法，如果一个类没有定义构造方法，编译器会自动为我们生成一个默认构造方法，它没有参数，也没有执行语句，类似这样：

```java
class Person {
    public Person() {
    }
}
```

可以定义多个构造方法，编译器根据参数自动判断。

构造方法内部也可以调用其它构造方法，使用`this`

### 方法重载

如果有一系列方法，它们的功能都是类似的，只有参数有所不同，那么，可以把这一组方法名做成*同名*方法。方法重载的返回值类型通常都是相同的。

举个例子，`String`类提供了多个重载方法`indexOf()`，可以查找子串：

- `int indexOf(int ch)`：根据字符的Unicode码查找；
- `int indexOf(String str)`：根据字符串查找；
- `int indexOf(int ch, int fromIndex)`：根据字符查找，但指定起始位置；
- `int indexOf(String str, int fromIndex)`根据字符串查找，但指定起始位置。

### 继承

没有明确写`extends`的类，编译器会自动加上`extends Object`。所以，任何类，除了`Object`，都会继承自某个类。

Java只允许一个class继承自一个类，因此，一个类有且仅有一个父类。只有`Object`特殊，它没有父类。

任何`class`的构造方法，第一行语句必须是调用父类的构造方法。如果没有明确地调用父类的构造方法，编译器会帮我们自动加一句`super();`



private字段和方法子类不能继承。

继承是is关系，组合是has关系。



重载overload、覆写override：

在继承关系中，子类如果定义了一个与父类方法签名完全相同的方法，被称为覆写（Override）

如果方法签名不同就是重载，重载是一个新方法。如果方法签名相同则是覆写



### 多态

Java的实例方法调用是基于运行时的实际类型的动态调用，而非变量的声明类型。

这个非常重要的特性在面向对象编程中称之为多态。它的英文拼写非常复杂：Polymorphic。

```java
public class Main {
    public static void main(String[] args) {
        Person p = new Student();
        p.run(); // 应该打印Person.run还是Student.run?
    }
}

class Person {
    public void run() {
        System.out.println("Person.run");
    }
}

class Student extends Person {
    @Override
    public void run() {
        System.out.println("Student.run");
    }
}

// student.run
```



[报税的例子](https://www.liaoxuefeng.com/wiki/1252599548343744/1260455778791232)说明多态具有一个非常强大的功能，就是允许添加更多类型的子类实现功能扩展，却不需要修改基于父类的代码。



`final`修饰符有多种作用：

- `final`修饰的方法可以阻止被覆写；
- `final`修饰的class可以阻止被继承；
- `final`修饰的field必须在创建对象时初始化，随后不可修改。



### 抽象方法

如果父类的方法本身不需要实现任何功能，仅仅是为了定义方法签名，目的是让子类去覆写它，那么可以把父类的方法声明为抽象方法：

```java
abstract class Person {
    public abstract void run();
}
```

无法实例化的抽象类有什么用？

因为抽象类本身被设计成只能用于被继承，因此，抽象类可以强迫子类实现其定义的抽象方法，否则编译会报错。因此，抽象方法实际上相当于定义了“规范”。



一个`.java`文件只能包含一个`public`类，但可以包含多个非`public`类。如果有`public`类，文件名必须和`public`类的名字相同。



## java核心类

### 字符串String

```java
// 实际上字符串在String内部是通过一个char[]数组表示的，因此，按下面的写法也是可以的：
String s1 = "hello!";
String s2 = new String(new char[] {'h', 'e', 'l', 'l', 'o', '!'});
System.out.println(s1 == s2); // false
System.out.println(s1.equals(s2)); // true

// 字符串不可变
String s3 = "Hello";
System.out.println(s3); // Hello
String s4 = s3.toUpperCase();
System.out.println(s3); // Hello
System.out.println(s4); // HELLO

// 字符串是引用类型，比较要用equals
String s5 = "hello";
String s6 = "hello";
// 这里的相等仅仅是巧合，编译期间会把所有相同字符串当成一个对象放入常量池，千万不要依赖此特性
System.out.println(s5 == s6); // true
System.out.println(s5.equals(s6)); // true

String s7 = "hello";
String s8 = "HELLO".toLowerCase(Locale.ROOT);
System.out.println(s7 == s8); // false
System.out.println(s7.equals(s8)); // true

/**
* 若干api方法：
* contains
* indexOf
* lastIndexOf
* startsWith
* endsWith
* substring
* trim
* strip 类似中文的空格字符\u3000也会被移除
* stripLeading
* stripTrailing
* isEmpty 是否equals ""
* isBlank 是否全为空白字符
* replace
* replaceAll
* split
* formatted/String.fromat 格式化
*/	

// 任意类型转字符串
List<String> strings = Arrays.asList(
  String.valueOf(123),
  String.valueOf(12.3),
  String.valueOf(true),
  String.valueOf(new Object())
);
System.out.println(strings);

// 字符串转其它类型
System.out.println(Integer.parseInt("123"));
System.out.println(Double.parseDouble("12.3"));
System.out.println(Boolean.parseBoolean("TRue"));
```



StringBuilder:

```java
StringBuilder sb = new StringBuilder(1024);
sb.append("MR ")
        .append("Bob")
        .append("!")
        .insert(0, "Hello, ");
System.out.println(sb); // Hello, MR Bob!
```

StringJoiner/String.join

```java
String[] names = {"Bob", "Alice", "Grace"};
System.out.println(String.join(",", names)); // Bob,Alice,Grace
StringJoiner sj = new StringJoiner(",", "Hello ", "!");
for (String name: names) {
  sj.add(name);
}
System.out.println(sj.toString()); // Hello Bob,Alice,Grace!
```

### 枚举

```java
enum Color {
    Red, Blue, Green
}

enum WeekDay {
    Sun,
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat,
}

enum WeekDay2 {
    Sun(0, "星期日"),
    Mon(1, "星期一"),
    Tue(2, "星期二"),
    Wed(3, "星期三"),
    Thu(4, "星期四"),
    Fri(5, "星期五"),
    Sat(6, "星期六");

    private final int dayValue;
    private final String chinese;

    private WeekDay2(int dayValue, String chinese) {
        this.dayValue = dayValue;
        this.chinese = chinese;
    }

    @Override
    public String toString() {
        return this.chinese;
    }
}

public class EnumDemo {
    public static void main(String[] args) {
        System.out.println(Color.Blue.ordinal());

        WeekDay day = WeekDay.Sat;
        System.out.println(day); // Sat
        System.out.println(day.name()); // Sat
        System.out.println(day.toString()); // Sat
        System.out.println(day.ordinal()); // 6

        WeekDay2 day2 = WeekDay2.Sat;
        System.out.println(day2); // 星期六
        System.out.println(day2.name()); // Sat
        System.out.println(day2.toString()); // 星期六
        System.out.println(day2.ordinal()); // 6
    }
}
```

通过`name()`获取常量定义的字符串，注意不要使用`toString()`；

通过`ordinal()`返回常量定义的顺序（无实质意义），尽量不要使用，定义顺序改变会导致变化；

可以为`enum`编写构造方法、字段和方法

### BigInteger

`BigInteger`和`Integer`、`Long`一样，也是不可变类，并且也继承自`Number`类。因为`Number`定义了转换为基本类型的几个方法：

- 转换为`byte`：`byteValue()`
- 转换为`short`：`shortValue()`
- 转换为`int`：`intValue()`
- 转换为`long`：`longValue()`
- 转换为`float`：`floatValue()`
- 转换为`double`：`doubleValue()`

因此，通过上述方法，可以把`BigInteger`转换成基本类型。如果`BigInteger`表示的范围超过了基本类型的范围，转换时将丢失高位信息，即结果不一定是准确的。如果需要准确地转换成基本类型，可以使用`intValueExact()`、`longValueExact()`等方法，在转换时如果超出范围，将直接抛出`ArithmeticException`异常。

```java
BigInteger i1 = new BigInteger("2147483647");
BigInteger i2 = new BigInteger("214748364712");
BigInteger sum = i1.add(i2);
System.out.println(sum);

System.out.println(i2.longValue());
System.out.println(i2.multiply(i2).longValueExact()); // 抛异常 ArithmeticException
```

### BigDecimal

对`BigDecimal`做加、减、乘时，精度不会丢失，但是做除法时，存在无法除尽的情况，这时，就必须指定精度以及如何进行截断。

在比较两个`BigDecimal`的值是否相等时，要特别注意，使用`equals()`方法不但要求两个`BigDecimal`的值相等，还要求它们的`scale()`相等，必须使用`compareTo()`方法来比较，它根据两个值的大小分别返回负数、正数和`0`，分别表示小于、大于和等于。

```java
BigDecimal d2 = new BigDecimal("123.45");
BigDecimal d3 = new BigDecimal("123.4500");
BigDecimal d4 = new BigDecimal("12345");
BigDecimal d5 = new BigDecimal("1234500");
System.out.println(d2.scale()); // 2
System.out.println(d3.scale()); // 4
System.out.println(d4.scale()); // 0
BigDecimal d5_ = d5.stripTrailingZeros();
System.out.println(d5.scale()); // 0
System.out.println(d5_.scale()); // 02

BigDecimal d6 = new BigDecimal("123.456");
BigDecimal d7 = new BigDecimal("23.456789");
// 除不尽的情况，必须指定精度和mode
BigDecimal d8 = d6.divide(d7, 10, RoundingMode.HALF_UP);
System.out.println(d8);

// 比较不能用equals，要用compareTo
BigDecimal d9 = new BigDecimal("123.456");
BigDecimal d10 = new BigDecimal("123.45600");
System.out.println(d9.equals(d10)); // true
System.out.println(d9.equals(d10.stripTrailingZeros())); // false
System.out.println(d9.compareTo(d10)); // 0
```

## 异常处理

Java的异常是`class`，它的继承关系如下：

```ascii
                     ┌───────────┐
                     │  Object   │
                     └───────────┘
                           ▲
                           │
                     ┌───────────┐
                     │ Throwable │
                     └───────────┘
                           ▲
                 ┌─────────┴─────────┐
                 │                   │
           ┌───────────┐       ┌───────────┐
           │   Error   │       │ Exception │
           └───────────┘       └───────────┘
                 ▲                   ▲
         ┌───────┘              ┌────┴──────────┐
         │                      │               │
┌─────────────────┐    ┌─────────────────┐┌───────────┐
│OutOfMemoryError │... │RuntimeException ││IOException│...
└─────────────────┘    └─────────────────┘└───────────┘
                                ▲
                    ┌───────────┴─────────────┐
                    │                         │
         ┌─────────────────────┐ ┌─────────────────────────┐
         │NullPointerException │ │IllegalArgumentException │...
         └─────────────────────┘ └─────────────────────────┘
```

从继承关系可知：`Throwable`是异常体系的根，它继承自`Object`。`Throwable`有两个体系：`Error`和`Exception`，`Error`表示严重的错误，程序对此一般无能为力。



JVM在捕获到异常后，会从上到下匹配`catch`语句，匹配到某个`catch`后，执行`catch`代码块，然后*不再*继续匹配。简单地说就是：多个`catch`语句只有一个能被执行。

存在多个`catch`的时候，`catch`的顺序非常重要：子类必须写在前面。

如果一个方法捕获了某个异常后，又在`catch`子句中抛出新的异常，就相当于把抛出的异常类型“转换”了。新的异常丢失了原始异常信息，会导致看不到原始异常，此时抛出新异常需要把原始异常加上。

2个提问：

在`try`或者`catch`语句块中抛出异常，`finally`语句是否会执行？在`catch`中抛出异常，不会影响`finally`的执行。JVM会先执行`finally`，然后抛出异常。

如果在执行`finally`语句时抛出异常，那么，`catch`语句的异常还能否继续抛出？`finally`抛出异常后，原来在`catch`中准备抛出的异常就“消失”了，因为只能抛出一个异常。没有被抛出的异常称为“被屏蔽”的异常（Suppressed Exception）。需要调用addSuppressed，把原始异常添加进来，最后在`finally`抛出。

## 日志

日志是为了替代`System.out.println()`，可以定义格式，重定向到文件等；

日志可以存档，便于追踪问题；

日志记录可以按级别分类，便于打开或关闭某些级别；

可以根据配置文件调整日志，无需修改代码；

Java标准库提供了`java.util.logging`来实现日志功能。





TODO：

- 数组和list的区别
