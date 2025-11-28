function updateAuthButton() {
const loginBtn = document.querySelector('.btn-login');
if (!loginBtn) return;
if (StorageHelper.isLoggedIn()) {
const user = StorageHelper.getSession();
loginBtn.textContent = `Olá, ${user.nome}`;
loginBtn.href = '#';
loginBtn.addEventListener('click', (e) => {
e.preventDefault();
showUserMenu();
});
} else {
loginBtn.textContent = 'Login';
loginBtn.href = 'login.html';
}
}
function showUserMenu() {
const existingMenu = document.querySelector('.user-dropdown-menu');
if (existingMenu) {
existingMenu.remove();
return;
}
const user = StorageHelper.getSession();
const loginBtn = document.querySelector('.btn-login');
const menu = document.createElement('div');
menu.className = 'user-dropdown-menu';
menu.innerHTML = `
<div class="user-menu-header">
<strong>${user.nome}</strong>
<small>${user.email}</small>
</div>
<div class="user-menu-divider"></div>
<button onclick="handleLogout()" class="user-menu-item">
Sair da conta
</button>
`;
const style = document.createElement('style');
style.textContent = `
.user-dropdown-menu {
position: absolute;
top: 100%;
right: 0;
margin-top: 10px;
background: white;
border-radius: 8px;
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
padding: 10px;
min-width: 220px;
z-index: 1000;
animation: fadeInDown 0.3s ease;
}
@keyframes fadeInDown {
from {
opacity: 0;
transform: translateY(-10px);
}
to {
opacity: 1;
transform: translateY(0);
}
}
.user-menu-header {
padding: 10px;
display: flex;
flex-direction: column;
}
.user-menu-header strong {
color: #011098;
margin-bottom: 4px;
}
.user-menu-header small {
color: #666;
font-size: 12px;
}
.user-menu-divider {
height: 1px;
background: #e0e6ed;
margin: 8px 0;
}
.user-menu-item {
width: 100%;
padding: 10px;
border: none;
background: transparent;
color: #ff4444;
text-align: left;
cursor: pointer;
border-radius: 4px;
font-weight: 500;
transition: background 0.2s;
}
.user-menu-item:hover {
background: #f8d7da;
}
`;
if (!document.querySelector('style[data-user-menu]')) {
style.setAttribute('data-user-menu', 'true');
document.head.appendChild(style);
}
const btnRect = loginBtn.getBoundingClientRect();
menu.style.position = 'fixed';
menu.style.top = btnRect.bottom + 'px';
menu.style.right = (window.innerWidth - btnRect.right) + 'px';
document.body.appendChild(menu);
setTimeout(() => {
document.addEventListener('click', function closeMenu(e) {
if (!menu.contains(e.target) && e.target !== loginBtn) {
menu.remove();
document.removeEventListener('click', closeMenu);
}
});
}, 100);
}
function handleLogout() {
if (confirm('Deseja realmente sair da sua conta?')) {
StorageHelper.clearSession();
showNotification('Logout realizado com sucesso!');
updateAuthButton();
const menu = document.querySelector('.user-dropdown-menu');
if (menu) menu.remove();
}
}
function redirectToLogin() {
window.location.href = 'login.html';
}
function redirectToSignup() {
window.location.href = 'cadastro.html';
}
document.addEventListener('DOMContentLoaded', function() {
updateAuthButton();
const loginBtn = document.querySelector('.btn-login');
if (loginBtn && !StorageHelper.isLoggedIn()) {
loginBtn.addEventListener('click', (e) => {
e.preventDefault();
window.location.href = 'login.html';
});
}
const oldLoginModal = document.getElementById('loginModal');
const oldSignupModal = document.getElementById('signupModal');
if (oldLoginModal) {
oldLoginModal.style.display = 'none';
}
if (oldSignupModal) {
oldSignupModal.style.display = 'none';
}
document.querySelectorAll('a[href="#login"]').forEach(link => {
link.href = 'login.html';
});
console.log('[AUTH] Sistema de autenticação integrado');
});
const originalGoToPayment = window.goToPayment;
window.goToPayment = function() {
if (!StorageHelper.isLoggedIn()) {
showNotification('Você precisa estar logado para finalizar a compra', 'error');
setTimeout(() => {
window.location.href = 'login.html';
}, 1500);
return;
}
if (originalGoToPayment) {
originalGoToPayment();
}
};
window.addEventListener('load', function() {
if (StorageHelper.isLoggedIn()) {
const user = StorageHelper.getSession();
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('paymentEmail');
if (fullNameInput && !fullNameInput.value) {
fullNameInput.value = user.nome;
}
if (emailInput && !emailInput.value) {
emailInput.value = user.email;
}
}
});
console.log('[AUTH INTEGRATION] Módulo de integração carregado');
