document.addEventListener('DOMContentLoaded', () => {
    const pinCodeDisplay = document.getElementById('pin-code');
    const pinPadButtons = document.querySelectorAll('.pin-pad button');
    const adminButton = document.getElementById('admin-button');
    const adminLoginModal = document.getElementById('admin-login-modal');
    const adminLoginForm = document.getElementById('admin-login-form');
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
        isPinVisible = true;
        pinCodeDisplay.textContent = pinCode;
    });

    toggleVisibilityButton.addEventListener('mouseup', () => {
        isPinVisible = false;
        pinCodeDisplay.textContent = '*'.repeat(pinCode.length);
    });

    adminButton.addEventListener('click', () => {
        adminLoginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';  // Предотвращение прокрутки
    });

    adminLoginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const login = document.getElementById('admin-login').value;
        if (login === 'ASLAN' || login === '') {  // Возможность пустого имени
            adminLoginModal.style.display = 'none';
            document.body.style.overflow = 'auto';  // Разрешение прокрутки
            pinCode = '';
            pinCodeDisplay.textContent = '';
            isAdminLogin = true;
        } else {
            alert('Неверное имя администратора');
        }
    });

    window.onclick = function(event) {
        if (event.target === adminLoginModal) {
            adminLoginModal.style.display = 'none';
            document.body.style.overflow = 'auto';  // Разрешение прокрутки
        }
    }
});
