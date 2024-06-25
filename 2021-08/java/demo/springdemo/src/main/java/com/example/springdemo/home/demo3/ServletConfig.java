package com.example.springdemo.home.demo3;


import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServletConfig {
    @Bean
    public ChunkedServlet chunkedServlet() {
        return new ChunkedServlet();
    }

    @Bean
    public ServletRegistrationBean<ChunkedServlet> chunkedServletRegistration() {
        ServletRegistrationBean<ChunkedServlet> registrationBean = new ServletRegistrationBean<>(chunkedServlet(), "/chunked");
        registrationBean.setLoadOnStartup(1);
        return registrationBean;
    }
}
