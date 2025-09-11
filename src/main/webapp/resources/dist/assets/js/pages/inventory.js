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
*/
document.addEventListener('DOMContentLoaded', function () {
  // ---- 유틸 ----
  function byId(id) { return document.getElementById(id); }
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return (s == null ? '' : String(s))
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  // ---- 폼/상태 ----
  var form   = byId('searchForm');
  if (!form) return;

  var action = form.getAttribute('action') || location.pathname;
  var pageI  = qs('input[name="page"]', form);
  var sizeS  = qs('select[name="size"]', form);
  var kwI    = qs('input[name="keyword"]', form);
  var sortI  = qs('input[name="sort"]', form);
  var orderI = qs('input[name="order"]', form);

  var curPage = parseInt((pageI && pageI.value) || '1', 10) || 1;
  var size    = (sizeS && sizeS.value) || '10';
  var kw      = (kwI && kwI.value) || '';
  var sort    = (sortI && sortI.value) || 'productName';
  var order   = (orderI && orderI.value) || 'asc';

  // ---- size 변경: 즉시 적용 + page=1 ----
  if (sizeS) {
    sizeS.addEventListener('change', function () {
      if (pageI) pageI.value = 1;
      form.submit();
    });
  }

  // ---- 검색 Enter: page=1 후 제출 ----
  if (kwI) {
    kwI.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (pageI) pageI.value = 1;
        form.submit();
      }
    });
  }

  // ---- 정렬 헤더: 링크/아이콘 생성 (AJAX X) ----
  qsa('th.sortable').forEach(function (th) {
    var col = th.getAttribute('data-sort');
    if (!col) return;

    var newOrder = (sort === col && order === 'asc') ? 'desc' : 'asc';
    var href = action
      + '?page=1'
      + '&size='    + encodeURIComponent(size)
      + '&keyword=' + encodeURIComponent(kw || '')
      + '&sort='    + encodeURIComponent(col)
      + '&order='   + encodeURIComponent(newOrder);

    var label = th.textContent.trim();
    var iconSpanHtml = '<span class="sort-icon"></span>';
    var anchorClass = 'text-decoration-none text-body d-inline-flex align-items-center';
    if (th.classList.contains('text-end')) {
      anchorClass += ' w-100 justify-content-end';
    }

    th.innerHTML =
      '<a class="' + anchorClass + '" href="' + href + '">' + esc(label) + '</a>' +
      iconSpanHtml;

    if (sort === col) {
      var icon = (order === 'asc') ? '<i class="bi bi-caret-up-fill ms-1"></i>'
                                   : '<i class="bi bi-caret-down-fill ms-1"></i>';
      var iconSpan = qs('.sort-icon', th);
      if (iconSpan) iconSpan.innerHTML = icon;
    }
  });

  // ---- 페이지네이션 (논리적 … 표시) ----
  var pagerWrap = byId('pagerWrap');
  var pagerUl   = byId('pager');
  if (pagerWrap && pagerUl) {
    var totalPages = parseInt(pagerWrap.getAttribute('data-total-pages') || '1', 10) || 1;

    function hrefFor(p) {
      return action
        + '?page='   + encodeURIComponent(p)
        + '&size='   + encodeURIComponent(size)
        + '&keyword='+ encodeURIComponent(kw || '')
        + '&sort='   + encodeURIComponent(sort)
        + '&order='  + encodeURIComponent(order);
    }
    function li(label, href, active, disabled) {
      if (disabled) {
        return '<li class="page-item disabled"><span class="page-link border-0 px-2">' + label + '</span></li>';
      }
      return '<li class="page-item' + (active ? ' active' : '') + '">'
           +   '<a class="page-link border-0 px-2" ' + (active ? 'aria-current="page"' : '')
           +   ' href="' + href + '">' + label + '</a>'
           + '</li>';
    }

    var html = '';

    // 총 페이지가 9 이하이면 모두 나열 (이 경우는 자연스러운 전체 표기 허용)
    if (totalPages <= 9) {
      html += li('‹', hrefFor(Math.max(1, curPage - 1)), false, curPage <= 1);
      for (var p = 1; p <= totalPages; p++) {
        html += li(String(p), hrefFor(p), p === curPage, false);
      }
      html += li('›', hrefFor(Math.min(totalPages, curPage + 1)), false, curPage >= totalPages);
      pagerUl.innerHTML = html;
    } else {
      // 고정형(11개) 렌더링
      var startPage, endPage;

      if (curPage <= 4) {
        // 앞쪽: 1~7
        startPage = 1;
        endPage   = 7;
      } else if (curPage >= totalPages - 3) {
        // 끝쪽: last-6 ~ last
        startPage = totalPages - 6;
        endPage   = totalPages;
      } else {
        // 중앙: 현재±2 (5개)
        startPage = curPage - 2;
        endPage   = curPage + 2;
      }

      // 이전
      html += li('‹', hrefFor(Math.max(1, curPage - 1)), false, curPage <= 1);

      // 앞쪽 케이스
      if (curPage <= 4) {
        // 1~7 직접 출력
        for (var p1 = startPage; p1 <= endPage; p1++) {
          html += li(String(p1), hrefFor(p1), p1 === curPage, false);
        }
        // 오른쪽 … + last
        html += li('…', '#', false, true);
        html += li(String(totalPages), hrefFor(totalPages), false, false);
      }
      // 끝쪽 케이스
      else if (curPage >= totalPages - 3) {
        // 1 + 왼쪽 …
        html += li('1', hrefFor(1), false, false);
        html += li('…', '#', false, true);
        // last-6 ~ last 직접 출력
        for (var p2 = startPage; p2 <= endPage; p2++) {
          html += li(String(p2), hrefFor(p2), p2 === curPage, false);
        }
      }
      // 중앙 케이스
      else {
        // 1 + 왼쪽 …
        html += li('1', hrefFor(1), false, false);
        html += li('…', '#', false, true);
        // 현재±2 (5개)
        for (var p3 = startPage; p3 <= endPage; p3++) {
          html += li(String(p3), hrefFor(p3), p3 === curPage, false);
        }
        // 오른쪽 … + last
        html += li('…', '#', false, true);
        html += li(String(totalPages), hrefFor(totalPages), false, false);
      }

      // 다음
      html += li('›', hrefFor(Math.min(totalPages, curPage + 1)), false, curPage >= totalPages);

      pagerUl.innerHTML = html;
    }
  }

  // ---- 모달 & 삭제(폼 submit) ----
  var table   = byId('table1');
  var modalEl = byId('drugInfoModal');
  if (!table || !modalEl || typeof bootstrap === 'undefined' || !bootstrap.Modal) return;

  var modal   = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
  var mCode   = byId('modal-code');
  var mName   = byId('modal-name');
  var mManu   = byId('modal-manufacturer');
  var mStock  = byId('modal-stock');

  var delBtn  = qs('.delete-medicine-btn', modalEl);
  var delForm = byId('deleteForm');
  var delCode = byId('deleteCode');
  var current = null;

  function extractRowData(row) {
    return {
      row: row,
      code:  row.getAttribute('data-code') || (row.cells[0] && row.cells[0].textContent.trim()) || '',
      name:  row.getAttribute('data-name') || (row.cells[1] && row.cells[1].textContent.trim()) || '',
      manufacturer: row.getAttribute('data-manu') || (row.cells[2] && row.cells[2].textContent.trim()) || '',
      stock: row.getAttribute('data-stock') || (row.cells[3] && row.cells[3].textContent.trim()) || ''
    };
  }

  table.addEventListener('click', function (e) {
    var row = e.target.closest && e.target.closest('tbody tr');
    if (!row) return;
    current = extractRowData(row);
    if (mCode)  mCode.textContent  = current.code;
    if (mName)  mName.textContent  = current.name;
    if (mManu)  mManu.textContent  = current.manufacturer;
    if (mStock) mStock.textContent = current.stock;
    modal.show();
  });
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
  // 사용자가 입력한 수량
  const inputVal = document.querySelector("#quantity-input").value;

  // 의약품 재고 수정 API 넣기
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
