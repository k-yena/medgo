package com.pioneer.medgo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.pioneer.medgo.domain.StockDTO;

@Mapper
public interface StockDAO {
	public List<StockDTO> stockList(Long pharmacyId);

}
