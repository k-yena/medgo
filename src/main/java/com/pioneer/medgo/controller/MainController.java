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
		List<MonthlyTransactionDTO> monthlyTransactions = mainDAO.getMonthlyTransactionData(pharmacyid);
		int todayIn = mainDAO.getTodayInTransactions(pharmacyid);
		int todayOut = mainDAO.getTodayOutTransactions(pharmacyid);
		int currentMedicineCount = mainDAO.getCurrentMedicineCount(pharmacyid);
		int monthlyOut = mainDAO.getMonthlyOutTransactions(pharmacyid);
		NoticeDTO latestNotice = mainDAO.getLatestNotice(pharmacyid);

		model.addAttribute("pharmacyName", pharmacyName);
		model.addAttribute("monthlyTransactions", monthlyTransactions);
		model.addAttribute("todayIn", todayIn);
		model.addAttribute("todayOut", todayOut);
		model.addAttribute("currentMedicineCount", currentMedicineCount);
		model.addAttribute("monthlyOut", monthlyOut);
		model.addAttribute("latestNotice", latestNotice);

		return "main";
	}

	// --- API 엔드포인트 추가 ---

	@GetMapping("/api/monthly-sales")
	@ResponseBody
	public List<MonthlySalesDTO> getMonthlySalesData() {
		// @SessionAttribute("pharmacyid") int pharmacyid
		int pharmacyid = 1; // 임시 데이터
		System.out.println("월간 판매 데이터");
		System.out.println(mainDAO.getMonthlySalesData(pharmacyid));
		System.out.println("--------");
		return mainDAO.getMonthlySalesData(pharmacyid); // 월간 판매 데이터 리턴
	}

	// List<MonthlyTransactionDTO> monthlyTransactions =
	// mainDAO.getMonthlyTransactionData(pharmacyid);

	@GetMapping("/api/top-selling")
	@ResponseBody
	public List<TopSellingMedicinesDTO> getTopSellingMedicines() {
		// @SessionAttribute("pharmacyid") int pharmacyid
		int pharmacyid = 1; // 임시 데이터
		System.out.println("3의약품 데이터");
		System.out.println(mainDAO.getTopSellingMedicines(pharmacyid));
		System.out.println("--------");
		return mainDAO.getTopSellingMedicines(pharmacyid); // 판매율 Top3
	}

	@GetMapping("/api/recent-stock-history")
	@ResponseBody
	public List<RecentStockHistoryDTO> getRecentStockHistory() {
		// @SessionAttribute("pharmacyid") int pharmacyid
		int pharmacyid = 1; // 임시 데이터
		System.out.println("입출고 데이터");
		System.out.println(mainDAO.getRecentStockHistory(pharmacyid));
		System.out.println("--------");
		return mainDAO.getRecentStockHistory(pharmacyid); // 최근 입출고 내역
	}

}
