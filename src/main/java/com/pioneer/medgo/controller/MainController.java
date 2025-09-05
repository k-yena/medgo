package com.pioneer.medgo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
	@GetMapping("/a")
	public String main() {
		System.out.println("hhhhhhh");
		return "login";
	}
}
