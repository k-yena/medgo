package com.pioneer.medgo.controller;

import javax.servlet.http.HttpSession;

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

import com.pioneer.medgo.domain.NoticeDTO;
import com.pioneer.medgo.domain.PageResult;
import com.pioneer.medgo.service.NoticeService;

@Controller
@RequestMapping("/pharmacy")
public class NoticeController {

	@Autowired
	private NoticeService noticeService;

	@GetMapping("/notice")
	public String notice(Model model, @RequestParam(defaultValue = "1") int page, HttpSession session) {
		
		Long pharmacyId = (Long) session.getAttribute("pharmacyId");

		if (pharmacyId == null) {
			return "login";
		}

		int pharmacyid = 1; // 임시
		int pageSize = 10;

		PageResult<NoticeDTO> pageResult = noticeService.getNotices(pharmacyId, page, pageSize);

		model.addAttribute("notices", pageResult.getContent());
		model.addAttribute("currentPage", pageResult.getCurrentPage());
		model.addAttribute("totalPages", pageResult.getTotalPages());

		return "notice";
	}

	// - 공지사항 등록 -//
	@PostMapping("/notice")
	public String createNotice(@ModelAttribute NoticeDTO notice, RedirectAttributes redirectAttributes, HttpSession session) {
		
		Long pharmacyId = (Long) session.getAttribute("pharmacyId");

		if (pharmacyId == null) {
			return "login";
		}

		notice.setPharmacyid(pharmacyId);
		boolean isSuccess = noticeService.insertNotice(notice);
		redirectAttributes.addFlashAttribute("isSuccess", isSuccess);

		return "redirect:/pharmacy/notice";
	}

	// - 공지사항 수정 -//
	@PostMapping("/notice/update/{noticeid}")
	public String editNotice(@PathVariable int noticeid, @ModelAttribute NoticeDTO notice,
			RedirectAttributes redirectAttributes, HttpSession session) {

		Long pharmacyId = (Long) session.getAttribute("pharmacyId");

		if (pharmacyId == null) {
			return "login";
		}

		
		notice.setId(noticeid);

		boolean isSuccess = noticeService.updateNotice(notice, pharmacyId);
		redirectAttributes.addFlashAttribute("isSuccess", isSuccess);

		return "redirect:/pharmacy/notice";
	}

	// - 공지사항 삭제 -//
	@PostMapping("/notice/delete/{noticeid}")
	public String deleteNotice(@ModelAttribute NoticeDTO notice, @PathVariable int noticeid,
			RedirectAttributes redirectAttributes, HttpSession session) {
		
		Long pharmacyId = (Long) session.getAttribute("pharmacyId");

		if (pharmacyId == null) {
			return "login";
		}
		

		notice.setPharmacyid(pharmacyId);

		boolean isSuccess = noticeService.deleteNotice(noticeid);
		redirectAttributes.addFlashAttribute("isSuccess", isSuccess);

		return "redirect:/pharmacy/notice";
	}
}
