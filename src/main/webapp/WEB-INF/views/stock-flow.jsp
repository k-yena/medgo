<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="en">
<head>
<%@ include file="/WEB-INF/views/common/header.jsp"%>
<!-- 나중에 헤더 붙이기 -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/dist/assets/vendors/toastify/toastify.css" />
<style>
	/* 말줄임 적용용 */ 
.truncate-40 {
	display: inline-block;
	max-width: 40ch;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	vertical-align: bottom;
}
</style>
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
								<colgroup>
									<col style="width: 15%;">
									<col style="width: 30%;">
									<col style="width: 15%;">
									<col style="width: 5%;">
									<col style="width: 5%;">
									<col style="width: 20%;">
								</colgroup>
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
									<c:forEach var="item" items="${list}">
										<tr>
											<td>${item.mainCode}</td>
											<c:choose>
												<c:when test="${fn:length(item.productName) gt 30}">
													<td>${fn:substring(item.productName,0,30)}...</td>
												</c:when>
												<c:otherwise>
													<td>${item.productName}</td>
												</c:otherwise>
											</c:choose>
											<td>${item.manufacturerName}</td>
											<td>${item.quantity}</td>
											<td>${item.transactionType}</td>
											<td>${item.transactionDate}</td>
										</tr>
									</c:forEach>
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
									<td id="modal-code"></td>
								</tr>
								<tr>
									<th scope="row">이름</th>
									<td id="modal-name"></td>
								</tr>
								<tr>
									<th scope="row">제조사</th>
									<td id="modal-manufacturer"></td>
								</tr>
								<tr>
									<th scope="row">변동량</th>
									<td id="modal-quantity"></td>
								</tr>
								<tr>
									<th scope="row">입/출고</th>
									<td id="modal-transactionType"></td>
								</tr>
								<tr>
									<th scope="row">입/출고일</th>
									<td id="modal-transactionDate"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 여기부터 script.html -->
	<%@ include file="/WEB-INF/views/common/script.jsp"%>
	<!-- 여기까지 script.html -->
	<script src="${pageContext.request.contextPath}/resources/dist/assets/vendors/toastify/toastify.js"></script>
	<script src="${pageContext.request.contextPath}/resources/dist/assets/js/pages/stock-flow.js"></script>
</body>
</html>
