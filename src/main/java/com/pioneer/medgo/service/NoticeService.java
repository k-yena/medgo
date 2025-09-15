package com.pioneer.medgo.service;

import com.pioneer.medgo.dao.NoticeDAO;
import com.pioneer.medgo.dto.NoticeDTO;
import com.pioneer.medgo.dto.PageResult;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoticeService {

    @Autowired
    private NoticeDAO noticeDAO;

    // 페이징된 공지사항 목록
    public PageResult<NoticeDTO> getNotices(int pharmacyid, int page, int pageSize) {
    int totalNotices = noticeDAO.getNoticeCount(pharmacyid);
    int totalPages = (int) Math.ceil((double) totalNotices / pageSize);

    int start = (page - 1) * pageSize;
    int end = page * pageSize;

    List<NoticeDTO> notices = noticeDAO.getNoticesByPharmacyId(pharmacyid, start, end);

    return new PageResult<>(notices, page, totalPages);
    }

    // 전체 공지 개수
    public int getNoticeCount(int pharmacyid) {
        return noticeDAO.getNoticeCount(pharmacyid);
    }

}
