package com.pioneer.medgo.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class NoticeDTO {
	private int noticeid;
	private int pharmacyid;
	private String title;
	private String content;
	private Timestamp createdat;
}
