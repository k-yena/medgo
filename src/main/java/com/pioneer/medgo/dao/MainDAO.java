package com.pioneer.medgo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pioneer.medgo.domain.MonthlySalesDTO;
import com.pioneer.medgo.domain.MonthlyTransactionDTO;
import com.pioneer.medgo.domain.NoticeDTO;
import com.pioneer.medgo.domain.RecentStockHistoryDTO;
import com.pioneer.medgo.domain.TopSellingMedicinesDTO;

@Mapper
public interface MainDAO {
	// 약국 이름 가져오기
	String getPharmacyName(long pharmacyid);

	// 1번: 입출고 차트 (한달)
	List<MonthlyTransactionDTO> getMonthlyTransactionData(long pharmacyid);

	// 2번: 오늘 입고
	int getTodayInTransactions(long pharmacyid);

	// 2번: 오늘 출고
	int getTodayOutTransactions(long pharmacyid);

	// 3번: 현재 의약품 수
	int getCurrentMedicineCount(long pharmacyid);

	// 4번: 이번 달 출고
	int getMonthlyOutTransactions(long pharmacyid);

	// 5번: 최근 입출고 기록 (약 이름 포함)
	List<RecentStockHistoryDTO> getRecentStockHistory(long pharmacyid);

	// 6번: 이번달 판매량 높은 약
	List<TopSellingMedicinesDTO> getTopSellingMedicines(long pharmacyid);

	// 7번: 공지사항
	NoticeDTO getLatestNotice(long pharmacyid);

	// 8번: 월간 판매율 (최근 12개월)
	List<MonthlySalesDTO> getMonthlySalesData(long pharmacyid);

}
