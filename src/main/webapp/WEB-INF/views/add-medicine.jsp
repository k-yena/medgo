<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<%@ include file="/WEB-INF/views/common/header.jsp"%>
<!-- 여기까지 헤더 붙이기 -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/dist/assets/vendors/toastify/toastify.css" />
</head>
<body>
	<div id="app">
		<aside class="sidebar-placeholder">
			<%@ include file="/WEB-INF/views/common/sidebar.jsp"%>
		</aside>
		<div id="main">
			<!--약 상세정보 모달-->
			<div class="modal fade" id="drugInfoModal" tabindex="-1"
				aria-labelledby="drugInfoModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="drugInfoModalLabel">약품 상세 정보</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<div class="table-responsive">
								<table class="table mb-0 table-hover">
									<tbody>
										<tr>
											<th scope="row" class="w-25">코드</th>
											<td id="modal-code">12345</td>
										</tr>
										<tr>
											<th scope="row">이름</th>
											<td id="modal-name">ㅇㅇㅇ</td>
										</tr>
										<tr>
											<th scope="row">제조사</th>
											<td id="modal-manufacturer">ccc</td>
										</tr>
										<tr>
											<th scope="row">주성분</th>
											<td id="modal-ingredient">rrr</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="modal-footer justify-content-between">
							<div class="d-flex justify-content-center align-items-center">
								<label for="quantity-input" class="form-label me-3 mb-0">수량:</label>
								<div class="input-group" style="width: 150px">
									<button class="btn btn-outline-secondary" type="button"
										id="quantity-minus">-</button>
									<input type="text" class="form-control text-center"
										id="quantity-input" value="1" aria-label="Quantity" />
									<button class="btn btn-outline-secondary" type="button"
										id="quantity-plus">+</button>
								</div>
							</div>
							<div>
								<button type="button" class="btn btn-secondary"
									data-bs-dismiss="modal">닫기</button>
								<button type="button" class="btn btn-primary add-medicine-btn">
									등록</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<header class="mb-3">
				<a href="#" class="burger-btn d-block d-xl-none"> <i
					class="bi bi-justify fs-3"></i>
				</a>
			</header>
			<div class="page-heading">
				<div class="page-title">
					<div class="row">
						<div class="col-12 col-md-6 order-md-1 order-last">
							<h3>신규 약 등록</h3>
							<p class="text-subtitle text-muted">식약청에 등록된 약품을 검색하고 신규 약품을
								등록합니다.</p>
						</div>
						<div class="col-12 col-md-6 order-md-2 order-first">
							<nav aria-label="breadcrumb"
								class="breadcrumb-header float-start float-lg-end">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="/medgo/main">메인화면</a></li>
									<li class="breadcrumb-item active" aria-current="page">신규
										약 등록</li>
								</ol>
							</nav>
						</div>
					</div>
				</div>
				<section class="section">
					<div class="card">
						<div class="card-header">식약청 등록 의약품</div>
						<div class="card-body">
							<table class="table table-striped" id="table1">
								<thead>
									<tr>
										<th>코드</th>
										<th>이름</th>
										<th>제조사</th>
										<th>주성분</th>
									</tr>
								</thead>
								<tbody>
									<!-- Data will be inserted here dynamically -->
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>

	<!-- 여기부터 script.html -->
	<%@ include file="/WEB-INF/views/common/script.jsp"%>
	<!-- 여기까지 script.html -->
	<script
		src="${pageContext.request.contextPath}/resources/dist/assets/vendors/toastify/toastify.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/dist/assets/js/pages/add-medicine.js"></script>
</body>
</html>