package com.pioneer.medgo.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pioneer.medgo.service.MemberService;

@Controller
@RequestMapping("/auth")
public class ForgotPasswordController {
	private final MemberService memberService;
	
	@Autowired
	public ForgotPasswordController(MemberService memberService){
		this.memberService = memberService;
	}
	
	//패스워드 변경 폼 이동
	@GetMapping("/forgot-password")
	public String forgotPassword() {
		return "forgot-password";
	}
	
	// 비밀번호 업데이트
	@PostMapping("/forgot-password")
	@ResponseBody
	public String updatePassword(@RequestParam("password")String password, HttpSession session) {
		String email = (String)session.getAttribute("email");
		boolean result = memberService.changePassword(password, email);
		session.removeAttribute("email");
		
 		
		return "{\"result\":" + "\"" + result + "\"" + "}";
	}	

}
