package com.pioneer.medgo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pioneer.medgo.dao.HistoryDAO;
import com.pioneer.medgo.dao.MedicineDAO;
import com.pioneer.medgo.dao.PharmacyDAO;
import com.pioneer.medgo.dao.StockDAO;
import com.pioneer.medgo.domain.HistoryDTO;
import com.pioneer.medgo.domain.MedicineDTO;
import com.pioneer.medgo.domain.PharmacyDTO;
import com.pioneer.medgo.domain.StockDTO;

@Service
public class PharmacyService {

	private final StockDAO stockDAO;
	private final HistoryDAO historyDAO;
	private final MedicineDAO medicineDAO;
	private final PharmacyDAO pharmacyDAO;

	public PharmacyService(StockDAO stockDAO, HistoryDAO historyDAO, MedicineDAO medicineDAO, PharmacyDAO pharmacyDAO) {
		this.stockDAO = stockDAO;
		this.historyDAO = historyDAO;
		this.medicineDAO = medicineDAO;
		this.pharmacyDAO = pharmacyDAO;
	}

	// 현재 재고목록
	public List<StockDTO> stockList(Long pharmacyId) {

		return stockDAO.findByPharmacyId(pharmacyId);
	}

	// 입-출고 기록 목록
	public List<HistoryDTO> historyList(Long pharmacyId) {

		return historyDAO.listAll(pharmacyId);

	}

	// 재고삭제를 위한 재고목록
	public List<StockDTO> stockListForDelete(Long pharmacyId, String keyword, String sort, String order, int offset,
			int size) {

		return stockDAO.findByPharmacyIdAndKeyword(pharmacyId, keyword, sort, order, offset, size);
	}

	// 의약품 검색결과 목록
	public List<MedicineDTO> medicineList(String keyword, String sort, String order, int offset, int size) {

		return medicineDAO.findByKeyword(keyword, sort, order, offset, size);
	}

	// (페이징처리를 위한 )재고 개수
	public int stockListCount(Long pharmacyId, String keyword) {

		return stockDAO.countByPharmacyIdAndKeyword(pharmacyId, keyword);
	}

	// (페이징처리를 위한) 의약품 검색 시 의약품리스트의 개수
	public int medicineListCount(String keyword) {

		return medicineDAO.countByKeyword(keyword);
	}

	// 약국id와 의약품id로 재고 삭제
	public boolean deleteMedicine(Long pharmacyId, Long medicineId) {
		int count = stockDAO.deleteByMedicineId(pharmacyId, medicineId);
		if (count < 1) {
			return false;
		}
		return true;
	}

	// 재고에 의약품 추가
	public boolean addMedicine(Long pharmacyId, Long medicineId, int medCount) {

		StockDTO dto = new StockDTO();
		dto.setPharmacyId(pharmacyId);
		dto.setMedicineId(medicineId);
		dto.setMedCount(medCount);

		int count = stockDAO.existByPharmacyIdAndMedicineId(dto);
		if (count > 0) {
			return false;
		}

		count = stockDAO.save(dto);
		if (count != 1) {
			return false;
		}

		return true;
	}

	// 입-출고 내역 추가
	public boolean addHistory(Long pharmacyId, Long medicineId, int medCount, String transactionType) {

		int count = historyDAO.save(pharmacyId, medicineId, medCount, transactionType);

		if (count < 1) {
			return false;
		}

		return true;

	}

	// 재고 수량 수정
	public boolean insertQuantity(Long pharmacyId, Long medicineId, int transactionQuantity) {
		if (transactionQuantity == 0) {
			return false;
		}

		StockDTO dto = new StockDTO();
		dto.setPharmacyId(pharmacyId);
		dto.setMedicineId(medicineId);

		StockDTO originDTO = stockDAO.findByPharmachIdAndMedicineId(dto);
		if (originDTO == null) {
			return false;
		}

		int medCount = originDTO.getMedCount() + transactionQuantity;
		if (medCount < 0) {
			return false;
		}

		originDTO.setMedCount(medCount);
		int count = stockDAO.updateStock(originDTO);

		if (count < 1) {
			return false;
		}

		String transactionType = "";

		if (transactionQuantity > 0) {
			transactionType = "입고";
		} else if (transactionQuantity < 0) {
			transactionType = "출고";
		}

		count = historyDAO.save(pharmacyId, medicineId, Math.abs(transactionQuantity), transactionType);

		if (count < 1) {
			return false;
		}

		return true;

	}
	
	// pharmacy id를 user_id로  찾기
	public PharmacyDTO findPharmacyId(Long userId) {
		
		return pharmacyDAO.findByUserId(userId);
	}
	

}
