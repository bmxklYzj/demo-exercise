package com.example.springdemo.longpull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld2 {
    @Autowired
    private LongPollingController poll;

    @RequestMapping("/hello2")
    public String hello() {
        poll.pushMessage("push");
        return "hello spring";
    }
}