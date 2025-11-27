// validator.js
// Funções de validação e formatação

const Validator = {
    // Validação de E-mail (simples)
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    },

    // Validação de CPF (simples, apenas formato)
    validateCPF(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]/g, "");
        // Verifica se tem 11 dígitos
        if (cpf.length !== 11) return false;
        // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
        if (/^(\d)\1{10}$/.test(cpf)) return false;
        return true;
    },

    // Formatação de CPF (máscara)
    formatCPF(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]/g, "");
        // Aplica a máscara
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
};
