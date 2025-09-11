package com.pioneer.medgo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pioneer.medgo.dao.MainDAO;
import com.pioneer.medgo.dto.MonthlySalesDTO;
import com.pioneer.medgo.dto.MonthlyTransactionDTO;
import com.pioneer.medgo.dto.NoticeDTO;
import com.pioneer.medgo.dto.RecentStockHistoryDTO;
import com.pioneer.medgo.dto.TopSellingMedicinesDTO;

@Controller
@RequestMapping("/pharmacy")
public class MainController {
	@Autowired
	private MainDAO mainDAO;

	@GetMapping("/main")
	public String main(Model model) {
		// @SessionAttribute("pharmacyid") int pharmacyid,
		int pharmacyid = 1; // 임시 데이터

		// DAO에서 데이터 가져오기
		String pharmacyName = mainDAO.getPharmacyName(pharmacyid);
		int todayIn = mainDAO.getTodayInTransactions(pharmacyid);
		int todayOut = mainDAO.getTodayOutTransactions(pharmacyid);
		int currentMedicineCount = mainDAO.getCurrentMedicineCount(pharmacyid);
		int monthlyOut = mainDAO.getMonthlyOutTransactions(pharmacyid);
		NoticeDTO latestNotice = mainDAO.getLatestNotice(pharmacyid);
		List<RecentStockHistoryDTO> recentStockHistory = mainDAO.getRecentStockHistory(pharmacyid);

		model.addAttribute("pharmacyName", pharmacyName);
		model.addAttribute("todayIn", todayIn);
		model.addAttribute("todayOut", todayOut);
		model.addAttribute("currentMedicineCount", currentMedicineCount);
		model.addAttribute("monthlyOut", monthlyOut);
		model.addAttribute("latestNotice", latestNotice);
		model.addAttribute("recentStockHistory", recentStockHistory);

		return "main";
	}

	// --- API 엔드포인트 추가 ---

	// 한달 간의 입출고 차트 데이터 반환
	@GetMapping("/api/monthly-transactions")
	@ResponseBody
	public List<MonthlyTransactionDTO> getMonthlyTransactions() {
		int pharmacyid = 1; // 임시 데이터
		return mainDAO.getMonthlyTransactionData(pharmacyid);
	}

	// 최근 입출고 기록 데이터 반환
	@GetMapping("/api/recent-stock-history")
	@ResponseBody
	public List<RecentStockHistoryDTO> getRecentStockHistory() {
		int pharmacyid = 1; // 임시 데이터
		return mainDAO.getRecentStockHistory(pharmacyid);
	}

	// 이번달 판매량 높은 약 데이터 반환
	@GetMapping("/api/top-selling-medicines")
	@ResponseBody
	public List<TopSellingMedicinesDTO> getTopSellingMedicines() {
		int pharmacyid = 1; // 임시 데이터
		return mainDAO.getTopSellingMedicines(pharmacyid);	
	}

	// 월간 판매율 데이터 반환
	@GetMapping("/api/monthly-sales")
	@ResponseBody
	public List<MonthlySalesDTO> getMonthlySales() {
		int pharmacyid = 1; // 임시 데이터
		return mainDAO.getMonthlySalesData(pharmacyid);
	}
}
