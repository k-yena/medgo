<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@ taglib
	prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
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
			<header class="mb-3">
				<a href="#" class="burger-btn d-block d-xl-none"> <i
					class="bi bi-justify fs-3"></i>
				</a>
			</header>

			<div class="page-heading">
				<div class="page-title">
					<div class="row">
						<div class="col-12 col-md-6 order-md-1 order-last">
							<h3>공지사항</h3>
							<p class="text-subtitle text-muted">약국 관련 중요 공지사항을 확인하고
								관리합니다.</p>
						</div>
						<div class="col-12 col-md-6 order-md-2 order-first">
							<nav aria-label="breadcrumb"
								class="breadcrumb-header float-start float-lg-end">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="/medgo/main">메인화면</a></li>
									<li class="breadcrumb-item active" aria-current="page">공지사항</li>
								</ol>
							</nav>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12">
				<div class="card">
					<div
						class="card-header d-flex justify-content-between align-items-center">
						<h4 class="ms-2">공지사항 게시판</h4>
						<a href="#" class="btn btn-outline-primary me-2"
							data-bs-toggle="modal" data-bs-target="#makeNotice"><i
							class="fa-solid fa-plus"></i></a>
					</div>
					<div class="card-body">
						<div class="table-responsive">
							<table class="table table-hover table-lg">
								<thead>
									<tr>
										<th>제목</th>
										<th>내용</th>
										<th>올린 시각</th>
									</tr>
								</thead>
								<tbody id="notice-container">
									<c:forEach var="notice" items="${notices}">
										<tr class="notice-row" data-id="${notice.noticeid}" data-title="${notice.title}" data-content="${notice.content}" data-bs-toggle="modal" data-bs-target="#showNotice">
											<td class="col-3">
												<div class="d-flex align-items-center">
													<p class="font-bold ms-3 mb-0">${notice.title}</p>
												</div>
											</td>
											<td class="col-auto">
												<c:choose>
													<c:when test="${fn:length(notice.content) > 30}">
														<p class="mb-0">${fn:substring(notice.content, 0, 30)}...</p>
													</c:when>
													<c:otherwise>
														<p class="mb-0">${notice.content}</p>
													</c:otherwise>
												</c:choose>
											</td>
											<td class="col-auto">
												<p class="mb-0"><fmt:formatDate value="${notice.createdat}" pattern="yyyy-MM-dd HH:mm" /></p>
											</td>
										</tr>
									</c:forEach>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<!-- 페이지네이션 -->
			<nav aria-label="Page navigation example">
				<ul class="pagination pagination-primary" id="pagination">
					<%-- Previous Button --%>
					<c:if test="${currentPage > 1}">
						<li class="page-item"><a class="page-link" href="?page=${currentPage - 1}"><i class="bi bi-caret-left-fill"></i></a></li>
					</c:if>

					<c:set var="pageWindow" value="2" />
					<c:set var="startPage" value="${currentPage - pageWindow}" />
					<c:set var="endPage" value="${currentPage + pageWindow}" />

					<c:if test="${startPage < 1}">
						<c:set var="endPage" value="${endPage + (1 - startPage)}" />
						<c:set var="startPage" value="1" />
					</c:if>
					<c:if test="${endPage > totalPages}">
						<c:set var="startPage" value="${startPage - (endPage - totalPages)}" />
						<c:set var="endPage" value="${totalPages}" />
					</c:if>
					<c:if test="${startPage < 1}">
						<c:set var="startPage" value="1" />
					</c:if>

					<%-- First Page --%>
					<c:if test="${startPage > 1}">
						<li class="page-item"><a class="page-link" href="?page=1">1</a></li>
						<c:if test="${startPage > 2}">
							<li class="page-item disabled"><span class="page-link">...</span></li>
						</c:if>
					</c:if>

					<%-- Page Numbers --%>
					<c:forEach begin="${startPage}" end="${endPage}" var="i">
						<li class="page-item <c:if test='${currentPage == i}'>active</c:if>">
							<a class="page-link" href="?page=${i}">${i}</a>
						</li>
					</c:forEach>

					<%-- Last Page --%>
					<c:if test="${endPage < totalPages}">
						<c:if test="${endPage < totalPages - 1}">
							<li class="page-item disabled"><span class="page-link">...</span></li>
						</c:if>
						<li class="page-item"><a class="page-link" href="?page=${totalPages}">${totalPages}</a></li>
					</c:if>

					<%-- Next Button --%>
					<c:if test="${currentPage < totalPages}">
						<li class="page-item"><a class="page-link" href="?page=${currentPage + 1}"><i class="bi bi-caret-right-fill"></i></a></li>
					</c:if>
				</ul>
			</nav>

			<!-- 상세보기 모달 -->
			<div class="modal fade" id="showNotice" tabindex="-1"
				aria-hidden="true">
				<div
					class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div class="modal-content">
						<div class="card mb-0">
							<div class="card-content">
								<div class="modal-header">
									<h5 class="modal-title" id="myModalLabel1">공지사항</h5>
									<button type="button" class="btn-close" data-bs-dismiss="modal"
										aria-label="Close"></button>
								</div>
								<div class="card-body">
									<form id="updateNoticeForm" class="form form-vertical" method="POST">
										<div class="row">
											<div class="col-12">
												<div class="form-group">
													<label for="notice-edit-title">공지사항 제목</label> <input
														type="text" id="notice-edit-title" class="form-control"
														name="title" />
												</div>
											</div>
											<div class="col-12">
												<div class="form-group">
													<label for="notice-edit-content">공지사항 내용</label>
													<textarea id="notice-edit-content"
														class="form-control" name="content"
														style="height: 6em" row="3" minlength="3" maxlength="100"></textarea>
												</div>
											</div>
										</div>
										<div class="modal-footer notice-btns">
											<button type="button" class="btn btn-outline-secondary edit-btn">수정</button>
											<button type="button" class="btn btn-outline-danger delete-btn">삭제</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 공지등록 모달 -->
			<div class="modal fade" id="makeNotice" tabindex="-1"
				aria-hidden="true">
				<div
					class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div class="modal-content">
						<div class="card mb-0">
							<div class="card-content">
								<div class="modal-header">
									<h5 class="modal-title" id="myModalLabel1">공지사항 등록</h5>
									<button type="button" class="btn-close" data-bs-dismiss="modal"
										aria-label="Close"></button>
								</div>
								<div class="card-body">
									<form id="createNoticeForm" class="form form-vertical" action="/medgo/pharmacy/notice" method="POST">
										<div class="row">
											<div class="col-12">
												<div class="form-group">
													<label for="notice-create-title">공지사항 제목</label> <input
														type="text" id="notice-create-title" class="form-control"
														name="title" />
												</div>
											</div>
											<div class="col-12">
												<div class="form-group">
													<label for="notice-create-content">공지사항 내용</label>
													<textarea id="notice-create-content"
														class="form-control" name="content"
														style="height: 6em" row="3" minlength="3" maxlength="100"></textarea>
												</div>
											</div>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-outline-secondary"
												data-bs-dismiss="modal" aria-label="Close">취소</button>
											<button type="submit" class="btn btn-outline-primary register-notice-btn">등록</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script
		src="${pageContext.request.contextPath}/resources/dist/assets/vendors/toastify/toastify.js"></script>
	<!-- 여기부터 script.html -->
	<%@ include file="/WEB-INF/views/common/script.jsp"%>
	<!-- 여기까지 script.html -->
	<script src="${pageContext.request.contextPath}/resources/dist/assets/js/pages/notice.js"></script>
</body>
</html>
