package com.pioneer.medgo.domain;

import lombok.Data;

@Data
public class MonthlySalesDTO {
	private String month;
	private Integer totalSold;
}
