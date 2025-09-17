package com.pioneer.medgo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pioneer.medgo.domain.PharmacyDTO;
import com.pioneer.medgo.service.CustomerService;

@RestController
public class CustomerController {

	private final CustomerService customerService;

	public CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}

	// app 로딩시에 바로 나오면 근처 약국
	@GetMapping("/api/nearby")
	public List<PharmacyDTO> nearPharmacy(
			@RequestParam double latitude, @RequestParam double longitude
			) {
//		System.out.println(1);
//		double latitude = 37.584566709579256;
//		double longitude = 127.00116896994219;
		List<PharmacyDTO> list = new ArrayList<PharmacyDTO>();
		if (latitude < 0 || latitude > 90 || longitude < 0 || longitude > 180) {
			System.out.println("!!!!");
			return list;
		}

//		System.out.println(2);
		list = customerService.nearbyPharmacyList(latitude, longitude );
//		System.out.println(3);

		return list;
	}

	// 키워드 검색시에 해당 약이 있는 근처 약국

	// 대조약 검색

}
