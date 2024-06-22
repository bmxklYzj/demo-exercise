# springboot

## 创建项目

1. 使用 spring initializr 在线网站创建

   [配置好的压缩包](https://start.spring.io/#!type=maven-project&language=java&platformVersion=3.3.1&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=springdemo&name=springdemo&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.springdemo&dependencies=web)

   解压后idea 打开，新建一个 controller目录用于放rest 请求

   ```java
   // controller/HelloWorld
   
   package com.example.springdemo.controller;
   
   import org.springframework.stereotype.Controller;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.ResponseBody;
   
   @Controller
   public class HelloWorld {
       @RequestMapping("/hello")
       @ResponseBody
       public String hello() {
           return "hello spring";
       }
   }
   ```

   启动后浏览器打开`http://localhost:8080/hello`

   

   热更新：仅仅是修改了代码帮你自动重启，虽然比手动重新运行更方便了，但跟前端的 hot-module-replace 局部更新完全不是一个速度。

   1. pom.xml配置

      ```xml
      <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
      </dependency>
      ```

   2. 修改2处 idea配置**并重启**

      ![image-20240623004235820](https://p.ipic.vip/lkts9z.png)

      ![image-20240623004210187](https://p.ipic.vip/z7n7ry.png)

   Ref:

   1. [cnblog 创建一个 Spring Boot 项目，你会几种方法？](https://www.cnblogs.com/lenve/p/10694456.html)
   2. [搭建第一个 springboot 项目](https://javabetter.cn/springboot/initializr.html#%E7%AC%AC%E4%B8%80%E4%B8%AAweb%E9%A1%B9%E7%9B%AE)