package com.pioneer.medgo.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
@Mapper
public interface PharmacyDAO {
	
	// pharmacy 주소&userId 매칭
	public int insertPharmacy(@Param("address")String address, @Param("userId")Long userId
				,@Param("latitude") double latitude, @Param("longitude") double longitude ); 
	
}
