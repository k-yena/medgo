package com.pioneer.medgo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.pioneer.medgo.dao.NoticeDAO;
import com.pioneer.medgo.dto.NoticeDTO;

@Controller
@RequestMapping("/pharmacy")
public class NoticeController {
	public static List<Map<String, String>> getNotices() {
		List<Map<String, String>> notices = new ArrayList<>();

		String[][] data = { { "1", "추석 연휴 운영 시간 안내", "추석 연휴 기간 동안 약국 운영 시간이 변경됩니다. 방문 전 확인 부탁드립니다.", "2025-08-25" },
				{ "2", "독감 예방 접종 시작", "2025년 독감 예방 접종을 시작합니다. 예약 없이 방문 접종 가능합니다.", "2025-08-24" },
				{ "3", "마스크 재고 다량 확보", "KF94, 덴탈 마스크 등 모든 종류의 마스크 재고가 충분히 확보되었습니다.", "2025-08-23" },
				{ "4", "특정 비타민 제품 리콜 안내", "제조사의 요청으로 인해 '튼튼 비타민D' 제품이 리콜됩니다. 해당 제품을 구매하신 분은 약국으로 문의해주세요.",
						"2025-08-22" },
				{ "5", "새로운 영양제 입고", "면역력 강화에 도움을 주는 새로운 영양제 '이뮨 부스터'가 입고되었습니다.", "2025-08-21" },
				{ "6", "약 배달 서비스 시범 운영", "거동이 불편하신 분들을 위해 약 배달 서비스를 시범 운영합니다. 자세한 내용은 문의 바랍니다.", "2025-08-20" },
				{ "7", "정부 방역 지침 변경 안내", "변경된 정부 방역 지침에 따라 약국 내 마스크 착용 의무가 조정되었습니다.", "2025-08-19" },
				{ "8", "여름철 상비약 할인 이벤트", "여름 휴가철을 맞아 벌레 물린데 바르는 약, 소화제 등 상비약을 10% 할인 판매합니다.", "2025-08-18" },
				{ "9", "약사님 개인 사정으로 인한 휴무 안내", "담당 약사님의 개인 사정으로 8월 28일은 오후에만 운영합니다. 이용에 불편을 드려 죄송합니다.", "2025-08-17" },
				{ "10", "약국 내부 리모델링 공사", "더 나은 환경을 제공하기 위해 9월 초 약국 내부 리모델링 공사를 진행할 예정입니다.", "2025-08-16" },
				{ "11", "어린이용 해열제 재입고", "품절되었던 어린이용 해열제가 재입고되었습니다.", "2025-08-15" },
				{ "12", "건강보험 적용 약품 목록 변경", "2025년 9월 1일부터 건강보험이 적용되는 약품 목록이 일부 변경됩니다.", "2025-08-14" },
				{ "13", "당뇨 소모성 재료 지원 확대", "당뇨 환자를 위한 소모성 재료 지원 품목이 확대되었습니다. 상담 창구를 방문해주세요.", "2025-08-13" },
				{ "14", "약학 실습생 교육 안내", "8월 26일부터 2주간 약학 실습생이 교육을 받게 됩니다. 양해 부탁드립니다.", "2025-08-12" },
				{ "15", "처방전 없이 구매 가능한 약품 안내", "최근 처방전 없이 구매 가능하도록 전환된 일반의약품 목록을 안내해드립니다.", "2025-08-11" },
				{ "16", "약국 전용 화장품 신규 입점", "민감성 피부를 위한 약국 전용 화장품 브랜드 '더마케어'가 신규 입점했습니다.", "2025-08-10" },
				{ "17", "폐의약품 안전하게 버리는 방법", "가정 내 폐의약품은 가까운 약국으로 가져와 안전하게 처리하세요.", "2025-08-09" },
				{ "18", "만성질환자 약 상담 주간 운영", "만성질환자분들의 올바른 약 복용을 돕기 위해 일주일간 전문 상담 주간을 운영합니다.", "2025-08-08" },
				{ "19", "심야 응급 약국 운영 안내", "매주 금요일은 심야 응급 약국으로 지정되어 새벽 1시까지 운영됩니다.", "2025-08-07" },
				{ "20", "에너지 드링크 부작용 주의보", "고카페인 에너지 드링크의 부작용에 대한 주의가 필요합니다. 복용 전 약사와 상담하세요.", "2025-08-06" },
				{ "21", "금연 보조제 무료 샘플 증정", "금연을 결심하신 분들을 위해 금연 보조제 무료 샘플을 증정합니다.", "2025-08-05" },
				{ "22", "임산부용 철분제 입고", "임산부를 위한 고함량 철분제가 새로 입고되었습니다.", "2025-08-04" },
				{ "23", "반려동물 구충제 판매 시작", "이제 약국에서 반려동물 구충제를 구매하실 수 있습니다.", "2025-08-03" },
				{ "24", "약 보관 방법 안내", "의약품은 직사광선을 피하고 서늘한 곳에 보관해야 효과가 유지됩니다.", "2025-08-02" },
				{ "25", "조제 대기 시간 단축 시스템 도입", "조제 대기 시간을 줄이기 위해 새로운 전산 시스템을 도입했습니다.", "2025-08-01" },
				{ "26", "수면 유도제 올바른 사용법", "수면 유도제는 반드시 정해진 용법과 용량을 지켜 복용해야 합니다.", "2025-07-31" },
				{ "27", "해외 여행 상비약 준비 가이드", "해외 여행 시 필요한 상비약 목록과 준비 방법을 안내해드립니다.", "2025-07-30" },
				{ "28", "고혈압 약 복용 시 주의사항", "고혈압 약을 복용하시는 분들은 자몽 주스 섭취를 피해야 합니다.", "2025-07-29" },
				{ "29", "유통기한 지난 약 확인 캠페인", "가정 내 구급상자를 점검하여 유통기한이 지난 약은 폐기해주세요.", "2025-07-28" },
				{ "30", "알레르기 비염 신약 입고", "효과가 빠른 알레르기 비염 신약 '알러컷'이 입고되었습니다.", "2025-07-27" },
				{ "31", "코로나19 자가진단키트 판매", "식약처의 정식 승인을 받은 코로나19 자가진단키트를 판매하고 있습니다.", "2025-07-26" },
				{ "32", "약국 소독 및 방역 작업 안내", "매일 정기적으로 약국 전체 소독 및 방역 작업을 실시하고 있습니다.", "2025-07-25" },
				{ "33", "건강 기능 식품 상담 환영", "자신에게 맞는 건강 기능 식품을 찾고 계신다면 약사에게 상담받으세요.", "2025-07-24" },
				{ "34", "인공눈물 사용법 및 주의사항", "인공눈물은 개봉 후 한 달 이내에 사용하고, 다른 사람과 함께 사용하지 마세요.", "2025-07-23" },
				{ "35", "약물 오남용 예방 캠페인", "약물 오남용은 심각한 부작용을 초래할 수 있습니다. 반드시 전문가와 상의하세요.", "2025-07-22" },
				{ "36", "전자 처방전 이용 안내", "이제 모바일 앱을 통해 간편하게 전자 처방전을 전송하실 수 있습니다.", "2025-07-21" },
				{ "37", "환절기 면역력 강화 이벤트", "환절기를 맞아 면역력 강화에 도움이 되는 비타민C 제품을 할인 판매합니다.", "2025-07-20" } };

		for (String[] row : data) {
			Map<String, String> notice = new HashMap<>();
			notice.put("id", row[0]);
			notice.put("title", row[1]);
			notice.put("content", row[2]);
			notice.put("date", row[3]);
			notices.add(notice);
		}

		return notices;
	}

	@Autowired
	private NoticeDAO noticeDAO;

	// - 공지사항 가져오기 -//
	@GetMapping("/notice")
	public String notice(Model model, @RequestParam(defaultValue = "1") int page) {
		List<Map<String, String>> allNotices = getNotices();
		int pageSize = 10;
		int totalNotices = allNotices.size();
		int totalPages = (int) Math.ceil((double) totalNotices / pageSize);

		int start = (page - 1) * pageSize;
		int end = Math.min(start + pageSize, totalNotices);

		List<Map<String, String>> noticesForPage = allNotices.subList(start, end);

		model.addAttribute("notices", noticesForPage);
		model.addAttribute("currentPage", page);
		model.addAttribute("totalPages", totalPages);

		return "notice";
	}

	// - 공지사항 등록 -//
	@PostMapping("/notice")
	public String createNotice(@ModelAttribute NoticeDTO notice, @SessionAttribute("pharmacyid") int pharmacyid,
			RedirectAttributes redirectAttributes) {
		pharmacyid = 1; // 임시아이디
//		notice.setPharmacyid(pharmacyid);
		System.out.println(notice);
//		int rows = noticeDAO.insertNotice(notice);
//		if (rows > 0) {
//			redirectAttributes.addFlashAttribute("successMessage", "공지사항이 등록되었습니다.");
//		} else {
//			redirectAttributes.addFlashAttribute("errorMessage", "공지사항 등록에 실패했습니다.");
//		}
		return "redirect:/notice";
	}

	// - 공지사항 수정 -//
	@PostMapping("/notice/update/{noticeid}")
	public String editNotice(@PathVariable int noticeid, @ModelAttribute NoticeDTO notice,
			RedirectAttributes redirectAttributes) {
		notice.setId(noticeid);
		System.out.println(notice);
//		int rows = noticeDAO.updateNotice(notice);
//		if (rows > 0) {
//			redirectAttributes.addFlashAttribute("successMessage", "공지사항이 수정되었습니다.");
//		} else {
//			redirectAttributes.addFlashAttribute("errorMessage", "공지사항 수정에 실패했습니다.");
//		}
		return "redirect:/notice";
	}

	// - 공지사항 삭제 -//
	@PostMapping("/notice/delete/{noticeid}")
	public String deleteNotice(@PathVariable int noticeid, RedirectAttributes redirectAttributes) {
		System.out.println(noticeid);
		// int rows = noticeDAO.deleteNotice(noticeid);
//		if (rows > 0) {
//			redirectAttributes.addFlashAttribute("successMessage", "공지사항이 삭제되었습니다.");
//		} else {
//			redirectAttributes.addFlashAttribute("errorMessage", "공지사항 삭제에 실패했습니다.");
//		}
		return "redirect:/notice";
	}
}
