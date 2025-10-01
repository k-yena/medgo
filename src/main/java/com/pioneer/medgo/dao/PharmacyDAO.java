package com.pioneer.medgo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pioneer.medgo.domain.MypageDTO;
import com.pioneer.medgo.domain.PharmacyDTO;
@Mapper
public interface PharmacyDAO {
	
	// pharmacy 약국명&전화번호&주소&위도&경도&userId 매칭
	public int insertPharmacy(@Param("pharmacyName")String pharmacyName, @Param("phone")String phone,
							  @Param("address")String address, @Param("userId")Long userId,
							  @Param("latitude") double latitude, @Param("longitude") double longitude ); 
  
  	public List<PharmacyDTO> findByLessThanLatAndLon(
			@Param("minLat") double minLat, @Param("maxLat") double maxLat,
			@Param("minLon") double minLon, @Param("maxLon") double maxLon,
			@Param("keyword") String keyword);
  	
  	// 약국정보 id 값으로 찾기
  	public PharmacyDTO findByUserId(Long userId); 
  	
  	// 회원정보 세부사항 업데이트
  	public int updateDetailInfoPharmacy(MypageDTO mypageDTO);
  	
  	// userid로 회원탈퇴
  	int deleteByUserId(@Param("userId") Long userId);
  	
}
