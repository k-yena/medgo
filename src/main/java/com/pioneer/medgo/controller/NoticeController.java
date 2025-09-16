package com.pioneer.medgo.controller;

import com.pioneer.medgo.dto.NoticeDTO;
import com.pioneer.medgo.dto.PageResult;
import com.pioneer.medgo.service.NoticeService;
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

@Controller
@RequestMapping("/pharmacy")
public class NoticeController {

  @Autowired private NoticeService noticeService;

  @GetMapping("/notice")
  public String notice(Model model, @RequestParam(defaultValue = "1") int page) {
    int pharmacyid = 1; // 임시
    int pageSize = 10;

    PageResult<NoticeDTO> pageResult = noticeService.getNotices(pharmacyid, page, pageSize);

    model.addAttribute("notices", pageResult.getContent());
    model.addAttribute("currentPage", pageResult.getCurrentPage());
    model.addAttribute("totalPages", pageResult.getTotalPages());

    return "notice";
  }

  // - 공지사항 등록 -//
  @PostMapping("/notice")
  public String createNotice(
      @ModelAttribute NoticeDTO notice, RedirectAttributes redirectAttributes) {
    // @SessionAttribute("pharmacyid") int pharmacyid
    int pharmacyid = 1; // 임시아이디
    notice.setPharmacyid(pharmacyid);
    boolean isSuccess = noticeService.insertNotice(notice);
    redirectAttributes.addFlashAttribute("isSuccess", isSuccess);

    return "redirect:/pharmacy/notice";
  }

  // - 공지사항 수정 -//
  @PostMapping("/notice/update/{noticeid}")
  public String editNotice(
      @PathVariable int noticeid,
      @ModelAttribute NoticeDTO notice,
      RedirectAttributes redirectAttributes) {
    int pharmacyid = 1; // 임시아이디
    notice.setNoticeid(noticeid);

    boolean isSuccess = noticeService.updateNotice(notice, pharmacyid);
    redirectAttributes.addFlashAttribute("isSuccess", isSuccess);

    return "redirect:/pharmacy/notice";
  }

  // - 공지사항 삭제 -//
  @PostMapping("/notice/delete/{noticeid}")
  public String deleteNotice(
      @ModelAttribute NoticeDTO notice,
      @PathVariable int noticeid,
      RedirectAttributes redirectAttributes) {
    int pharmacyid = 1; // 임시아이디
    notice.setPharmacyid(pharmacyid);

    boolean isSuccess = noticeService.deleteNotice(noticeid);
    redirectAttributes.addFlashAttribute("isSuccess", isSuccess);

    return "redirect:/pharmacy/notice";
  }
}
