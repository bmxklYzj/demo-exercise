# Java基础-数据类型

[廖雪峰的java教材](https://www.liaoxuefeng.com/wiki/1252599548343744/1260454548196032#0)

## 运行Java程序

在`JAVA_HOME`的`bin`目录(linux下执行`/usr/libexec/java_home -V`查看java安装目录)下找到很多可执行文件：

- java：这个可执行程序其实就是JVM，运行Java程序，就是启动JVM，然后让JVM执行指定的编译后的代码；

- javac：这是Java的编译器，它用于把Java源码文件（以`.java`后缀结尾）编译为Java字节码文件（以`.class`后缀结尾）；

- jar：用于把一组`.class`文件打包成一个`.jar`文件，便于发布；

- javadoc：用于从Java源码中自动提取注释并生成文档；

- jdb：Java调试器，用于开发阶段的运行调试。

可执行文件javac是编译器，而可执行文件java就是虚拟机。
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

### 实操

1. 无包名
   
   在src目录下有`EqualsDemo.java`,`Student.java` java头文件没有包名，前者依赖后者。
   
   执行`javac EqualsDemo.java`则会自动把依赖也编译，再执行java命令则可运行。
   
   ```bash
   ➜  src pwd
   /Users/zongjunyang/Downloads/src
   ➜  src ls
   EqualsDemo.java Student.java
   ➜  src javac EqualsDemo.java 
   ➜  src ls
   EqualsDemo.class EqualsDemo.java  Student.class    Student.java
   ➜  src java EqualsDemo 
   Student{12name='a'}
   ```
   
   1. 有包名
      
      在javaDemo目录下有`com/temp`包，下面有2个java文件，此时执行javac要到包名根目录去执行，java命令要带上全包名                    
      
      ```shell
      ➜  javaDemo git:(master) ✗ ls com/temp 
      EqualsDemo.java Student.java
      ➜  javaDemo git:(master) ✗ javac com/temp/EqualsDemo.java 
      ➜  javaDemo git:(master) ✗ ls com/temp                   
      EqualsDemo.class EqualsDemo.java  Student.class    Student.java
      ➜  javaDemo git:(master) ✗ java com.temp.EqualsDemo 
      Student{12name='a'}
      ```

## 数据类型

Java是一种强类型语言。这就意味着必须为每一个变量声明一种类型。在Java中，一共有8种基本类型（primitive type），其中有4种整型、2种浮点类型、1种用于表示Unicode编码的字符单元的字符类型char和1种用于表示真值的boolean类型。

Java定义了以下几种基本数据类型：

- 整数类型：byte，short，int，long
- 浮点数类型：float，double
- 字符类型：char
- 布尔类型：boolean

不同的数据类型占用的字节数不一样。
我们看一下Java基本数据类型占用的字节数：

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


### byte

计算机内存的最小存储单元是字节（byte），一个字节就是一个8位二进制数，即8个bit。它的二进制表示范围从`00000000~11111111`，换算成十进制是`0~255`，换算成十六进制是`00`~`ff`

### char

`char`类型使用单引号`'`，且仅有一个字符，要和双引号`"`的字符串类型区分开：

```java
 char b = '中';
 String c = "中";
```
Java的char类型除了可表示标准的ASCII外，还可以表示一个Unicode字符：
```java
char a = 'A';
char zh = '中';
System.out.println(a);
System.out.println(zh);
```

### 整型

整数由于存在范围限制，如果计算结果超出了范围，就会产生溢出，而溢出**不会出错**，却会得到一个奇怪的结果:
```java
int x = 2147483640;
int y = 8;
int sum = x + y; // int 最大值为2147483647
System.out.println(sum); // -2147483648
```
移位操作：左移实际上就是不断地×2，右移实际上就是不断地÷2。

### 浮点型
浮点数常常无法精确表示。
由于浮点数存在运算误差，所以比较两个浮点数是否相等常常会出现错误的结果。正确的比较方法是判断两个浮点数之差的绝对值是否小于一个很小的数：
```java
double x = 1.0 / 10;
double y = 1 - 9.0 / 10;
// 观察x和y是否相等:
System.out.println(x); // 0.1
System.out.println(y); // 0.09999999999999998

System.out.println(x == y); // false
System.out.println(Math.abs(x - y) < 0.0000001); // true
```

注意数据转换：如果参与运算的两个数其中一个是整型，一个是浮点型，那么整型可以自动提升到浮点型。如果是两个整型这不会发生类型提升。
```java
int n = 5;
double m = 1.2 + 24.0 / 5; // 6.0
double k = 1.2 + 24 / 5; // 5.2
```

### bool

Java语言对布尔类型的存储并没有做规定，因为理论上存储布尔类型只需要1 bit，但是通常JVM内部会把`boolean`表示为4字节整数。

### 引用类型

引用类型的变量类似于C语言的指针，它内部存储一个“地址”，指向某个对象在内存的位置，
常量：定义变量的时候，如果加上`final`修饰符，这个变量就变成了常量
数组：数组一旦创建后，大小就不可改变。创建数组的两种方式(不能同时指定大小又初始化)：
1. 在创建时候就指定数组长度： `int arr = new int[5];`
2. 直接指定数组的元素，不需要指定数组长度：`char[] arr = new char[]{'a', 'b'};` 或 `char[] arr = {'a', 'b'}`

## 输入输出

```java
System.out.print
System.out.println
System.out.printf

// demo:
double d = 3.1415926;
System.out.printf("%.2f\n", d); // 显示两位小数3.14
System.out.printf("%.4f\n", d); // 显示4位小数3.1416

Scanner scanner = new Scanner(System.in);
scanner.netLine();
scanner.netInt();

// demo:
Scanner scanner = new Scanner(System.in);
System.out.println("input your name");
String name = scanner.nextLine();
System.out.println("input your age");
int age = scanner.nextInt();
System.out.printf("name: %s, age: %d\n", name, age);
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
// 命令行参数由JVM接收用户输入并传给main方法；
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

如果我们自定义了一个构造方法，那么，编译器就不再自动创建默认构造方法

构造方法内部也可以调用其它构造方法，使用`this`

### 方法重载

如果有一系列方法，它们的功能都是类似的，只有参数有所不同，那么，可以把这一组方法名做成*同名*方法。方法重载的返回值类型都是相同的。

举个例子，`String`类提供了多个重载方法`indexOf()`，可以查找子串：

- `int indexOf(int ch)`：根据字符的Unicode码查找；
- `int indexOf(String str)`：根据字符串查找；
- `int indexOf(int ch, int fromIndex)`：根据字符查找，但指定起始位置；
- `int indexOf(String str, int fromIndex)`根据字符串查找，但指定起始位置。

### 继承

没有明确写`extends`的类，编译器会自动加上`extends Object`。所以，任何类，除了`Object`，都会继承自某个类。

Java只允许一个class继承自一个类，因此，一个类有且仅有一个父类。只有`Object`特殊，它没有父类。

任何`class`的构造方法，第一行语句必须是调用父类的构造方法。如果没有明确地调用父类的构造方法，编译器会帮我们自动加一句`super();`
如果父类没有默认的构造方法，子类就必须显式调用super()并给出参数以便让编译器定位到父类的一个合适的构造方法。
这里还顺带引出了另一个问题：即子类不会继承任何父类的构造方法。子类默认的构造方法是编译器自动生成的，不是继承的。

private字段和方法子类不能继承。

一个子类类型安全地变为父类类型的赋值，被称为向上转型（upcasting）
向上转型实际上是把一个子类型安全地变为更加抽象的父类型：
```java
Student s = new Student();
Person p = s; // upcasting, ok
Object o1 = p; // upcasting, ok
Object o2 = s; // upcasting, ok
```
和向上转型相反，如果把一个父类类型强制转型为子类类型，就是向下转型（downcasting）。不能把父类变为子类，因为子类功能比父类多，多的功能无法凭空变出来。
为了避免向下转型出错，Java提供了 `instanceof` 操作符，可以先判断一个实例究竟是不是某种类型。如果一个引用变量为null，那么对任何instanceof的判断都为false。

```java
Person p1 = new Person();
Student s1 = new Student();
System.out.println(p1 instanceof Person); // true
System.out.println(p1 instanceof Student); // false

System.out.println(s1 instanceof Person); // true
System.out.println(s1 instanceof Student); // true
System.out.println(s1 instanceof Object); // true

Student n = null;
System.out.println(n instanceof Student); // false
System.out.println(n instanceof Object); // false
```

继承是is关系，组合是has关系。
重载overload、覆写override：
1. 在继承关系中，子类如果定义了一个与父类方法签名完全相同的方法，被称为覆写（Override）
2. 如果方法签名不同就是重载，重载是一个新方法。如果方法签名相同则是覆写

加上`@Override`可以让编译器帮助检查是否进行了正确的覆写。希望进行覆写，但是不小心写错了方法签名，编译器会报错。但`@Override`不是必须的。
```java
class Person {
    public void run() {}
}

class Student extends Person {
    @Override
    public void run(String s) {} // compile error
}
```

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

多态的特性就是，运行期才能动态决定调用的子类方法。对某个类型调用某个方法，执行的实际方法可能是某个子类的覆写方法。这种不确定性的方法调用，究竟有什么作用？

```java

/**
 * 多态
 */
public class Main {
    public static void main(String[] args) {
        Income[] incomes = new Income[] {
                new Income(10000),
                new FreeLevelIncome(10000),
                new SpecialIncome(10000)
        };
        getTotal(incomes);
    }

    private static void getTotal(Income[] incomes) {
        double total = 0;
        for (Income income : incomes) {
            total += income.calcTax();
        }
        System.out.println(total);
    }
}

class Income {
    double income;

    public Income(double income) {
        this.income = income;
    }

    public double calcTax() {
        return income * 0.1;
    }
}

class FreeLevelIncome extends Income {
    public FreeLevelIncome(double income) {
        super(income);
    }

    @Override
    public double calcTax() {
        double freeLevel = 5000;
        if (income < freeLevel) {
            return 0;
        }
        return (income - freeLevel) * 0.1;
    }
}

class SpecialIncome extends Income {
    public SpecialIncome(double income) {
        super(income);
    }

    @Override
    public double calcTax() {
        return 0;
    }
}
```
仔细观察getTotal方法，只需要和Income打交道，不关心具体是什么类型的Income。如果我们要新增一种稿费收入，只需要从Income派生，然后正确覆写calcTax()方法就可以。把新的类型传入getTotal()，不需要修改任何代码。可见，多态具有一个非常强大的功能，就是允许添加更多类型的子类实现功能扩展，却不需要修改基于父类的代码。

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

这种尽量引用高层类型，避免引用实际子类型的方式，称之为面向抽象编程。
面向抽象编程的本质就是：
- 上层代码只定义规范（例如：abstract class Person）；
- 不需要子类就可以实现业务逻辑（正常编译）；
- 具体的业务逻辑由不同的子类实现，调用者并不关心。

一个`.java`文件只能包含一个`public`类，但可以包含多个非`public`类。如果有`public`类，文件名必须和`public`类的名字相同。

### 接口
如果一个抽象类没有字段，所有方法全部都是抽象方法：

```java
abstract class Person {
    public abstract void run();
    public abstract String getName();
}
```
就可以把该抽象类改写为接口：`interface`。
```java
interface Person {
    void run();
    String getName();
}
```
所谓interface，就是比抽象类还要抽象的纯抽象接口，因为它连字段都不能有。因为接口定义的所有方法默认都是public abstract的，所以这两个修饰符不需要写出来（写不写效果都一样）。
在Java中，一个类只能继承自另一个类，不能从多个类继承。但是，一个类可以实现多个interface。

抽象类和接口的对比如下：
| |abstract class	|interface|
|-----|-----|-----|
|继承|	只能`extends`一个class|	可以`implements`多个interface|
|字段|	可以定义实例字段|	不能定义实例字段|
|抽象方法|	可以定义抽象方法|	可以定义抽象方法|
|非抽象方法|	可以定义非抽象方法|	可以定义default方法|

一个interface可以继承自另一个interface。interface继承自interface使用extends，它相当于扩展了接口的方法。
```java
interface Person {
    String getName();
}

interface Student extends Person {
    String getGrade();
    String getSchool();
}
```
interface中可以有default方法。default方法和抽象类的普通方法是有所不同的。因为interface没有字段，default方法无法访问字段，而抽象类的普通方法可以访问实例字段。

### 静态字段和方法

静态字段和方法都是属于类的，不是属于某个具体实例。所以访问时使用`类名.静态字段`来访问。

因为静态方法属于class而不属于实例，因此，静态方法内部，无法访问this变量，也无法访问实例字段，它只能访问静态字段。
静态方法经常用于工具类。

`interface`的静态字段：`interface`可以有静态字段，且必须是final的
```java
public static final int MALE = 1;
public static final int FEMALE = 2;
```
实际上，因为`interface`的字段只能是`public static final`类型，所以我们可以把这些修饰符都去掉，上述代码可以简写为：

```java
public interface Person {
    // 编译器会自动加上public statc final:
    int MALE = 1;
    int FEMALE = 2;
}
```
编译器会自动把该字段变为`public static final`类型。

### 包

Java编译器最终编译出的`.class`文件只使用*完整类名*，因此，在代码中，当编译器遇到一个`class`名称时：

- 如果是完整类名，就直接根据完整类名查找这个`class`；
- 如果是简单类名，按下面的顺序依次查找：
  - 查找当前`package`是否存在这个`class`；
  - 查找`import`的包是否包含这个`class`；
  - 查找`java.lang`包是否包含这个`class`。

如果按照上面的规则还无法确定类名，则编译报错。



因此，编写class的时候，编译器会自动帮我们做两个import动作：

- 默认自动`import`当前`package`的其他`class`；
- 默认自动`import java.lang.*`。

### 作用域

Java内建的访问权限包括`public`、`protected`、`private`和`package`权限；

- `public`: 可以被其他类访问
- `protected`：默认权限，可被相同包或者继承的子类访问。把方法定义为`package`权限有助于测试，因为测试类和被测试类只要位于同一个`package`，测试代码就可以访问被测试类的`package`权限方法。
- `private`：不能被其他类访问，只能被本类的其它方法访问。嵌套类：如果一个类包含了嵌套类，则嵌套类可以访问该类的private
- `package`：同一个package都可访问。注意，包名必须完全一致，包没有父子关系，`com.apache`和`com.apache.abc`是不同的包。

final

- 修饰calss：防止被继承
- 修饰method：防止被子类覆写
- 修饰field：防止重新赋值
- 修饰局部变量：防止重新赋值

一个`.java`文件只能包含一个public类，且该public类的类名必须和文件名一样。可以包含多个非public类。

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
System.out.println(d9.equals(d10)); // false
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
