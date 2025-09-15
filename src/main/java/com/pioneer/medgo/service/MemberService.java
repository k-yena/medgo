package com.pioneer.medgo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pioneer.medgo.dao.MemberDAO;
import com.pioneer.medgo.dao.PharmacyDAO;
import com.pioneer.medgo.domain.MemberDTO;

@Service
public class MemberService { 
	@Autowired
	private MemberDAO memberDAO;
	@Autowired
	private PharmacyDAO pharmacyDAO;

	public MemberService(MemberDAO memberDAO,PharmacyDAO pharmacyDAO ) {
		this.memberDAO = memberDAO;
		this.pharmacyDAO = pharmacyDAO;
	}

	// 회원가입: 이메일 중복 체크 후 등록
	public String checkEmail(String email) {
		// 이메일 형식 확인
		boolean isValidEmail = isValidEmail(email);
		if(!isValidEmail) {
			System.out.println("isValidEmail "+isValidEmail);
			return "invalid";
		} 

		// 1) 이메일 중복 체크
		MemberDTO existing = memberDAO.getUserbyEmail(email);
		System.out.println("memberDTO.getEmail()" + email);
		System.out.println("existing " + existing);
		if (existing != null) {
			System.out.println("중복했다!!!");
			// 이미 존재하면 false
			return "duplicate";
		}
		System.out.println("사용가능 아이디야!!");
		return "ok";

	}

	// 이메일 형식 확인
	public boolean isValidEmail(String email) {
		String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
		if(email.matches(regex)) {
			//이메일 형식이면 true
			return true;
		}
		// 이메일 형식이 아니면 false
		return false;
	} 
	
	// 회원가입하기 
	public MemberDTO register(MemberDTO memberDTO) {
		System.out.println("s  - 1");
		System.out.println(memberDTO.getLicenseCode());
		// member 테이블 데이터 
		memberDAO.insertMember(memberDTO);
		System.out.println("s  - 2");
		MemberDTO dto = memberDAO.findByEmail(memberDTO.getEmail());
		System.out.println("s  - 3");
		System.out.println("dto : "+dto);  
		// pharmacy 테이블 데이터
		pharmacyDAO.insertPharmacy(memberDTO.getAddress(), dto.getId()); 
		System.out.println("s  - 4"); 
	
		return memberDTO;  

	}
	
	// 로그인 회원 확인
	public MemberDTO getUserByEmail(String email) {
		return memberDAO.getUserbyEmail(email); 
	}
	

}
