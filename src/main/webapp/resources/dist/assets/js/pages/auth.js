// --- 인풋에서 엔터 누르면 다음 인풋으로 넘어가는 코드 ---
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    const inputs = Array.from(form.querySelectorAll("input"));

    inputs.forEach((input, index) => {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();

          const nextIndex = index + 1;

          if (nextIndex < inputs.length) {
            inputs[nextIndex].focus();
          } else {
            const submitButton = form.querySelector(".btn-primary");
            if (submitButton) {
              submitButton.click();
            } else {
              form.submit();
            }
          }
        }
      });
    });
  }
});
