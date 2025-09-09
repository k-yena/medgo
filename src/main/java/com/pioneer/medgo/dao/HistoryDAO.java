package com.pioneer.medgo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pioneer.medgo.domain.HistoryDTO;

@Mapper
public interface HistoryDAO {
	public List<HistoryDTO> listAll(Long pharmacyId);

}
