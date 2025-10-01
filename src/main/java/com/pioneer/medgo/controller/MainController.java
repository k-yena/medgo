package com.pioneer.medgo.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pioneer.medgo.domain.MainDashBoardDTO;
import com.pioneer.medgo.domain.MonthlySalesDTO;
import com.pioneer.medgo.domain.MonthlyTransactionDTO;
import com.pioneer.medgo.domain.RecentStockHistoryDTO;
import com.pioneer.medgo.domain.TopSellingMedicinesDTO;
import com.pioneer.medgo.service.MainService;

@Controller
@RequestMapping("/pharmacy")
public class MainController {

	@Autowired
	MainService mainService;

	@GetMapping("/main")
	public String main(Model model, HttpSession session) {
		Long pharmacyId = (Long) session.getAttribute("pharmacyId");
		
		if (pharmacyId == null) {  
			return "login";   
		}     
		MainDashBoardDTO dashboardData = mainService.getDashboardData(pharmacyId);
		model.addAttribute("dashboard", dashboardData); 

		return "main";
	}

	// --- API (JSON) ---

	// 한달 간의 입출고 차트 데이터 반환
	@GetMapping("/api/monthly-transactions")
	@ResponseBody
	public List<MonthlyTransactionDTO> getMonthlyTransactions(HttpSession session) {
		Long pharmacyId = (Long) session.getAttribute("pharmacyId");
		return mainService.getMonthlyTransactionData(pharmacyId);
	}

	// 최근 입출고 기록 데이터 반환
	@GetMapping("/api/recent-stock-history")
	@ResponseBody
	public List<RecentStockHistoryDTO> getRecentStockHistory(HttpSession session) {
		Long pharmacyId = (Long) session.getAttribute("pharmacyId");
		return mainService.getRecentStockHistory(pharmacyId);

	}

	// 이번달 판매량 높은 약 데이터 반환
	@GetMapping("/api/top-selling-medicines")
	@ResponseBody
	public List<TopSellingMedicinesDTO> getTopSellingMedicines(HttpSession session) {
		Long pharmacyId = (Long) session.getAttribute("pharmacyId");
		return mainService.getTopSellingMedicines(pharmacyId);
	}

	// 월간 판매율 데이터 반환
	@GetMapping("/api/monthly-sales")
	@ResponseBody
	public List<MonthlySalesDTO> getMonthlySales(HttpSession session) {
		Long pharmacyId = (Long) session.getAttribute("pharmacyId");
		return mainService.getMonthlySalesData(pharmacyId);
	}

}
