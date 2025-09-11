<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core"%>
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
          <a href="#" class="burger-btn d-block d-xl-none">
            <i class="bi bi-justify fs-3"></i>
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
                <div class="welcome-text">
                  <p>환영합니다, ${pharmacyName} 관리자님!</p>
                  <p>우리 약국의 현황을 한눈에 확인하세요.</p>
                </div>
                <div class="background-shapes">
                  <span></span> <span></span> <span></span> <span></span>
                  <span></span> <span></span> <span></span> <span></span>
                  <span></span> <span></span>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">입출고 차트</h4>
                  </div>
                  <div class="card-body">
                    <canvas id="chart-recent-stock-history"></canvas>
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
                        <h6 class="font-extrabold mb-0">${todayIn}</h6>
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
                        <h6 class="font-extrabold mb-0">${todayOut}</h6>
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
                        <h6 class="font-extrabold mb-0">
                          ${currentMedicineCount}
                        </h6>
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
                        <h6 class="font-extrabold mb-0">${monthlyOut}</h6>
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
                        <c:forEach var="record" items="${recentStockHistory}">
                          <tr>
                            <td>${record.medicineName}</td>
                            <td>${record.quantity}</td>
                            <td>
                              <c:choose>
                                <c:when
                                  test="${record.transactionType == 'IN'}"
                                >
                                  입고
                                </c:when>
                                <c:otherwise>출고</c:otherwise>
                              </c:choose>
                            </td>
                          </tr>
                        </c:forEach>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header">
                    <h4>현재 공지사항</h4>
                  </div>
                  <div class="card-body">
                    <h5>${latestNotice.title}</h5>
                    <p>${latestNotice.content}</p>
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
                      <div id="chart-top-selling"></div>
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
                    <div id="chart-monthly-sales"></div>
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
    <script src="${pageContext.request.contextPath}/resources/dist/assets/vendors/apexcharts/apexcharts.js"></script>
    <script src="${pageContext.request.contextPath}/resources/dist/assets/js/pages/dashboard.js"></script>
  </body>
</html>
