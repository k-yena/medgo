package com.pioneer.medgo.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


import com.pioneer.medgo.domain.LoginDTO;
import com.pioneer.medgo.service.LoginService;

@Controller
public class LoginController {
	@Autowired
	private final LoginService loginService;

	// 생성자 주입
	public LoginController(LoginService loginService) {
		this.loginService = loginService;
	}
	@GetMapping("/login")
		public String login(){
		return "login";
	}
	

	@PostMapping("/login") 
	public String login(LoginDTO loginDTO, HttpServletRequest request, Model model) {
		// 회원 확인
		System.out.println(loginDTO);
		LoginDTO loginMember = loginService.login(loginDTO); 

		if (loginMember == null) {
			model.addAttribute("loginFail", "아이디 또는 비밀번호가 맞지 않습니다.");
			return "login";
		}

		HttpSession session = request.getSession();
		session.setAttribute("loginMember", loginMember);
		System.out.println(loginMember);
		return "main";
	}
}
