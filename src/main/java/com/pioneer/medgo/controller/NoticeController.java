package com.pioneer.medgo.controller;

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
import com.pioneer.medgo.dto.PageResult;
import com.pioneer.medgo.service.NoticeService;

@Controller
@RequestMapping("/pharmacy")
public class NoticeController {

	@Autowired
	private NoticeService noticeService;
	private NoticeDAO noticeDAO;

	@GetMapping("/notice")
	public String notice(Model model, @RequestParam(defaultValue = "1") int page) {
		long startTime = System.currentTimeMillis(); // 성능 측정 시작
		int pharmacyid = 1; // 임시
		int pageSize = 10;

		PageResult<NoticeDTO> pageResult = noticeService.getNotices(pharmacyid, page, pageSize);

		model.addAttribute("notices", pageResult.getContent());
		model.addAttribute("currentPage", pageResult.getCurrentPage());
		model.addAttribute("totalPages", pageResult.getTotalPages());

		long endTime = System.currentTimeMillis(); // 성능 측정 끝
		System.out.println("전체 공지사항 조회 시간(ms): " + (endTime - startTime));

		return "notice";
	}

	// - 공지사항 등록 -//
	@PostMapping("/notice")
	public String createNotice(@ModelAttribute NoticeDTO notice, RedirectAttributes redirectAttributes) {
		// @SessionAttribute("pharmacyid") int pharmacyid
		int pharmacyid = 1; // 임시아이디
		notice.setPharmacyid(pharmacyid);
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
		int rows = noticeDAO.updateNotice(notice);
		if (rows > 0) {
			redirectAttributes.addFlashAttribute("successMessage" + "공지사항이 수정되었습니다.");
		} else {
			redirectAttributes.addFlashAttribute("errorMessage", "공지사항 수정에 실패했습니다.");
		}
		return "redirect:/pharmacy/notice";
	}

	// - 공지사항 삭제 -//
	@PostMapping("/notice/delete/{noticeid}")
	public String deleteNotice(@ModelAttribute NoticeDTO notice, @PathVariable int noticeid,
			RedirectAttributes redirectAttributes) {
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
