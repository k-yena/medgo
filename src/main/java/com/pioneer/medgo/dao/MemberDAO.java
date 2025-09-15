package com.pioneer.medgo.dao;

import org.apache.ibatis.annotations.Mapper;

import com.pioneer.medgo.domain.MemberDTO;
@Mapper      
public interface MemberDAO {
	
	public MemberDTO checkEmail(String email);
	
	public MemberDTO register(MemberDTO memberDTO);
	
	void insertMember(MemberDTO memberDTO);

	public MemberDTO login(MemberDTO memberDTO);

	public MemberDTO getUserbyEmail(String email);

	public MemberDTO findByEmail(String email); 
	
}