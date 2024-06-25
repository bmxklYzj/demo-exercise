package com.example.springdemo.home.demo2.sse;
import com.example.springdemo.home.demo1.longpull.LongPollingController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld2 {
    @Autowired
    private SseController sseController;

    @RequestMapping("/hello2")
    public String hello() {
        sseController.pushMessage("push");
        return "hello spring";
    }
}