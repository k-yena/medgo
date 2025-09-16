package com.pioneer.medgo.dto;

import lombok.Data;
import java.util.List;

@Data
public class PageResult<T> {
    private List<T> content;   // 현재 페이지 데이터
    private int currentPage;   // 현재 페이지 번호
    private int totalPages;    // 전체 페이지 수

    public PageResult(List<T> content, int currentPage, int totalPages) {
        this.content = content;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
    }
}
