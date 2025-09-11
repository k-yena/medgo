package com.pioneer.medgo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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

	static Long pharmacyId = 1L;

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

		return "add-medicine";
	}

	@GetMapping("/drugs/delete")
	public String deleteDrug(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size,
			@RequestParam(required = false) String keyword, @RequestParam(defaultValue = "productName") String sort,
			@RequestParam(defaultValue = "asc") String order, Model model) {

		if (pharmacyId == null) {
			return "login";
		}

		if (page < 1) {
			page = 1;
		}
		if (size < 1) {
			size = 10;
		}

		order = "desc".equalsIgnoreCase(order) ? "desc" : "asc";

		int total = pharmacyService.stockListCount(pharmacyId, keyword);
		int totalPages = Math.max((int) Math.ceil((double) total / size), 1);
		if (page > totalPages)
			page = totalPages;

		int offset = (page - 1) * size;
		// sort는 그대로 전달 (화이트리스트 없음)
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

	@GetMapping("/drugs/delete/{medicineId}")
	public String deleteById(@PathVariable("medicineId") Long medicineId, Model model) {
		// user id를 임시로 지정
		if (pharmacyId == null) {
			return "login";
		}
		int deleted = pharmacyService.deleteByMedicineId(pharmacyId, medicineId);

		model.addAttribute("toast", deleted > 0 ? "삭제되었습니다." : "삭제 실패");
		return "redirect:/pharmacy/drugs/delete";
	}

	@GetMapping("/stocks/history")
	public String stock(Model model) {
		// user id를 임시로 지정
		if (pharmacyId == null) {
			return "login";
		}

		List<HistoryDTO> list = pharmacyService.historyList(pharmacyId);
		if (list.size() == 0) {
			model.addAttribute("msg", "출납내역이 없습니다.");
		}
		model.addAttribute("list", list);
		//System.out.println(list.toString());

		return "stock-flow";
	}

	@GetMapping("/stocks")
	public String inven(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size,
			@RequestParam(required = false) String keyword, @RequestParam(defaultValue = "productName") String sort,
			@RequestParam(defaultValue = "asc") String order, Model model) {

		if (pharmacyId == null) {
			return "login";
		}

		if (page < 1) {
			page = 1;
		}
		if (size < 1) {
			size = 10;
		}

		order = "desc".equalsIgnoreCase(order) ? "desc" : "asc";

		int total = pharmacyService.stockListCount(pharmacyId, keyword);
		int totalPages = Math.max((int) Math.ceil((double) total / size), 1);
		if (page > totalPages)
			page = totalPages;

		int offset = (page - 1) * size;
		// sort는 그대로 전달 (화이트리스트 없음)
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

}
