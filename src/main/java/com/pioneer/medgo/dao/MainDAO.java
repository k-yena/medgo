package com.pioneer.medgo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pioneer.medgo.dto.MonthlySalesDTO;
import com.pioneer.medgo.dto.MonthlyTransactionDTO;
import com.pioneer.medgo.dto.NoticeDTO;
import com.pioneer.medgo.dto.RecentStockHistoryDTO;
import com.pioneer.medgo.dto.TopSellingMedicinesDTO;

@Mapper
public interface MainDAO {
	// 약국 이름 가져오기
	String getPharmacyName(int pharmacyid);

	// 1번: 입출고 차트 (한달)
	List<MonthlyTransactionDTO> getMonthlyTransactionData(int pharmacyid);

	// 2번: 오늘 입고
	int getTodayInTransactions(int pharmacyid);

	// 2번: 오늘 출고
	int getTodayOutTransactions(int pharmacyid);

	// 3번: 현재 의약품 수
	int getCurrentMedicineCount(int pharmacyid);

	// 4번: 이번 달 출고
	int getMonthlyOutTransactions(int pharmacyid);

	// 5번: 최근 입출고 기록 (약 이름 포함)
	List<RecentStockHistoryDTO> getRecentStockHistory(int pharmacyid);

	// 6번: 이번달 판매량 높은 약
	List<TopSellingMedicinesDTO> getTopSellingMedicines(int pharmacyid);

	// 7번: 공지사항
	NoticeDTO getLatestNotice(int pharmacyid);

	// 8번: 월간 판매율 (최근 12개월)
	List<MonthlySalesDTO> getMonthlySalesData(int pharmacyid);

}
