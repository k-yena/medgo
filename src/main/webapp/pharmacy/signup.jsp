<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>회원가입</title>
	<link rel="stylesheet" href="/medgo/assets/css/style.css" />
</head>
<body class="login-page">
    <div class="signup-container">
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
          <h2>반가워요!</h2>
          <p>이미 계정이 있으신가요? 아래 버튼을 눌러 로그인하세요.</p>
          <a href="/medgo/pharmacy/login.jsp" class="btn-signup">로그인</a>
        </div>
      </div>
      <div class="login-form">
        <h1>회원가입</h1>
        <form action="/medgo/pharmacy/login.jsp" method="post">
          <div class="form-row">
            <div class="form-group">
              <label for="name">이름</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div class="form-group">
              <label for="pharmacy-name">약국이름</label>
              <input
                type="text"
                id="pharmacy-name"
                name="pharmacy-name"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="email">이메일</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div class="form-group">
              <label for="email-code">이메일 코드</label>
              <div class="input-with-button merged-button">
                <input type="text" id="email-code" name="email-code" required />
                <button type="button" class="btn-send">확인</button>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div class="form-group">
            <label for="password-confirm">비밀번호 확인</label>
            <input
              type="password"
              id="password-confirm"
              name="password-confirm"
              required
            />
          </div>
          <div class="form-group">
            <label for="license">면허 번호</label>
            <input type="text" id="license" name="license" required />
          </div>
          <div class="form-group">
            <label for="address">주소</label>
            <input type="text" id="address" name="address" required />
          </div>
          <button type="submit">가입하기</button>
        </form>
      </div>
    </div>
  </body>
</html>