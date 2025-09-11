package com.pioneer.medgo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pioneer.medgo.dao.MainDAO;
import com.pioneer.medgo.dto.MainDTO;

@Controller
@RequestMapping("/pharmacy")
public class MainController {
	@Autowired
	private MainDAO mainDAO;

	@GetMapping("/main")
	public String main(Model model) {
		System.out.println("머야!");
		// @SessionAttribute("pharmacyid") int pharmacyid,
		int pharmacyid = 1; // 임시 데이터
		// DAO에서 데이터 가져오기
		String pharmacyName = mainDAO.getPharmacyName(pharmacyid);
		List<MainDTO> monthlyTransactions = mainDAO.getMonthlyTransactionData(pharmacyid);
		int todayIn = mainDAO.getTodayInTransactions(pharmacyid);
		int todayOut = mainDAO.getTodayOutTransactions(pharmacyid);
		int currentMedicineCount = mainDAO.getCurrentMedicineCount(pharmacyid);
		int monthlyOut = mainDAO.getMonthlyOutTransactions(pharmacyid);
		List<MainDTO> recentStockHistory = mainDAO.getRecentStockHistory(pharmacyid);
		List<MainDTO> topSelling = mainDAO.getTopSellingMedicines(pharmacyid);
		MainDTO latestNotice = mainDAO.getLatestNotice(pharmacyid);
		List<MainDTO> monthlySales = mainDAO.getMonthlySalesData(pharmacyid);
		System.out.println(pharmacyName);

		// 모델에 담기
		// TODO:getRecentStockHistory, getTopSellingMedicines, getMonthlySalesDat 따로 빼기
		model.addAttribute("pharmacyName", pharmacyName);
		model.addAttribute("monthlyTransactions", monthlyTransactions);
		model.addAttribute("todayIn", todayIn);
		model.addAttribute("todayOut", todayOut);
		model.addAttribute("currentMedicineCount", currentMedicineCount);
		model.addAttribute("monthlyOut", monthlyOut);
		model.addAttribute("recentStockHistory", recentStockHistory);
		model.addAttribute("topSelling", topSelling);
		model.addAttribute("latestNotice", latestNotice);
		model.addAttribute("monthlySales", monthlySales);

		return "main";
	}

}
