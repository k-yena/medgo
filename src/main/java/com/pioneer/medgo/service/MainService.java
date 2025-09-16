package com.pioneer.medgo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pioneer.medgo.dao.MainDAO;
import com.pioneer.medgo.domain.MainDashBoardDTO;
import com.pioneer.medgo.domain.MonthlySalesDTO;
import com.pioneer.medgo.domain.MonthlyTransactionDTO;
import com.pioneer.medgo.domain.RecentStockHistoryDTO;
import com.pioneer.medgo.domain.TopSellingMedicinesDTO;

@Service
public class MainService {
	@Autowired
	private MainDAO mainDAO;

	// 대시보드에 필요한 모든 데이터
	public MainDashBoardDTO getDashboardData(int pharmacyid) {
		MainDashBoardDTO dto = new MainDashBoardDTO();

		dto.setPharmacyName(mainDAO.getPharmacyName(pharmacyid));
		dto.setTodayIn(mainDAO.getTodayInTransactions(pharmacyid));
		dto.setTodayOut(mainDAO.getTodayOutTransactions(pharmacyid));
		dto.setCurrentMedicineCount(mainDAO.getCurrentMedicineCount(pharmacyid));
		dto.setMonthlyOut(mainDAO.getMonthlyOutTransactions(pharmacyid));
		dto.setLatestNotice(mainDAO.getLatestNotice(pharmacyid));
		dto.setRecentStockHistory(mainDAO.getRecentStockHistory(pharmacyid));

		return dto;
	}

	// 한달 간의 입출고 차트 데이터 반환
	public List<MonthlyTransactionDTO> getMonthlyTransactionData(int pharmacyid) {
		return mainDAO.getMonthlyTransactionData(pharmacyid);
	}

	// 최근 입출고 기록 데이터 반환
	public List<RecentStockHistoryDTO> getRecentStockHistory(int pharmacyid) {
		return mainDAO.getRecentStockHistory(pharmacyid);
	}

	// 이번달 판매량 높은 약 데이터 반환
	public List<TopSellingMedicinesDTO> getTopSellingMedicines(int pharmacyid) {
		return mainDAO.getTopSellingMedicines(pharmacyid);
	}

	// 월간 판매율 데이터 반환
	public List<MonthlySalesDTO> getMonthlySalesData(int pharmacyid) {
		return mainDAO.getMonthlySalesData(pharmacyid);
	}
}
