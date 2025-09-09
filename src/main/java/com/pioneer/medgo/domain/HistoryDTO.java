package com.pioneer.medgo.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HistoryDTO {
	public String mainCode;
	public String productName;
	public String manufacturerName;
	public int quantity;
	public String transactionType;
	public String transactionDate;

}
