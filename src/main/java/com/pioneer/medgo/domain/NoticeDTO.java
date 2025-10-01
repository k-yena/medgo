package com.pioneer.medgo.domain;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class NoticeDTO {
	private int id;
	private Long pharmacyid;
	private String title;
	private String content;
	private Timestamp createdat;
}
