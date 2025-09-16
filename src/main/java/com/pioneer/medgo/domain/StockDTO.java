package com.pioneer.medgo.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StockDTO {
	public Long medicineId;
	public Long pharmacyId;
	public int medCount;
	public String productName;
	public String manufacturerName;
	public String mainCode;
}
