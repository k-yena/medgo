<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>로그인</title>
	<link rel="stylesheet" href="style.css" />
</head>
<body class="login-page">
    <div class="login-container">
      <div class="login-image">
        <div class="background-shapes">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="overlay-content">
          <h2>처음이신가요?</h2>
          <p>아래 버튼을 눌러 회원가입을 진행하세요.</p>
          <a href="/medgo/pharmacy/signup.jsp" class="btn-signup">회원가입</a>
        </div>
      </div>
      <div class="login-form">
        <h1>반가워요!</h1>
        <form action="/medgo/pharmacy/main.jsp" method="get">
          <div class="form-group">
            <label for="email">이메일</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  </body>
</html>