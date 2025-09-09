
let table1 = document.querySelector("#table1");
let dataTable = new simpleDatatables.DataTable(table1, {
  labels: {
    placeholder: "의약품 검색....", // Search input placeholder
    noRows: "데이터가 없습니다", // When no data
    info: "총 {rows}건 중 {start} - {end} 표시", // Info text
  },
  data: {
    headings: ["코드", "이름", "제조사", "변동량", "입/출고","입/출고일"],
    data: data,
  },
});


const dataTableSearch = document.querySelector(".datatable-search");
const dataTableDrop = document.querySelector(".datatable-dropdown");

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

  const label = dataTableDrop.querySelector("label");

  label.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.remove();
    }
  });

  label.append(" 개 보기");
  label.classList.add("dropdown-label");

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