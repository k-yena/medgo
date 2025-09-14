<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/dist/assets/vendors/toastify/toastify.css" />
<%@ include file="/WEB-INF/views/common/header.jsp"%>
<!-- 여기까지 헤더 -->


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
							<h3>기존 약 삭제</h3>
							<p class="text-subtitle text-muted">등록된 약품 정보를 삭제합니다</p>
						</div>
						<div class="col-12 col-md-6 order-md-2 order-first">
							<nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="/medgo/main">메인화면</a></li>
									<li class="breadcrumb-item active" aria-current="page">기존 약 삭제</li>
								</ol>
							</nav>
						</div>
					</div>
				</div>
				<section class="section">
					<div class="card">
						<div class="card-header">의약품 재고</div>
						<div class="card-body">
							<form method="get" action="<c:url value='/pharmacy/drugs/delete'/>" class="row g-2 mb-3 align-items-center" id="searchForm">
								<div class="col-auto d-inline-flex align-items-center">
									<select name="size" class="form-select me-1">
										<option value="5" ${size==5 ? 'selected' : ''}>5</option>
										<option value="10" ${size==10? 'selected' : ''}>10</option>
										<option value="15" ${size==15? 'selected' : ''}>15</option>
										<option value="20" ${size==20? 'selected' : ''}>20</option>
										<option value="25" ${size==25? 'selected' : ''}>25</option>
									</select> <span style="white-space: nowrap; writing-mode: horizontal-tb;">개 보기</span>
								</div>

								<div class="col ms-auto col-12 col-sm-8 col-md-6 col-lg-4">
									<input type="text" name="keyword" value="${keyword}" class="form-control" placeholder="이름/코드/제조사 검색" />
								</div>

								<!-- 상태 유지용 hidden -->
								<input type="hidden" name="page" value="${page}" /> <input type="hidden" name="sort" value="${sort}" /> <input type="hidden" name="order" value="${orderBy}" />
								<button type="submit" style="display: none"></button>
							</form>


							<div class="table-responsive">
								<table class="table table-striped" id="table1">
									<colgroup>
										<col style="width: 15%;">
										<col style="width: 45%;">
										<col style="width: 25%;">
										<col style="width: 15%;">
									</colgroup>
									<thead>
										<tr>
											<th scope="col" class="sortable" data-sort="mainCode">코드</th>
											<th scope="col" class="sortable" data-sort="productName">제품명</th>
											<th scope="col" class="sortable" data-sort="manufacturerName">제조사</th>
											<th scope="col" class="sortable" data-sort="medCount">재고</th>
										</tr>
									</thead>
									<tbody>
										<c:if test="${list.size()==0 }">
											<td colspan='4' style="text-align: center">데이터가 없습니다</td>
										</c:if>
										<c:forEach var="item" items="${list}">
											<tr data-id="${item.medicineId }" data-code="${item.mainCode}" data-name="${item.productName}" data-manu="${item.manufacturerName}" data-stock="${item.medCount}">
												<td>${item.mainCode }</td>
												<c:choose>
													<c:when test="${fn:length(item.productName) gt 40}">
														<td>${fn:substring(item.productName,0,40)}...</td>
													</c:when>
													<c:otherwise>
														<td>${item.productName }</td>
													</c:otherwise>
												</c:choose>
												<td>${item.manufacturerName }</td>
												<td>${item.medCount }</td>
											</tr>
										</c:forEach>
									</tbody>
								</table>

								<!-- 페이지네이션 (정렬/검색 조건 유지) -->
								<nav aria-label="Page navigation" class="mt-3 d-flex justify-content-end" id="pagerWrap" data-total-pages="${totalPages}">
									<ul class="pagination mb-0" id="pager"></ul>
								</nav>

							</div>
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
								<tr class="d-none">
									<th scope="row"></th>
									<td id="modal-id"></td>
								</tr>
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
									<th scope="row">재고</th>
									<td id="modal-stock"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="modal-footer">
					<div>
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
						<button type="button" class="btn btn-danger delete-medicine-btn">삭제</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 여기부터 script.html -->
	<%@ include file="/WEB-INF/views/common/script.jsp"%>
	<!-- 여기까지 script.html -->
	<script src="${pageContext.request.contextPath}/resources/dist/assets/vendors/toastify/toastify.js"></script>
	<script src="${pageContext.request.contextPath}/resources/dist/assets/js/pages/delete-medicine.js"></script>
</body>
</html>
