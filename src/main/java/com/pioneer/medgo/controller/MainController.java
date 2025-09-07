package com.pioneer.medgo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
	
	@GetMapping("/")
	public String landing()	{
		return "landing";
	}
	@GetMapping("/app")
	public String appView()	{
		return "customer-app";
	}
}
