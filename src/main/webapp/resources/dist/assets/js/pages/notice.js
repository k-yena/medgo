document.addEventListener('DOMContentLoaded', function () {
    const showNoticeModalElement = document.getElementById('showNotice');
    const makeNoticeModalElement = document.getElementById('makeNotice');
    const showNoticeModal = new bootstrap.Modal(showNoticeModalElement);
    const makeNoticeModal = new bootstrap.Modal(makeNoticeModalElement);

    const editTitleField = document.getElementById('notice-edit-title');
    const editContentField = document.getElementById('notice-edit-content');

    let currentNoticeId = null;
    let currentRowElement = null;

    const showToast = (text, backgroundColor) => {
        Toastify({
            text: text,
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            backgroundColor: backgroundColor,
            style: {
                zIndex: 99999,
                overflow: "hidden",
            },
        }).showToast();
    };

    showNoticeModalElement.addEventListener('show.bs.modal', function (event) {
        const row = event.relatedTarget;
        currentRowElement = row; // Save the row element
        currentNoticeId = row.getAttribute('data-id');
        const title = row.getAttribute('data-title');
        const content = row.getAttribute('data-content');

        editTitleField.value = title;
        editContentField.value = content;
    });

    document.querySelector('.edit-btn').addEventListener('click', function (e) {
        e.preventDefault();
        const formElement = e.target.closest('form');
        const formData = new FormData(formElement);
        const title = formData.get('title').trim();
        const content = formData.get('content').trim();

        if (!title || !content) {
            showToast("제목과 내용을 모두 입력해주세요.", "#f3616d");
            return;
        }

        fetch(`/medgo/pharmacy/notice/update/${currentNoticeId}`, {
            method: 'POST',
            body: new URLSearchParams(formData)
        }).then(response => {
            if (response.ok) {
                showNoticeModal.hide();
                showToast("공지사항이 수정되었습니다.", "#14b3ae");
                if (currentRowElement) {
                    const newTitle = formData.get('title');
                    const newContent = formData.get('content');
                    currentRowElement.setAttribute('data-title', newTitle);
                    currentRowElement.setAttribute('data-content', newContent);
                    currentRowElement.querySelector('.font-bold').textContent = newTitle;
                    const contentCell = currentRowElement.querySelectorAll('td')[1].querySelector('p');
                    if (newContent.length > 30) {
                        contentCell.textContent = newContent.substring(0, 30) + '...';
                    } else {
                        contentCell.textContent = newContent;
                    }
                }
            } else {
                showToast("공지사항 수정에 실패했습니다.", "#f3616d");
            }
        }).catch(error => {
            console.error('Error:', error);
            showToast("오류가 발생했습니다.", "#f3616d");
        });
    });

    document.querySelector('.delete-btn').addEventListener('click', function (e) {
        e.preventDefault();
        Swal.fire({
            title: '정말로 삭제하시겠습니까?',
            text: "이 작업은 되돌릴 수 없습니다.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: '네, 삭제하겠습니다.',
            cancelButtonText: '취소',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/medgo/pharmacy/notice/delete/${currentNoticeId}`, {
                    method: 'POST',
                }).then(response => {
                    if (response.ok) {
                        showNoticeModal.hide();
                        showToast("공지사항이 삭제되었습니다.", "#14b3ae");
                        if (currentRowElement) {
                            currentRowElement.remove();
                        }
                    } else {
                        showToast("공지사항 삭제에 실패했습니다.", "#f3616d");
                    }
                }).catch(error => {
                    console.error('Error:', error);
                    showToast("오류가 발생했습니다.", "#f3616d");
                });
            }
        });
    });

    const createNoticeForm = document.getElementById('createNoticeForm');
    createNoticeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(createNoticeForm);
        const title = formData.get('title').trim();
        const content = formData.get('content').trim();

        if (!title || !content) {
            showToast("제목과 내용을 모두 입력해주세요.", "#f3616d");
            return;
        }

        fetch('/medgo/pharmacy/notice', {
            method: 'POST',
            body: new URLSearchParams(formData)
        }).then(response => {
            if (response.ok) {
                makeNoticeModal.hide();
                showToast("공지사항이 등록되었습니다.", "#14b3ae");
              setTimeout(() => window.location.reload(), 1000);
            } else {
                showToast("공지사항 등록에 실패했습니다.", "#f3616d");
            }
        }).catch(error => {
            console.error('Error:', error);
            showToast("오류가 발생했습니다.", "#f3616d");
        });
    });
});