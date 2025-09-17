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
			<div class="col d-none d-lg-block">
				<div id="auth-right"></div>
			</div>
			<div class="col-lg-7 col-12">
				<div id="auth-left">
					<h1 class="auth-title">회원가입</h1>
					<p class="auth-subtitle mb-5">재고관리 시스템을 경험해보세요</p> 
 
					<form>
						<div 
							class="form-group position-relative has-icon-left mb-4 d-flex">
							<input type="email" id=email name="email"
								class="form-control form-control-xl email-input me-2"
								placeholder="이메일 / 사용중인 이메일은 test@gmail.com" /> 
							<button type="button"
								class="btn btn-outline-primary email-check-btn">
								중복확인</button>
							<div class="form-control-icon" style="top: 1.7rem">
								<i class="bi bi-envelope"></i>
							</div>
						</div>
						<div class="form-group position-relative has-icon-left mb-4">
							<input type="text" id=name name="name" class="form-control form-control-xl"
								placeholder="이름" />
							<div class="form-control-icon">
								<i class="bi bi-person"></i>
							</div>
						</div>
						<div class="form-group position-relative has-icon-left mb-4">
							<input type="password" id=password name="password" class="form-control form-control-xl"
								placeholder="비밀번호" />
							<div class="form-control-icon">
								<i class="bi bi-shield-lock"></i>
							</div>
						</div> 
						<!-- 비밀번호 다 치면 확인 띄우기 -->
						<div class="form-group position-relative has-icon-left mb-4">
							<input type="password" id=passwordConfirm name="passwordConfirm" class="form-control form-control-xl"
								placeholder="비밀번호 확인" />
							<div class="form-control-icon">
								<i class="bi bi-shield-lock"></i> 
							</div>
						</div>

						<div class="form-group position-relative has-icon-left mb-4">
							<input type="text" id="address" name="address" class="form-control form-control-xl"
								placeholder="주소" />
							<div class="form-control-icon">
								<i class="bi bi-mailbox"></i>
							</div>
						</div>

						<div class="form-group position-relative has-icon-left mb-4">
							<input type="text" id=licenseCode name="licenseCode" class="form-control form-control-xl"
								placeholder="면허번호" />
							<div class="form-control-icon"> 
								<i class="bi bi-credit-card-2-back"></i>
							</div>
						</div>

						<button type="button" class="submit-btn btn btn-primary btn-block btn-lg shadow-lg mt-2">
							가입하기</button>
					</form>
					<div class="text-center mt-5 text-lg fs-4">
						<p class="text-gray-600">
							이미 계정이 있으신가요? <a href="${pageContext.request.contextPath}/auth/login" class="font-bold">로그인</a>.
						</p>
					</div>
				</div>
			</div> 
		</div>
	</div> 
	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<script>

	</script>
	    	                	                                         
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<script>
		const contextPath = "${pageContext.request.contextPath}";
	</script>
	<script src="${pageContext.request.contextPath}/resources/dist/assets/js/pages/auth.js"></script>
	<script src="${pageContext.request.contextPath}/resources/dist/assets/js/pages/register.js"></script>
</body>
</html>