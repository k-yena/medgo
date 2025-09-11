package com.pioneer.medgo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

		return stockDAO.findByPharmacyId(pharmacyId);
	}

	public List<HistoryDTO> historyList(Long pharmacyId) {

		return historyDAO.listAll(pharmacyId);

	}

	public int stockListCount(Long pharmacyId, String keyword) {

		return stockDAO.countByPharmacyIdAndKeyword(pharmacyId, keyword);
	}

	public List<StockDTO> stockListForDelete(Long pharmacyId, String keyword, String sort, String order, int offset,
			int size) {
		List<StockDTO> list = new ArrayList<>();

		list = stockDAO.findByPharmacyIdAndKeyword(pharmacyId, keyword, sort, order, offset, size);

		return list;
	}

	public int deleteByMedicineId(Long pharmacyId, Long medicineId) {

		return stockDAO.deleteByMedicineId(pharmacyId, medicineId);
	}

}
