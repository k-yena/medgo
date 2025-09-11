document.addEventListener('DOMContentLoaded',
				function() {
					// ---- 유틸 ----
					function byId(id) {
						return document.getElementById(id);
					}
					function qs(sel, root) {
						return (root || document).querySelector(sel);
					}
					function qsa(sel, root) {
						return Array.prototype.slice.call((root || document)
								.querySelectorAll(sel));
					}
					function esc(s) {
						return (s == null ? '' : String(s)).replace(/&/g,
								'&amp;').replace(/</g, '&lt;').replace(/>/g,
								'&gt;').replace(/"/g, '&quot;').replace(/'/g,
								'&#39;');
					}
					
					// toast
					  var params = new URLSearchParams(location.search);
					  var t = params.get('toast');
					  if (t) {
					    Toastify({
					      text: t,
					      duration: 3000,
					      close: true,
					      gravity: "bottom",
					      position: "right",
					      backgroundColor: "rgba(196, 39, 39, 0.794)",
					      style: { zIndex: 99999, overflow: "hidden" }
					    }).showToast();
					  }
					  

					// ---- 폼/상태 ----
					var form = byId('searchForm');
					if (!form)
						return;

					var action = form.getAttribute('action')
							|| location.pathname;
					var pageI = qs('input[name="page"]', form);
					var sizeS = qs('select[name="size"]', form);
					var kwI = qs('input[name="keyword"]', form);
					var sortI = qs('input[name="sort"]', form);
					var orderI = qs('input[name="order"]', form);

					var curPage = parseInt((pageI && pageI.value) || '1', 10) || 1;
					var size = (sizeS && sizeS.value) || '10';
					var kw = (kwI && kwI.value) || '';
					var sort = (sortI && sortI.value) || 'productName';
					var order = (orderI && orderI.value) || 'asc';

					// ---- size 변경: 즉시 적용 + page=1 ----
					if (sizeS) {
						sizeS.addEventListener('change', function() {
							if (pageI)
								pageI.value = 1;
							form.submit();
						});
					}

					// ---- 검색 Enter: page=1 후 제출 ----
					if (kwI) {
						kwI.addEventListener('keydown', function(e) {
							if (e.key === 'Enter') {
								e.preventDefault();
								if (pageI)
									pageI.value = 1;
								form.submit();
							}
						});
					}

					// ---- 정렬 헤더: 링크/아이콘 생성 (AJAX X) ----
					qsa('th.sortable')
							.forEach(
									function(th) {
										var col = th.getAttribute('data-sort');
										if (!col)
											return;

										var newOrder = (sort === col && order === 'asc') ? 'desc'
												: 'asc';
										var href = action + '?page=1'
												+ '&size='
												+ encodeURIComponent(size)
												+ '&keyword='
												+ encodeURIComponent(kw || '')
												+ '&sort='
												+ encodeURIComponent(col)
												+ '&order='
												+ encodeURIComponent(newOrder);

										var label = th.textContent.trim();
										var iconSpanHtml = '<span class="sort-icon"></span>';
										var anchorClass = 'text-decoration-none text-body d-inline-flex align-items-center';
										if (th.classList.contains('text-end')) {
											anchorClass += ' w-100 justify-content-end';
										}

										th.innerHTML = '<a class="'
												+ anchorClass + '" href="'
												+ href + '">' + esc(label)
												+ '</a>' + iconSpanHtml;

										if (sort === col) {
											var icon = (order === 'asc') ? '<i class="bi bi-caret-up-fill ms-1"></i>'
													: '<i class="bi bi-caret-down-fill ms-1"></i>';
											var iconSpan = qs('.sort-icon', th);
											if (iconSpan)
												iconSpan.innerHTML = icon;
										}
									});

					// ---- 페이지네이션 (논리적 … 표시) ----
					var pagerWrap = byId('pagerWrap');
					var pagerUl = byId('pager');
					if (pagerWrap && pagerUl) {
						var totalPages = parseInt(pagerWrap
								.getAttribute('data-total-pages')
								|| '1', 10) || 1;

						function hrefFor(p) {
							return action + '?page=' + encodeURIComponent(p)
									+ '&size=' + encodeURIComponent(size)
									+ '&keyword='
									+ encodeURIComponent(kw || '') + '&sort='
									+ encodeURIComponent(sort) + '&order='
									+ encodeURIComponent(order);
						}
						function li(label, href, active, disabled) {
							if (disabled) {
								return '<li class="page-item disabled"><span class="page-link border-0 px-3">'
										+ label + '</span></li>';
							}
							return '<li class="page-item'
									+ (active ? ' active' : '') + '">'
									+ '<a class="page-link border-0 px-2" '
									+ (active ? 'aria-current="page"' : '')
									+ ' href="' + href + '">' + label + '</a>'
									+ '</li>';
						}

						var html = '';

						// 총 페이지가 9 이하이면 모두 나열 (이 경우는 자연스러운 전체 표기 허용)
						if (totalPages <= 9) {
							html += li('‹', hrefFor(Math.max(1, curPage - 1)),
									false, curPage <= 1);
							for (var p = 1; p <= totalPages; p++) {
								html += li(String(p), hrefFor(p),
										p === curPage, false);
							}
							html += li('›', hrefFor(Math.min(totalPages,
									curPage + 1)), false, curPage >= totalPages);
							pagerUl.innerHTML = html;
						} else {
							// 고정형(11개) 렌더링
							var startPage, endPage;

							if (curPage <= 4) {
								// 앞쪽: 1~7
								startPage = 1;
								endPage = 7;
							} else if (curPage >= totalPages - 3) {
								// 끝쪽: last-6 ~ last
								startPage = totalPages - 6;
								endPage = totalPages;
							} else {
								// 중앙: 현재±2 (5개)
								startPage = curPage - 2;
								endPage = curPage + 2;
							}

							// 이전
							html += li('‹', hrefFor(Math.max(1, curPage - 1)),
									false, curPage <= 1);

							// 앞쪽 케이스
							if (curPage <= 4) {
								// 1~7 직접 출력
								for (var p1 = startPage; p1 <= endPage; p1++) {
									html += li(String(p1), hrefFor(p1),
											p1 === curPage, false);
								}
								// 오른쪽 … + last
								html += li('…', '#', false, true);
								html += li(String(totalPages),
										hrefFor(totalPages), false, false);
							}
							// 끝쪽 케이스
							else if (curPage >= totalPages - 3) {
								// 1 + 왼쪽 …
								html += li('1', hrefFor(1), false, false);
								html += li('…', '#', false, true);
								// last-6 ~ last 직접 출력
								for (var p2 = startPage; p2 <= endPage; p2++) {
									html += li(String(p2), hrefFor(p2),
											p2 === curPage, false);
								}
							}
							// 중앙 케이스
							else {
								// 1 + 왼쪽 …
								html += li('1', hrefFor(1), false, false);
								html += li('…', '#', false, true);
								// 현재±2 (5개)
								for (var p3 = startPage; p3 <= endPage; p3++) {
									html += li(String(p3), hrefFor(p3),
											p3 === curPage, false);
								}
								// 오른쪽 … + last
								html += li('…', '#', false, true);
								html += li(String(totalPages),
										hrefFor(totalPages), false, false);
							}

							// 다음
							html += li('›', hrefFor(Math.min(totalPages,
									curPage + 1)), false, curPage >= totalPages);

							pagerUl.innerHTML = html;
						}
					}
					

					// ---- 모달 & 삭제(폼 submit) ----
					var table   = byId('table1');
					  var modalEl = byId('drugInfoModal');
					  if (!table || !modalEl || typeof bootstrap === 'undefined' || !bootstrap.Modal) return;

					  var modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);

					  // 모달 표시용 엘리먼트
					  var mId   = byId('modal-id');
					  var mCode = byId('modal-code');
					  var mName = byId('modal-name');
					  var mManu = byId('modal-manufacturer');
					  var mStock= byId('modal-stock');

					  // 삭제 버튼 (클래스 명 정확히 확인)
					  var delBtn = qs('.delete-medicine-btn', modalEl);

					  var current = null;

					  function extractRowData(row){
					    return {
					      row,
					      id: row.getAttribute('data-id') || '',
					      code: row.getAttribute('data-code') || (row.cells[0] && row.cells[0].textContent.trim()) || '',
					      name: row.getAttribute('data-name') || (row.cells[1] && row.cells[1].textContent.trim()) || '',
					      manufacturer: row.getAttribute('data-manu') || (row.cells[2] && row.cells[2].textContent.trim()) || '',
					      stock: row.getAttribute('data-stock') || (row.cells[3] && row.cells[3].textContent.trim()) || ''
					    };
					  }

					  // 행 클릭 → 모달 채우고 열기
					  table.addEventListener('click', function (e) {
					    var row = e.target.closest && e.target.closest('tbody tr');
					    if (!row) return;

					    current = extractRowData(row);

					    if (mId)   mId.textContent   = current.id;
					    if (mCode) mCode.textContent = current.code;
					    if (mName) mName.textContent = current.name;
					    if (mManu) mManu.textContent = current.manufacturer;
					    if (mStock)mStock.textContent= current.stock;

					    modal.show();
					  });

					  // 삭제 버튼
					  if (delBtn) {
					    delBtn.addEventListener('click', function () {
					      if (!current || !current.id) return;
					      if (!window.confirm('정말 삭제하시겠습니까?')) return;
					   
					      var url = '/medgo/pharmacy/drugs/delete/' + encodeURIComponent(current.id);
					      window.location.assign(url);
					    });
					  }
					  });
				