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
	public MainDashBoardDTO getDashboardData(long pharmacyId) {
		MainDashBoardDTO dto = new MainDashBoardDTO();

		dto.setPharmacyName(mainDAO.getPharmacyName(pharmacyId));
		dto.setTodayIn(mainDAO.getTodayInTransactions(pharmacyId));
		dto.setTodayOut(mainDAO.getTodayOutTransactions(pharmacyId));
		dto.setCurrentMedicineCount(mainDAO.getCurrentMedicineCount(pharmacyId));
		dto.setMonthlyOut(mainDAO.getMonthlyOutTransactions(pharmacyId));
		dto.setLatestNotice(mainDAO.getLatestNotice(pharmacyId));
		dto.setRecentStockHistory(mainDAO.getRecentStockHistory(pharmacyId));

		return dto;
	}

	// 한달 간의 입출고 차트 데이터 반환
	public List<MonthlyTransactionDTO> getMonthlyTransactionData(long pharmacyId) {
		return mainDAO.getMonthlyTransactionData(pharmacyId);
	}

	// 최근 입출고 기록 데이터 반환
	public List<RecentStockHistoryDTO> getRecentStockHistory(long pharmacyId) {
		return mainDAO.getRecentStockHistory(pharmacyId);
	}

	// 이번달 판매량 높은 약 데이터 반환
	public List<TopSellingMedicinesDTO> getTopSellingMedicines(long pharmacyId) {
		return mainDAO.getTopSellingMedicines(pharmacyId);
	}

	// 월간 판매율 데이터 반환
	public List<MonthlySalesDTO> getMonthlySalesData(long pharmacyId) {
		return mainDAO.getMonthlySalesData(pharmacyId);
	}
}
