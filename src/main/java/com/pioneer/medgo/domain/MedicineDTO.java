package com.pioneer.medgo.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MedicineDTO {
	public Long id;
	public Long pharmacyId;

	public Long medCount;
	public String productName;
	public String manufacturerName;
	public String mainCode;
	public String drugType;
	

}
