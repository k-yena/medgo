package com.pioneer.medgo.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class MonthlyTransactionDTO {
	private Timestamp transactionDate;
	private Integer totalIn;
	private Integer totalOut;
}
