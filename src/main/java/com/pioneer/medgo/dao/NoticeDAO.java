package com.pioneer.medgo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.pioneer.medgo.domain.NoticeDTO;

@Mapper
public interface NoticeDAO {
	// 공지사항 페이징 조회
	List<NoticeDTO> getNoticesByPharmacyId(@Param("pharmacyid") int pharmacyid, @Param("start") int start,
			@Param("end") int end);

	// 전체 개수 가져오기 (총 페이지 수 계산용)
	int getNoticeCount(@Param("pharmacyid") int pharmacyid);

	NoticeDTO getNoticeByNoticeId(int id);

	int insertNotice(NoticeDTO notice);

	int updateNotice(NoticeDTO notice);

	int deleteNotice(int id);
}