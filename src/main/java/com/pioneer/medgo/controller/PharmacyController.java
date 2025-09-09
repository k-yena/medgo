package com.pioneer.medgo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pioneer.medgo.domain.HistoryDTO;
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

	static Long pharmacyID = 1L;

	@GetMapping("/")
	public String Main() {
		return "main";
	}

	@GetMapping("/drugs/new")
	public String registDrugForm() {
		return "add-medicine";
	}

	@PostMapping("/drugs/new")
	public String registDrug() {

		return "add-medicin";
	}

	@GetMapping("/drugs/delete")
	public String deleteForm(Model model) {
		// user id를 임시로 지정

		List<StockDTO> list = pharmacyService.stockList(pharmacyID);
		if (list.size() == 0) {
			model.addAttribute("msg", "재고가 없습니다.");
		}
		model.addAttribute("stockList", list);
		System.out.println(list.toString());

		return "delete-medicine";
	}

	@PostMapping("/drugs/delete")
	public String deleteDrug(Model model) {
		// user id를 임시로 지정

		List<StockDTO> list = pharmacyService.stockList(pharmacyID);
		if (list.size() == 0) {
			model.addAttribute("msg", "재고가 없습니다.");
		}
		model.addAttribute("stockList", list);
		System.out.println(list.toString());

		return "delete-medicine";
	}

	
	@GetMapping("/stocks/history")
	public String stock(Model model) {
		// user id를 임시로 지정

		String historyJson = pharmacyService.historyList(pharmacyID);
		if (historyJson.equals("[]")) {
			model.addAttribute("msg", "출납내역이 없습니다.");
		}
		model.addAttribute("histories", historyJson);
		System.out.println(historyJson.toString());

		return "stock-flow";
	}

	@GetMapping("/stocks")
	public String inven(Model model) {
		// user id를 임시로 지정

		List<StockDTO> list = pharmacyService.stockList(pharmacyID);
		if (list.size() == 0) {
			model.addAttribute("msg", "재고가 없습니다.");
		}
		model.addAttribute("stockList", list);
		System.out.println(list.toString());

		return "inventory";
	}

}
