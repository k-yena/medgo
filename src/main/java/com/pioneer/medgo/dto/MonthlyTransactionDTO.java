package com.pioneer.medgo.dto;

import lombok.Data;

@Data
public class MonthlyTransactionDTO {
	private String transactionDate;
	private Integer totalIn;
	private Integer totalOut;
}
