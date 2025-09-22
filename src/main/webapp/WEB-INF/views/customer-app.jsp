<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <%@ include file="/WEB-INF/views/common/customerHeader.jsp"%>
    <!-- 여기까지 헤드 -->
  </head>
  <body>
    <div class="mobile-frame">
      <div id="landing-screen">
        <img
          class="landing-img"
          src="https://cdn-icons-gif.flaticon.com/9534/9534955.gif"
        />
        <p class="landing-text">당신의 약을 찾아,</p>
        <h2 class="landing-title">약찾GO</h2>
      </div>
      <!-- Main App Screen -->
      <div id="main-app-screen" class="app-screen">
        <div class="header-container">
          <i class="home-button bi bi-chevron-left" onclick="goHome()"> </i>
        </div>

        <div class="search-box">
          <i
            id="search-back-button"
            class="bi bi-chevron-left"
            style="display: none"
          ></i>
          <input
            type="text"
            class="form-control"
            placeholder="어떤 약을 찾고계신가요?"
          />
        </div>

        <!-- Main Content Area -->
        <div class="main-content">
          <div id="capsule-strip-container">
            <div id="capsule-strip"></div>
          </div>
          <div id="map-controls-container">
            <button
              id="current-location-btn"
              class="btn btn-light bg-white shadow-sm"
              onclick="centerMapOnUserLocation()"
            >
              <i class="bi bi-crosshair"></i>
            </button>
            <div id="zoom-controls" class="shadow-sm">
              <button
                class="btn btn-light bg-white"
                onclick="map.setLevel(map.getLevel() - 1)"
              >
                <i class="bi bi-plus-lg"></i>
              </button>
              <hr />
              <button
                class="btn btn-light bg-white"
                onclick="map.setLevel(map.getLevel() + 1)"
              >
                <i class="bi bi-dash-lg"></i>
              </button>
            </div>
          </div>
          <div id="search-results-container" style="display: none"></div>
          <div id="map-placeholder"></div>
        </div>
      </div>

      <div class="bottom-panel">
        <div class="panel-handle"></div>
        <div class="panel-title">내 주변 약국</div>
        <button
          class="alt-search-btn btn btn-outline-primary"
          onclick="showAlternatives()"
          style="display: none"
        >
          대체약 검색
        </button>
        <div class="pharmacy-list">
          <!-- 약국 리스트를 동적으로 추가 -->
        </div>
      </div>
    </div>
    <!-- API 키 넣는 곳 -->
    <script
      type="text/javascript"
      src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ef69cf49abf5e7e492aed45e7a8e1021"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
      crossorigin="anonymous"
    ></script>
    <script>
      const contextPath = "${pageContext.request.contextPath}";
    </script>
    <script src="${pageContext.request.contextPath}/resources/dist/assets/js/customer.js"></script>
  </body>
</html>
