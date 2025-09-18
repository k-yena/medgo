package com.pioneer.medgo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.pioneer.medgo.domain.PharmacyDTO;
@Mapper
public interface PharmacyDAO {
	
	// pharmacy 주소&userId 매칭
	public int insertPharmacy(@Param("pharmacyName")String pharmacyName, @Param("phone")String phone,
							  @Param("address")String address, @Param("userId")Long userId,
							  @Param("latitude") double latitude, @Param("longitude") double longitude ); 
  
  	public List<PharmacyDTO> findByLessThanLatAndLon(
			@Param("minLat") double minLat, @Param("maxLat") double maxLat,
			@Param("minLon") double minLon, @Param("maxLon") double maxLon,
			@Param("keyword") String keyword);
	
}
