onload = () => {
  // 임시 비밀번호
  const tempPsw = "1234";
  askPassword();
};

// --- 마이페이지 입장시 나오는 모달 ---
const askPassword = () => {
  Swal.fire({
    title: "비밀번호를 입력하세요",
    input: "password",
    inputPlaceholder: "임시 비밀번호는 1234입니다",
    confirmButtonColor: "#14b3ae",
    cancelButtonColor: "#6c757d",
    showCancelButton: true,
    cancelButtonText: "취소",
    confirmButtonText: "확인",
    reverseButtons: true,
    inputAttributes: {
      maxlength: 10,
      autocapitalize: "off",
      autocorrect: "off",
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    preConfirm: (value) => {
      if (!value) {
        Swal.showValidationMessage("비밀번호를 입력해주세요!");
        return false;
      }
      //입력 비밀번호 value와 비교하는 API요청 보내기
      if (value !== tempPsw) {
        Swal.showValidationMessage("비밀번호가 틀렸습니다!");
        return false;
      }
      return true;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      document.querySelector(".protected-content").style.display = "block";
    } else if (result.isDismissed) {
      // 취소 시 메인 페이지로 이동
      window.location.href = "/medgo/main";
    }
  });
};

// --- 회원정보 수정 후 나오는 토스트 ---
const infoEditModalEl = document.getElementById("infoEdit");
const infoEditModal = new bootstrap.Modal(infoEditModalEl);
const editBtn = document.querySelector(".edit-user-info-btn");

editBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //회원정보를 수정하는 API
  infoEditModal.hide();

  Toastify({
    text: "회원정보가 수정되었습니다.",
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
