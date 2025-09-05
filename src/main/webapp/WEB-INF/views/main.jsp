<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="KO">
<head>
<%@ include file="/WEB-INF/views/common/header.jsp"%>
<!-- 헤더여기까지 -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
				<h3>관리자 화면</h3>
				<p class="text-subtitle text-muted">현재 약국 현황을 확인해보세요!</p>
			</div>
			<div class="page-content">
				<section class="row">
					<div class="row">
						<div class="col-12 col-xl-6 card welcome-box">
							<!-- <img class="welcome-img" src="/resources/dist/assets/images/welcome.png" /> -->
							<div class="welcome-text">
								<p>환영합니다, 우리 약국 관리자님!</p>
								<p>우리 약국의 현황을 한눈에 확인하세요.</p>
							</div>
							<div class="background-shapes">
								<span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
							</div>
						</div>
						<div class="col-xl-6">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title">입출고 차트</h4>
								</div>
								<div class="card-body">
									<canvas id="line"></canvas>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-6 col-lg-3 col-md-6">
							<div class="card">
								<div class="card-body px-3 py-4-5">
									<div class="row">
										<div class="col-md-4">
											<div class="stats-icon purple pb-1">
												<i class="bi bi-box-arrow-in-down"></i>
											</div>
										</div>
										<div class="col-md-8">
											<h6 class="text-muted font-semibold">오늘의 입고</h6>
											<h6 class="font-extrabold mb-0">11,000</h6>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-6 col-lg-3 col-md-6">
							<div class="card">
								<div class="card-body px-3 py-4-5">
									<div class="row">
										<div class="col-md-4">
											<div class="stats-icon blue">
												<i class="bi bi-box-arrow-up"></i>
											</div>
										</div>
										<div class="col-md-8">
											<h6 class="text-muted font-semibold">오늘의 출고</h6>
											<h6 class="font-extrabold mb-0">18,000</h6>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-6 col-lg-3 col-md-6">
							<div class="card">
								<div class="card-body px-3 py-4-5">
									<div class="row">
										<div class="col-md-4">
											<div class="stats-icon green">
												<i class="fas fa-pills"></i>
											</div>
										</div>
										<div class="col-md-8">
											<h6 class="text-muted font-semibold">현재 의약품</h6>
											<h6 class="font-extrabold mb-0">280,000</h6>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-6 col-lg-3 col-md-6">
							<div class="card">
								<div class="card-body px-3 py-4-5">
									<div class="row">
										<div class="col-md-4">
											<div class="stats-icon red">
												<i class="bi bi-calendar3"></i>
											</div>
										</div>
										<div class="col-md-8">
											<h6 class="text-muted font-semibold">이번 달 출고</h6>
											<h6 class="font-extrabold mb-0">12,345</h6>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-xl-8 col-12">
							<div class="card">
								<div class="card-header">
									<h4>최근 입출고 기록</h4>
								</div>
								<div class="card-body">
									<table class="table table-striped" id="table1">
										<thead>
											<tr>
												<th>이름</th>
												<th>판매량</th>
												<th>입/출고</th>
											</tr>
										</thead>
										<tbody>
											<!-- Data will be inserted here dynamically -->
										</tbody>
									</table>
								</div>
							</div>
							<div class="card">
								<div class="card-header">
									<h4>현재 공지사항</h4>
								</div>
								<div class="card-body">
									<p>추석 연휴 기간 동안 약국 운영 시간이 변경됩니다. 방문 전 확인 부탁드립니다.</p>
								</div>
							</div>
						</div>
						<div class="col-xl-4 col-12">
							<div class="card">
								<div class="card">
									<div class="card-header">
										<h4>판매율 Top3 의약품</h4>
									</div>
									<div class="card-body">
										<div id="chart-visitors-profile"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<div class="card">
								<div class="card-header">
									<h4>월간 판매율</h4>
								</div>
								<div class="card-body">
									<div id="chart-profile-visit"></div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
	<!-- 여기부터 script.html -->
	<%@ include file="/WEB-INF/views/common/script.jsp"%>
	<!-- 여기까지 script.html -->
	<script src="${pageContext.request.contextPath}/resources/dist/assets/js/pages/ui-chartjs.js"></script>
	<script src="${pageContext.request.contextPath}/resources/dist/assets/vendors/apexcharts/apexcharts.js"></script>
	<script src="${pageContext.request.contextPath}/resources/dist/assets/js/pages/dashboard.js"></script>
	<script>
      // 테이블에 표시할 데이터
      const data = [
        ["타이레놀정 500mg", "150", "입고"],
        ["부루펜정 200mg", "80", "입고"],
        ["아스피린 프로텍트정 100mg", "200", "출고"],
      ];

      let table1 = document.querySelector("#table1");
      let dataTable = new simpleDatatables.DataTable(table1, {
        searchable: false, // 검색창 숨기기
        sortable: false, // 정렬 기능 숨기기
        paging: false, // 페이징 숨기기
        fixedHeight: true, // 표 높이 고정 (info 영역 제거 효과)
        data: {
          headings: ["이름", "판매량", "입/출고"],
          data: data,
        },
      });

      const dataTableTop = document.querySelector(".dataTable-top");
      const dataTableDrop = document.querySelector(".dataTable-dropdown");
      const dataTableSearch = document.querySelector(".dataTable-search");

      if (dataTableTop && dataTableDrop && dataTableSearch) {
        const leftContainer = document.createElement("div");
        leftContainer.classList.add("dataTable-left");

         const newDrop = `<button class="btn btn-outline-secondary dropdown-toggle" type="button"data-bs-toggle="dropdown" aria-expanded="false" style="border: 1px solid #dce7f1;">필터</button>
                         <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">전체보기</a></li>
                             <li><a class="dropdown-item" href="#">입고만 보기</a></li> 
                            <li><a class="dropdown-item" href="#">출고만 보기</a></li>
                           </ul>`;

        leftContainer.innerHTML = newDrop;
        leftContainer.appendChild(dataTableDrop);

        dataTableTop.insertBefore(leftContainer, dataTableSearch);
      }
    </script>
</body>
</html>
