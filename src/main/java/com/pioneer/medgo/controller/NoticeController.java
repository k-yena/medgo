package com.pioneer.medgo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;

import com.pioneer.medgo.dao.NoticeDAO;
import com.pioneer.medgo.dto.NoticeDTO;


@Controller
@RequestMapping("/pharmacy")
public class NoticeController {
  
@Autowired
private NoticeDAO noticeDAO;
//TODO:에외처리하기

    //- 공지사항 가져오기 -//
    //pharmacyid로 공지사항 리스트 가져오기
    @GetMapping("/notice")
    public String notice(@SessionAttribute("pharmacyid") int pharmacyid) {
        ModelAndView mav = new ModelAndView();
        pharmacyid = 1; //임시아이디
        //TODO: 세션에서 아이디 가져오기
        if(pharmacyid <= 0) {
            mav.addObject("message", "약국 아이디가 유효하지 않습니다.");
            return "notice";
        }   
        NoticeDTO notice = noticeDAO.getNoticeByNoticeId(pharmacyid);
        if(notice == null) {
            mav.addObject("message", "등록된 공지사항이 없습니다.");
            return "notice";
        }
        mav.addObject("notice", notice);
        return "notice";
    }

    //- 공지사항 상세보기 -//
    //noticeid로 공지사항 상세보기
    @GetMapping("/notice/{noticeid}")
    public String noticeDetail(@RequestParam("noticeid") int noticeid) {
         ModelAndView mav = new ModelAndView();
         NoticeDTO notice = noticeDAO.getNoticeByNoticeId(noticeid);
         if(notice == null) {
            mav.addObject("msg", "존재하지 않는 공지사항입니다.");
            return "notice";
         }
         mav.addObject("notice", notice);
        return "notice";
    }

    //- 공지사항 등록 -//
    @PostMapping("notice")
    public String createNotice(NoticeDTO notice, @SessionAttribute("pharmacyid") int pharmacyid) {
        pharmacyid = 1; //임시아이디
        notice.setPharmacyid(pharmacyid);
        int rows = noticeDAO.insertNotice(notice);
        if(rows <= 0) {
            ModelAndView model = new ModelAndView();
            model.addObject("msg", "공지사항 등록에 실패했습니다.");
        } 
        return "notice";
    }

    //- 공지사항 수정 -//
    @PostMapping("/notice/{noticeid}")
    public String editNotice(@RequestParam("noticeid") int noticeid, NoticeDTO notice) {
        notice.setId(noticeid);
        int rows=  noticeDAO.updateNotice(notice);
        if(rows <= 0) {
            ModelAndView model = new ModelAndView();
            model.addObject("msg", "공지사항 수정에 실패했습니다.");
        }   
        return "notice";
    }    

    //- 공지사항 삭제 -//
    @PostMapping("/notice/{noticeid}")
    public String deleteNotice(@RequestParam("noticeid") int noticeid) {
        int rows = noticeDAO.deleteNotice(noticeid);
        if(rows <= 0) {
            ModelAndView model = new ModelAndView();
            model.addObject("msg", "공지사항 삭제에 실패했습니다.");
        }   
        return "notice";
    }

}
