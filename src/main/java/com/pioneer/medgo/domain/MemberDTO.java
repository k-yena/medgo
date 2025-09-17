package com.pioneer.medgo.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberDTO {
	private Long id;
	private String email;
	private String name;
	private String password;
	private String address;
	private String licenseCode; 
	private double latitude;
	private double longitude;
	private String redirectUrl;  // JS에서 사용할 임시 필드 
}
