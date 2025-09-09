document.addEventListener("DOMContentLoaded", () => {
  const noticeRows = document.querySelectorAll(".notice-row");
  const updateNoticeForm = document.getElementById("updateNoticeForm");
  const deleteNoticeForm = document.getElementById("deleteNoticeForm");
  const createNoticeForm = document.getElementById("createNoticeForm");
  const noticeEditTitle = document.getElementById("notice-edit-title");
  const noticeEditContent = document.getElementById("notice-edit-content");

  noticeRows.forEach((row) => {
    row.addEventListener("click", () => {
      const id = row.dataset.id;
      const title = row.dataset.title;
      const content = row.dataset.content;

      noticeEditTitle.value = title;
      noticeEditContent.value = content;

      updateNoticeForm.action = `/medgo/pharmacy/notice/update/${id}`;
      deleteNoticeForm.action = `/medgo/pharmacy/notice/delete/${id}`;
    });
  });

  updateNoticeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    Toastify({
      text: "공지사항이 수정되었습니다.",
      duration: 3000,
      close: true,
      gravity: "bottom",
      position: "right",
      backgroundColor: "#14b3ae",
    }).showToast();
    setTimeout(() => {
      updateNoticeForm.submit();
    }, 1000);
  });

  const deleteBtn = document.querySelector("#showNotice .delete-btn");
  deleteBtn.addEventListener("click", () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      Toastify({
        text: "공지사항이 삭제되었습니다.",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        backgroundColor: "rgba(196, 39, 39, 0.794)",
      }).showToast();
      setTimeout(() => {
        deleteNoticeForm.submit();
      }, 1000);
    }
  });

  createNoticeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    Toastify({
      text: "공지사항이 등록되었습니다.",
      duration: 3000,
      close: true,
      gravity: "bottom",
      position: "right",
      backgroundColor: "#14b3ae",
    }).showToast();
    setTimeout(() => {
      createNoticeForm.submit();
    }, 1000);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const noticeRows = document.querySelectorAll(".notice-row");
  const updateNoticeForm = document.getElementById("updateNoticeForm");
  const deleteNoticeForm = document.getElementById("deleteNoticeForm");
  const createNoticeForm = document.getElementById("createNoticeForm");
  const noticeEditTitle = document.getElementById("notice-edit-title");
  const noticeEditContent = document.getElementById("notice-edit-content");

  noticeRows.forEach((row) => {
    row.addEventListener("click", () => {
      const id = row.dataset.id;
      const title = row.dataset.title;
      const content = row.dataset.content;

      noticeEditTitle.value = title;
      noticeEditContent.value = content;

      updateNoticeForm.action = `/medgo/pharmacy/notice/update/${id}`;
      deleteNoticeForm.action = `/medgo/pharmacy/notice/delete/${id}`;
    });
  });

  updateNoticeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    Toastify({
      text: "공지사항이 수정되었습니다.",
      duration: 3000,
      close: true,
      gravity: "bottom",
      position: "right",
      backgroundColor: "#14b3ae",
    }).showToast();
    setTimeout(() => {
      updateNoticeForm.submit();
    }, 1000);
  });

  const deleteBtn = document.querySelector("#showNotice .delete-btn");
  deleteBtn.addEventListener("click", () => {
    Toastify({
      text: "공지사항이 삭제되었습니다.",
      duration: 3000,
      close: true,
      gravity: "bottom",
      position: "right",
      backgroundColor: "rgba(196, 39, 39, 0.794)",
    }).showToast();
    setTimeout(() => {
      deleteNoticeForm.submit();
    }, 1000);
  });

  createNoticeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    Toastify({
      text: "공지사항이 등록되었습니다.",
      duration: 3000,
      close: true,
      gravity: "bottom",
      position: "right",
      backgroundColor: "#14b3ae",
    }).showToast();
    setTimeout(() => {
      createNoticeForm.submit();
    }, 1000);
  });
});
