package com.pioneer.medgo.service;

import com.pioneer.medgo.dao.NoticeDAO;
import com.pioneer.medgo.domain.NoticeDTO;
import com.pioneer.medgo.domain.PageResult;

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

	// 공지사항 등록
	public boolean insertNotice(NoticeDTO notice) {
		int rows = noticeDAO.insertNotice(notice);
		return rows > 0 ? true : false;
	}

	// 공지사항 수정
	public boolean updateNotice(NoticeDTO notice, int pharmacyid) {
		int rows = noticeDAO.updateNotice(notice);
		return rows > 0 ? true : false;
	}

	// 공지사항 삭제
	public boolean deleteNotice(int noticeid) {
		int rows = noticeDAO.deleteNotice(noticeid);
		return rows > 0 ? true : false;
	}

	// 최근 공지사항
	public NoticeDTO latestNotice(long pharmacyId) {
		return noticeDAO.findByPharmarcyId(pharmacyId);

	}
}
