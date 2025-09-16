$(function() {
	//toast
	(function() {
		var params = new URLSearchParams(location.search);
		var t = (params.get('toast') || '')

		if (!t || t.trim().length === 0)
			return;

		var result = {
			'true' : '등록 성공',
			'false' : '등록 실패',
		};

		var text = result[t];
		var isSuccess = (t === 'true');
		var bg = isSuccess ? '#14b3ae' : 'rgba(196, 39, 39, 0.794)';

		if (typeof window.Toastify === 'function') {
			Toastify({
				text : text,
				duration : 3000,
				close : true,
				gravity : "bottom",
				position : "right",
				backgroundColor : bg,
				style : {
					zIndex : 99999,
					overflow : "hidden"
				}
			}).showToast();
		}
	})();

	// ---- 폼/상태 ----
	var form = $('#searchForm');
	if (!form.length)
		return;

	var action = form.attr('action') || location.pathname;
	var inputPage = form.find('input[name="page"]');
	var selectSize = form.find('select[name="size"]');
	var inputKeyword = form.find('input[name="keyword"]');
	var inputSort = form.find('input[name="sort"]');
	var inputOrder = form.find('input[name="order"]');

	var curPage = parseInt((inputPage.val() || '1'), 10) || 1;
	var size = (selectSize.val() || '10');
	var kw = (inputKeyword.val() || '');
	var sort = (inputSort.val() || 'productName');
	var order = (inputOrder.val() || 'asc');

	// size 변경 → page=1
	if (selectSize.length) {
		selectSize.on('change', function() {
			if (inputPage.length) 
				inputPage.val(1);
			form.trigger('submit');
		});
	}

	// 검색 Enter → page=1
	if (inputKeyword.length) {
		inputKeyword.on('keydown', function(e) {
			if (e.key === 'Enter') {
				e.preventDefault();
				if (inputPage.length)
					inputPage.val(1);
				form.trigger('submit');
			}
		});
	}

	// ---- 정렬 헤더 ----
	$('th.sortable').each(function() {
		var th = $(this);
		var col = th.data('sort');
		if (!col)
			return;

		var newOrder = (sort === col && order === 'asc') ? 'desc' : 'asc';
		var href = action + '?page=1' + '&size='+ encodeURIComponent(size)
				+ '&keyword=' + encodeURIComponent(kw || '')
				+ '&sort=' + encodeURIComponent(col)
				+ '&order=' + encodeURIComponent(newOrder);

		var label = $.trim(th.text());
		var iconSpanHtml = '<span class="sort-icon"></span>';
		var anchorClass = 'text-decoration-none text-body d-inline-flex align-items-center';
		if (th.hasClass('text-end')) anchorClass += ' w-100 justify-content-end';
		th.html('<a class="' + anchorClass + '" href="' + href + '">' + label + '</a>' + iconSpanHtml);

		if (sort === col) {
			var icon = (order === 'asc') 
			? '<i class="bi bi-caret-up-fill ms-1"></i>'
			: '<i class="bi bi-caret-down-fill ms-1"></i>';
		th.find('.sort-icon').html(icon);
		}
	});

	// ---- 페이지네이션 ----
	var pagerWrap = $('#pagerWrap');
	var pager = $('#pager');
	if (pagerWrap.length && pager.length) {
		var totalPages = parseInt((pagerWrap.data('total-pages') || '1'), 10) || 1;

		function hrefFor(p) {
			return action + '?page=' + encodeURIComponent(p) + '&size='
					+ encodeURIComponent(size) + '&keyword='
					+ encodeURIComponent(kw || '') + '&sort='
					+ encodeURIComponent(sort) + '&order='
					+ encodeURIComponent(order);
		}
		function li(label, href, active, disabled) {
			if (disabled) {
				return '<li class="page-item disabled"><span class="page-link border-0 px-3">'
						+ label + '</span></li>';
			}
			return '<li class="page-item' + (active ? ' active' : '') + '">'
					+ '<a class="page-link border-0 px-2" '
					+ (active ? 'aria-current="page"' : '') + ' href="' + href
					+ '">' + label + '</a></li>';
		}

		var html = '';
		if (totalPages <= 9) {
			html += li('‹', hrefFor(Math.max(1, curPage - 1)), false,
					curPage <= 1);
			for (var p = 1; p <= totalPages; p++)
				html += li(String(p), hrefFor(p), p === curPage, false);
			html += li('›', hrefFor(Math.min(totalPages, curPage + 1)), false,
					curPage >= totalPages);
		} else {
			var startPage, endPage;
			if (curPage <= 4) {
				startPage = 1;
				endPage = 7;
			} else if (curPage >= totalPages - 3) {
				startPage = totalPages - 6;
				endPage = totalPages;
			} else {
				startPage = curPage - 2;
				endPage = curPage + 2;
			}

			html += li('‹', hrefFor(Math.max(1, curPage - 1)), false,
					curPage <= 1);
			if (curPage <= 4) {
				for (var p1 = startPage; p1 <= endPage; p1++)
					html += li(String(p1), hrefFor(p1), p1 === curPage, false);
				html += li('…', '#', false, true);
				html += li(String(totalPages), hrefFor(totalPages), false,
						false);
			} else if (curPage >= totalPages - 3) {
				html += li('1', hrefFor(1), false, false);
				html += li('…', '#', false, true);
				for (var p2 = startPage; p2 <= endPage; p2++)
					html += li(String(p2), hrefFor(p2), p2 === curPage, false);
			} else {
				html += li('1', hrefFor(1), false, false);
				html += li('…', '#', false, true);
				for (var p3 = startPage; p3 <= endPage; p3++)
					html += li(String(p3), hrefFor(p3), p3 === curPage, false);
				html += li('…', '#', false, true);
				html += li(String(totalPages), hrefFor(totalPages), false,
						false);
			}
			html += li('›', hrefFor(Math.min(totalPages, curPage + 1)), false,
					curPage >= totalPages);
		}
		pager.html(html);
	}

	// ---- 모달 & 등록 ----
	var table = $('#table1');
	var modalWrap = $('#drugInfoModal');
	if (!table.length || !modalWrap.length)
		return;

	var modalEl = modalWrap.get(0);
	var modal = (window.bootstrap && bootstrap.Modal && bootstrap.Modal.getInstance) ? (bootstrap.Modal
			.getInstance(modalEl) || new bootstrap.Modal(modalEl))
			: null;

	// 모달 표시용 엘리먼트
	var mId 		= $('#modal-id');
	var mCode 		= $('#modal-code');
	var mName 		= $('#modal-name');
	var mManu 		= $('#modal-manufacturer');
	var mDrugType 	= $('#modal-drugType');

	var current = null;

	function extractRowData(row) {
		return {
			row : row,
			id : 			row.attr('data-id') || '',
			code : 			row.attr('data-code') || $.trim(row.find('td').eq(0).text()) || '',
			name : 			row.attr('data-name') || $.trim(row.find('td').eq(1).text()) || '',
			manufacturer :  row.attr('data-manu') || $.trim(row.find('td').eq(2).text()) || '',
			drugType : 		row.attr('data-drugType') || $.trim(row.find('td').eq(3).text()) || ''
		};
	}

	// 행 클릭 → 모달 채우고 열기 (이벤트 위임)
	table.on('click', function(e) {
		var row = $(e.target).closest('tbody tr');
		if (!row.length) return;

		current = extractRowData(row);

		if (mId.length)   		 mId.text(current.id);
		if (mCode.length) 		 mCode.text(current.code);
		if (mName.length) 		 mName.text(current.name);
		if (mManu.length)		 mManu.text(current.manufacturer);
		if (mDrugType.length) 	 mDrugType.text(current.drugType);

		if (modal && modal.show)     modal.show();
	});

	// 수량 UI
	var qtyInput = $('#quantity-input');
	var minusBtn = $('#quantity-minus');
	var plusBtn = $('#quantity-plus');

	if (minusBtn.length && qtyInput.length) {
		minusBtn.on('click', function() {
			var v = parseInt(qtyInput.val(), 10);
			if (isNaN(v))
				v = 1;
			qtyInput.val(Math.max(1, v - 1));
		});
	}
	if (plusBtn.length && qtyInput.length) {
		plusBtn.on('click', function() {
			var v = parseInt(qtyInput.val(), 10);
			if (isNaN(v))
				v = 0;
			qtyInput.val(v + 1);
		});
	}
	if (qtyInput.length) {
		qtyInput.on('change', function() {
			var v = parseInt(qtyInput.val(), 10);
			if (isNaN(v) || v < 1)
				qtyInput.val(1);
		});
		modalWrap.on('shown.bs.modal', function() {
			qtyInput.val('1');
		});
	}

	// 등록 클릭
	modalWrap.on('click', '.add-medicine-btn', function() {
		if (!current || !current.id) {
			alert('행을 먼저 선택하세요.');
			return;
		}

		var v = qtyInput.length ? parseInt(qtyInput.val(), 10) : 1;
		var qty = (!isNaN(v) && v > 0) ? v : 1;

		if (!window.confirm('이 의약품을 등록하시겠습니까?'))
			return;

		var tmpForm = $('<form>', {
			method : 'POST',
			action : '/medgo/pharmacy/drugs/new/' + encodeURIComponent(current.id)
		});
		var hidden = $('<input>', {
			type : 'hidden',
			name : 'medCount',
			value : String(qty)
		});
		
		tmpForm.append(hidden).appendTo(document.body);

		if (modal && modal.hide)
			modal.hide();
		tmpForm.trigger('submit');
	}

	);
});