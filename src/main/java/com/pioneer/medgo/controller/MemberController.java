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
import com.pioneer.medgo.service.MemberService;

@Controller
@RequestMapping("/auth")
public class MemberController { 

    private final MemberService memberService; 

    @Autowired
    public MemberController(MemberService memberService) { 
        this.memberService = memberService;
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
    	System.out.println("컨트롤러"+memberDTO);
        memberService.register(memberDTO); // DB 처리
        memberDTO.setRedirectUrl("/auth/login"); // JS에서 이동
        return memberDTO; // JSON 반환  
    } 

    // 회원가입 이메일 중복(형식) 체크
    @PostMapping("/check-id") 
    @ResponseBody
    public String checkEmail(String email) {
        System.out.println("이메일 사용가능 여부 체크");
    	String result = memberService.checkEmail(email);
 
//        if (result.equals("invalid")) { 
//            return "invalid"; // 형식 에러
//        }else if(result.equals("duplicate")) { 
//        	return "duplicate"; // 중복
//        }else {
//        	return "ok"; // 성공 
//        }
    	System.out.println("이메일 사용가능 여부 체크  완료");
    	return "{\"result\":" +"\""+result+"\""+"}";
    }
    
    //이메일 인증 코드 보내기
    @GetMapping("/send-code")
    @ResponseBody
    public String sendMail(@RequestParam("email") String email) throws Exception { 
    	System.out.println("email"+email);
    	String code = memberService.sendMail(email);
    	System.out.println(code);
    	
    	return "{\"code\":" +"\""+code+"\""+"}"; 
    }
    
    
    // 로그인 폼 이동
    @GetMapping("/login")
    public String login() {
        return "login"; 
    } 

    // 로그인 처리
    @PostMapping("/login")
    public String login(MemberDTO memberDTO, HttpSession session, Model model) {
    	MemberDTO loginUser = memberService.getUserByEmail(memberDTO.getEmail());  

        if (loginUser == null || !loginUser.getPassword().equals(memberDTO.getPassword())) {
            model.addAttribute("error", "아이디 또는 비밀번호가 올바르지 않습니다.");
            return "login"; 
        }

        // 세션 저장
        session.setAttribute("loginUser", loginUser);
        return "main"; // 메인 페이지로 이동
    }

    // 로그아웃
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "login";  
    }

}

