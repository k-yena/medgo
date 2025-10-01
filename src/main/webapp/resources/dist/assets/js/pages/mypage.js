window.addEventListener("load", () => {
  askPassword();
});

// --- 마이페이지 입장시 나오는 모달 ---
const askPassword = () => {
  Swal.fire({
    title: "비밀번호를 입력하세요",
    input: "password",
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
    preConfirm: (userInputPw) => {
      if (!userInputPw) {
        Swal.showValidationMessage("비밀번호를 입력해주세요!");
        return false;
      }

      PasswordCheck(userInputPw)
      .then((value) => {
          if (!value) {
            Swal.showValidationMessage("비밀번호가 틀렸습니다!");
            return false; 
          }
          return true;
        })
        .then((result) => {
          if (result) {
            document.querySelector(".protected-content").style.display =
              "block";
          } else if (result.isDismissed) {
            // 취소 시 메인 페이지로 이동
            window.location.href = "/medgo/main";
          }
        });
      function PasswordCheck(password) {
        // 입력 비밀번호 value와 비교하는 API요청 보내기
        return fetch(`${contextPath}/pharmacy/api/mypage`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `password=${password}`,
        })
          .then((response) => response.json())
          .then((isrightPw) => {
            return isrightPw;
          });
      }

      // --- 회원정보 수정 후 나오는 토스트 ---
      const infoEditModalEl = document.getElementById("infoEdit");
      const infoEditModal = new bootstrap.Modal(infoEditModalEl);
      const editBtn = document.querySelector(".edit-user-info-btn");
      // 값 가져오기
      const pharmacyName = document.querySelector("#first-name-column");
      const phone = document.querySelector("#fname");
      const address = document.querySelector("#city-column");
      const email = document.querySelector("#email-id-column");
      const licenseCode = document.querySelector("#lcnum");
      const detailInfo = document.querySelector("#company-column");
      
      editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        // 회원정보를 수정하는 API     
        fetch(`${contextPath}/pharmacy/api/update`, {
        	method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({pharmacyName:pharmacyName.value,
            					 phone:phone.value,
            					 address:address.value,	 
            					 detailInfo:detailInfo.value}),
        }).then(res => res.json())
          .then((result)=>{
        	  if(result){ 
    	       document.querySelector("#pharmacyName").value = pharmacyName.value;
    	       document.querySelector("#last-name-column").value = phone.value;
    	       document.querySelector("#address").value = address.value;
    	       document.querySelector("#info").value = detailInfo.value;       	    
        	  }
          });

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

      const withdrawalBtn = document.querySelector(".withdrawal-btn");
      const inputPw = document.querySelector(".withdraw-password");

      withdrawalBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        const userPassword = inputPw.value.trim();
        if (!userPassword) {
          Swal.fire("실패", "비밀번호를 입력해주세요.", "error");
          return;
        }

        // 1. 비밀번호 확인 후
        PasswordCheck(userPassword).then((isCorrect) => {
          if (!isCorrect) {
            Swal.fire("실패", "비밀번호가 틀렸습니다.", "error");
            inputPw.value = ""; 
            return;
          }
	        Swal.fire({
	          title: "정말로 탈퇴하시겠습니까?",
	          text: "이 작업은 되돌릴 수 없습니다!",
	          icon: "warning",
	          showCancelButton: true,
	          confirmButtonColor: "#d33",
	          cancelButtonColor: "#6c757d",
	          confirmButtonText: "네, 탈퇴하겠습니다.",
	          cancelButtonText: "취소",
	          reverseButtons: true,
	        }).then((inputResult) => { 
	          if (inputResult.isConfirmed) {
	            //탈퇴 API
	        	  fetch(`${contextPath}/pharmacy/api/delete`, {
	                  method: "POST",
	                  headers: { "Content-Type": "application/json" },
	                  body: JSON.stringify({
	                    pharmacyName: pharmacyName.value,
	                    phone: phone.value,
	                    address: address.value,
	                    detailInfo: detailInfo.value 
	                  }), 
	                }).then(res => res.json())
	                  .then(deleteresult => {
		                    if(deleteresult){
		                      Swal.fire("탈퇴 완료", "계정이 삭제되었습니다.", "success")
		                        .then(() => { window.location.href = `${contextPath}/auth/login`; });
		                    } else {
		                      Swal.fire("오류", "탈퇴에 실패했습니다.", "error");
		                    }
	                   });
	          		 } 
		          }); 
		        });
		      });
    },
  });
};
