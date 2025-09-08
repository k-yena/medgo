<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
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
					<h1 class="auth-title">Log in.</h1>
					<p class="auth-subtitle mb-5">의약품 재고관리를 시작하세요</p>

					<form action="/medgo/login" method="post">
						<div class="form-group position-relative has-icon-left mb-4">
							<input type="email" name="email"
								class="form-control form-control-xl" placeholder="이메일" />
							<div class="form-control-icon">
								<i class="bi bi-person"></i>
							</div>
						</div>
						<div class="form-group position-relative has-icon-left mb-4">
							<input type="password" name="password"
								class="form-control form-control-xl" placeholder="비밀번호" />
							<div class="form-control-icon">
								<i class="bi bi-shield-lock"></i>
							</div>
						</div>
						<div class="form-check form-check-lg d-flex align-items-end">
							<input class="form-check-input me-2" type="checkbox" value=""
								id="flexCheckDefault" /> <label
								class="form-check-label text-gray-600" for="flexCheckDefault">
								로그인 유지하기 </label>
						</div>
						<button class="btn btn-primary btn-block btn-lg shadow-lg mt-5">
							로그인</button>
					</form>
					<div class="text-center mt-5 text-lg fs-4">
						<p class="text-gray-600">
							계정이 없으신가요? <a href="/medgo/register" class="font-bold">회원가입</a>.
						</p>
						<p>
							<a class="font-bold" href="/medgo/forgotpw">비밀번호를
								잊으셨나요?</a>
						</p>
					</div>
				</div>
			</div>
			<div class="col-lg-7 d-none d-lg-block">
				<div id="auth-right"></div>
			</div>
		</div>
	</div>
	<script src="${pageContext.request.contextPath}/resources/dist/assets/js/pages/auth.js"></script>
</body>
</html>
