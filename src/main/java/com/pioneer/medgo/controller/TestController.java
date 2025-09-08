package com.pioneer.medgo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TestController {
	
	@RequestMapping("/main")
	public String Main() {
		return "main";
	}

	@RequestMapping("/addmed")
	public String addmed() {
		return "add-medicine";
	}

	@RequestMapping("/delmed")
	public String delmed() {
		return "delete-medicine";
	}

	@RequestMapping("/inven")
	public String inven() {
		return "inventory";
	}

	@RequestMapping("/notice")
	public String notice() {
		return "notice";
	}
	

	@RequestMapping("/mypage")
	public String mypage() {
		return "mypage";
	}
	
	@RequestMapping("/stock")
	public String stock() {
		return "stock-flow";
	}

	
	//로그인
	@RequestMapping("/login")
	public String main() {
		System.out.println("로그인");
		return "login";
	}

	@RequestMapping("/forgotpw")
	public String forgotpw() {
		return "forgot-password";
	}
	
	@RequestMapping("/register")
	public String register() {
		return "register";
	}

}
