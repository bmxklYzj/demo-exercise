package com.example.springdemo.home.demo2.sse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
public class SseController {

    private final CopyOnWriteArrayList<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    private final ExecutorService executor = Executors.newCachedThreadPool();

    @GetMapping("/sse")
    public SseEmitter handleSse() {
        SseEmitter emitter = new SseEmitter(0L);

        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));

        // Initial message
        try {
            emitter.send(SseEmitter.event().comment("Connection established"));
        } catch (IOException e) {
            emitters.remove(emitter);
        }

        return emitter;
    }

    public void pushMessage(String message) {
        for (SseEmitter emitter : emitters) {
            executor.execute(() -> {
                try {
                    emitter.send(SseEmitter.event().comment(message));
                } catch (IOException e) {
                    emitters.remove(emitter);
                }
            });
        }
    }
}
