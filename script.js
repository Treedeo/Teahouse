document.addEventListener('DOMContentLoaded', () => {
    const pinCodeDisplay = document.getElementById('pin-code');
    const pinPadButtons = document.querySelectorAll('.pin-pad button');
    const adminButton = document.getElementById('admin-button');
    const adminLoginModal = document.getElementById('admin-login-modal');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminSubmitButton = adminLoginForm.querySelector('input[type="submit"]');
    const toggleVisibilityButton = document.getElementById('toggle-visibility');
    let pinCode = '';
    let isAdminLogin = false;
    let isPinVisible = false;

    pinPadButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === 'clear') {
                pinCode = '';
                pinCodeDisplay.classList.remove('error');
            } else if (button.id !== 'toggle-visibility') {
                pinCode += button.textContent;
            }
            pinCodeDisplay.textContent = isPinVisible ? pinCode : '*'.repeat(pinCode.length);
            if (isAdminLogin && pinCode.length === 6) {
                if (pinCode === '250883') {
                    window.location.href = 'admin.html'; // Переход на страницу администратора
                } else {
                    pinCodeDisplay.classList.add('error');
                }
            }
        });
    });

    toggleVisibilityButton.addEventListener('mousedown', () => {
        isPinVisible = !isPinVisible;
        pinCodeDisplay.textContent = isPinVisible ? pinCode : '*'.repeat(pinCode.length);
    });

    adminButton.addEventListener('click', () => {
        adminLoginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';  // Предотвращение прокрутки
    });

    adminLoginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const login = document.getElementById('admin-login').value;
        const password = document.getElementById('admin-password').value;
        if (login === 'ASLAN' && password === '250883') {
            adminLoginModal.style.display = 'none';
            document.body.style.overflow = 'auto';  // Разрешение прокрутки
            window.location.href = 'admin.html'; // Переход на страницу администратора
        } else {
            adminSubmitButton.style.backgroundColor = 'red';
            adminSubmitButton.style.color = 'white';
            setTimeout(() => {
                adminSubmitButton.style.backgroundColor = 'black';
                adminSubmitButton.style.color = 'white';
                adminLoginForm.reset();
            }, 1500);
        }
    });

    adminLoginModal.addEventListener('click', (event) => {
        if (event.target === adminLoginModal) {
            adminLoginModal.style.display = 'none';
            document.body.style.overflow = 'auto';  // Разрешение прокрутки
        }
    });

    // Предотвращение закрытия окна при клике на его содержимое
    document.querySelector('.modal-content').addEventListener('click', (event) => {
        event.stopPropagation();
    });
});
