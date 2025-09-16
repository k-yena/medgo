document.addEventListener('DOMContentLoaded', function () {
    const showNoticeModalElement = document.getElementById('showNotice');
    const editTitleField = document.getElementById('notice-edit-title');
    const editContentField = document.getElementById('notice-edit-content');
    let currentNoticeId = null;

    // Modal is shown
    showNoticeModalElement.addEventListener('show.bs.modal', function (event) {
        // Element that triggered the modal
        const row = event.relatedTarget;

        // Extract info from data-* attributes
        currentNoticeId = row.getAttribute('data-id');
        const title = row.getAttribute('data-title');
        const content = row.getAttribute('data-content');

        // Update the modal's content.
        editTitleField.value = title;
        editContentField.value = content;
    });

    // 수정 버튼 이벤트 리스너
    document.querySelector('.edit-btn').addEventListener('click', function (e) {
        e.preventDefault();
        const formElement = e.target.closest('form');
        if (currentNoticeId && formElement) {
            formElement.action = `/medgo/pharmacy/notice/${currentNoticeId}`;
            formElement.submit();
        }
    });

    // 삭제 버튼 이벤트 리스너
    document.querySelector('.delete-btn').addEventListener('click', function (e) {
        e.preventDefault();
        const formElement = e.target.closest('form');
        if (currentNoticeId && formElement) {
            if (confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
                formElement.action = `/medgo/pharmacy/notice/delete/${currentNoticeId}`;
                formElement.method = 'POST'; // 삭제는 POST 요청으로 처리
                formElement.submit();
            }
        }
    });
});