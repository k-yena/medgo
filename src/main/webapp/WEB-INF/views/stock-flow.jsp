<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<%@ include file="/WEB-INF/views/common/header.jsp"%>
<!-- 나중에 헤더 붙이기 -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/dist/assets/vendors/toastify/toastify.css" />
</head>
<body>
	<div id="app">
		<aside class="sidebar-placeholder">
			<%@ include file="/WEB-INF/views/common/sidebar.jsp"%>
		</aside>
		<div id="main">
			<header class="mb-3">
				<a href="#" class="burger-btn d-block d-xl-none"> <i class="bi bi-justify fs-3"></i>
				</a>
			</header>
			<div class="page-heading">
				<div class="page-title">
					<div class="row">
						<div class="col-12 col-md-6 order-md-1 order-last">
							<h3>입출고 관리</h3>
							<p class="text-subtitle text-muted">약품의 입고 및 출고 기록을 관리하고 현재 재고를 확인합니다.</p>
						</div>
						<div class="col-12 col-md-6 order-md-2 order-first">
							<nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="/medgo/pharmacy/">메인화면</a></li>
									<li class="breadcrumb-item active" aria-current="page">입출고 관리</li>
								</ol>
							</nav>
						</div>
					</div>
				</div>
				<section class="section">
					<div class="card">
						<div class="card-header">의약품 재고</div>
						<div class="card-body">
							<table class="table table-striped" id="table1">
								<thead>
									<tr>
										<th>코드</th>
										<th>이름</th>
										<th>제조사</th>
										<th>변동량</th>
										<th>입/출고</th>
										<th>입/출고일</th>
									</tr>
								</thead>
								<tbody>

								</tbody>
							</table>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>

	<!--약 상세정보 모달-->
	<div class="modal fade" id="drugInfoModal" tabindex="-1" aria-labelledby="drugInfoModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="drugInfoModalLabel">약품 상세 정보</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="table-responsive">
						<table class="table mb-0 table-hover">
							<tbody>
								<tr>
									<th scope="row" class="w-25">코드</th>
									<td id="modal-code">123</td>
								</tr>
								<tr>
									<th scope="row">이름</th>
									<td id="modal-name">이름</td>
								</tr>
								<tr>
									<th scope="row">제조사</th>
									<td id="modal-manufacturer">제조사</td>
								</tr>

								<tr>
									<th scope="row">재고</th>
									<td id="modal-stock">0000</td>
								</tr>
								<tr>
									<th scope="row">상태</th>
									<td id="modal-status">0000</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script > 
	const data= ${histories}</script>

	<!-- 여기부터 script.html -->
	<%@ include file="/WEB-INF/views/common/script.jsp"%>
	<!-- 여기까지 script.html -->
	<script src="${pageContext.request.contextPath}/resources/dist/assets/vendors/toastify/toastify.js"></script>
	<script src="${pageContext.request.contextPath}/resources/dist/assets/js/pages/stock-flow.js"></script>
</body>
</html>
