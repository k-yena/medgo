//jsp로 바꿀때 이름을 app.js로 바꾸고 스크립트 적용하기

onload = () => {
  function activateMenu() {
    const currentPage = window.location.pathname.split("/").pop();
    const sidebarLinks = document.querySelectorAll(".sidebar-wrapper .menu a");
    for (const link of sidebarLinks) {
      const linkPage = link.getAttribute("href").split("/").pop();
      if (linkPage === currentPage) {
        link.parentElement.classList.add("active");
        const submenu = link.closest(".submenu");
        if (submenu) submenu.classList.add("active");
        const sidebarItem = link.closest(".sidebar-item");
        if (sidebarItem) sidebarItem.classList.add("active");
      }
    }
  }
  activateMenu();

  let sidebarItems = document.querySelectorAll(".sidebar-item.has-sub");
  for (let i = 0; i < sidebarItems.length; i++) {
    let sidebarItem = sidebarItems[i];
    let link = sidebarItem.querySelector(".sidebar-link");
    let submenu = sidebarItem.querySelector(".submenu");

    if (submenu.classList.contains("active")) {
      submenu.style.maxHeight = submenu.scrollHeight + "px";
    }

    link.addEventListener("click", function (e) {
      e.preventDefault();

      if (submenu.classList.contains("active")) {
        submenu.classList.remove("active");
        submenu.style.maxHeight = null;
      } else {
        submenu.classList.add("active");
        submenu.style.maxHeight = submenu.scrollHeight + "px";
      }
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    var w = window.innerWidth;
    if (w < 1200) {
      document.getElementById("sidebar").classList.remove("active");
    }
  });
  window.addEventListener("resize", () => {
    var w = window.innerWidth;
    if (w < 1200) {
      document.getElementById("sidebar").classList.remove("active");
    } else {
      document.getElementById("sidebar").classList.add("active");
    }
  });

  document.querySelector(".burger-btn").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("active");
  });

  // 스크롤 바
  if (typeof PerfectScrollbar == "function") {
    const container = document.querySelector(".sidebar-wrapper");
    new PerfectScrollbar(container, {
      wheelPropagation: false,
    });
  }
  const activeItem = document.querySelector(".sidebar-item.active");
  if (activeItem) activeItem.scrollIntoView(false);

  const sidebarHideBtn = document.querySelector(".sidebar-hide");
  if (sidebarHideBtn) {
    sidebarHideBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("sidebar").classList.remove("active");
    });
  }

  const sidebarToggler = document.querySelector(".sidebar-toggler");
  if (sidebarToggler) {
    sidebarToggler.addEventListener("click", () => {
      document.getElementById("sidebar").classList.remove("active");
    });
  }

};
