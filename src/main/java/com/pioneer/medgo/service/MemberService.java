package com.pioneer.medgo.service;

import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import com.pioneer.medgo.dao.MemberDAO;
import com.pioneer.medgo.dao.PharmacyDAO;
import com.pioneer.medgo.domain.MemberDTO;
import com.pioneer.medgo.util.BCryptUtil;

@Service
public class MemberService {

	private final MemberDAO memberDAO;

	private final PharmacyDAO pharmacyDAO;

	private final JavaMailSender mailSender;

	public MemberService(MemberDAO memberDAO, PharmacyDAO pharmacyDAO, JavaMailSender mailSender) {
		this.memberDAO = memberDAO;
		this.pharmacyDAO = pharmacyDAO;
		this.mailSender = mailSender;
	}

	// 난수 생성 전역 변수
	int authNumber;

	// 회원가입: 이메일 중복 체크 후 등록
	public String checkEmail(String email) {
		// 이메일 형식 확인
		boolean isValidEmail = isValidEmail(email);
		if (!isValidEmail) {
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
		if (email.matches(regex)) {
			// 이메일 형식이면 true
			return true;
		}
		// 이메일 형식이 아니면 false
		return false;
	}

	// 회원가입하기
	public MemberDTO register(MemberDTO memberDTO) {
		memberDTO.setPassword(BCryptUtil.hash(memberDTO.getPassword()));
		// member 테이블 데이터
		memberDAO.insertMember(memberDTO);
		// 이메일로 회원 정보 찾기
		MemberDTO dto = memberDAO.findByEmail(memberDTO.getEmail());
		// pharmacy 테이블 데이터
		pharmacyDAO.insertPharmacy(memberDTO.getName(), memberDTO.getPhone(), memberDTO.getAddress(), dto.getId(),
				memberDTO.getLatitude(), memberDTO.getLongitude());

		// 데이터 가지고 오는 게 성공하면 memberDTO의 모든 정보 반환
		return memberDTO;
	}

	// 랜덤하게 인증코드 만들기
	public void makeRandomNumber() {
		// 난수의 범위 100000 <= r < 1000000 (6자리 난수)
		Random r = new Random();
		int checkNum = r.nextInt(900000) + 100000;
		authNumber = checkNum;
	}

	// 이메일 보낼 양식!
	public String joinEmail(String email) {
		makeRandomNumber();
		String setFrom = "${mail.username}"; // email-config에 설정한 자신의 이메일 주소를 입력
		String toMail = email;
		String title = "회원 가입 인증 이메일 입니다."; // 이메일 제목
		String content = "홈페이지를 방문해주셔서 감사합니다." + "<br><br>" + "인증 번호는 " + authNumber + "입니다." + "<br>"
				+ "해당 인증번호를 인증번호 확인란에 기입하여 주세요."; // 이메일 내용 삽입
		mailSend(setFrom, toMail, title, content);
		return Integer.toString(authNumber);
	}

	// 이메일 전송 메소드
	public void mailSend(String setFrom, String toMail, String title, String content) {
		// 이메일 전송 내장 객체 생성
		MimeMessage message = mailSender.createMimeMessage();

		// true 매개값을 전달하면 multipart(텍스트+html)형식의 메세지 동시 전달이 가능.문자 인코딩 설정도 가능하다.
		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
			helper.setFrom(setFrom);
			helper.setTo(toMail);
			helper.setSubject(title);
			// true 전달 > html 형식으로 전송 , 작성하지 않으면 단순 텍스트로 전달.
			helper.setText(content, true);
			mailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	// 로그인 회원 확인
	public long getUserByEmail(MemberDTO memberDTO) {

		MemberDTO dto = memberDAO.getUserbyEmail(memberDTO.getEmail());

		if (dto == null || dto.getIsDelete() == 0) {
			return 0;
		}

		boolean result = BCryptUtil.matches(memberDTO.getPassword(), dto.getPassword());
		if (!result) {
			return 0;
		}

		return dto.getId();
	}

	// id 값으로 회원 찾기
	public MemberDTO getMember(Long id) {
		return memberDAO.findById(id);
	}

	// 변경할 비밀번호
	public boolean changePassword(String password, String email) {
		MemberDTO memberDTO = memberDAO.findByEmail(email);
		memberDTO.setPassword(BCryptUtil.hash(password));
		int result = memberDAO.changePassword(memberDTO);

		return result > 0;
	}

}
