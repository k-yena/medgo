document.addEventListener("DOMContentLoaded", function () {
  // Load header and sidebar
  loadHeaderAndSidebar();

  // Dropdown menu logic
  document.body.addEventListener("click", function (event) {
    if (event.target.matches(".user-menu-btn, .user-menu-btn *")) {
      toggleDropdown();
    } else if (document.querySelector(".dropdown-content.show")) {
      closeDropdown();
    }
  });
});

function loadHeaderAndSidebar() {
  // Load header
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;
    });

  // Load sidebar
  fetch("sidebar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("sidebar-placeholder").innerHTML = data;
      // Set active menu item
      const currentPage = window.location.pathname.split("/").pop();
      const menuLinks = document.querySelectorAll(".sidebar .btn-menu");
      menuLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
        }
      });
    });
}

function toggleDropdown() {
  document.querySelector(".dropdown-content").classList.toggle("show");
}

function closeDropdown() {
  document.querySelector(".dropdown-content").classList.remove("show");
}

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "line", // 또는 'bar'
  data: {
    labels: ["1일차", "2일차", "3일차", "4일차", "5일차"], // 날짜 데이터
    datasets: [
      {
        label: "입고량",
        data: [10, 15, 7, 12, 20], // 입고량 데이터
        borderColor: "#00a896",
        fill: "origin",
        backgroundColor: "#00a89734",
        tension: 0.4,
      },
      {
        label: "출고량",
        data: [5, 8, 3, 10, 15], // 출고량 데이터
        borderColor: "#ffbc42",
        fill: "origin",
        backgroundColor: "#ffbd426a",
        tension: 0.4,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
