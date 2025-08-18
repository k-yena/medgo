<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%> 
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>관리 보드</title>
    <link rel="stylesheet" href="/medgo/assets/css/style.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  </head>
  <body>
    <jsp:include page="/WEB-INF/fragments/header.jsp" />
    <div class="content-wrapper">
      <jsp:include page="/WEB-INF/fragments/sidebar.jsp" />
      <div class="main-content">
        <div class="welcome-box">
          <p>
            환영합니다, ㅇㅇ약국 관리자님! 약국 관리 시스템의 현황을 한눈에
            확인하세요.
          </p>
        </div>

        <div class="widgets-container">
          <div class="widget">
            <h3><i class="fas fa-boxes"></i> 최근 입출고 기록</h3>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>약 이름</th>
                    <th>구분</th>
                    <th>수량</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>타이레놀</td>
                    <td>입고</td>
                    <td>+50</td>
                  </tr>
                  <tr>
                    <td>아스피린</td>
                    <td>출고</td>
                    <td>-10</td>
                  </tr>
                  <tr>
                    <td>게보린</td>
                    <td>입고</td>
                    <td>+30</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="widget">
            <h3><i class="fas fa-chart-line"></i> 판매 현황</h3>
            <div class="line-chart-container">
              <canvas id="myChart" width="400" height="200"></canvas>
            </div>
          </div>

          <div class="widget">
            <h3><i class="fas fa-medal"></i> 가장 많이 팔린 약</h3>
            <div class="chart-container">
              <div class="pie-chart">
                <div
                  class="slice"
                  style="
                    background: conic-gradient(
                      #f8e16c 0% 40%,
                      #1abc9c 40% 70%,
                      #005f5f 70% 100%
                    );
                  "
                ></div>
                <div class="center-circle"></div>
              </div>
              <div class="chart-legend">
                <p>
                  <span style="background-color: #14b3ae"></span> 타이레놀 (40%)
                </p>
                <p>
                  <span style="background-color: #f8e16c"></span> 아스피린 (30%)
                </p>
                <p>
                  <span style="background-color: #005f5f"></span> 게보린 (30%)
                </p>
              </div>
            </div>
          </div>

          <div class="widget widget-full-width">
            <h3><i class="fas fa-bullhorn"></i> 공지사항</h3>
            <div class="notice-list">
              <div class="notice-item">
                <div class="notice-header">
                  <h3>중요 공지: 하계 휴무 안내</h3>
                  <span class="notice-date">2025-08-01</span>
                </div>
                <p>
                  안녕하세요. ㅇㅇ약국입니다. 8월 15일부터 17일까지 하계
                  휴무입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script src="/medgo/assets/js/script.js"></script>
  </body>
</html>
