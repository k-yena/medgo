package com.pioneer.medgo.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class MainDTO {
    // 입출고 차트 (getMonthlyTransactionData)
    private LocalDate transactionDate;
    private Integer totalIn;
    private Integer totalOut;

    // 오늘 입고/출고
    private Integer todayIn;
    private Integer todayOut;

    // 현재 의약품 수
    private Integer currentMedicineCount;

    // 이번 달 출고
    private Integer monthlyOut;

    // 최근 입출고 기록
    private String medicineName;
    private Integer quantity;
    private String transactionType;

    // 이번 달 판매율 상위 3개
    private Integer totalSold;

    // 공지사항
    private String title;
    private String content;
    private LocalDate createdAt;

    // 월간 판매율 (월별 출고)
    private String month;

}
