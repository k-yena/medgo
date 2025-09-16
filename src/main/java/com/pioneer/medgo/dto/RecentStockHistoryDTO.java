package com.pioneer.medgo.dto;

import lombok.Data;

@Data
public class RecentStockHistoryDTO {
	private String medicineName;
	private Integer quantity;
	private String transactionType;
}
