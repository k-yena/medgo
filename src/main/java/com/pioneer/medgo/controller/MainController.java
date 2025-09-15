package com.pioneer.medgo.controller;

import com.pioneer.medgo.dto.MainDashBoardDTO;
import com.pioneer.medgo.dto.MonthlySalesDTO;
import com.pioneer.medgo.dto.MonthlyTransactionDTO;
import com.pioneer.medgo.dto.RecentStockHistoryDTO;
import com.pioneer.medgo.dto.TopSellingMedicinesDTO;
import com.pioneer.service.MainService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/pharmacy")
public class MainController {

  @Autowired MainService mainService;

  @GetMapping("/main")
  public String main(Model model) {
    // @SessionAttribute("pharmacyid") int pharmacyid,
    int pharmacyid = 1; // 임시 데이터

    MainDashBoardDTO dashboardData = mainService.getDashboardData(pharmacyid);
    model.addAttribute("dashboard", dashboardData);

    return "main";
  }

  // --- API (JSON) ---

  // 한달 간의 입출고 차트 데이터 반환
  @GetMapping("/api/monthly-transactions")
  @ResponseBody
  public List<MonthlyTransactionDTO> getMonthlyTransactions() {
    int pharmacyid = 1; // 임시 데이터
    return mainService.getMonthlyTransactionData(pharmacyid);
  }

  // 최근 입출고 기록 데이터 반환
  @GetMapping("/api/recent-stock-history")
  @ResponseBody
  public List<RecentStockHistoryDTO> getRecentStockHistory() {
    int pharmacyid = 1; // 임시 데이터
    return mainService.getRecentStockHistory(pharmacyid);
  }

  // 이번달 판매량 높은 약 데이터 반환
  @GetMapping("/api/top-selling-medicines")
  @ResponseBody
  public List<TopSellingMedicinesDTO> getTopSellingMedicines() {
    int pharmacyid = 1; // 임시 데이터
    return mainService.getTopSellingMedicines(pharmacyid);
  }

  // 월간 판매율 데이터 반환
  @GetMapping("/api/monthly-sales")
  @ResponseBody
  public List<MonthlySalesDTO> getMonthlySales() {
    int pharmacyid = 1; // 임시 데이터
    return mainService.getMonthlySalesData(pharmacyid);
  }
}
