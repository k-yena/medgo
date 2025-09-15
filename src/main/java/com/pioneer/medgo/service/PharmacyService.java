package com.pioneer.medgo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pioneer.medgo.dao.HistoryDAO;
import com.pioneer.medgo.dao.MedicineDAO;
import com.pioneer.medgo.dao.StockDAO;
import com.pioneer.medgo.domain.HistoryDTO;
import com.pioneer.medgo.domain.MedicineDTO;
import com.pioneer.medgo.domain.StockDTO;

@Service
public class PharmacyService {

	@Autowired
	private final StockDAO stockDAO;

	@Autowired
	private final HistoryDAO historyDAO;

	@Autowired
	private final MedicineDAO medicineDAO;

	public PharmacyService(StockDAO stockDAO, HistoryDAO historyDAO, MedicineDAO medicineDAO) {
		this.stockDAO = stockDAO;
		this.historyDAO = historyDAO;
		this.medicineDAO = medicineDAO;
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

	public boolean deleteMedicine(Long pharmacyId, Long medicineId) {
		int count = stockDAO.deleteByMedicineId(pharmacyId, medicineId);
		if (count < 1) {
			return false;
		}
		return true;
	}

	public int medicineListCount(String keyword) {

		return medicineDAO.countByKeyword(keyword);

	}

	public List<MedicineDTO> medicineList(String keyword, String sort, String order, int offset, int size) {

		List<MedicineDTO> list = new ArrayList<>();

		list = medicineDAO.findByKeyword(keyword, sort, order, offset, size);

		return list;
	}

	public boolean addMedicine(Long pharmacyId, Long medicineId, int medCount) {
	
		StockDTO dto = new StockDTO();
		dto.setPharmacyId(pharmacyId);
		dto.setMedicineId(medicineId);
		dto.setMedCount(medCount);

		int count = stockDAO.existByPharmachIdAndMedicineId(dto);
		if (count > 0) {
			return false;
		}
	
		count = stockDAO.save(dto);
		if (count != 1) {
			return false;
		}
		
		return true;
	}

	public boolean addHistory(Long pharmacyId, Long medicineId, int medCount, String transactionType) {
	

		int count = historyDAO.save(pharmacyId, medicineId, medCount, transactionType);
	
		if (count < 1) {
			return false;
		}

		return true;

	}

}
