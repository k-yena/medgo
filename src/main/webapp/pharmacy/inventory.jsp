<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>입출고관리</title>
    <link rel="stylesheet" href="/medgo/assets/css/style.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    />
  </head>
  <body>
    <jsp:include page="/WEB-INF/fragments/header.jsp" />
    <div class="content-wrapper">
      <jsp:include page="/WEB-INF/fragments/sidebar.jsp" />
      <div class="main-content">
        <div class="content-header">
          <h2>입출고 기록</h2>
          <div class="action-buttons">
            <a href="/medgo/pharmacy/drug-search.jsp" class="btn-action"> 약 등록</a>
            <a href="/medgo/pharmacy/drug-delete.jsp" class="btn-action btn-danger">약 삭제</a>
          </div>
        </div>
        <p class="page-description">
          약품의 입고 및 출고 기록을 관리하고 현재 재고를 확인합니다.
        </p>
        <div class="search-container">
          <input type="text" placeholder="약품 검색..." />
          <button class="btn-action"><i class="fas fa-search"></i></button>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>약 코드</th>
                <th>약 이름</th>
                <th>제조사</th>
                <th>입고(개수)</th>
                <th>출고(개수)</th>
                <th>총 수량</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12345</td>
                <td>타이레놀</td>
                <td>얀센</td>
                <td>100</td>
                <td>20</td>
                <td>80</td>
              </tr>
              <tr>
                <td>67890</td>
                <td>아스피린</td>
                <td>어쩌구</td>
                <td>510</td>
                <td>10</td>
                <td>140</td>
              </tr>
              <tr>
                <td>321322</td>
                <td>이부프로펜</td>
                <td>바이엘</td>
                <td>50</td>
                <td>10</td>
                <td>40</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <a href="#">&laquo;</a>
          <a href="#" class="active">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">&raquo;</a>
        </div>
      </div>
    </div>
    <script src="/medgo/assets/js/script.js"></script>
  </body>
</html>
