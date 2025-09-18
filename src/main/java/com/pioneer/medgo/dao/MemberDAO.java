package com.pioneer.medgo.dao;

import org.apache.ibatis.annotations.Mapper;

import com.pioneer.medgo.domain.MemberDTO;
@Mapper      
public interface MemberDAO {
	
	// 이메일 중복 체크
	public MemberDTO checkEmail(String email);
	
	// 회원가입 처리
	public MemberDTO register(MemberDTO memberDTO);
	
	// 회원가입(member) 데이터 저장
	public void insertMember(MemberDTO memberDTO);
	
	// 로그인 처리
	public MemberDTO login(MemberDTO memberDTO);
	
	// 로그인 회원 인증
	public MemberDTO getUserbyEmail(String email);
	
	// 회원 데이터 찾기
	public MemberDTO findByEmail(String email); 
	
	// 이메일 인증 코드 보내기
	public void sendMail(String email);
	
}