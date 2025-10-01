const inputEmail = document.querySelector(".email-input");
const editBtn = document.querySelector(".submit-btn");

editBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const userEmail = inputEmail.value.trim();
  if (userEmail) {
    checkDuplicateEmail(userEmail);
  } else {
    Swal.fire({
      title: "이메일을 입력해주세요",
      icon: "warning",
      confirmButtonColor: "#14b3ae",
      confirmButtonText: "확인",
    });
    return;
  }
});

function checkDuplicateEmail(userEmail) {
  //메일 확인 코드 전송 API
  fetch(`${contextPath}/auth/check-id`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${userEmail}`,
  })
    .then((response) => response.json()) // json 파싱
    .then((data) => {
      if (data.result === "duplicate") {
        //이메일 인증 코드 모달창
        sendVerificationCode(userEmail);
      } else {
        Swal.fire({
          title: "회원가입을해주세요",
          icon: "error",
        });
      }
    });
}

// 메일 확인 코드 전송 API 호출 함수
function sendVerificationCode(userEmail) {
	 let timerInterval;
     Swal.fire({
       title: "확인 코드를 발송 중입니다.",
       timer: 3500,
       imageUrl: `${contextPath}/resources/dist/assets/images/pages/sendemail.gif`,
       imageWidth: 200,
       imageHeight: 200,
       willClose: () => {
         clearInterval(timerInterval);
       }
     });
  fetch(
    `${contextPath}/auth/send-code?email=${encodeURIComponent(userEmail)}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((authCode) => {
      if (authCode.code) {
        Swal.fire({
          title: "확인 코드를 보냈습니다",
          text: "이메일을 확인해 주세요",
          input: "text",
          inputPlaceholder: "인증 코드를 입력해주세요",
          imageUrl: `${contextPath}/resources/dist/assets/images/pages/email.gif`,
          imageWidth: 200,
          imageHeight: 200,
          confirmButtonColor: "#14b3ae",
          confirmButtonText: "코드확인",
          allowOutsideClick: false,
          allowEnterKey: true,
        })
        .then((response) => {
            // 사용자에게 받은 코드와 서버에서 보낸 코드가 맞는지 확인 하는 API
            if (response.value === authCode.code) {
              Swal.fire({
                title: "신규 비밀번호 설정",
                html: `
                        <p>새로운 비밀번호를 입력해주세요</p>
                        <input type="password" id="swal-input1" class="swal2-input" placeholder="신규 비밀번호" required> 
                        <input type="password" id="swal-input2" class="swal2-input" placeholder="비밀번호 확인" required>
                      `,
                imageUrl: `${contextPath}/resources/dist/assets/images/pages/forgot-password.gif`,
                imageWidth: 200,
                imageHeight: 200,
                confirmButtonColor: "#14b3ae",
                confirmButtonText: "확인",
                showCancelButton: true,  
                cancelButtonText: "취소",  
                preConfirm: () => {
               
                    const firstPassword = document.getElementById("swal-input1").value;
                    const confirmPassword = document.getElementById("swal-input2").value;
                    
                    if (!firstPassword || !confirmPassword) {
                        Swal.showValidationMessage(`비밀번호를 모두 입력해주세요`);
                        return false; // 이걸 해야 확인 버튼이 막힘
                      }
                    
                    if (firstPassword != confirmPassword) {
                        Swal.showValidationMessage(`비밀번호가 일치하지 않습니다.`);
                        return false; // 이걸 해야 확인 버튼이 막힘
                      }
                    

                      return [firstPassword, confirmPassword];
                    
                },
                //비밀번호 API
              }).then((data) => {
                if(data.value[0]===data.value[1]){
                	checkPassword(data.value[0]);
                }else if(data.isDismissed){
                	
                }              
              }); 
            } else {
              Swal.fire({
                title: "코드가 일치하지 않습니다",
                icon: "error",
              });
            }
          }); 
      }
    })    
}
  
function checkPassword(password) {
    // 비밀번호 확인
    fetch(`${contextPath}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `password=${password}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          Swal.fire({
            title: "비밀번호를 변경하였습니다",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "비밀번호 변경에 실패하였습니다",
            icon: "success",
          });
        }
      }); 
  }