package com.pioneer.medgo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.pioneer.medgo.dao.NoticeDAO;
import com.pioneer.medgo.dto.NoticeDTO;

@Controller
@RequestMapping("/pharmacy")
public class NoticeController {

	@Autowired
	private NoticeDAO noticeDAO;

	// - 공지사항 가져오기 -//
	@GetMapping("/notice")
	public String notice(Model model, @RequestParam(defaultValue = "1") int page) {
		// @SessionAttribute("pharmacyid") int pharmacyid
		int pharmacyid = 1; // 임시 데이터
		List<NoticeDTO> allNotices = noticeDAO.getNoticesByPharmacyId(pharmacyid);
		int pageSize = 10;
		int totalNotices = allNotices.size();
		int totalPages = (int) Math.ceil((double) totalNotices / pageSize);

		int start = (page - 1) * pageSize;
		int end = Math.min(start + pageSize, totalNotices);

		List<NoticeDTO> noticesForPage = allNotices.subList(start, end);

		model.addAttribute("notices", noticesForPage);
		model.addAttribute("currentPage", page);
		model.addAttribute("totalPages", totalPages);

		System.out.println(allNotices);

		return "notice";
	}

	// - 공지사항 등록 -//
	@PostMapping("/notice")
	public String createNotice(@ModelAttribute NoticeDTO notice, RedirectAttributes redirectAttributes) {
		// @SessionAttribute("pharmacyid") int pharmacyid
		int pharmacyid = 1; // 임시아이디
		notice.setPharmacyid(pharmacyid);
		System.out.println(notice);
		int rows = noticeDAO.insertNotice(notice);
		if (rows > 0) {
			redirectAttributes.addFlashAttribute("successMessage", "공지사항이 등록되었습니다.");
		} else {
			redirectAttributes.addFlashAttribute("errorMessage", "공지사항 등록에 실패했습니다.");
		}
		return "redirect:/pharmacy/notice";
	}

	// - 공지사항 수정 -//
	@PostMapping("/notice/update/{noticeid}")
	public String editNotice(@PathVariable int noticeid, @ModelAttribute NoticeDTO notice,
			RedirectAttributes redirectAttributes) {
		int pharmacyid = 1; // 임시아이디
		notice.setPharmacyid(pharmacyid);
		notice.setNoticeid(noticeid);
		System.out.println("#######이거 받아온 아이텐:" + notice);
		int rows = noticeDAO.updateNotice(notice);
		if (rows > 0) {
			System.out.println("successMessage" + "공지사항이 수정되었습니다.");
		} else {
			redirectAttributes.addFlashAttribute("errorMessage", "공지사항 수정에 실패했습니다.");
		}
		return "redirect:/pharmacy/notice";
	}

	// - 공지사항 삭제 -//
	@PostMapping("/notice/delete/{noticeid}")
	public String deleteNotice(@ModelAttribute NoticeDTO notice, @PathVariable int noticeid,
			RedirectAttributes redirectAttributes) {
		System.out.println(noticeid);
		int pharmacyid = 1; // 임시아이디
		notice.setPharmacyid(pharmacyid);
		int rows = noticeDAO.deleteNotice(noticeid);
		if (rows > 0) {
			redirectAttributes.addFlashAttribute("successMessage", "공지사항이 삭제되었습니다.");
		} else {
			redirectAttributes.addFlashAttribute("errorMessage", "공지사항 삭제에 실패했습니다.");
		}
		return "redirect:/pharmacy/notice";
	}
}
