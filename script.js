const products = [
    { id: 1, name: 'Jaqueta Gelada', description: 'Jaqueta streetwear com design minimalista', price: 199.90, image: 'images/Gemini_Generated_Image_ntcvsnntcvsnntcv.png' },
    { id: 2, name: 'Calça Frost', description: 'Calça com acabamento premium', price: 149.90, image: 'images/Gemini_Generated_Image_43m23s43m23s43m2.png' },
    { id: 3, name: 'Moletom Ártico', description: 'Moletom confortável e estiloso', price: 129.90, image: 'images/Gemini_Generated_Image_pf4tv0pf4tv0pf4t.png' },
    { id: 4, name: 'Camiseta Gelo', description: 'Camiseta de algodão 100%', price: 79.90, image: 'images/Gemini_Generated_Image_qimngoqimngoqimn.png' },
    { id: 5, name: 'Boné Congelado', description: 'Boné com logo bordado', price: 59.90, image: 'images/Gemini_Generated_Image_ljdzt3ljdzt3ljdz.png' },
    { id: 6, name: 'Meia Inverno', description: 'Meia térmica de qualidade', price: 39.90, image: 'images/Gemini_Generated_Image_lh6rq3lh6rq3lh6r.png' },
    { id: 7, name: 'Luva Polar', description: 'Luva impermeável e aquecida', price: 89.90, image: 'images/Gemini_Generated_Image_jmac9yjmac9yjmac.png' },
    { id: 8, name: 'Cachecol Branco', description: 'Cachecol de lã pura', price: 99.90, image: 'images/Gemini_Generated_Image_is5u78is5u78is5u.png' },
];
 
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += parseInt(quantity);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: parseInt(quantity)
        });
    }
    
    saveCart();
    updateCart();
    showNotification('Produto adicionado ao carrinho!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCart();
}

function updateCartItemQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, parseInt(newQuantity));
        saveCart();
        updateCart();
    }
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartCountSpan = document.getElementById('cartCount');
    
    cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
    } else {
        cartItemsDiv.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-controls">
                    <input type="number" min="1" value="${item.quantity}" onchange="updateCartItemQuantity(${item.id}, this.value)">
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remover</button>
                </div>
            </div>
        `).join('');
    }

    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 15.00 : 0;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `R$ ${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
}

// ==================== RENDERIZAR PRODUTOS ==================== 
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <input type="number" min="1" value="1" id="qty-${product.id}">
                    <button onclick="addToCart(${product.id}, document.getElementById('qty-${product.id}').value)">Adicionar</button>
                </div>
            </div>
        </div>
    `).join('');
}
 
function openLogin(e) {
    e.preventDefault();
    document.getElementById('loginModal').classList.remove('hidden');
    closeSignupModal();
}

function closeModal() {
    document.getElementById('loginModal').classList.add('hidden');
}

function closeSignupModal() {
    document.getElementById('signupModal').classList.add('hidden');
}

function openSignup(e) {
    e.preventDefault();
    document.getElementById('signupModal').classList.remove('hidden');
    closeModal();
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Senha deve ter no mínimo 6 caracteres', 'error');
        return;
    }

    localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
    showNotification('Login realizado com sucesso!');
    closeModal();
    updateLoginButton();
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const cpf = document.getElementById('signupCPF').value;
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

    if (!name || !email || !cpf || !password || !passwordConfirm) {
        showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showNotification('Email inválido', 'error');
        return;
    }

    if (!validateCPF(cpf)) {
        showNotification('CPF inválido', 'error');
        return;
    }

    if (password !== passwordConfirm) {
        showNotification('As senhas não correspondem', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Senha deve ter no mínimo 6 caracteres', 'error');
        return;
    }

    localStorage.setItem('user', JSON.stringify({ name, email, cpf }));
    showNotification('Cadastro realizado com sucesso!');
    closeSignupModal();
    updateLoginButton();
}

function forgotPassword(e) {
    e.preventDefault();
    const email = prompt('Digite seu email:');
    if (email) {
        showNotification(`Link de recuperação enviado para ${email}`);
    }
}

function updateLoginButton() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginBtn = document.querySelector('.btn-login');
    
    if (user) {
        loginBtn.textContent = `Olá, ${user.name}`;
        loginBtn.onclick = logout;
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.onclick = (e) => { e.preventDefault(); openLogin(e); };
    }
}

function logout() {
    localStorage.removeItem('user');
    showNotification('Logout realizado com sucesso!');
    updateLoginButton();
}
 
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}
 
function formatCEP(cep) {
    cep = cep.replace(/\D/g, '');
    if (cep.length > 5) {
        return cep.slice(0, 5) + '-' + cep.slice(5, 8);
    }
    return cep;
}

async function fetchCEP() {
    const cepInput = document.getElementById('cepInput').value;
    const cepResult = document.getElementById('cepResult');
    
    if (!cepInput) {
        cepResult.textContent = 'Por favor, digite um CEP';
        cepResult.className = 'cep-result error';
        return;
    }

    const cep = cepInput.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        cepResult.textContent = 'CEP deve conter 8 dígitos';
        cepResult.className = 'cep-result error';
        return;
    }

    try {
        cepResult.textContent = 'Buscando...';
        cepResult.className = 'cep-result';
        
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            cepResult.textContent = 'CEP não encontrado';
            cepResult.className = 'cep-result error';
            document.getElementById('address').value = '';
            document.getElementById('city').value = '';
            document.getElementById('state').value = '';
        } else {
            cepResult.textContent = '✓ CEP encontrado com sucesso!';
            cepResult.className = 'cep-result success';
            
            document.getElementById('address').value = data.logradouro || '';
            document.getElementById('city').value = data.localidade || '';
            document.getElementById('state').value = data.uf || '';
        }
    } catch (error) {
        cepResult.textContent = 'Erro ao buscar CEP. Tente novamente.';
        cepResult.className = 'cep-result error';
        console.error('Erro:', error);
    }
}
 
function goToPayment() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio', 'error');
        return;
    }

    document.getElementById('payment').classList.remove('hidden');
    document.getElementById('payment').scrollIntoView({ behavior: 'smooth' });
}

function backToCart() {
    document.getElementById('payment').classList.add('hidden');
    document.getElementById('cart-section').scrollIntoView({ behavior: 'smooth' });
}

function processPayment() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('paymentEmail').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (!fullName || !email || !address || !city || !state || !paymentMethod) {
        showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showNotification('Email inválido', 'error');
        return;
    }

    if (paymentMethod === 'credit' || paymentMethod === 'debit') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCVV = document.getElementById('cardCVV').value;

        if (!cardNumber || !cardExpiry || !cardCVV) {
            showNotification('Por favor, preencha os dados do cartão', 'error');
            return;
        }

        if (cardNumber.replace(/\D/g, '').length !== 16) {
            showNotification('Número do cartão inválido', 'error');
            return;
        }

        if (cardCVV.length !== 3) {
            showNotification('CVV inválido', 'error');
            return;
        }
    }

    simulatePayment(fullName, email);
}

function simulatePayment(fullName, email) {
    const success = Math.random() > 0.1; // 90% de chance de sucesso

    if (success) {
        const orderNumber = 'ORD-' + Date.now();
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 15;

        const order = {
            orderNumber,
            customer: fullName,
            email,
            items: cart,
            total,
            date: new Date().toLocaleString('pt-BR'),
            status: 'Aprovado'
        };

        localStorage.setItem('lastOrder', JSON.stringify(order));

        showNotification(`✓ Pagamento aprovado! Número do pedido: ${orderNumber}`);
        
        console.log(`Email de confirmação enviado para: ${email}`);
        
        cart = [];
        saveCart();
        updateCart();

        document.getElementById('fullName').value = '';
        document.getElementById('paymentEmail').value = '';
        document.getElementById('address').value = '';
        document.getElementById('city').value = '';
        document.getElementById('state').value = '';
        document.getElementById('paymentMethod').value = '';
        document.getElementById('cardNumber').value = '';
        document.getElementById('cardExpiry').value = '';
        document.getElementById('cardCVV').value = '';
        document.getElementById('cepInput').value = '';

        document.getElementById('payment').classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        showNotification('✗ Erro no pagamento. Tente novamente.', 'error');
    }
}
 
function sendContact(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    const feedback = document.getElementById('contactFeedback');

    if (!name || !email || !message) {
        feedback.textContent = 'Por favor, preencha todos os campos';
        feedback.className = 'feedback error';
        return;
    }

    if (!validateEmail(email)) {
        feedback.textContent = 'Email inválido';
        feedback.className = 'feedback error';
        return;
    }

    console.log('Mensagem enviada:', { name, email, message });
    
    feedback.textContent = '✓ Mensagem enviada com sucesso! Entraremos em contato em breve.';
    feedback.className = 'feedback success';

    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactMessage').value = '';

    setTimeout(() => {
        feedback.className = 'feedback hidden';
    }, 5000);
}
 
function showNotification(message, type = 'success') {

    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'error' ? '#ff4444' : '#4CAF50'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
 
document.getElementById('menuToggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('mobileMenu').classList.remove('active');
    });
});
 
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
 
document.getElementById('paymentMethod').addEventListener('change', function() {
    const cardFields = document.getElementById('cardFields');
    if (this.value === 'credit' || this.value === 'debit') {
        cardFields.classList.remove('hidden');
    } else {
        cardFields.classList.add('hidden');
    }
});
 
document.getElementById('cardNumber').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    this.value = formatted;
});

document.getElementById('cardExpiry').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    this.value = value;
});

document.getElementById('cepInput').addEventListener('input', function() {
    this.value = formatCEP(this.value);
});

const signupCPFElement = document.getElementById('signupCPF');
if (signupCPFElement) {
    signupCPFElement.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 3) {
            value = value.slice(0, 3) + '.' + value.slice(3);
        }
        if (value.length > 7) {
            value = value.slice(0, 7) + '.' + value.slice(7);
        }
        if (value.length > 11) {
            value = value.slice(0, 11) + '-' + value.slice(11, 13);
        }
        this.value = value;
    });
}
 
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCart();
    updateLoginButton();

    window.addEventListener('click', function(event) {
        const loginModal = document.getElementById('loginModal');
        const signupModal = document.getElementById('signupModal');
        
        if (event.target === loginModal) {
            closeModal();
        }
        if (event.target === signupModal) {
            closeSignupModal();
        }
    });

    const loginBtn = document.querySelector('.btn-login');
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            openLogin(e);
        }
    });
});

