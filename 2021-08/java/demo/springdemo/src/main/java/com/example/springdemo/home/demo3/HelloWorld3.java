package com.example.springdemo.home.demo3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld3 {
    @Autowired
    private ChunkedServlet chunkedServlet;

    @RequestMapping("/hello3")
    public String hello() {
        chunkedServlet.pushMessage("push");
        return "hello spring";
    }
}