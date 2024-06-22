# rust分享

[如何看待 Rust 的应用前景？](https://www.zhihu.com/question/30407715/answer/48032883)

Rust 被证明是可用于大型的、拥有不同层次系统编程知识的开发者团队间协作的高效工具。底层代码中容易出现种种隐晦的 bug，在其他编程语言中，只能通过大量的测试和经验丰富的开发者细心的代码评审来捕获它们。在 Rust 中，编译器充当了守门员的角色，它拒绝编译存在这些难以捕获的 bug 的代码，这其中包括并发 bug。通过与编译器合作，团队将更多的时间聚焦在程序逻辑上，而不是追踪 bug。

Rust 也为系统编程世界带来了现代化的开发工具：

- Cargo，内置的依赖管理器和构建工具，它能轻松增加、编译和管理依赖，并使其在 Rust 生态系统中保持一致。
- Rustfmt 确保开发者遵循一致的代码风格。
- Rust Language Server 为集成开发环境（IDE）提供了强大的代码补全和内联错误信息功能。

通过使用 Rust 生态系统中的这些和其他工具，开发者可以在编写系统层面代码时保持高生产力。

## hello world

![image-20220625183403603](./xxx.png)

```rust
$ cat main.rs
fn main() {
    print!("hello world");
}
```

1. main函数：程序入口

2. `print!`调用了一个 Rust 宏（macro）。如果是调用函数，则应输入 `print`（没有`!`）
3. **大部分** Rust 代码行以分号结尾，但也有例外。



rust是预编译语言，和C/C++/java类似，先是用`rustc`命令调用源文件生成二进制文件，拿着这个二进制文件就能到任意没安装rust的地方运行了。

区别于js，他们属于解释型语言，需要有对应的解释器（或称运行时环境、VM）才能运行起来。

## cargo

Cargo 是 Rust 的构建系统和包管理器。它可以为你处理很多任务，比如构建代码、下载依赖库并编译这些库。

类似js的npm、java的maven。

1. `cargo new [project_name]`：创建一个项目，tata，包含下面3个文件

   	1. `src/main.rs`: 入口文件
   	
   	1. `Cargo.toml`: 使用toml语法声明项目基本信息、依赖及其版本号
   	
   	1. `Cargo.lock`：锁定依赖版本，无需手动管理。你是否想起了`package-lock.json/yarn.lock` ？

`cargo build`：编译

`cargo run`：编译并运行。多次build和run如果源码没变会智能地跳过编译。

`cargo build --release`：打包生产环境可执行文件

`cargo check` ：快速检查代码确保其可以编译，但并不产生可执行文件。适合在开发时候快速得到反馈

## 运行

新建main.ts

```rust
fn main() {
    println!("hello world!");
}
```

`rustc main.ts; ./main.exe`

即可打印helloworld，和C很像。

`main` 函数是一个特殊的函数：在可执行的 Rust 程序中，它总是最先运行的代码。

`println!` 调用了一个 Rust 宏（macro）。如果是调用函数，则应输入 `println`（没有`!`）

现在你只需记住，当看到符号 `!` 的时候，就意味着调用的是宏而不是普通函数。

如果你更熟悉动态语言，如 Ruby、Python 或 JavaScript，则可能不习惯将编译和运行分为两个单独的步骤。Rust 是一种 **预编译静态类型**（*ahead-of-time compiled*）语言，这意味着你可以编译程序，并将可执行文件送给其他人，他们甚至不需要安装 Rust 就可以运行。



如果是单个rust文件可以使用rustc命令来编译，但随着项目规模的扩大，以及依赖库的加入，就需要使用工具来管理打包。

rust使用cargo：

创建一个cargo项目： `cargo new projectName`

编译项目：`cargo build`

编译并运行项目：`cargo run`

## syntax

```rust
let foo = bar;
```

这行代码新建了一个叫做 `foo` 的变量并把它绑定到值 `bar` 上。在 Rust 中，变量默认是不可变的。我们将会在第三章的 [“变量与可变性”](https://kaisery.github.io/trpl-zh-cn/ch03-01-variables-and-mutability.html#variables-and-mutability) 部分详细讨论这个概念。下面的例子展示了如何在变量名前使用 `mut` 来使一个变量可变：

```rust
let foo = 5; // 不可变
let mut bar = 5; // 可变
```

rust 有一个静态强类型系统，同时也有类型推断。当我们写出 `let guess = String::new()` 时，Rust 推断出 `guess` 应该是 `String` 类型，并不需要我们写出类型。



### 变量

变量默认是不可变的，如下代码会报错`cannot assign twice to immutable variable`

```rust
fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    x = 6;
    println!("The value of x is: {}", x);
}
```

变量隐藏：

可以使用let来隐藏变量，他会创建新的变量，只是复用了之前的变量名。因此类型可以修改，可以避免代码中出现诸如`str`,`str_length`这样的变量名称

ex1:

```rust
let y = 5;
let y = y + 1;
let y = y * 2;
println!("The value of y is: {}", y); // 12
```

ex2:

```rust
let spaces = "     ";
let spaces = spaces.len();
println!("The value of spaces is: {}", spaces); // 5
```

**注意，使用let来变量隐藏、mut之间的区别：**

这里允许第一个 `spaces` 变量是字符串类型，而第二个 `spaces` 变量，它是一个恰巧与第一个变量同名的崭新变量，是数字类型。隐藏使我们不必使用不同的名字，如 `spaces_str` 和 `spaces_num`；相反，我们可以复用 `spaces` 这个更简单的名字。然而，如果尝试使用 `mut`，将会得到一个编译时错误，如下所示：

```rust
let mut spaces = "   ";
spaces = spaces.len();
```

这个错误说明，我们不能改变变量的类型：

```
error[E0308]: mismatched types
  --> src\main.rs:19:11
   |
19 |     str = str.len();
   |           ^^^^^^^^^ expected `&str`, found `usize`
```

### 数据类型

Rust 是 **静态类型**（*statically typed*）语言，也就是说在编译时就必须知道所有变量的类型。根据值及其使用方式，编译器通常可以推断出我们想要用的类型。

当多种类型均有可能时，比如第二章的 [“比较猜测的数字和秘密数字”](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html#comparing-the-guess-to-the-secret-number) 使用 `parse` 将 `String` 转换为数字时，必须增加类型注解。

- 标量（scalar）:代表一个单独的值

  - 整型

    isize、usize

  - 浮点型

  - 布尔类型

  - 字符类

    注意 `char` 由单引号指定，不同于字符串使用双引号。

- 复合（compound）

  - 元组（tuple）: 元组是一个将多个其他类型的值组合进一个复合类型的主要方式。元组长度固定：一旦声明，其长度不会增大或缩小。

    ```rust
    // 定义元组：类型声明可选，会有推断的默认值
    let tup: (i32, f32, u8) = (500, 2.1, 1);
    // 获取元组的值2中方式：
    // 1. 解构
    let (_, _, tup3) = tup;
    // 2. 使用点号后跟值的索引
    let tup2 = tup.1;
    println!("tup2: {}, tup3: {}", tup2, tup3); // 2.1 1
    ```

  - 数组（array）:与元组不同，数组中的每个元素的类型必须相同。Rust 中的数组与一些其他语言中的数组不同，因为 Rust 中的数组是固定长度的：一旦声明，它们的长度不能增长或缩小。可变长度请使用vector

    ```rust
    let arr = [0, 1, 2, 3, 4, 5];
    let element = arr[1];
    let arr2 = [2; 5];
    println!("The value of element: {}", element);
    println!("The value of arr2: {}", arr2[0]);
    ```

### 函数

```rust
fn main() {
    println!("hello world!");

    let x = 32;
    another_function(x);
}

fn another_function(x: i32) {
    println!("The value is: {}", x);
}
```

源码中 `another_function` 定义在 `main` 函数 **之后**；也可以定义在之前。Rust 不关心函数定义于何处，只要定义了就行。

函数可以向调用它的代码返回值。我们并不对返回值命名，但要在箭头（`->`）后声明它的类型。在 Rust 中，函数的返回值等同于函数体最后一个表达式的值。

```rust
fn five() -> i32 {
    5
    // 等价于 return 5;
}

fn main() {
    let x = five();

    println!("The value of x is: {}", x);
}
```

### 控制流

```rust
let num = 7;
if num < 5 {
    println!("number < 5");
} else {
    println!("number >= 5");
}
```

不像 Ruby 或 JavaScript 这样的语言，Rust 并不会尝试自动地将非布尔值转换为布尔值。必须总是显式地使用布尔值作为 if 的条件。

```rust
// Error: expected `bool`, found integerif num {    println!("number < 5");} else {    println!("number >= 5");}
```

在let语句中使用if：因为 `if` 是一个表达式，我们可以在 `let` 语句的右侧使用它

```rust
let condition = true;
let num2 = if condition {
  5
} else {
  6
};
println!("num2: {}", num2); // 5
```

`if` 的每个分支的可能的返回值都必须是相同类型



#### 循环： `loop`、`while` 和 `for`

Loop中可使用break返回，并且break可以返回值

```rust
let mut cnt = 0;
let result = loop {
  if cnt >= 5 {
    break cnt * 2;
  }
  cnt = cnt + 1;
  println!("loop: {}", cnt);
};

println!("result: {}", result); // 10
```

while:

```rust
fn fn_while() {
  let mut cnt = 5;
  while cnt != 0 {
    println!("cnt: {}", cnt);
    cnt -= 1;
  }
}
```

for: 不需要关心数组长度，可以避免越界等问题

```rust
fn _fn_for() {
  let arr = [0, 1, 2, 3, 4];
  for element in arr.iter() {
    println!("element: {}", element);
  }
  println!("end");
}
```

### 