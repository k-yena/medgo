package com.pioneer.medgo.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pioneer.medgo.dao.HistoryDAO;
import com.pioneer.medgo.dao.StockDAO;
import com.pioneer.medgo.domain.HistoryDTO;
import com.pioneer.medgo.domain.StockDTO;

@Service
public class PharmacyService {

	@Autowired
	private final StockDAO stockDAO;

	@Autowired
	private final HistoryDAO historyDAO;

	public PharmacyService(StockDAO stockDAO, HistoryDAO historyDAO) {
		this.stockDAO = stockDAO;
		this.historyDAO = historyDAO;
	}

	public List<StockDTO> stockList(Long pharmacyId) {
		List<StockDTO> list = new ArrayList<>();
		if (pharmacyId == null) {
			return list;
		}

		list = stockDAO.stockList(pharmacyId);

		return list;
	}

	
	public String historyList(Long pharmacyId) {
		//pharmacyId가 없으면 비어있는 Json반환
		if (pharmacyId == null) {
			return "[]";
		}
		
		List<HistoryDTO>list = historyDAO.listAll(pharmacyId);
		
		//SimpleDataTable 사용을 위한 2중 리스트
		List<List<Object>> dtoToList = new ArrayList<>(list.size());
		for (HistoryDTO h : list) {
			dtoToList.add(Arrays.asList(h.getMainCode(), h.getProductName(), h.getManufacturerName(), h.getQuantity(),
					h.getTransactionType(), h.getTransactionDate()));
		}

		try {
			return new ObjectMapper().writeValueAsString(dtoToList);
		} catch (Exception e) {
			throw new RuntimeException("JSON 직렬화 실패", e);
		}

	}

}
