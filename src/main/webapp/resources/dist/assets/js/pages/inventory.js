/*// --- 테이블 구축 ---
const data = [
  ["TYL-001", "타이레놀정 500mg", "한국얀센", "아세트아미노펜", "150"],
  ["BRF-002", "부루펜정 200mg", "삼일제약", "이부프로펜", "80"],
  [
    "ASP-003",
    "아스피린 프로텍트정 100mg",
    "바이엘코리아",
    "아세틸살리실산",
    "200",
  ],
  ["GBR-004", "게보린정", "삼진제약", "아세트아미노펜 복합", "120"],
  [
    "ISD-005",
    "인사돌플러스정",
    "동국제약",
    "옥수수불검화정량추출물 복합",
    "50",
  ],
  ["OMD-006", "오메가드 연질캡슐", "종근당", "오메가-3", "300"],
  ["VTC-007", "고려은단 비타민C 1000", "고려은단", "아스코르브산", "450"],
  ["MGS-008", "마그비 연질캡슐", "유한양행", "산화마그네슘 복합", "250"],
  ["LTN-009", "루테인 지아잔틴 164", "안국약품", "루테인/지아잔틴", "180"],
  ["PPS-010", "프로폴리스 필름", "한국콜마", "프로폴리스추출물", "70"],
  ["CAL-011", "칼트레이트 플러스 디", "화이자", "탄산칼슘/비타민D", "110"],
  ["ZRT-012", "지르텍정", "한국유씨비제약", "세티리진염산염", "95"],
  ["WSD-013", "우루사정 100mg", "대웅제약", "우르소데옥시콜산", "220"],
  ["FGL-014", "후시딘연고", "동화약품", "퓨시드산나트륨", "130"],
  ["MDC-015", "마데카솔케어연고", "동국제약", "센텔라아시아티카", "140"],
  ["PZR-016", "판피린큐액", "동아제약", "아세트아미노펜 복합", "280"],
  ["PCL-017", "판콜에이내복액", "동화약품", "아세트아미노펜 복합", "260"],
  ["BCR-018", "백초시럽 플러스", "동성제약", "생약 성분 복합", "40"],
  ["WCH-019", "위청수 에프액", "광동제약", "생약 성분 복합", "60"],
  ["GMS-020", "겔포스엠현탁액", "보령제약", "인산알루미늄겔", "190"],
  ["SMT-021", "스멕타 현탁액", "대웅제약", "디옥타헤드랄스멕타이트", "85"],
  ["LCT-022", "락토핏 생유산균 골드", "종근당건강", "프로바이오틱스", "500"],
  ["BFL-023", "비오플250캡슐", "건일제약", "사카로미세스보울라디균", "75"],
  ["CNT-024", "센트룸 포 맨", "화이자", "종합비타민/미네랄", "320"],
  ["BHN-025", "비판텐 연고", "바이엘코리아", "덱스판테놀", "115"],
  ["DRN-026", "듀오락 얌얌", "쎌바이오텍", "프로바이오틱스", "410"],
  ["TRV-027", "트라벡 연고", "신신제약", "살리실산메틸", "90"],
  ["KFP-028", "케펨 플라스타", "제일헬스사이언스", "케토프로펜", "160"],
  ["SJW-029", "소화잘되는약", "한미약품", "소화효소제", "210"],
  ["DCS-030", "닥터스초이스", "한국인삼공사", "홍삼/비타민", "100"],
  ["HMD-031", "훼마틴-에이 시럽", "조아제약", "철분/엽산", "55"],
  ["TCS-032", "탁센 연질캡슐", "녹십자", "나프록сен", "170"],
  [
    "EZN-033",
    "이지엔6 이브 연질캡슐",
    "대웅제약",
    "이부프로펜/파마브롬",
    "195",
  ],
];
let table1 = document.querySelector("#table1");
let dataTable = new simpleDatatables.DataTable(table1, {
  data: {
    //데이터 순서에 맞추어 순서 바꾸기
    headings: ["코드", "이름", "제조사", "주성분", "재고"],
    data: data,
  },
  labels: {
    placeholder: "의약품 검색....",
    noRows: "데이터가 없습니다",
    info: "총 {rows}건 중 {start} - {end} 표시",
  },
});

const dataTableDrop = document.querySelector(".dataTable-dropdown");
if (dataTableDrop) {
  const labelTags = dataTableDrop.getElementsByTagName("label");
  labelTags[0].classList.add("dropdown-label");
  labelTags[0].innerText = "개 보기";
}

const drugInfoModal = new bootstrap.Modal(
  document.getElementById("drugInfoModal")
);
const tableBody = document.querySelector("#table1 tbody");

if (tableBody) {
  tableBody.addEventListener("click", function (event) {
    const row = event.target.closest("tr");
    if (!row) return;

    //- 데이터 베이스 의약품 모달 -//
    const code = row.cells[0].textContent;
    const name = row.cells[1].textContent;
    const manufacturer = row.cells[2].textContent;
    const ingredient = row.cells[3].textContent;
    const stock = row.cells[4].textContent;

    // 모달 내용 채우기
    document.getElementById("modal-code").textContent = code;
    document.getElementById("modal-name").textContent = name;
    document.getElementById("modal-manufacturer").textContent = manufacturer;
    document.getElementById("modal-ingredient").textContent = ingredient;
    document.getElementById("modal-stock").textContent = stock;

    // 모달 띄우기
    drugInfoModal.show();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const drugInfoModalElement = document.getElementById("drugInfoModal");
  drugInfoModalElement.addEventListener("shown.bs.modal", () => {
    const minusBtn = document.getElementById("quantity-minus");
    const plusBtn = document.getElementById("quantity-plus");
    const quantityInput = document.getElementById("quantity-input");

    minusBtn.addEventListener("click", () => {
      let currentValue = parseInt(quantityInput.value, 10);
      if (isNaN(currentValue)) currentValue = 0;
      quantityInput.value = currentValue - 1;
    });

    plusBtn.addEventListener("click", () => {
      let currentValue = parseInt(quantityInput.value, 10);
      if (isNaN(currentValue)) currentValue = 0;
      quantityInput.value = currentValue + 1;
    });

    quantityInput.addEventListener("change", () => {
      let currentValue = parseInt(quantityInput.value, 10);
      if (isNaN(currentValue)) {
        quantityInput.value = 0;
      }
    });
  });
});

// --- 의약품 수정 후 나오는 토스트 ---
const editBtn = document.querySelector(".edit-inventory-btn");

editBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //사용자가 입력한 수량
  const inputVal = document.querySelector("#quantity-input").value;

  //의약품 재고 수정 API 넣기
  drugInfoModal.hide();
  Toastify({
    text: "재고가 수정되었습니다.",
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
*/