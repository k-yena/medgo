<%@ page pageEncoding="UTF-8"%>
<nav id="sidebar" class="active">
	<div class="sidebar-wrapper active">
		<div class="sidebar-header">
			<div class="d-flex justify-content-between">
				<div class="logo">
					<a href="/medgo/pharmacy/main"><img src="${pageContext.request.contextPath}/resources/dist/assets/images/logo/logo.png" alt="Logo" srcset="" /> <span id="logo-title">약찾GO</span> </a>
				</div>
				<div class="toggler">
					<a href="#" id="sidebar" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
				</div>
			</div>
		</div>
		<div class="sidebar-menu">
			<ul class="menu">
				<li class="sidebar-title">Menu</li>
				<div class="sidemenu-layout">
					<div>
						<li class="sidebar-item"><a href="/medgo/pharmacy/main" class="sidebar-link"> <i class="bi bi-grid-fill"></i> <span>메인화면</span>
						</a></li>

						<li class="sidebar-item has-sub"><a href="#" class="sidebar-link"> <i class="fas fa-boxes"></i> <span>재고관리</span>
						</a>
							<ul class="submenu">
								<li class="submenu-item"><a href="/medgo/pharmacy/stocks">재고현황</a></li>
								<li class="submenu-item"><a href="/medgo/pharmacy/stocks/history">입출고관리</a></li>
							</ul></li>

						<li class="sidebar-item has-sub"><a href="#" class="sidebar-link"> <i class="fas fa-pills"></i> <span>의약품 관리</span>
						</a>
							<ul class="submenu">
								<li class="submenu-item"><a href="/medgo/pharmacy/drugs/new">신규 약 등록</a></li>
								<li class="submenu-item"><a href="/medgo/pharmacy/drugs/delete">기존 약 삭제</a></li>
							</ul></li>
						<li class="sidebar-item"><a href="/medgo/pharmacy/notice" class="sidebar-link"> <i class="fa-solid fa-bullhorn"></i> <span>공지사항</span>
						</a></li>
						<li class="sidebar-item"><a href="/medgo/pharmacy/mypage" class="sidebar-link"> <i class="fas fa-user"></i> <span>회원정보</span>
						</a></li>
					</div>
					<li class="sidebar-item" id="logout-button"><a href="/medgo/auth/login" class="sidebar-link"> <i class="fas fa-sign-out-alt"></i> <span>로그아웃</span>
					</a></li> 
				</div>
			</ul>
		</div>
		<button class="sidebar-toggler btn x">
			<i data-feather="x"></i>
		</button>
	</div>
</nav>
