package com.pioneer.medgo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.pioneer.medgo.dao.MainDAO;
import com.pioneer.medgo.dto.MainDTO;


@Controller
public class MainController {
	@Autowired
	private MainDAO mainDAO;
	
	@GetMapping("/")
	public String landing()	{
		return "landing";
	}
	@GetMapping("/app")
	public String appView()	{
		return "customer-app";
	}

	//메인 페이지 컨트롤러
	@GetMapping("/main")
public String main(@SessionAttribute("pharmacyid") int pharmacyid, Model model) {
    // DAO에서 데이터 가져오기
    List<MainDTO> monthlyTransactions = mainDAO.getMonthlyTransactionData(pharmacyid);
    MainDTO todayIn = mainDAO.getTodayInTransactions(pharmacyid);
    MainDTO todayOut = mainDAO.getTodayOutTransactions(pharmacyid);
    MainDTO currentMedicineCount = mainDAO.getCurrentMedicineCount(pharmacyid);
    MainDTO monthlyOut = mainDAO.getMonthlyOutTransactions(pharmacyid);
    List<MainDTO> recentStockHistory = mainDAO.getRecentStockHistory(pharmacyid);
    List<MainDTO> topSelling = mainDAO.getTopSellingMedicines(pharmacyid);
    MainDTO latestNotice = mainDAO.getLatestNotice(pharmacyid);
    List<MainDTO> monthlySales = mainDAO.getMonthlySalesData(pharmacyid);

    // 모델에 담기
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
