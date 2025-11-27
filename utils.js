// utils.js
// Funções utilitárias

// Simula a função showNotification, necessária em auth_autentication.js e cadastro.js
function showNotification(message, type = 'info') {
    console.log(`[Notificação - ${type.toUpperCase()}]: ${message}`);
    // Implementação básica para demonstração
    const notificationDiv = document.createElement('div');
    notificationDiv.textContent = message;
    notificationDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        border-radius: 5px;
        color: white;
        z-index: 9999;
        font-family: sans-serif;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        opacity: 0;
        transition: opacity 0.5s, transform 0.5s;
        transform: translateY(-20px);
    `;
    document.body.appendChild(notificationDiv);

    setTimeout(() => {
        notificationDiv.style.opacity = 1;
        notificationDiv.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        notificationDiv.style.opacity = 0;
        notificationDiv.style.transform = 'translateY(-20px)';
        setTimeout(() => notificationDiv.remove(), 500);
    }, 3000);
}
