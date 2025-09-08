package com.pioneer.medgo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pioneer.medgo.dao.StockDAO;
import com.pioneer.medgo.domain.StockDTO;

@Service
public class PharmacyService {

	@Autowired
	private final StockDAO stockDAO;

	public PharmacyService(StockDAO stockDAO) {
		this.stockDAO = stockDAO;
	}

	public List<StockDTO> stockList(Long pharmacyId) {
		List<StockDTO> list = new ArrayList<>();
		if (pharmacyId == null) {
			return list;
		}

		list = stockDAO.stockList(pharmacyId);

		return list;
	}

}
