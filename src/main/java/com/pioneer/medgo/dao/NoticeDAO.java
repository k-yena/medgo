package com.pioneer.medgo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pioneer.medgo.dto.NoticeDTO;

@Mapper
public interface NoticeDAO {
	List<NoticeDTO> getNoticesByPharmacyId(int pharmacyid);

	NoticeDTO getNoticeByNoticeId(int noticeid);

	int insertNotice(NoticeDTO notice);

	int updateNotice(NoticeDTO notice);

	int deleteNotice(int noticeid);
}