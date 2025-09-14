package com.pioneer.medgo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pioneer.medgo.domain.StockDTO;

@Mapper
public interface StockDAO {
	public List<StockDTO> findByPharmacyId(Long pharmacyId);

	public int countByPharmacyIdAndKeyword(@Param("pharmacyId") Long pharmacyId, @Param("keyword") String keyword);

	public List<StockDTO> findByPharmacyIdAndKeyword(@Param("pharmacyId") Long pharmacyId,
			@Param("keyword") String keyword, @Param("sort") String sort, @Param("order") String order,
			@Param("offset") int offset, @Param("size") int size);

	public int deleteByMedicineId(@Param("pharmacyId") Long pharmacyId, @Param("medicineId") Long medicineId);

	public int save(StockDTO dto);

	public int existByPharmachIdAndMedicineId(StockDTO dto);

}
