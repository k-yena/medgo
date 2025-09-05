const emailInput = document.querySelector(".email-input");
const emailCheckBtn = document.querySelector(".email-check-btn");
const tempEmail = "test@gmail.com"; // 테스트용
const tempCode = "1234"; // 테스트용

// 중복 확인 버튼 클릭 이벤트
emailCheckBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  if (email) {
    checkDuplicateEmail(email);
  } else {
    Swal.fire({
      title: "이메일을 입력해주세요",
      icon: "warning",
      confirmButtonColor: "#14b3ae",
      confirmButtonText: "확인",
    });
  }
});

// --- 이메일 관련 토스트 ---
function checkDuplicateEmail(userEmail) {
  //이메일 중복체크 API
  if (userEmail === tempEmail) {
    emailInput.classList.add("is-invalid");
    Swal.fire({
      title: "이미 사용중인 이메일입니다.",
      icon: "warning",
      confirmButtonColor: "#14b3ae",
      confirmButtonText: "확인",
    });
  } else {
    emailInput.classList.remove("is-invalid");
    //메일 확인 코드 전송 API
    Swal.fire({
      title: "확인 코드를 보냈습니다",
      text: "이메일을 확인해 주세요",
      input: "text",
      inputPlaceholder: "임시 코드는 1234입니다",
      imageUrl: "/dist/assets/images/pages/email.gif",
      imageWidth: 200,
      imageHeight: 200,
      confirmButtonColor: "#14b3ae",
      confirmButtonText: "코드확인",
      allowOutsideClick: false,
      allowEnterKey: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //사용자에게 받은 코드와 서버에서 보낸 코드가 맞는지 확인 하는 API
        if (result.value === tempCode) {
          Swal.fire({
            title: "확인되었습니다",
            text: "이메일을 확인했습니다.",
            icon: "success",
            confirmButtonText: "확인",
          }).then(() => {
            const inputs = Array.from(document.querySelectorAll("form input"));
            const emailIndex = inputs.indexOf(emailInput);
            const nextInput = inputs[emailIndex + 1];
            if (nextInput) {
              setTimeout(() => {
                nextInput.focus();
              }, 50);
            }
          });
        } else {
          Swal.fire({
            title: "코드가 일치하지 않습니다",
            icon: "error",
          });
        }
      }
    });
  }
}
