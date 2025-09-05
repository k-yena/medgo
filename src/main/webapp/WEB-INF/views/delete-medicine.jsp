<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>약찾GO</title>

    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/resources/dist/assets/css/bootstrap.css" />

    <link
      rel="stylesheet"
      href="/resources/dist/assets/vendors/perfect-scrollbar/perfect-scrollbar.css"
    />
    <link
      rel="stylesheet"
      href="/resources/dist/assets/vendors/bootstrap-icons/bootstrap-icons.css"
    />
    <link rel="stylesheet" href="/resources/dist/assets/css/app.css" />
    <link
      rel="shortcut icon"
      href="/resources/dist/assets/images/favicon.svg"
      type="image/x-icon"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    />
    <!-- 여기까지 헤더 -->
    <link rel="stylesheet" href="/resources/dist/assets/vendors/toastify/toastify.css" />
  </head>
  <body>
    <div id="app">
      <aside class="sidebar-placeholder"></aside>
      <div id="main">
        <header class="mb-3">
          <a href="#" class="burger-btn d-block d-xl-none">
            <i class="bi bi-justify fs-3"></i>
          </a>
        </header>
        <div class="page-heading">
          <div class="page-title">
            <div class="row">
              <div class="col-12 col-md-6 order-md-1 order-last">
                <h3>기존 약 삭제</h3>
                <p class="text-subtitle text-muted">
                  등록된 약품 정보를 삭제합니다
                </p>
              </div>
              <div class="col-12 col-md-6 order-md-2 order-first">
                <nav
                  aria-label="breadcrumb"
                  class="breadcrumb-header float-start float-lg-end"
                >
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="main.html">메인화면</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      기존 약 삭제
                    </li>
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
                      <th>주성분</th>
                      <th>재고</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Data will be inserted here dynamically -->
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!--약 상세정보 모달-->
    <div
      class="modal fade"
      id="drugInfoModal"
      tabindex="-1"
      aria-labelledby="drugInfoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="drugInfoModalLabel">약품 상세 정보</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
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
                    <th scope="row">주성분</th>
                    <td id="modal-ingredient">주성분</td>
                  </tr>
                  <tr>
                    <th scope="row">재고</th>
                    <td id="modal-stock">0000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <div>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                닫기
              </button>
              <button type="button" class="btn btn-danger delete-medicine-btn">
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 여기부터 script.html -->
    <script src="/resources/dist/assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js"></script>
    <script src="/resources/dist/assets/js/bootstrap.bundle.min.js"></script>
    <script src="/resources/dist/assets/vendors/simple-datatables/simple-datatables.js"></script>
    <script src="/resources/dist/assets/js/main.js"></script>
    <!-- 여기까지 script.html -->
    <script src="/resources/dist/assets/vendors/toastify/toastify.js"></script>
    <script src="/resources/dist/assets/js/pages/delete-medicine.js"></script>
  </body>
</html>
