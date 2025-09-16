package com.pioneer.medgo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TestController {


	@RequestMapping("/notice")
	public String notice() {
		return "notice";
	}

	@RequestMapping("/mypage")
	public String mypage() {
		return "mypage";
	}

	// 로그인
	@RequestMapping("/login1")
	public String main() {
		return "login";
	}

	@RequestMapping("/forgotpw")
	public String forgotpw() {
		return "forgot-password";
	}

	@RequestMapping("/register1")
	public String register() {
		return "register";
	}

	@RequestMapping("/app")
	public String app() {
		return "customer-app";
	}

}
