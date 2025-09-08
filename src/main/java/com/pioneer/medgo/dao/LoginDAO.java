package com.pioneer.medgo.dao;

import org.apache.ibatis.annotations.Mapper;

import com.pioneer.medgo.domain.LoginDTO;

@Mapper
public interface LoginDAO {
	
	public LoginDTO findByEmail(String email);
 
}
