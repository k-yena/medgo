package com.pioneer.medgo.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pioneer.medgo.domain.MemberDTO;
import com.pioneer.medgo.domain.MypageDTO;
import com.pioneer.medgo.service.MemberService;
import com.pioneer.medgo.service.MypageService;

@Controller
@RequestMapping("/pharmacy")
public class MypageController {

	private final MypageService mypageService;
	private final MemberService memberService;

	@Autowired
	public MypageController(MypageService mypageService, MemberService memberService) {
		this.mypageService = mypageService;
		this.memberService = memberService;
	}

	// 회원정보 불러오기
	@GetMapping("/mypage")
	public String mypage(Model model, HttpSession session) {
		Long id = (Long) session.getAttribute("loginUser");

		if (id == null) {
			return "login";
		}
		MypageDTO mypageDTO = mypageService.detailInfo(id);
		model.addAttribute("mypage", mypageDTO);
		return "mypage";
	}

	// 패스워드 확인
	@PostMapping("/api/mypage")
	@ResponseBody
	public boolean api(@RequestParam("password") String password, HttpSession session) {
		Long id = (Long) session.getAttribute("loginUser");

		if (id == null) {
			return false;
		}
		MemberDTO memberDTO = memberService.getMember(id);

		if (!memberDTO.getPassword().equals(password)) {
			return false;
		}

		return true;
	}

	// 회원정보 업데이트
	@PostMapping("/api/update")
	@ResponseBody
	public boolean update(@RequestBody MypageDTO mypageDTO, HttpSession session) {
		Long id = (Long) session.getAttribute("loginUser");

		if (id == null) {
			return false;
		}
		boolean updateResult = mypageService.updateInfo(mypageDTO, id);

		return updateResult;
	}
	
	// 회원 탈퇴
	@PostMapping("/api/delete")
	@ResponseBody
	public boolean delete(@RequestBody MypageDTO mypageDTO, HttpSession session) {
		Long id = (Long) session.getAttribute("loginUser");
		int isDelete = (int) session.getAttribute("isDelete");
		System.out.println("id값 있니??"+id);
		System.out.println("isDelete 있니??"+isDelete);
		System.out.println("dto객체니???"+mypageDTO.toString());
		if (id == null || isDelete!=1) {  
			return false;   
		}   
		boolean deleteResult = mypageService.deleteUser(id); 
		System.out.println("deleteResult있니??"+deleteResult);
		
		return deleteResult; 
	}
	
	

}
