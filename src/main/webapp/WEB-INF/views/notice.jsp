<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<%@ include file="/WEB-INF/views/common/header.jsp"%>
<!-- 여기까지 헤더 붙이기 -->
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
							<h3>공지사항</h3>
							<p class="text-subtitle text-muted">약국 관련 중요 공지사항을 확인하고 관리합니다.</p>
						</div>
						<div class="col-12 col-md-6 order-md-2 order-first">
							<nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
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
					<div class="card-header d-flex justify-content-between align-items-center">
						<h4 class="ms-2">공지사항 게시판</h4>
						<a href="#" class="btn btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#makeNotice"><i class="fa-solid fa-plus"></i></a>
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
									<tr>
										<td class="col-3">
											<div class="d-flex align-items-center">
												<p class="font-bold ms-3 mb-0">공지사항 제목</p>
											</div>
										</td>
										<td class="col-auto">
											<p class="mb-0">공지사항내용</p>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<!-- 페이지네이션 -->
			<nav aria-label="Page navigation example">
				<ul class="pagination pagination-primary" id="pagination"></ul>
			</nav>

			<!-- 상세보기 모달 -->
			<div class="modal fade" id="showNotice" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div class="modal-content">
						<div class="card mb-0">
							<div class="card-content">
								<div class="modal-header">
									<h5 class="modal-title" id="myModalLabel1">공지사항</h5>
									<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="card-body">
									<form class="form form-vertical">
										<div class="row">
											<div class="col-12">
												<div class="form-group">
													<label for="notice-edit-title">공지사항 제목</label> <input type="text" id="notice-edit-title" class="form-control" name="noticeTitle" />
												</div>
											</div>
											<div class="col-12">
												<div class="form-group">
													<label for="notice-edit-content">공지사항 내용</label>
													<textarea type="text" id="notice-edit-content" class="form-control" name="noticeContent" style="height: 6em" row="3" minlength="3" maxlength="100"></textarea>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div class="modal-footer notice-btns">
							<a href="#" class="btn btn-outline-secondary edit-btn">수정</a> <a href="#" class="btn btn-outline-danger delete-btn">삭제</a>
						</div>
					</div>
				</div>
			</div>

			<!-- 공지등록 모달 -->
			<div class="modal fade" id="makeNotice" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div class="modal-content">
						<div class="card mb-0">
							<div class="card-content">
								<div class="modal-header">
									<h5 class="modal-title" id="myModalLabel1">공지사항 등록</h5>
									<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="card-body">
									<form class="form form-vertical">
										<div class="row">
											<div class="col-12">
												<div class="form-group">
													<label for="notice-edit-title">공지사항 제목</label> <input type="text" id="notice-edit-title" class="form-control" name="noticeTitle" />
												</div>
											</div>
											<div class="col-12">
												<div class="form-group">
													<label for="notice-edit-content">공지사항 내용</label>
													<textarea type="text" id="notice-edit-content" class="form-control" name="noticeContent" style="height: 6em" row="3" minlength="3" maxlength="100"></textarea>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Close">취소</button>
							<a href="#" class="btn btn-outline-primary register-notice-btn">등록</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script src="${pageContext.request.contextPath}/resources/dist/assets/vendors/toastify/toastify.js"></script>
	<!-- 여기부터 script.html -->
	<%@ include file="/WEB-INF/views/common/script.jsp"%>
	<!-- 여기까지 script.html -->
	<script src="${pageContext.request.contextPath}/resources/dist/assets/js/pages/notice-page.js"></script>
</body>
</html>
