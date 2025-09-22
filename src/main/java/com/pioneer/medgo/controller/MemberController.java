package com.pioneer.medgo.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pioneer.medgo.domain.MemberDTO;
import com.pioneer.medgo.domain.PharmacyDTO;
import com.pioneer.medgo.service.MemberService;
import com.pioneer.medgo.service.PharmacyService;

@Controller
@RequestMapping("/auth")
public class MemberController {

	private final MemberService memberService;

	private final PharmacyService pharmacyService;

	@Autowired
	public MemberController(MemberService memberService, PharmacyService pharmacyService) {
		this.memberService = memberService;
		this.pharmacyService = pharmacyService;
	}

	// 회원가입 폼 이동
	@GetMapping("/register")
	public String register() {
		System.out.println("컨트롤러");
		return "register";
	}

	// 회원가입이 성공하면 로그인 이동
	@PostMapping("/register")
	@ResponseBody
	public MemberDTO register(@RequestBody MemberDTO memberDTO) {
		if (memberDTO.getLatitude() == 0 || memberDTO.getLatitude() == 0) {
			return memberDTO;
		}
		memberService.register(memberDTO); // DB 처리
		memberDTO.setRedirectUrl("/auth/login"); // JS에서 이동
		return memberDTO; // JSON 반환
	}

	// 회원가입 이메일 중복(형식) 체크
	@PostMapping("/check-id")
	@ResponseBody
	public String checkEmail(String email) {
		// 이메일 사용가능 체크
		String result = memberService.checkEmail(email);
		return "{\"result\":" + "\"" + result + "\"" + "}";
	}

	// 이메일 인증 코드 보내기
	@GetMapping("/send-code")
	@ResponseBody
	public String sendMail(@RequestParam("email") String email) throws Exception {
		String code = memberService.joinEmail(email);
		return "{\"code\":" + "\"" + code + "\"" + "}";
	}

	// 로그인 폼 이동
	@GetMapping("/login")
	public String login() {
		return "login";
	}

	// 로그인 처리
	@PostMapping("/login")
	public String login(MemberDTO memberDTO, HttpSession session) {

		long userId = memberService.getUserByEmail(memberDTO);
		if (userId == 0) {
			return "login";
		}

		PharmacyDTO pharmacydto = pharmacyService.findPharmacyId(userId);

		// 세션 저장
		session.setAttribute("loginUser", userId);
		session.setAttribute("pharmacyId", pharmacydto.getId());
		return "redirect:/pharmacy/main"; // 메인 페이지로 이동

	}

	// 로그아웃
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		System.out.println(session.getAttribute("pharmacyId"));
		session.invalidate();
		System.out.println(session.getAttribute("pharmacyId"));
		return "login";
	}

}
