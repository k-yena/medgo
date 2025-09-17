onload = function () {
  const emailInput = document.querySelector(".email-input");
  const emailCheckBtn = document.querySelector(".email-check-btn");
  const tempCode = "1234";

  //중복 클릭이 일어나지 않는 경우
  let isCheckEmail = false;
  
  
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
      return;
    }
  });

  // --- 이메일 관련 모달창---
  function checkDuplicateEmail(userEmail) {
    // 이메일 중복체크 API
    fetch(`${contextPath}/auth/check-id`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${userEmail}`,
    })
      .then((response) => response.json()) // json 파싱
      .then((data) => {
        if (data.result === "duplicate") {
          emailInput.classList.add("is-invalid");
          Swal.fire({
            title: "존재하는 이메일입니다",
            icon: "warning",
            confirmButtonColor: "#14b3ae",
            confirmButtonText: "확인",
          });
        } else if (data.result === "invalid") {
          emailInput.classList.add("is-invalid");
          Swal.fire({
            title: "이메일 형식을 맞춰주세요",
            icon: "warning",
            confirmButtonColor: "#14b3ae",
            confirmButtonText: "확인",
          });
        } else {
          emailInput.classList.remove("is-invalid");
          // 메일 확인 코드 전송 API
          sendVerificationCode(userEmail);
          Swal.fire({
            title: "확인 코드를 보냈습니다",
            text: "이메일을 확인해 주세요",
            input: "text",
            inputPlaceholder: "임시 코드는 1234입니다",
            imageUrl: `${contextPath}/resources/dist/assets/images/pages/email.gif`,
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonColor: "#14b3ae",
            confirmButtonText: "코드확인",
            allowOutsideClick: false,
            allowEnterKey: true,
          }).then((result) => {
            if (result.isConfirmed) {
              // 사용자에게 받은 코드와 서버에서 보낸 코드가 맞는지 확인 하는 API
              if (result.value === tempCode) {
                Swal.fire({
                  title: "확인되었습니다",
                  text: "이메일을 확인했습니다",
                  icon: "success",
                  confirmButtonText: "확인",
                }).then(() => {
                	isCheckEmail = true;
                  // 1) 페이지 내 모든 form의 input 요소를 배열로 만든다
                  // --> 단순히 이메일이 속하는 배열의 위치를 찾기 위해서
                  const inputs = Array.from(
                    document.querySelectorAll("form input")
                  );
                  const emailIndex = inputs.indexOf(emailInput); // 해당 배열의
                  // 위치를 찾음
                  const nextInput = inputs[emailIndex + 1]; // 다음 배열(이름) 위치로 이동
                  // --> 자동 커서 이동
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
      });
  }

  // 메일 확인 코드 전송 API 호출 함수
  function sendVerificationCode(userEmail) {
    fetch(`${contextPath}/send-code?email=${encodeURIComponent(userEmail)}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code) {
          return true;
        }
      });
  }
  
  let latitude; // 위도
  let longitude; // 경도
  // 카카오 주소 검색 이벤트(위도, 경도 저장)
  const address = document.getElementById("address");
  address.addEventListener("click", function () {
	// 카카오 주소 api
    new daum.Postcode({
      oncomplete: function (data) {
        address.value = data.roadAddress;
        fetch(
          `https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10&query=${data.roadAddress}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "KakaoAK f1cb86bc000cc430721bbd0f46f8bad0",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            longitude = data.documents[0].x; //경도
            latitude = data.documents[0].y; //위도

          });
      },
    }).open();
  });
  // 가입하기가 눌렸을때 input에 값이 있는지 확인
  const submit = document.querySelector(".submit-btn");
  submit.addEventListener("click", function (e) {
  	console.log(e)
    e.preventDefault();
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const address = document.getElementById("address").value;
    const licenseCode = document.getElementById("licenseCode").value;

    const submitData = [
      email,
      name,
      password,
      passwordConfirm,
      address,
      licenseCode,
    ];

    console.log(submitData, "submitData");
    // submitData 값 존재 확인
    let hasEmpty = false;
    for (let i = 0; i < submitData.length; i++) {
  	  console.log("1")
      if (!submitData[i] || submitData[i].trim().length === 0) {
      	  console.log("2")
        // 데이터를 입력하면 true
        hasEmpty = true;
        break;
      }
    }

    // 값 안 넣어진 경우
    if (hasEmpty || !isCheckEmail) {
      Swal.fire({
        title: "회원가입 실패",
        text: "빈칸을 채워주세요",
        icon: "error",
      });
      return; // 아래 코드 안되도록 종료 시킴
    }
    // 서버에 폼 데이터 전송
    fetch(`${contextPath}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON 전송
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password,
        address: address,
        licenseCode: licenseCode,
        latitude: latitude,
        longitude: longitude,
      }),
    })
      .then((res) => res.json())
      .then((data) => {

        // 성공 여부 체크
        if (data && data.redirectUrl) {
          Swal.fire({
            title: "회원가입 성공!",
            text: "로그인 페이지로 이동합니다",
            icon: "success",
            confirmButtonColor: "#14b3ae",
            confirmButtonText: "확인",
          }).then(() => {
            window.location.href = contextPath + data.redirectUrl;
          });
        } else {
          Swal.fire({
            title: "회원가입 실패",
            text: "다시 시도해주세요",
            icon: "error",
          });
        }
      });
  });
};
