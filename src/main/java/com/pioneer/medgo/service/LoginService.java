package com.pioneer.medgo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pioneer.medgo.dao.LoginDAO;
import com.pioneer.medgo.domain.LoginDTO;

@Service
public class LoginService {
	@Autowired
	private final LoginDAO loginDAO; 
	
	public LoginService(LoginDAO loginDAO) {
		this.loginDAO = loginDAO;
	}
	
	 public LoginDTO login(LoginDTO loginDTO) {
		 
		 LoginDTO loginMember = loginDAO.findByEmail(loginDTO.getEmail());
		 
		 // 이메일이 동일한 회원이 없으면
		 if(loginMember==null) {
			 // 회원 없음
			 return null;
		 }
		 // 비밀번호가 동일한 회원이 없으면
		 if(!loginMember.getPassword().equals(loginDTO.getPassword())) {
			 // 비밀번호 불일치
			 return null;
		 }
		 // 로그인 성공
		 return loginMember;
	 }

}
