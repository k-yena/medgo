package com.pioneer.medgo.domain;

import lombok.Data;

@Data
public class MypageDTO {
	private long userId;
	private String pharmacyName;
	private String phone;
	private String address;
	private String email;
	private String licenseCode;
	private String detailInfo;
}
