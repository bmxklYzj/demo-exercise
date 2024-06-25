package com.example.springdemo.home.demo3;

import jakarta.servlet.AsyncContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.concurrent.CopyOnWriteArrayList;

public class ChunkedServlet extends HttpServlet {

    private final CopyOnWriteArrayList<AsyncContext> contexts = new CopyOnWriteArrayList<>();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Connection", "keep-alive");
        response.setHeader("Transfer-Encoding", "chunked");

        final AsyncContext asyncContext = request.startAsync();
        asyncContext.setTimeout(0); // Set timeout to infinite
        contexts.add(asyncContext);

        PrintWriter writer = response.getWriter();
        writer.println("Connection established");
        writer.flush();
    }

    public void pushMessage(String message) {
        for (AsyncContext asyncContext : contexts) {
            HttpServletResponse response = (HttpServletResponse) asyncContext.getResponse();
            try {
                PrintWriter writer = response.getWriter();
                writer.println(message);
                writer.flush();
            } catch (IOException e) {
                contexts.remove(asyncContext);
                asyncContext.complete();
            }
        }
    }
}
