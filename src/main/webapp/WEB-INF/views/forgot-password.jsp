<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <%@ include file="/WEB-INF/views/common/header.jsp"%>
    <!-- 여기까지 헤더 붙이기 -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/dist/assets/css/pages/auth.css" />
  </head>

  <body>
    <div id="auth">
      <div class="row vh-100">
        <div class="col-lg-5 col-12 d-flex align-items-center">
          <div id="auth-left">
            <h1 class="auth-title">비밀번호 찾기</h1>
            <p class="auth-subtitle mb-5">
              이메일로 새로운 비밀번호를 보냅니다.
            </p>

            <form action="/medgo/login" method="post">
              <div class="form-group position-relative has-icon-left mb-4">
                <input
                  type="email"
                  class="form-control form-control-xl"
                  placeholder="Email"
                />
                <div class="form-control-icon">
                  <i class="bi bi-envelope"></i>
                </div>
              </div>
              <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5">
                보내기
              </button>
            </form>
            <div class="text-center mt-5 text-lg fs-4">
              <p class="text-gray-600">
                계정이 있으신가요?
                <a href="/medgo/login" class="font-bold">로그인</a>.
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-7 d-none d-lg-block">
          <div id="auth-right"></div>
        </div>
      </div>
    </div>
  </body>
</html>
