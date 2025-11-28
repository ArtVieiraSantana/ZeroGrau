const SESSION_KEY = 'userSession';

const StorageHelper = {
    setSession(user) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    },

    getSession() {
        const session = sessionStorage.getItem(SESSION_KEY);
        return session ? JSON.parse(session) : null;
    },

    isLoggedIn() {
        return !!this.getSession();
    },
    
    clearSession() {
        sessionStorage.removeItem(SESSION_KEY);
    }
};
