package com.example.springdemo.home.demo1.longpull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld1 {
    @Autowired
    private LongPollingController poll;

    @RequestMapping("/hello1")
    public String hello() {
        poll.pushMessage("push");
        return "hello spring";
    }
}