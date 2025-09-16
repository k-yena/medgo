package com.pioneer.medgo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
	
	//customerApp mapping
	@GetMapping("/")
	public String landing()	{
		return "landing";
	}
	@GetMapping("/app")
	public String appView()	{
		return "customer-app";
	}

}
