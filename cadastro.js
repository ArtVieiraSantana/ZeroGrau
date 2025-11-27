==================== CADASTRO.JS ====================
// Lógica da página de cadastro
// ========== ELEMENTOS DO DOM ==========
const cadastroForm = document.getElementById('cadastroForm');
const nomeInput = document.getElementById('nome');
const emailCadastroInput = document.getElementById('emailCadastro');
const cpfInput = document.getElementById('cpf');
const passwordCadastroInput = document.getElementById('passwordCadastro');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');
const messageDiv = document.getElementById('message');
// ========== VERIFICAÇÕES INICIAIS ==========
window.addEventListener('DOMContentLoaded', () => {
// Verificar se já está logado
if (StorageHelper.isLoggedIn()) {
const user = StorageHelper.getSession();
showMessage(`Você já está logado como ${user.nome}! Redirecionando...`, 'success');
setTimeout(() => {
window.location.href = 'index.html';
}, 1500);
}
});
// ========== FUNÇÃO DE MENSAGEM ==========
function showMessage(text, type = 'error') {
messageDiv.textContent = text;
messageDiv.className = `message ${type}`;
messageDiv.style.display = 'block';
// Auto-ocultar após 5 segundos
setTimeout(() => {
messageDiv.style.display = 'none';
}, 5000);
}
// ========== FORMATAÇÃO AUTOMÁTICA DO CPF ==========
cpfInput.addEventListener('input', (e) => {
e.target.value = Validator.formatCPF(e.target.value);
});
// ========== VALIDAÇÃO EM TEMPO REAL ==========
// Validar confirmação de senha enquanto digita
confirmPasswordInput.addEventListener('input', () => {
const password = passwordCadastroInput.value;
const confirmPassword = confirmPasswordInput.value;
if (confirmPassword && password !== confirmPassword) {
confirmPasswordInput.setCustomValidity('As senhas não coincidem');
} else {
confirmPasswordInput.setCustomValidity('');
}
});
// Validar email ao sair do campo
emailCadastroInput.addEventListener('blur', () => {
const email = emailCadastroInput.value.trim();
if (email && !Validator.validateEmail(email)) {
emailCadastroInput.setCustomValidity('E-mail inválido');
showMessage('E-mail inválido', 'error');
} else {
emailCadastroInput.setCustomValidity('');
}
});
// Validar CPF ao sair do campo
cpfInput.addEventListener('blur', () => {
const cpf = cpfInput.value.trim();
if (cpf && !Validator.validateCPF(cpf)) {
cpfInput.setCustomValidity('CPF inválido');
showMessage('CPF inválido', 'error');
} else {
cpfInput.setCustomValidity('');
}
});
// ========== SUBMIT DO FORMULÁRIO DE CADASTRO ==========
cadastroForm.addEventListener('submit', async (e) => {
e.preventDefault();
const nome = nomeInput.value.trim();
const email = emailCadastroInput.value.trim();
const cpf = cpfInput.value.trim();
const password = passwordCadastroInput.value;
const confirmPassword = confirmPasswordInput.value;
const termsAccepted = termsCheckbox.checked;
// ===== VALIDAÇÕES =====
if (!nome || !email || !cpf || !password || !confirmPassword) {
showMessage('Por favor, preencha todos os campos', 'error');
return;
}
if (nome.length < 3) {
showMessage('Nome deve ter no mínimo 3 caracteres', 'error');
return;
}
if (!Validator.validateEmail(email)) {
showMessage('E-mail inválido', 'error');
return;
}
if (!Validator.validateCPF(cpf)) {
showMessage('CPF inválido', 'error');
return;
}
if (password.length < 6) {
showMessage('A senha deve ter no mínimo 6 caracteres', 'error');
return;
}
if (password !== confirmPassword) {
showMessage('As senhas não coincidem', 'error');
return;
}
if (!termsAccepted) {
showMessage('Você deve aceitar os termos de uso', 'error');
return;
}
// Desabilitar botão durante o processo
const submitBtn = cadastroForm.querySelector('button[type="submit"]');
const originalText = submitBtn.textContent;
submitBtn.disabled = true;
submitBtn.textContent = 'Criando conta...';
try {
// Chamada à API Mock
const response = await API_MOCK.cadastrar(nome, email, password, cpf);
if (response.success) {
showMessage(response.message + ' Redirecionando para login...', 'success');
// Limpar formulário
cadastroForm.reset();
// Redirecionar para login após 2 segundos
setTimeout(() => {
window.location.href = 'login.html';
}, 2000);
} else {
showMessage(response.message, 'error');
submitBtn.disabled = false;
submitBtn.textContent = originalText;
}
} catch (error) {
console.error('Erro no cadastro:', error);
showMessage('Erro ao realizar cadastro. Tente novamente.', 'error');
submitBtn.disabled = false;
submitBtn.textContent = originalText;
}
});
console.log('[CADASTRO] Página de cadastro carregada');
