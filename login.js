const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageDiv = document.getElementById('message');

window.addEventListener('DOMContentLoaded', () => {
    if (StorageHelper.isLoggedIn()) {
        const user = StorageHelper.getSession();
        showMessage(`Você já está logado como ${user.nome}! Redirecionando...`, 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
});

function showMessage(text, type = 'error') {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        showMessage('Por favor, preencha todos os campos', 'error');
        return;
    }
    if (!Validator.validateEmail(email)) {
        showMessage('E-mail inválido', 'error');
        return;
    }

    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Entrando...';

    try {
        const response = await API_MOCK.login(email, password);

        if (response.success) {
            StorageHelper.setSession(response.user);
            showMessage(response.message + ' Redirecionando...', 'success');
            loginForm.reset();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showMessage(response.message, 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    } catch (error) {
        console.error('Erro no login:', error);
        showMessage('Erro ao realizar login. Tente novamente.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

const forgotPasswordLink = document.getElementById('forgotPassword');
const modalForgotPassword = document.getElementById('modalForgotPassword');
const closeModalBtn = modalForgotPassword.querySelector('.close');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const modalMessageDiv = document.getElementById('modalMessage');

forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    modalForgotPassword.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    modalForgotPassword.style.display = 'none';
    modalMessageDiv.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modalForgotPassword) {
        modalForgotPassword.style.display = 'none';
        modalMessageDiv.style.display = 'none';
    }
});

forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const recoveryEmail = document.getElementById('recoveryEmail').value.trim();
    modalMessageDiv.textContent = `Instruções de recuperação enviadas para ${recoveryEmail}. (Simulação)`;
    modalMessageDiv.className = 'message success';
    modalMessageDiv.style.display = 'block';
    forgotPasswordForm.reset();
});

console.log('[LOGIN] Página de login carregada');
