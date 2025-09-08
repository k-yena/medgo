package com.pioneer.medgo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.pioneer.medgo.dao.NoticeDAO;
import com.pioneer.medgo.dto.NoticeDTO;

@Controller
@RequestMapping("/pharmacy")
public class NoticeController {

	@Autowired
	private NoticeDAO noticeDAO;

	// - 공지사항 가져오기 -//
	@GetMapping("/notice")
	public String notice(Model model) {
		int pharmacyid = 1; // 임시아이디
		// TODO: 세션에서 아이디 가져오기

		if (pharmacyid <= 0) {
			model.addAttribute("message", "약국 아이디가 유효하지 않습니다.");
		} else {
			NoticeDTO notice = noticeDAO.getNoticeByNoticeId(pharmacyid);
			if (notice == null) {
				model.addAttribute("message", "등록된 공지사항이 없습니다.");
			} else {
				model.addAttribute("notice", notice);
			}
		}
		return "notice";
	}

	// - 공지사항 상세보기 -//
	@GetMapping("/notice/{noticeid}")
	public String noticeDetail(@PathVariable int noticeid, Model model) {
		NoticeDTO notice = noticeDAO.getNoticeByNoticeId(noticeid);
		if (notice == null) {
			model.addAttribute("msg", "존재하지 않는 공지사항입니다.");
		} else {
			model.addAttribute("notice", notice);
		}
		return "notice";
	}

	// - 공지사항 등록 -//
	@PostMapping("/notice")
	public String createNotice(@ModelAttribute NoticeDTO notice, @SessionAttribute("pharmacyid") int pharmacyid,
			Model model) {
		pharmacyid = 1; // 임시아이디
		notice.setPharmacyid(pharmacyid);

		int rows = noticeDAO.insertNotice(notice);
		if (rows <= 0) {
			model.addAttribute("msg", "공지사항 등록에 실패했습니다.");
		}
		return "notice";
	}

	// - 공지사항 수정 -//
	@PostMapping("/notice/update/{noticeid}")
	public String editNotice(@PathVariable int noticeid, @ModelAttribute NoticeDTO notice, Model model) {
		notice.setId(noticeid);
		int rows = noticeDAO.updateNotice(notice);
		if (rows <= 0) {
			model.addAttribute("msg", "공지사항 수정에 실패했습니다.");
		}
		return "notice";
	}

	// - 공지사항 삭제 -//
	@PostMapping("/notice/delete/{noticeid}")
	public String deleteNotice(@PathVariable int noticeid, Model model) {
		int rows = noticeDAO.deleteNotice(noticeid);
		if (rows <= 0) {
			model.addAttribute("msg", "공지사항 삭제에 실패했습니다.");
		}
		return "notice";
	}
}
