package com.example.springdemo.home.demo1.longpull;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

@Controller
public class LongPollingController {

    private final Queue<DeferredResult<String>> deferredResults = new ConcurrentLinkedQueue<>();

    @GetMapping("/comet")
    @ResponseBody
    public DeferredResult<String> comet() {
        DeferredResult<String> deferredResult = new DeferredResult<>();

        // 添加到等待队列中
        deferredResults.add(deferredResult);

        // 设置超时处理
        deferredResult.onTimeout(() -> {
            deferredResult.setResult("Timeout occurred"); // 设置超时响应
            deferredResults.remove(deferredResult); // 从队列中移除
        });

        return deferredResult;
    }

    // 服务端推送消息给所有等待的客户端
    public void pushMessage(String message) {
        for (DeferredResult<String> deferredResult : deferredResults) {
            deferredResult.setResult(message); // 设置推送的消息
            deferredResults.remove(deferredResult); // 推送后从队列中移除（可根据实际需求处理）
        }
    }
}
