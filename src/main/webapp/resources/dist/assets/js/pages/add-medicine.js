document.addEventListener('DOMContentLoaded', function () {
  console.log('[add] loaded');

  // ---- 유틸 ----
  function byId(id) { return document.getElementById(id); }
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return (s == null ? '' : String(s))
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  // toast
  var params = new URLSearchParams(location.search);
  var t = params.get('toast');
  if (t) {
    Toastify({
      text: t, duration: 3000, close: true, gravity: "bottom", position: "right",
      backgroundColor: "rgba(196, 39, 39, 0.794)", style: { zIndex: 99999, overflow: "hidden" }
    }).showToast();
  }

  // ---- 폼/상태 ----
  var form = byId('searchForm');
  if (!form) return;

  var action = form.getAttribute('action') || location.pathname;
  var pageI  = qs('input[name="page"]', form);
  var sizeS  = qs('select[name="size"]', form);
  var kwI    = qs('input[name="keyword"]', form);
  var sortI  = qs('input[name="sort"]', form);
  var orderI = qs('input[name="order"]', form);

  var curPage = parseInt((pageI && pageI.value) || '1', 10) || 1;
  var size    = (sizeS && sizeS.value) || '10';
  var kw      = (kwI && kwI.value) || '';
  var sort    = (sortI && sortI.value) || 'productName';
  var order   = (orderI && orderI.value) || 'asc';

  if (sizeS) sizeS.addEventListener('change', function () { if (pageI) pageI.value = 1; form.submit(); });
  if (kwI) kwI.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); if (pageI) pageI.value = 1; form.submit(); }});

  qsa('th.sortable').forEach(function (th) {
    var col = th.getAttribute('data-sort'); if (!col) return;
    var newOrder = (sort === col && order === 'asc') ? 'desc' : 'asc';
    var href = action + '?page=1'
      + '&size='    + encodeURIComponent(size)
      + '&keyword=' + encodeURIComponent(kw || '')
      + '&sort='    + encodeURIComponent(col)
      + '&order='   + encodeURIComponent(newOrder);
    var label = th.textContent.trim();
    var iconSpanHtml = '<span class="sort-icon"></span>';
    var anchorClass = 'text-decoration-none text-body d-inline-flex align-items-center';
    if (th.classList.contains('text-end')) anchorClass += ' w-100 justify-content-end';
    th.innerHTML = '<a class="'+anchorClass+'" href="'+href+'">'+esc(label)+'</a>'+iconSpanHtml;
    if (sort === col) {
      var icon = (order === 'asc') ? '<i class="bi bi-caret-up-fill ms-1"></i>' : '<i class="bi bi-caret-down-fill ms-1"></i>';
      var iconSpan = qs('.sort-icon', th);
      if (iconSpan) iconSpan.innerHTML = icon;
    }
  });

  // 페이지네이션
  var pagerWrap = byId('pagerWrap');
  var pagerUl   = byId('pager');
  if (pagerWrap && pagerUl) {
    var totalPages = parseInt(pagerWrap.getAttribute('data-total-pages') || '1', 10) || 1;

    function hrefFor(p) {
      return action + '?page=' + encodeURIComponent(p)
        + '&size=' + encodeURIComponent(size)
        + '&keyword=' + encodeURIComponent(kw || '')
        + '&sort=' + encodeURIComponent(sort)
        + '&order=' + encodeURIComponent(order);
    }
    function li(label, href, active, disabled) {
      if (disabled) return '<li class="page-item disabled"><span class="page-link border-0 px-3">'+label+'</span></li>';
      return '<li class="page-item'+(active?' active':'')+'">'
        + '<a class="page-link border-0 px-2" '+(active?'aria-current="page"':'')+' href="'+href+'">'+label+'</a></li>';
    }

    var html = '';
    if (totalPages <= 9) {
      html += li('‹', hrefFor(Math.max(1, curPage - 1)), false, curPage <= 1);
      for (var p = 1; p <= totalPages; p++) html += li(String(p), hrefFor(p), p === curPage, false);
      html += li('›', hrefFor(Math.min(totalPages, curPage + 1)), false, curPage >= totalPages);
      pagerUl.innerHTML = html;
    } else {
      var startPage, endPage;
      if (curPage <= 4) { startPage = 1; endPage = 7; }
      else if (curPage >= totalPages - 3) { startPage = totalPages - 6; endPage = totalPages; }
      else { startPage = curPage - 2; endPage = curPage + 2; }

      html += li('‹', hrefFor(Math.max(1, curPage - 1)), false, curPage <= 1);
      if (curPage <= 4) {
        for (var p1 = startPage; p1 <= endPage; p1++) html += li(String(p1), hrefFor(p1), p1 === curPage, false);
        html += li('…', '#', false, true);
        html += li(String(totalPages), hrefFor(totalPages), false, false);
      } else if (curPage >= totalPages - 3) {
        html += li('1', hrefFor(1), false, false);
        html += li('…', '#', false, true);
        for (var p2 = startPage; p2 <= endPage; p2++) html += li(String(p2), hrefFor(p2), p2 === curPage, false);
      } else {
        html += li('1', hrefFor(1), false, false);
        html += li('…', '#', false, true);
        for (var p3 = startPage; p3 <= endPage; p3++) html += li(String(p3), hrefFor(p3), p3 === curPage, false);
        html += li('…', '#', false, true);
        html += li(String(totalPages), hrefFor(totalPages), false, false);
      }
      html += li('›', hrefFor(Math.min(totalPages, curPage + 1)), false, curPage >= totalPages);
      pagerUl.innerHTML = html;
    }
  }

  // ---- 모달 & 등록 ----
  var table   = byId('table1');
  var modalEl = byId('drugInfoModal');
  if (!table || !modalEl) { console.warn('[add] missing table/modal', !!table, !!modalEl); return; }

  // 부트스트랩 모달 인스턴스 (늦게 로드돼도 이벤트는 먼저 붙임)
  var modal = (window.bootstrap && bootstrap.Modal && bootstrap.Modal.getInstance)
    ? (bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl))
    : null;

  console.log('[add] elems(table/modal):', !!table, !!modalEl, 'bootstrapModal:', !!modal);

  // 모달 표시용 엘리먼트
  var mId       = byId('modal-id');
  var mCode     = byId('modal-code');
  var mName     = byId('modal-name');
  var mManu     = byId('modal-manufacturer');
  var mDrugType = byId('modal-drugType');

  var current = null;

  function extractRowData(row) {
    return {
      row,
      id: row.getAttribute('data-id') || '',
      code: row.getAttribute('data-code') || (row.cells[0] && row.cells[0].textContent.trim()) || '',
      name: row.getAttribute('data-name') || (row.cells[1] && row.cells[1].textContent.trim()) || '',
      manufacturer: row.getAttribute('data-manu') || (row.cells[2] && row.cells[2].textContent.trim()) || '',
      drugType: row.getAttribute('data-drugType') || (row.cells[3] && row.cells[3].textContent.trim()) || ''
    };
  }

  // 행 클릭 → 모달 채우고 열기
  table.addEventListener('click', function (e) {
    console.log('[add] row clicked');
    var row = e.target.closest && e.target.closest('tbody tr');
    if (!row) return;

    current = extractRowData(row);

    if (mId)       mId.textContent       = current.id;
    if (mCode)     mCode.textContent     = current.code;
    if (mName)     mName.textContent     = current.name;
    if (mManu)     mManu.textContent     = current.manufacturer;
    if (mDrugType) mDrugType.textContent = current.drugType;

    if (modal && modal.show) modal.show();
  });

  // 수량 UI
  var qtyInput = byId('quantity-input');
  var minusBtn = byId('quantity-minus');
  var plusBtn  = byId('quantity-plus');

  if (minusBtn && qtyInput) {
    minusBtn.addEventListener('click', function () {
      var v = parseInt(qtyInput.value, 10); if (isNaN(v)) v = 1;
      qtyInput.value = Math.max(1, v - 1);
    });
  }
  if (plusBtn && qtyInput) {
    plusBtn.addEventListener('click', function () {
      var v = parseInt(qtyInput.value, 10); if (isNaN(v)) v = 0;
      qtyInput.value = v + 1;
    });
  }
  if (qtyInput) {
    qtyInput.addEventListener('change', function () {
      var v = parseInt(qtyInput.value, 10);
      if (isNaN(v) || v < 1) qtyInput.value = 1;
    });
    modalEl.addEventListener('shown.bs.modal', function () { qtyInput.value = '1'; });
  }

  // ★ 등록 클릭: 이벤트 위임(모달에 붙임) → 항상 동작
  modalEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.add-medicine-btn');
    if (!btn) return;

    console.log('[add] add clicked (delegated)');

    if (!current || !current.id) {
      console.warn('[add] no current row selected');
      alert('행을 먼저 선택하세요.');
      return;
    }

    var v = qtyInput ? parseInt(qtyInput.value, 10) : 1;
    var qty = (!isNaN(v) && v > 0) ? v : 1;

    if (!window.confirm('이 의약품을 등록하시겠습니까?')) return;

    var formEl = document.createElement('form');
    formEl.method = 'POST';
    formEl.action = '/medgo/pharmacy/drugs/new/' + encodeURIComponent(current.id);

    var h = document.createElement('input');
    h.type = 'hidden';
    h.name = 'medCount';  // @RequestParam("medCount")
    h.value = String(qty);
    formEl.appendChild(h);

    document.body.appendChild(formEl);
    if (modal && modal.hide) modal.hide();

    console.log('[add] POST =>', formEl.action, 'medCount=', h.value);
    formEl.submit();
  });

});