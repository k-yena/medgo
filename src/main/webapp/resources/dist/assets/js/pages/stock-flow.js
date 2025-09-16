document.addEventListener("DOMContentLoaded", function () {
  // 1) 제품명(2번째 컬럼) 말줄임 세팅 (Datatable 초기화 전에)
  const rows = document.querySelectorAll("#table1 tbody tr");

  // 2) Datatable 초기화
  const tableEl = document.querySelector("#table1");
  if (!tableEl) return;

  const dataTable = new simpleDatatables.DataTable(tableEl, {
    searchable: true,
    fixedHeight: true,
    perPage: 10,
    labels: {
      placeholder: "검색어를 입력하세요",
      noRows: "데이터가 없습니다",
      info: "총 {rows}건 중 {start} - {end} 표시",
      perPage: "{select}개 보기"
    }
  });

  // 3) 검색창 왼쪽에 필터 드롭다운 추가
  const dataTableSearch = document.querySelector(".datatable-search");
  const dataTableDrop = document.querySelector(".datatable-dropdown");

  if (dataTableSearch) {
    const dropHTML = `
      <div class="filter-drop">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button"
          data-bs-toggle="dropdown" aria-expanded="false" style="border: 1px solid #dce7f1;">
          <i class="fa-solid fa-filter"></i>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" data-filter="전체" href="#">전체보기</a></li>
          <li><a class="dropdown-item" data-filter="입고" href="#">입고만 보기</a></li>
          <li><a class="dropdown-item" data-filter="출고" href="#">출고만 보기</a></li>
        </ul>
      </div>`;

    dataTableSearch.insertAdjacentHTML("beforebegin", dropHTML);

    const filterDrop = document.querySelector(".filter-drop");
    const wrapper = document.createElement("div");
    wrapper.classList.add("dropdown-container");

    const parent = filterDrop.parentNode;
    parent.insertBefore(wrapper, filterDrop);
    wrapper.appendChild(dataTableSearch);
    wrapper.appendChild(filterDrop);

    // 페이지당 개수 라벨 정리 (널가드)
    if (dataTableDrop) {
      const label = dataTableDrop.querySelector("label");
      if (label) {
        Array.from(label.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) node.remove();
        });
        label.append(" 개 보기");
        label.classList.add("dropdown-label");
      }
    }

    // 드롭다운 필터 클릭 이벤트
    document.querySelectorAll(".filter-drop .dropdown-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = e.currentTarget.dataset.filter;
        if (filter === "전체") {
          dataTable.search("");
        } else if (filter === "입고") {
          dataTable.search("입고");
        } else if (filter === "출고") {
          dataTable.search("출고");
        }
      });
    });
  }

  // 4) 모달 연동
  const modalEl = document.getElementById("drugInfoModal");
  if (!modalEl) return;

  const drugInfoModal = new bootstrap.Modal(modalEl);
  const tbody = document.querySelector("#table1 tbody");
  if (!tbody) return;

  tbody.addEventListener("click", function (event) {
    const row = event.target.closest("tr");
    if (!row) return;

    // 컬럼 인덱스: 0=코드, 1=이름, 2=제조사, 3=변동량, 4=입/출고, 5=입/출고일
    const code            = (row.cells[0] && row.cells[0].textContent) || "";
    const name            = (row.cells[1] && row.cells[1].textContent) || "";
    const manufacturer    = (row.cells[2] && row.cells[2].textContent) || "";
    const quantity        = (row.cells[3] && row.cells[3].textContent) || "";
    const transactionType = (row.cells[4] && row.cells[4].textContent) || "";
    const transactionDate = (row.cells[5] && row.cells[5].textContent) || "";

    document.getElementById("modal-code").textContent = code;
    document.getElementById("modal-name").textContent = name;
    document.getElementById("modal-manufacturer").textContent = manufacturer;
    document.getElementById("modal-quantity").textContent = quantity;
    document.getElementById("modal-transactionType").textContent = transactionType;
    document.getElementById("modal-transactionDate").textContent = transactionDate;

    drugInfoModal.show(); 
  });
});