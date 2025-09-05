// --- 테이블 구축 ---
// 테이블에 표시할 데이터
const data = [
  ["TYL-001", "타이레놀정 500mg", "한국얀센", "150", "입고"],
  ["BRF-002", "부루펜정 200mg", "삼일제약", "80", "출고"],
  ["ASP-003", "아스피린 프로텍트정 100mg", "바이엘코리아", "200", "입고"],
  ["GBR-004", "게보린정", "삼진제약", "120", "출고"],
  ["ISD-005", "인사돌플러스정", "동국제약", "50", "입고"],
  ["OMD-006", "오메가드 연질캡슐", "종근당", "300", "입고"],
  ["VTC-007", "고려은단 비타민C 1000", "고려은단", "450", "출고"],
  ["MGS-008", "마그비 연질캡슐", "유한양행", "250", "입고"],
  ["LTN-009", "루테인 지아잔틴 164", "안국약품", "180", "출고"],
  ["PPS-010", "프로폴리스 필름", "한국콜마", "70", "입고"],
  ["CAL-011", "칼트레이트 플러스 디", "화이자", "110", "입고"],
  ["ZRT-012", "지르텍정", "한국유씨비제약", "95", "출고"],
  ["WSD-013", "우루사정 100mg", "대웅제약", "220", "입고"],
  ["FGL-014", "후시딘연고", "동화약품", "130", "출고"],
  ["MDC-015", "마데카솔케어연고", "동국제약", "140", "입고"],
  ["PZR-016", "판피린큐액", "동아제약", "280", "출고"],
  ["PCL-017", "판콜에이내복액", "동화약품", "260", "입고"],
  ["BCR-018", "백초시럽 플러스", "동성제약", "40", "출고"],
  ["WCH-019", "위청수 에프액", "광동제약", "60", "입고"],
  ["GMS-020", "겔포스엠현탁액", "보령제약", "190", "출고"],
  ["SMT-021", "스멕타 현탁액", "대웅제약", "85", "입고"],
  ["LCT-022", "락토핏 생유산균 골드", "종근당건강", "500", "출고"],
  ["BFL-023", "비오플250캡슐", "건일제약", "75", "입고"],
  ["CNT-024", "센트룸 포 맨", "화이자", "320", "출고"],
  ["BHN-025", "비판텐 연고", "바이엘코리아", "115", "입고"],
  ["DRN-026", "듀오락 얌얌", "쎌바이오텍", "410", "출고"],
  ["TRV-027", "트라벡 연고", "신신제약", "90", "입고"],
  ["KFP-028", "케펨 플라스타", "제일헬스사이언스", "160", "출고"],
  ["SJW-029", "소화잘되는약", "한미약품", "210", "입고"],
  ["DCS-030", "닥터스초이스", "한국인삼공사", "100", "출고"],
  ["HMD-031", "훼마틴-에이 시럽", "조아제약", "55", "입고"],
  ["TCS-032", "탁센 연질캡슐", "녹십자", "170", "출고"],
  ["EZN-033", "이지엔6 이브 연질캡슐", "대웅제약", "195", "입고"],
];

let table1 = document.querySelector("#table1");
let dataTable = new simpleDatatables.DataTable(table1, {
  labels: {
    placeholder: "의약품 검색....", // Search input placeholder
    noRows: "데이터가 없습니다", // When no data
    info: "총 {rows}건 중 {start} - {end} 표시", // Info text
  },
  data: {
    headings: ["코드", "이름", "제조사", "재고", "입/출고"],
    data: data,
  },
});

const dataTableSearch = document.querySelector(".dataTable-search");
const dataTableDrop = document.querySelector(".dataTable-dropdown");

if (dataTableSearch) {
  const newDrop = `<div class="filter-drop">
                          <button class="btn btn-outline-secondary dropdown-toggle" type="button"
                              data-bs-toggle="dropdown" aria-expanded="false" style="border: 1px solid #dce7f1;"><i class="fa-solid fa-filter"></i></button>
                          <ul class="dropdown-menu">
                              <li><a class="dropdown-item" data-filter="전체" href="#">전체보기</a></li>
                              <li><a class="dropdown-item" data-filter="입고" href="#">입고만 보기</a></li>
                              <li><a class="dropdown-item" data-filter="출고" href="#">출고만 보기</a></li>
                          </ul></div>`;
  dataTableSearch.insertAdjacentHTML("beforebegin", newDrop);

  const filterDrop = document.querySelector(".filter-drop");

  const wrapper = document.createElement("div");
  wrapper.classList.add("dropdown-container");

  const parent = filterDrop.parentNode;

  parent.insertBefore(wrapper, filterDrop);
  wrapper.appendChild(dataTableSearch);
  wrapper.appendChild(filterDrop);

  const labelTags = dataTableDrop.getElementsByTagName("label");
  labelTags[0].classList.add("dropdown-label");
  labelTags[0].innerText = "개 보기";

  // 드롭다운 메뉴 클릭 시 검색 적용
  document.querySelectorAll(".filter-drop .dropdown-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const filter = e.target.dataset.filter; // data-filter 값 읽기

      if (filter === "전체") {
        dataTable.search(""); // 전체 보기
      } else if (filter === "입고") {
        dataTable.search("입고");
      } else if (filter === "출고") {
        dataTable.search("출고");
      }
    });
  });
}

const drugInfoModal = new bootstrap.Modal(
  document.getElementById("drugInfoModal")
);
const tableBody = document.querySelector("#table1 tbody");

if (tableBody) {
  tableBody.addEventListener("click", function (event) {
    const row = event.target.closest("tr");
    if (!row) return;

    const code = row.cells[0].textContent;
    const name = row.cells[1].textContent;
    const manufacturer = row.cells[2].textContent;
    const stock = row.cells[3].textContent;
    const status = row.cells[4].textContent;

    // 모달 내용 채우기
    document.getElementById("modal-code").textContent = code;
    document.getElementById("modal-name").textContent = name;
    document.getElementById("modal-manufacturer").textContent = manufacturer;
    document.getElementById("modal-stock").textContent = stock;
    document.getElementById("modal-status").textContent = status;

    // 모달 띄우기
    drugInfoModal.show();
  });
}

// --- 재고기록 삭제 후 나오는 토스트 ---
const deleteBtn = document.querySelector(".delete-stock-btn");

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //재고 기록 삭제 API
  drugInfoModal.hide();

  Toastify({
    text: "기록이 삭제되었습니다.",
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
});
