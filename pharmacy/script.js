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

const filterBtn = document.querySelector(".filter-btn");
const dropdown = document.querySelector(".dropdown-menu");

filterBtn.addEventListener("click", () => {
  console.log(dropdown);
  dropdown.classList.toggle("show");
});
