package com.example.springdemo.home.demo2.sse;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 测试前端访问 sse 接口
 * 浏览器访问 /index 会映射到 resources/templates/index.html，
 */
@Controller
public class TestIndex {
    @GetMapping("/index")
    public String index() {
        return "index";
    }
}