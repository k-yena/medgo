package com.pioneer.medgo.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class NoticeDTO {
    private int id;
    private int pharmacyid;
    private String title;
    private String content;
}
