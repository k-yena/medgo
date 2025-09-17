package com.pioneer.medgo.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PharmacyDTO {

	public Long id;
	public String pharmacyName;
	public String address;
	public String phone;
	public double longitude;
	public double latitude;
	public double distance;
}
