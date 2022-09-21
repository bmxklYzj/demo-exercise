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