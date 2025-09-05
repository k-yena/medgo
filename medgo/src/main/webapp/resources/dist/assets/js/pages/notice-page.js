// --- 테이블 구축 ---
//임시 데이터
const notices = [
  {
    title: "추석 연휴 운영 시간 안내",
    content:
      "추석 연휴 기간 동안 약국 운영 시간이 변경됩니다. 방문 전 확인 부탁드립니다.",
    date: "2025-08-25",
  },
  {
    title: "독감 예방 접종 시작",
    content:
      "2025년 독감 예방 접종을 시작합니다. 예약 없이 방문 접종 가능합니다.",
    date: "2025-08-24",
  },
  {
    title: "마스크 재고 다량 확보",
    content:
      "KF94, 덴탈 마스크 등 모든 종류의 마스크 재고가 충분히 확보되었습니다.",
    date: "2025-08-23",
  },
  {
    title: "특정 비타민 제품 리콜 안내",
    content:
      "제조사의 요청으로 인해 '튼튼 비타민D' 제품이 리콜됩니다. 해당 제품을 구매하신 분은 약국으로 문의해주세요.",
    date: "2025-08-22",
  },
  {
    title: "새로운 영양제 입고",
    content:
      "면역력 강화에 도움을 주는 새로운 영양제 '이뮨 부스터'가 입고되었습니다.",
    date: "2025-08-21",
  },
  {
    title: "약 배달 서비스 시범 운영",
    content:
      "거동이 불편하신 분들을 위해 약 배달 서비스를 시범 운영합니다. 자세한 내용은 문의 바랍니다.",
    date: "2025-08-20",
  },
  {
    title: "정부 방역 지침 변경 안내",
    content:
      "변경된 정부 방역 지침에 따라 약국 내 마스크 착용 의무가 조정되었습니다.",
    date: "2025-08-19",
  },
  {
    title: "여름철 상비약 할인 이벤트",
    content:
      "여름 휴가철을 맞아 벌레 물린데 바르는 약, 소화제 등 상비약을 10% 할인 판매합니다.",
    date: "2025-08-18",
  },
  {
    title: "약사님 개인 사정으로 인한 휴무 안내",
    content:
      "담당 약사님의 개인 사정으로 8월 28일은 오후에만 운영합니다. 이용에 불편을 드려 죄송합니다.",
    date: "2025-08-17",
  },
  {
    title: "약국 내부 리모델링 공사",
    content:
      "더 나은 환경을 제공하기 위해 9월 초 약국 내부 리모델링 공사를 진행할 예정입니다.",
    date: "2025-08-16",
  },
  {
    title: "어린이용 해열제 재입고",
    content: "품절되었던 어린이용 해열제가 재입고되었습니다.",
    date: "2025-08-15",
  },
  {
    title: "건강보험 적용 약품 목록 변경",
    content:
      "2025년 9월 1일부터 건강보험이 적용되는 약품 목록이 일부 변경됩니다.",
    date: "2025-08-14",
  },
  {
    title: "당뇨 소모성 재료 지원 확대",
    content:
      "당뇨 환자를 위한 소모성 재료 지원 품목이 확대되었습니다. 상담 창구를 방문해주세요.",
    date: "2025-08-13",
  },
  {
    title: "약학 실습생 교육 안내",
    content:
      "8월 26일부터 2주간 약학 실습생이 교육을 받게 됩니다. 양해 부탁드립니다.",
    date: "2025-08-12",
  },
  {
    title: "처방전 없이 구매 가능한 약품 안내",
    content:
      "최근 처방전 없이 구매 가능하도록 전환된 일반의약품 목록을 안내해드립니다.",
    date: "2025-08-11",
  },
  {
    title: "약국 전용 화장품 신규 입점",
    content:
      "민감성 피부를 위한 약국 전용 화장품 브랜드 '더마케어'가 신규 입점했습니다.",
    date: "2025-08-10",
  },
  {
    title: "폐의약품 안전하게 버리는 방법",
    content: "가정 내 폐의약품은 가까운 약국으로 가져와 안전하게 처리하세요.",
    date: "2025-08-09",
  },
  {
    title: "만성질환자 약 상담 주간 운영",
    content:
      "만성질환자분들의 올바른 약 복용을 돕기 위해 일주일간 전문 상담 주간을 운영합니다.",
    date: "2025-08-08",
  },
  {
    title: "심야 응급 약국 운영 안내",
    content:
      "매주 금요일은 심야 응급 약국으로 지정되어 새벽 1시까지 운영됩니다.",
    date: "2025-08-07",
  },
  {
    title: "에너지 드링크 부작용 주의보",
    content:
      "고카페인 에너지 드링크의 부작용에 대한 주의가 필요합니다. 복용 전 약사와 상담하세요.",
    date: "2025-08-06",
  },
  {
    title: "금연 보조제 무료 샘플 증정",
    content: "금연을 결심하신 분들을 위해 금연 보조제 무료 샘플을 증정합니다.",
    date: "2025-08-05",
  },
  {
    title: "임산부용 철분제 입고",
    content: "임산부를 위한 고함량 철분제가 새로 입고되었습니다.",
    date: "2025-08-04",
  },
  {
    title: "반려동물 구충제 판매 시작",
    content: "이제 약국에서 반려동물 구충제를 구매하실 수 있습니다.",
    date: "2025-08-03",
  },
  {
    title: "약 보관 방법 안내",
    content:
      "의약품은 직사광선을 피하고 서늘한 곳에 보관해야 효과가 유지됩니다.",
    date: "2025-08-02",
  },
  {
    title: "조제 대기 시간 단축 시스템 도입",
    content: "조제 대기 시간을 줄이기 위해 새로운 전산 시스템을 도입했습니다.",
    date: "2025-08-01",
  },
  {
    title: "수면 유도제 올바른 사용법",
    content: "수면 유도제는 반드시 정해진 용법과 용량을 지켜 복용해야 합니다.",
    date: "2025-07-31",
  },
  {
    title: "해외 여행 상비약 준비 가이드",
    content: "해외 여행 시 필요한 상비약 목록과 준비 방법을 안내해드립니다.",
    date: "2025-07-30",
  },
  {
    title: "고혈압 약 복용 시 주의사항",
    content: "고혈압 약을 복용하시는 분들은 자몽 주스 섭취를 피해야 합니다.",
    date: "2025-07-29",
  },
  {
    title: "유통기한 지난 약 확인 캠페인",
    content: "가정 내 구급상자를 점검하여 유통기한이 지난 약은 폐기해주세요.",
    date: "2025-07-28",
  },
  {
    title: "알레르기 비염 신약 입고",
    content: "효과가 빠른 알레르기 비염 신약 '알러컷'이 입고되었습니다.",
    date: "2025-07-27",
  },
  {
    title: "코로나19 자가진단키트 판매",
    content:
      "식약처의 정식 승인을 받은 코로나19 자가진단키트를 판매하고 있습니다.",
    date: "2025-07-26",
  },
  {
    title: "약국 소독 및 방역 작업 안내",
    content: "매일 정기적으로 약국 전체 소독 및 방역 작업을 실시하고 있습니다.",
    date: "2025-07-25",
  },
  {
    title: "건강 기능 식품 상담 환영",
    content:
      "자신에게 맞는 건강 기능 식품을 찾고 계신다면 약사에게 상담받으세요.",
    date: "2025-07-24",
  },
  {
    title: "인공눈물 사용법 및 주의사항",
    content:
      "인공눈물은 개봉 후 한 달 이내에 사용하고, 다른 사람과 함께 사용하지 마세요.",
    date: "2025-07-23",
  },
  {
    title: "약물 오남용 예방 캠페인",
    content:
      "약물 오남용은 심각한 부작용을 초래할 수 있습니다. 반드시 전문가와 상의하세요.",
    date: "2025-07-22",
  },
  {
    title: "전자 처방전 이용 안내",
    content:
      "이제 모바일 앱을 통해 간편하게 전자 처방전을 전송하실 수 있습니다.",
    date: "2025-07-21",
  },
  {
    title: "환절기 면역력 강화 이벤트",
    content:
      "환절기를 맞아 면역력 강화에 도움이 되는 비타민C 제품을 할인 판매합니다.",
    date: "2025-07-20",
  },
];

const noticesPerPage = 7;
let currentPage = 1;
let currentNotice = null;

// 공지사항 표시
function displayNotices(page) {
  const start = (page - 1) * noticesPerPage;
  const end = start + noticesPerPage;
  const list = notices.slice(start, end);

  const container = document.getElementById("notice-container");
  container.innerHTML = "";

  list.forEach((notice) => {
    const card = document.createElement("tr");
    card.dataset.bsToggle = "modal";
    card.dataset.bsTarget = "#showNotice";

    const truncatedContent =
      notice.content.length > 50
        ? notice.content.substring(0, 50) + "..."
        : notice.content;

    card.innerHTML = `
    <td class="col-3">
      <div class="d-flex align-items-center notice-header">
        <p class="font-bold ms-3 mb-0 alert-heading">${notice.title}</p>
      </div>
    </td>
    <td class="col-auto">
      <p class="mb-0">${truncatedContent}</p>
    </td>
   <td class="col-2">
    <p class="mb-0">${notice.date}</p>
   </td>
    `;
    card.addEventListener("click", () => {
      currentNotice = notice;
      document.getElementById("notice-edit-title").value = notice.title;
      document.getElementById("notice-edit-content").value = notice.content;
    });
    container.appendChild(card);
  });
}

// 페이지 네이션
// 축약된 페이지네이션 생성
function setupPagination() {
  const totalPages = Math.ceil(notices.length / noticesPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const maxButtons = 3; // 가운데 숫자 버튼 최대 개수
  const half = Math.floor(maxButtons / 2);

  // 이전 버튼
  const prev = document.createElement("li");
  prev.className = "page-item" + (currentPage === 1 ? " disabled" : "");
  prev.innerHTML = `<a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>`;
  prev.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });
  pagination.appendChild(prev);

  // 첫 페이지
  if (currentPage > half + 1) pagination.appendChild(createPageItem(1));
  if (currentPage > half + 2) pagination.appendChild(createDots());

  // 숫자 버튼
  let startPage = Math.max(1, currentPage - half);
  let endPage = Math.min(totalPages, currentPage + half);

  if (currentPage <= half) {
    endPage = Math.min(totalPages, maxButtons);
  }
  if (currentPage + half > totalPages) {
    startPage = Math.max(1, totalPages - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pagination.appendChild(createPageItem(i));
  }

  // 마지막 페이지
  if (currentPage + half < totalPages - 1) pagination.appendChild(createDots());
  if (currentPage + half < totalPages)
    pagination.appendChild(createPageItem(totalPages));

  // 다음 버튼
  const next = document.createElement("li");
  next.className =
    "page-item" + (currentPage === totalPages ? " disabled" : "");
  next.innerHTML = `<a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>`;
  next.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
    }
  });
  pagination.appendChild(next);
}

function createPageItem(page) {
  const li = document.createElement("li");
  li.className = "page-item" + (page === currentPage ? " active" : "");
  li.innerHTML = `<a class="page-link" href="#">${page}</a>`;
  li.addEventListener("click", (e) => {
    e.preventDefault();
    currentPage = page;
    updatePagination();
  });
  return li;
}

function createDots() {
  const li = document.createElement("li");
  li.className = "page-item disabled";
  li.innerHTML = `<span class="page-link">...</span>`;
  return li;
}

function updatePagination() {
  displayNotices(currentPage);
  setupPagination();
}

// --- 공지사항 수정,삭제 후 나오는 토스트 ---
document.addEventListener("DOMContentLoaded", () => {
  updatePagination();

  const noticeModalElement = document.getElementById("showNotice");
  const noticeModal = new bootstrap.Modal(noticeModalElement);

  const detailBtns = document.querySelector(".notice-btns");
  detailBtns.querySelector(".edit-btn").addEventListener("click", () => {
    if (currentNotice) {
      //공지사항 수정이 눌렸을떄 API
      noticeModal.hide();
      Toastify({
        text: "공지사항이 수정되었습니다.",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#14b3ae",
      }).showToast();
    }
  });
  detailBtns.querySelector(".delete-btn").addEventListener("click", (e) => {
    e.preventDefault();
    if (currentNotice) {
      //공지사항 삭제가 눌렸을때 API
      noticeModal.hide();
      Toastify({
        text: "공지사항이 삭제되었습니다.",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        backgroundColor: "rgba(196, 39, 39, 0.794)",
        style: {
          zIndex: 99999,
          overflow: "hidden",
        },
      }).showToast();
    }
  });

  // --- 공지사항 등록 후 나오는 토스트 ---
  const makeNoticeModalElement = document.getElementById("makeNotice");
  const makeNoticeModal = new bootstrap.Modal(makeNoticeModalElement);
  const registerBtn = document.querySelector(".register-notice-btn");

  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // 공지사항 등록 API
    makeNoticeModal.hide();

    Toastify({
      text: "공지사항이 등록되었습니다.",
      duration: 3000,
      close: true,
      gravity: "bottom",
      position: "right",
      backgroundColor: "#14b3ae",
      style: {
        zIndex: 99999,
        overflow: "hidden",
      },
    }).showToast();
  });
});
