package com.pioneer.medgo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pioneer.medgo.domain.MedicineDTO;

@Mapper
public interface MedicineDAO {
	public int countByKeyword(@Param("keyword") String keyword);

	public List<MedicineDTO> findByKeyword(@Param("keyword") String keyword, @Param("sort") String sort,
			@Param("order") String order, @Param("offset") int offset, @Param("size") int size);

	public int existByPharmachIdAndMedicineId(@Param("pharmacyId") Long pharmacyId,
			@Param("medicineId") Long medicineId);
	
	public List<MedicineDTO> findComparatorAllByKeyword(String keyword);

}
