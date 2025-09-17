package com.pioneer.medgo.service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.pioneer.medgo.dao.MemberDAO;
import com.pioneer.medgo.dao.PharmacyDAO;
import com.pioneer.medgo.domain.MemberDTO;

@Service
public class MemberService { 
	
	private final MemberDAO memberDAO;
	
	private final PharmacyDAO pharmacyDAO;
	
	private final JavaMailSender mailSender;
	
	private String userName;
	
	public void setUserName(String userName) {
		this.userName = userName;
	}

	public MemberService(MemberDAO memberDAO,PharmacyDAO pharmacyDAO, 
						JavaMailSender mailSender) {
		this.memberDAO = memberDAO;
		this.pharmacyDAO = pharmacyDAO;
		this.mailSender = mailSender;
	}
 
	// 회원가입: 이메일 중복 체크 후 등록
	public String checkEmail(String email) {
		// 이메일 형식 확인
		boolean isValidEmail = isValidEmail(email);
		if(!isValidEmail) {
			// 이메일 형식에 맞지 않으면 형식 오류(invalid)
			return "invalid";
		} 

		// 1) 이메일 중복 체크
		MemberDTO existing = memberDAO.getUserbyEmail(email);
	
		if (existing != null) {
			// 이미 존재하면 중복(duplicate)
			return "duplicate";
		}
		// 존재하지 않으면 ok --> 이메일 코드로
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
		System.out.println("서비스"+memberDTO);
		// member 테이블 데이터 
		memberDAO.insertMember(memberDTO); 
		// 이메일로 회원 정보 찾기
		MemberDTO dto = memberDAO.findByEmail(memberDTO.getEmail());
		// pharmacy 테이블 데이터
		pharmacyDAO.insertPharmacy(memberDTO.getAddress(), dto.getId()
					,memberDTO.getLatitude(), memberDTO.getLongitude()); 
		
		// 데이터 가지고 오는 게 성공하면 memberDTO의 모든 정보 반환
		return memberDTO;  

	}
	
	// 이메일 인증 코드 보내기
	public String sendMail(String email) throws MessagingException {
		System.out.println("email:"+email);
		// 메세지 보내는 객체 생성 
		MimeMessage message = mailSender.createMimeMessage();
		message.addRecipients(Message.RecipientType.TO, email); // message 수신 대상
		message.setSubject("회원가입 이메일 인증 코드"); // 제목
		
		String msg = "11111"; 
		
		message.setText(msg, "utf-8", "html");
		message.setFrom(new InternetAddress(userName));
	
		// 메일 message 보내기
	
		return msg;  // test, 11111반환
	}

	
	
	// 로그인 회원 확인
	public MemberDTO getUserByEmail(String email) {
		
		return memberDAO.getUserbyEmail(email); 
	}

}
