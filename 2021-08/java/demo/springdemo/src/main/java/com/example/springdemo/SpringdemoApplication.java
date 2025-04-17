package com.example.springdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Locale;
import java.util.regex.Pattern;

@SpringBootApplication
@ServletComponentScan
public class SpringdemoApplication {

	public static void main(String[] args) {
		Pattern compile = Pattern.compile(";(?:<br/>|\\n)");
		System.out.println(Arrays.asList(compile.split("a;\nb")));
		// System.out.println(compile.split(null));

		HashSet hashSet = new HashSet();
		System.out.println(String.join(";", hashSet));
		System.out.println("yzj");

		System.out.println(Locale.US.toString());
		System.out.println(Locale.US.toLanguageTag());

		SpringApplication.run(SpringdemoApplication.class, args);
	}

}
