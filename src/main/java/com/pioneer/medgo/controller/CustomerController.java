package com.pioneer.medgo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pioneer.medgo.domain.MedicineDTO;
import com.pioneer.medgo.domain.NoticeDTO;
import com.pioneer.medgo.domain.PharmacyDTO;
import com.pioneer.medgo.service.CustomerService;
import com.pioneer.medgo.service.NoticeService;

@RestController
public class CustomerController {

	private final CustomerService customerService;
	private final NoticeService noticeService;

	public CustomerController(CustomerService customerService, NoticeService noticeService) {
		this.customerService = customerService;
		this.noticeService = noticeService;
	}

	// app 로딩시에 바로 나오면 근처 약국 & 검색하면 해당 약을 가지고 있는 근처약국 반환(전문의약품만 검색지원)
	@GetMapping("/api/nearby")
	public List<PharmacyDTO> nearPharmacy(
			// @RequestParam double latitude, @RequestParam double longitude,
			@RequestParam(required = false) String keyword) {
		double latitude = 37.584566709579256;
		double longitude = 127.00116896994219;
		List<PharmacyDTO> list = new ArrayList<>();
		if (latitude < 0 || latitude > 90 || longitude < 0 || longitude > 180) {

			return list;
		}

		list = customerService.nearbyPharmacyList(latitude, longitude, keyword);

		return list;
	}

	// 최근 notice 반환
	@GetMapping("/api/nearby/{pharmacyId}")
	public NoticeDTO lastestNotcie(@PathVariable Long pharmacyId) {

		return noticeService.latestNotice(pharmacyId);
	}

	// 대조약 검색
	@GetMapping("/api/comparator")
	public List<MedicineDTO> searchComparator(@RequestParam String keyword) {
		List<MedicineDTO> list = customerService.comparatorMedicineList(keyword);
		return list;

	}

}
