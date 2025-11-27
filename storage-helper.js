// storage-helper.js
// Funções auxiliares para manipulação de LocalStorage/SessionStorage

const SESSION_KEY = 'userSession';

const StorageHelper = {
    // Salva os dados do usuário na sessão
    setSession(user) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    },

    // Obtém os dados do usuário da sessão
    getSession() {
        const session = sessionStorage.getItem(SESSION_KEY);
        return session ? JSON.parse(session) : null;
    },

    // Verifica se o usuário está logado
    isLoggedIn() {
        return !!this.getSession();
    },

    // Limpa os dados da sessão (logout)
    clearSession() {
        sessionStorage.removeItem(SESSION_KEY);
    }
};
