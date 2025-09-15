package com.pioneer.medgo.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
@Mapper
public interface PharmacyDAO {
	public int insertPharmacy(@Param("address")String address, @Param("userId")Long userId); 
	
	

}
