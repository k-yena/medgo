package com.pioneer.medgo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pioneer.medgo.domain.HistoryDTO;

@Mapper
public interface HistoryDAO {
	public List<HistoryDTO> listAll(Long pharmacyId);

	public int save(@Param("pharmacyId") Long pharmacyId, @Param("medicineId") Long medicineId,
			@Param("medCount") int medCount, @Param("transactionType") String transactionType);

}
