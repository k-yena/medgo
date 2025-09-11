package com.pioneer.medgo.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class MainDTO {
	// 입출고 차트
	private Timestamp transactionDate;
	private Integer totalIn;
	private Integer totalOut;

	// 최근 입출고 기록
	private String medicineName;
	private Integer quantity;
	private String transactionType;

	// 이번 달 판매율 상위 3개
	private Integer totalSold;

	// 공지사항
	private String title;
	private String content;
	private String createdAt;

	// 월간 판매율 (월별 출고)
	private String month;

}
