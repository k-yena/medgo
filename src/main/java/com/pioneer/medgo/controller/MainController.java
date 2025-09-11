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
		// @SessionAttribute("pharmacyid") int pharmacyid,
		int pharmacyid = 1; // 임시 데이터
        
		// DAO에서 데이터 가져오기
		String pharmacyName = mainDAO.getPharmacyName(pharmacyid);
		List<MainDTO> monthlyTransactions = mainDAO.getMonthlyTransactionData(pharmacyid);
		int todayIn = mainDAO.getTodayInTransactions(pharmacyid);
		int todayOut = mainDAO.getTodayOutTransactions(pharmacyid);
		int currentMedicineCount = mainDAO.getCurrentMedicineCount(pharmacyid);
		int monthlyOut = mainDAO.getMonthlyOutTransactions(pharmacyid);
		MainDTO latestNotice = mainDAO.getLatestNotice(pharmacyid);

		model.addAttribute("pharmacyName", pharmacyName);
		model.addAttribute("monthlyTransactions", monthlyTransactions);
		model.addAttribute("todayIn", todayIn);
		model.addAttribute("todayOut", todayOut);
		model.addAttribute("currentMedicineCount", currentMedicineCount);
		model.addAttribute("monthlyOut", monthlyOut);
		model.addAttribute("latestNotice", latestNotice);

		return "main";
	}

    //--- API 엔드포인트 추가 ---

    @GetMapping("/api/monthly-sales")
    public List<MainDTO> getMonthlySalesData() {
        //@SessionAttribute("pharmacyid") int pharmacyid
        int pharmacyid = 1; // 임시 데이터
        return mainDAO.getMonthlySalesData(pharmacyid); // 월간 판매 데이터 리턴
    }
    
    @GetMapping("/api/top-selling")
    public List<MainDTO> getTopSellingMedicines() {
        //@SessionAttribute("pharmacyid") int pharmacyid
        int pharmacyid = 1; // 임시 데이터
        return mainDAO.getTopSellingMedicines(pharmacyid); // 판매율 Top3
    }

    @GetMapping("/api/recent-stock-history")
    public List<MainDTO> getRecentStockHistory() {
        //@SessionAttribute("pharmacyid") int pharmacyid
        int pharmacyid = 1; // 임시 데이터
        return mainDAO.getRecentStockHistory(pharmacyid); // 최근 입출고 내역
    }

}
