package com.pioneer.medgo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pioneer.medgo.domain.HistoryDTO;
import com.pioneer.medgo.domain.MedicineDTO;
import com.pioneer.medgo.domain.StockDTO;
import com.pioneer.medgo.service.PharmacyService;

@Controller
@RequestMapping("/pharmacy")
public class PharmacyController {
	
	private final PharmacyService pharmacyService;

	public PharmacyController(PharmacyService pharmacyService) {
		this.pharmacyService = pharmacyService;
	}

	static Long pharmacyId = 1L;

	//의약품 등록을 위한 의약품 검색 폼
	@GetMapping("/drugs/new")
	public String registDrugForm(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(required = false) String keyword,
			@RequestParam(defaultValue = "productName") String sort, @RequestParam(defaultValue = "asc") String order,
			Model model) {
		// user id를 임시로 지정
		if (pharmacyId == null) {
			return "login";
		}
		List<MedicineDTO> list = new ArrayList<>();
		
		//keyword가 없을 때
		if (keyword == null || keyword.length() == 0) {
			model.addAttribute("list", list);

			return "add-medicine";
		}

		//페이징처리
		page = Math.max(page, 1);
		if (size < 1) {
			size = 10;
		}
		order = "desc".equalsIgnoreCase(order) ? "desc" : "asc";
		int total = pharmacyService.medicineListCount(keyword);
		int totalPages = Math.max((int) Math.ceil((double) total / size), 1);
		page = Math.min(totalPages, page);
		int offset = (page - 1) * size;
		
		
		list = pharmacyService.medicineList(keyword, sort, order, offset, size);

		model.addAttribute("list", list);
		model.addAttribute("page", page);
		model.addAttribute("size", size);
		model.addAttribute("total", total);
		model.addAttribute("totalPages", totalPages);
		model.addAttribute("keyword", keyword == null ? "" : keyword);
		model.addAttribute("sort", sort);
		model.addAttribute("orderBy", order);

		return "add-medicine";
	}

	//약국 재고로 의약품 등록
	@PostMapping("/drugs/new/{medicineId}")
	public String registDrug(@PathVariable("medicineId") Long medicineId, @RequestParam("medCount") int medCount,
			Model model) {

		// user id를 임시로 지정
		if (pharmacyId == null) {
			return "login";
		}
		boolean result = pharmacyService.addMedicine(pharmacyId, medicineId, medCount);

		String transactionType = "입고";

		if (result) {
			//입고 내역등록
			pharmacyService.addHistory(pharmacyId, medicineId, medCount, transactionType);
		}

		model.addAttribute("toast", result ? "등록되었습니다." : "등록 실패");

		return "redirect:/pharmacy/drugs/new";
	}

	//재고 의약품 삭제 폼으로 이동
	@GetMapping("/drugs/delete")
	public String deleteDrug(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size,
			@RequestParam(required = false) String keyword, @RequestParam(defaultValue = "productName") String sort,
			@RequestParam(defaultValue = "asc") String order, Model model) {

		// user id를 임시로 지정
		if (pharmacyId == null) {
			return "login";
		}

		//페이징처리
		page = Math.max(page, 1);
		if (size < 1) {
			size = 10;
		}
		order = "desc".equalsIgnoreCase(order) ? "desc" : "asc";
		int total = pharmacyService.stockListCount(pharmacyId, keyword);
		int totalPages = Math.max((int) Math.ceil((double) total / size), 1);
		page = Math.min(totalPages, page);
		int offset = (page - 1) * size;
		
		
		List<StockDTO> list = pharmacyService.stockListForDelete(pharmacyId, keyword, sort, order, offset, size);

		model.addAttribute("list", list);
		model.addAttribute("page", page);
		model.addAttribute("size", size);
		model.addAttribute("total", total);
		model.addAttribute("totalPages", totalPages);
		model.addAttribute("keyword", keyword == null ? "" : keyword);
		model.addAttribute("sort", sort);
		model.addAttribute("orderBy", order);

		return "delete-medicine";
	}
	
	//재고 의약품 삭제요청
	@GetMapping("/drugs/delete/{medicineId}")
	public String deleteById(@PathVariable("medicineId") Long medicineId, @RequestParam("medCount") int medCount,
			Model model) {
		// user id를 임시로 지정
		if (pharmacyId == null) {
			return "login";
		}
		
		boolean result = pharmacyService.deleteMedicine(pharmacyId, medicineId);

		String transactionType = "출고";

		if (result) {
			//출고 내역등록
			pharmacyService.addHistory(pharmacyId, medicineId, medCount, transactionType);
		}

		model.addAttribute("toast", result ? "삭제되었습니다." : "삭제 실패");
		return "redirect:/pharmacy/drugs/delete";
	}
	
	
	//입-출고 기록
	@GetMapping("/stocks/history")
	public String stock(Model model) {
		// user id를 임시로 지정
		if (pharmacyId == null) {
			return "login";
		}

		List<HistoryDTO> list = pharmacyService.historyList(pharmacyId);
		if (list.size() == 0) {
			model.addAttribute("msg", "입/출고 내역이 없습니다.");
		}
		model.addAttribute("list", list);

		return "stock-flow";
	}
	
	//재고 목록
	@GetMapping("/stocks")
	public String inven(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size,
			@RequestParam(required = false) String keyword, @RequestParam(defaultValue = "productName") String sort,
			@RequestParam(defaultValue = "asc") String order, Model model) {

		// user id를 임시로 지정
		if (pharmacyId == null) {
			return "login";
		}
		
		//페이징처리
		page = Math.max(page, 1);
		if (size < 1) {
			size = 10;
		}
		order = "desc".equalsIgnoreCase(order) ? "desc" : "asc";
		int total = pharmacyService.stockListCount(pharmacyId, keyword);
		int totalPages = Math.max((int) Math.ceil((double) total / size), 1);
		page = Math.min(totalPages, page);
		int offset = (page - 1) * size;

		
		List<StockDTO> list = pharmacyService.stockListForDelete(pharmacyId, keyword, sort, order, offset, size);

		model.addAttribute("list", list);
		model.addAttribute("page", page);
		model.addAttribute("size", size);
		model.addAttribute("total", total);
		model.addAttribute("totalPages", totalPages);
		model.addAttribute("keyword", keyword == null ? "" : keyword);
		model.addAttribute("sort", sort);
		model.addAttribute("orderBy", order);

		return "inventory";
	}
	
	//재고 수량 수정
	@PostMapping("/stock/{medicineId}")
	public String insertQuantity(@PathVariable("medicineId") Long medicineId, @RequestParam("transactionQuantity") int transactionQuantity,
			Model model) {
		if (pharmacyId == null) {
			return "login";
		}
		
		boolean result = pharmacyService.insertQuantity(pharmacyId, medicineId, transactionQuantity);

		model.addAttribute("toast", result ? "등록되었습니다." : "등록 실패");

		return "redirect:/pharmacy/stocks";
	}

}
