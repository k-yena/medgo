package com.pioneer.medgo.dto;

import java.util.List;
import lombok.Data;

@Data
public class MainDashBoardDTO {
  private String pharmacyName;
  private int todayIn;
  private int todayOut;
  private int currentMedicineCount;
  private int monthlyOut;
  private NoticeDTO latestNotice;
  private List<RecentStockHistoryDTO> recentStockHistory;
}
