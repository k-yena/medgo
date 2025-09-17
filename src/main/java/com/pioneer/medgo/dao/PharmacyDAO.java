package com.pioneer.medgo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pioneer.medgo.domain.PharmacyDTO;

@Mapper
public interface PharmacyDAO {

	public List<PharmacyDTO> findByLessThanLatAndLon(
			@Param("minLat") double minLat, @Param("maxLat") double maxLat,
			@Param("minLon") double minLon, @Param("maxLon") double maxLon);

}
