package com.pioneer.medgo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pioneer.medgo.dao.StockDAO;
import com.pioneer.medgo.domain.StockDTO;
import com.pioneer.medgo.service.PharmacyService;

@Controller
@RequestMapping("/pharmacy")
public class PharmacyController {
	@Autowired
	private PharmacyService pharmacyService;

	public PharmacyController(PharmacyService pharmacyService) {
		this.pharmacyService = pharmacyService;
	}

	@RequestMapping("/")
	public String Main() {
		return "main";
	}

	@RequestMapping("/drugs/new")
	public String registDrug() {
		return "add-medicine";
	}

	@RequestMapping("/drugs/delete")
	public String deleteDrug() {
		return "delete-medicine";
	}

	@RequestMapping("/stocks/history")
	public String stock() {
		return "stock-flow";
	}

	@RequestMapping("/stocks")
	public String inven(Model model) {
		// user id를 임시로 지정
		Long userId = 1L;
		
		List<StockDTO> list = pharmacyService.stockList(userId);
		if (list.size() == 0) {
			model.addAttribute("msg", "재고가 없습니다.");
		}
		model.addAttribute("stockList", list);
		System.out.println(list.toString());

		return "inventory";
	}

}
