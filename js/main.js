// ========================================
// Datos de productos de ejemplo
// ========================================

const productsData = [
    {
        id: 1,
        title: "Laptop Pro 15\"",
        category: "electronica",
        price: 5199900,
        oldPrice: 6399900,
        rating: 4.5,
        reviews: 128,
        badge: "sale",
        image: null
    },
    {
        id: 2,
        title: "Auriculares Bluetooth",
        category: "electronica",
        price: 359900,
        oldPrice: null,
        rating: 4.8,
        reviews: 256,
        badge: "new",
        image: null
    },
    {
        id: 3,
        title: "Camiseta Premium",
        category: "moda",
        price: 119900,
        oldPrice: 199900,
        rating: 4.3,
        reviews: 89,
        badge: "sale",
        image: null
    },
    {
        id: 4,
        title: "Zapatillas Running",
        category: "deportes",
        price: 479900,
        oldPrice: null,
        rating: 4.7,
        reviews: 167,
        badge: null,
        image: null
    },
    {
        id: 5,
        title: "Lámpara Moderna",
        category: "hogar",
        price: 239900,
        oldPrice: 319900,
        rating: 4.4,
        reviews: 45,
        badge: "sale",
        image: null
    },
    {
        id: 6,
        title: "Smartwatch Pro",
        category: "electronica",
        price: 999900,
        oldPrice: null,
        rating: 4.6,
        reviews: 312,
        badge: "new",
        image: null
    },
    {
        id: 7,
        title: "Perfume Elegante",
        category: "belleza",
        price: 319900,
        oldPrice: 399900,
        rating: 4.9,
        reviews: 421,
        badge: null,
        image: null
    },
    {
        id: 8,
        title: "Mochila Deportiva",
        category: "deportes",
        price: 199900,
        oldPrice: null,
        rating: 4.2,
        reviews: 78,
        badge: null,
        image: null
    },
    {
        id: 9,
        title: "Cafetera Automática",
        category: "hogar",
        price: 639900,
        oldPrice: 799900,
        rating: 4.7,
        reviews: 203,
        badge: "sale",
        image: null
    },
    {
        id: 10,
        title: "Tablet 10\"",
        category: "electronica",
        price: 1399900,
        oldPrice: null,
        rating: 4.5,
        reviews: 145,
        badge: "new",
        image: null
    },
    {
        id: 11,
        title: "Vestido Casual",
        category: "moda",
        price: 279900,
        oldPrice: 359900,
        rating: 4.6,
        reviews: 92,
        badge: "sale",
        image: null
    },
    {
        id: 12,
        title: "Set de Maquillaje",
        category: "belleza",
        price: 519900,
        oldPrice: null,
        rating: 4.8,
        reviews: 267,
        badge: null,
        image: null
    }
];

// ========================================
// Estado de la aplicación
// ========================================

let cart = [];
let currentFilter = 'todos';
let displayedProducts = 8;
let isLoggedIn = false;
let currentUser = null;

// Número de WhatsApp (cambiar por el tuyo)
const WHATSAPP_NUMBER = '573028503225'; // Formato: Código país + número (sin espacios ni caracteres especiales)

// ========================================
// Inicialización
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Ocultar loader INMEDIATAMENTE
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Luego inicializar la app
    try {
        initializeApp();
    } catch (error) {
        console.error('Error al inicializar:', error);
    }
});

function initializeApp() {
    loadCartFromStorage();
    renderProducts();
    setupEventListeners();
    updateCartUI();
    createParticles();
}

// ========================================
// LocalStorage Functions
// ========================================

function saveCartToStorage() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error al guardar carrito:', error);
    }
}

function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (error) {
        console.error('Error al cargar carrito:', error);
        cart = [];
    }
}

// ========================================
// Efectos visuales
// ========================================

function createParticles() {
    try {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    } catch (error) {
        console.warn('No se pudieron crear partículas:', error);
    }
}

// ========================================
// Event Listeners
// ========================================

function setupEventListeners() {
    // Elementos globales
    const overlay = document.getElementById('overlay');
    
    // Filtros de productos
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            displayedProducts = 8;
            renderProducts();
        });
    });

    // User Modal
    const userBtn = document.getElementById('userBtn');
    const userModal = document.getElementById('userModal');
    const userPanel = document.getElementById('userPanel');
    const closeUserModal = document.getElementById('closeUserModal');
    const closeUserPanel = document.getElementById('closeUserPanel');

    userBtn.addEventListener('click', () => {
        if (isLoggedIn) {
            userPanel.classList.add('active');
            overlay.classList.add('active');
        } else {
            userModal.classList.add('active');
            overlay.classList.add('active');
        }
    });

    closeUserModal.addEventListener('click', () => {
        userModal.classList.remove('active');
        overlay.classList.remove('active');
    });

    closeUserPanel.addEventListener('click', () => {
        userPanel.classList.remove('active');
        overlay.classList.remove('active');
    });

    // User Tabs
    const userTabs = document.querySelectorAll('.user-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    userTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover active de todas las tabs
            userTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Cambiar contenido
            const targetTab = tab.dataset.tab;
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    // Pequeño delay para la animación
                    setTimeout(() => {
                        content.classList.add('active');
                    }, 50);
                }
            });
        });
    });

    // Login Form
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simulación de login
        if (email && password) {
            currentUser = {
                name: email.split('@')[0],
                email: email
            };
            isLoggedIn = true;
            updateUserUI();
            userModal.classList.remove('active');
            overlay.classList.remove('active');
            showNotification('¡Bienvenido! Has iniciado sesión correctamente');
            loginForm.reset();
        }
    });

    // Register Form
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (password !== confirmPassword) {
            showNotification('Las contraseñas no coinciden', 'error');
            return;
        }
        
        if (name && email && password) {
            currentUser = {
                name: name,
                email: email
            };
            isLoggedIn = true;
            updateUserUI();
            userModal.classList.remove('active');
            overlay.classList.remove('active');
            showNotification('¡Cuenta creada exitosamente!');
            registerForm.reset();
        }
    });

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        isLoggedIn = false;
        currentUser = null;
        userPanel.classList.remove('active');
        overlay.classList.remove('active');
        showNotification('Has cerrado sesión');
    });

    // Categorías
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            currentFilter = category;
            displayedProducts = 8;
            
            // Scroll to products
            document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
            
            // Update filter buttons
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.filter === category) {
                    btn.classList.add('active');
                }
            });
            
            renderProducts();
        });
    });

    // Carrito
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartSidebar = document.getElementById('cartSidebar');

    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Botón de Checkout - WhatsApp
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            sendToWhatsApp();
        });
    }

    // Cargar más productos
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.addEventListener('click', () => {
        displayedProducts += 4;
        renderProducts();
    });

    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterProductsBySearch(searchTerm);
    });

    // Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        alert(`¡Gracias por suscribirte! Te enviaremos ofertas a ${email}`);
        e.target.reset();
    });

    // Smooth scroll para navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Selector de ciudad para envío
    const shippingCitySelect = document.getElementById('shippingCity');
    if (shippingCitySelect) {
        shippingCitySelect.addEventListener('change', () => {
            updateCartUI();
        });
    }
}

// ========================================
// Renderizado de productos
// ========================================

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = getFilteredProducts();
    const productsToShow = filteredProducts.slice(0, displayedProducts);
    
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    // Mostrar/ocultar botón de cargar más
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (displayedProducts >= filteredProducts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
    }
}

function getFilteredProducts() {
    if (currentFilter === 'todos') {
        return productsData;
    }
    return productsData.filter(product => product.category === currentFilter);
}

function filterProductsBySearch(searchTerm) {
    const productsGrid = document.getElementById('productsGrid');
    const allProducts = currentFilter === 'todos' 
        ? productsData 
        : productsData.filter(p => p.category === currentFilter);
    
    const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm)
    );
    
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const stars = generateStars(product.rating);
    const badge = product.badge ? `<span class="product-badge ${product.badge}">${product.badge === 'sale' ? '-' + Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) + '%' : 'NUEVO'}</span>` : '';
    
    card.innerHTML = `
        <div class="product-image">
            ${badge}
            <i class="fas fa-box-open"></i>
        </div>
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-title">${product.title}</h3>
            <div class="product-rating">
                <div class="stars">${stars}</div>
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <div class="product-price">
                <span class="current-price">$${product.price.toLocaleString('es-CO')}</span>
                ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toLocaleString('es-CO')}</span>` : ''}
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i>
                Agregar al Carrito
            </button>
        </div>
    `;
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function getCategoryName(category) {
    const categories = {
        'electronica': 'Electrónica',
        'moda': 'Moda',
        'hogar': 'Hogar',
        'deportes': 'Deportes',
        'belleza': 'Belleza',
        'juguetes': 'Juguetes'
    };
    return categories[category] || category;
}

// ========================================
// Funciones del carrito
// ========================================

function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartUI();
    showNotification('Producto agregado al carrito');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCartToStorage();
        updateCartUI();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartShipping = document.getElementById('cartShipping');
    const cartTotal = document.getElementById('cartTotal');
    
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Actualizar items del carrito
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <i class="fas fa-box-open"></i>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString('es-CO')}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    // Calcular subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Obtener costo de envío
    const citySelect = document.getElementById('shippingCity');
    const selectedCity = citySelect ? citySelect.value : '';
    const shippingCost = calculateShipping(selectedCity, subtotal);
    
    // Mostrar badge de envío gratis si aplica
    const shippingRow = document.querySelector('.shipping-row');
    if (shippingRow && subtotal >= 200000 && selectedCity) {
        shippingRow.classList.add('free-shipping');
    } else if (shippingRow) {
        shippingRow.classList.remove('free-shipping');
    }
    
    // Actualizar valores
    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toLocaleString('es-CO')}`;
    if (cartShipping) {
        if (selectedCity) {
            if (subtotal >= 200000) {
                cartShipping.innerHTML = '<span class="free-badge">🎉 GRATIS</span>';
            } else if (shippingCost === 0) {
                cartShipping.textContent = 'GRATIS';
            } else {
                const remaining = 200000 - subtotal;
                cartShipping.innerHTML = `$${shippingCost.toLocaleString('es-CO')} <small class="free-hint">Faltan $${remaining.toLocaleString('es-CO')} para envío gratis</small>`;
            }
        } else {
            cartShipping.textContent = 'Selecciona ciudad';
        }
    }
    
    const total = subtotal + (selectedCity ? shippingCost : 0);
    if (cartTotal) cartTotal.textContent = `$${total.toLocaleString('es-CO')}`;
}

function showNotification(message) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span style="margin-left: 8px;">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ========================================
// Sistema de WhatsApp
// ========================================

function sendToWhatsApp() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }
    
    // Obtener ciudad y costo de envío
    const citySelect = document.getElementById('shippingCity');
    const selectedCity = citySelect ? citySelect.value : '';
    
    // Calcular subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = calculateShipping(selectedCity, subtotal);
    
    // Validar que se haya seleccionado ciudad
    if (!selectedCity) {
        showNotification('Por favor selecciona tu ciudad para calcular el envío');
        return;
    }
    
    // Generar mensaje con formato correcto para WhatsApp
    let mensaje = '¡Hola! 👋 Me gustaría hacer el siguiente pedido:%0A%0A';
    
    // Agregar productos
    cart.forEach((item, index) => {
        mensaje += `${index + 1}. *${item.title}*%0A`;
        mensaje += `   • Cantidad: ${item.quantity}%0A`;
        mensaje += `   • Precio: $${item.price.toLocaleString('es-CO')}%0A`;
        mensaje += `   • Subtotal: $${(item.price * item.quantity).toLocaleString('es-CO')}%0A%0A`;
    });
    
    mensaje += `📦 *Resumen del pedido:*%0A`;
    mensaje += `   • Subtotal: $${subtotal.toLocaleString('es-CO')}%0A`;
    
    // Mostrar envío
    if (shippingCost === 0) {
        if (subtotal >= 200000) {
            mensaje += `   • Envío a ${selectedCity}: GRATIS 🎉 (¡Compra mayor a $200.000!)%0A`;
        } else {
            mensaje += `   • Envío a ${selectedCity}: GRATIS%0A`;
        }
    } else {
        mensaje += `   • Envío a ${selectedCity}: $${shippingCost.toLocaleString('es-CO')}%0A`;
    }
    
    mensaje += `   • *TOTAL: $${(subtotal + shippingCost).toLocaleString('es-CO')}*%0A%0A`;
    mensaje += `📍 Ciudad: ${selectedCity}%0A%0A`;
    mensaje += '¿Podrías confirmar disponibilidad? ¡Gracias! 😊';
    
    // Generar link de WhatsApp (ya no necesita encodeURIComponent porque ya usamos %0A)
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;
    
    // Abrir WhatsApp
    window.open(whatsappLink, '_blank');
    
    // Cerrar sidebar del carrito
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    
    showNotification('¡Abriendo WhatsApp! 📱');
}

// Calcular costo de envío según ciudad y monto
function calculateShipping(city, subtotal = 0) {
    // Envío GRATIS si el subtotal es mayor a $200.000
    if (subtotal >= 200000) {
        return 0;
    }
    
    const shippingRates = {
        'Bogotá': 0, // Envío gratis
        'Medellín': 15000,
        'Cali': 15000,
        'Barranquilla': 20000,
        'Cartagena': 20000,
        'Santa Marta': 20000,
        'Bucaramanga': 18000,
        'Pereira': 18000,
        'Manizales': 18000,
        'Armenia': 18000,
        'Ibagué': 18000,
        'Villavicencio': 18000,
        'Pasto': 25000,
        'Cúcuta': 25000,
        'Neiva': 20000,
        'Popayán': 20000,
        'Tunja': 15000,
        'Montería': 25000,
        'Sincelejo': 25000,
        'Valledupar': 25000,
        'Otra ciudad': 30000
    };
    
    return shippingRates[city] || 30000;
}

// ========================================
// Animaciones CSS adicionales
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Animaciones adicionales en scroll
// ========================================

// Observador de intersección para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observar elementos cuando se agregan al DOM
setTimeout(() => {
    const animateElements = document.querySelectorAll('.category-card, .product-card');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.05}s`;
        observer.observe(el);
    });
}, 100);

// Efecto parallax suave al hacer scroll
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero');
            
            parallaxElements.forEach(el => {
                el.style.transform = `translateY(${scrolled * 0.5}px)`;
            });
            
            ticking = false;
        });
        ticking = true;
    }
});
// ========================================
// Búsqueda en Tiempo Real
// ========================================

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

function performRealTimeSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm.length === 0) {
        searchResults.classList.remove('active');
        return;
    }
    
    // Filtrar productos que coincidan
    const results = productsData.filter(product => {
        return product.title.toLowerCase().includes(searchTerm) ||
               product.category.toLowerCase().includes(searchTerm);
    });
    
    // Mostrar resultados
    if (results.length > 0) {
        searchResults.innerHTML = results.slice(0, 5).map(product => `
            <div class="search-result-item" onclick="selectSearchResult(${product.id})">
                <img src="https://via.placeholder.com/50/6366f1/ffffff?text=${product.title.charAt(0)}" 
                     alt="${product.title}" 
                     class="search-result-image">
                <div class="search-result-info">
                    <div class="search-result-name">${product.title}</div>
                    <div class="search-result-category">${getCategoryName(product.category)}</div>
                </div>
                <div class="search-result-price">$${product.price.toLocaleString('es-CO')}</div>
            </div>
        `).join('');
        searchResults.classList.add('active');
    } else {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search"></i>
                <p>No se encontraron resultados para "${query}"</p>
            </div>
        `;
        searchResults.classList.add('active');
    }
}

function selectSearchResult(productId) {
    const product = productsData.find(p => p.id === productId);
    if (product) {
        // Cerrar resultados
        searchResults.classList.remove('active');
        searchInput.value = '';
        
        // Filtrar por categoría y hacer scroll
        filterProducts(product.category);
        
        // Scroll a productos
        setTimeout(() => {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        }, 300);
        
        showToast(`Mostrando: ${product.title}`, 'success');
    }
}

function getCategoryName(category) {
    const categories = {
        'electronica': 'Electrónica',
        'moda': 'Moda',
        'hogar': 'Hogar',
        'deportes': 'Deportes',
        'libros': 'Libros',
        'belleza': 'Belleza'
    };
    return categories[category] || category;
}

// Event listeners para búsqueda
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        performRealTimeSearch(e.target.value);
    });
    
    searchInput.addEventListener('focus', (e) => {
        if (e.target.value.trim()) {
            performRealTimeSearch(e.target.value);
        }
    });
    
    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

// ========================================
// Sistema de Checkout
// ========================================

const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
let currentCheckoutStep = 1;
const shippingCost = 5.00;

function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('El carrito está vacío', 'error');
        return;
    }
    
    if (!isLoggedIn) {
        showToast('Debes iniciar sesión para continuar', 'error');
        openUserModal();
        return;
    }
    
    checkoutModal.classList.add('active');
    currentCheckoutStep = 1;
    updateCheckoutStep(1);
    
    // Pre-llenar datos del usuario
    if (currentUser) {
        document.getElementById('shippingName').value = currentUser.name || '';
        document.getElementById('shippingEmail').value = currentUser.email || '';
    }
}

function closeCheckoutModal() {
    checkoutModal.classList.remove('active');
    currentCheckoutStep = 1;
}

function nextStep(step) {
    // Validar el paso actual
    if (currentCheckoutStep === 1) {
        if (!validateShippingForm()) {
            return;
        }
    } else if (currentCheckoutStep === 2) {
        if (!validatePaymentForm()) {
            return;
        }
    }
    
    currentCheckoutStep = step;
    updateCheckoutStep(step);
    
    // Si es el paso 3, mostrar resumen
    if (step === 3) {
        updateOrderSummary();
    }
}

function prevStep(step) {
    currentCheckoutStep = step;
    updateCheckoutStep(step);
}

function updateCheckoutStep(step) {
    // Actualizar indicadores de pasos
    document.querySelectorAll('.step').forEach((el, index) => {
        if (index + 1 <= step) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
    
    // Mostrar el paso correcto
    document.querySelectorAll('.checkout-step').forEach((el, index) => {
        if (index + 1 === step) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

function validateShippingForm() {
    const name = document.getElementById('shippingName').value.trim();
    const email = document.getElementById('shippingEmail').value.trim();
    const phone = document.getElementById('shippingPhone').value.trim();
    const address = document.getElementById('shippingAddress').value.trim();
    const city = document.getElementById('shippingCity').value.trim();
    const zip = document.getElementById('shippingZip').value.trim();
    
    if (!name || !email || !phone || !address || !city || !zip) {
        showToast('Por favor, completa todos los campos', 'error');
        return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
        showToast('Email inválido', 'error');
        return false;
    }
    
    return true;
}

function validatePaymentForm() {
    const selectedMethod = document.querySelector('.payment-method.active');
    
    if (!selectedMethod) {
        showToast('Selecciona un método de pago', 'error');
        return false;
    }
    
    const method = selectedMethod.dataset.method;
    
    // Validar tarjeta solo si se seleccionó ese método
    if (method === 'card') {
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const cardExpiry = document.getElementById('cardExpiry').value.trim();
        const cardCVV = document.getElementById('cardCVV').value.trim();
        const cardName = document.getElementById('cardName').value.trim();
        
        if (!cardNumber || !cardExpiry || !cardCVV || !cardName) {
            showToast('Completa los datos de la tarjeta', 'error');
            return false;
        }
    }
    
    return true;
}

function updateOrderSummary() {
    // Resumen de productos
    const summaryItems = document.getElementById('summaryItems');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + shippingCost;
    
    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <img src="https://via.placeholder.com/50/6366f1/ffffff?text=${item.title.charAt(0)}" 
                 alt="${item.title}" 
                 class="summary-item-image">
            <div class="summary-item-info">
                <div class="summary-item-name">${item.title}</div>
                <div class="summary-item-quantity">Cantidad: ${item.quantity}</div>
            </div>
            <div class="summary-item-price">€${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
    
    document.getElementById('summarySubtotal').textContent = `€${subtotal.toFixed(2)}`;
    document.getElementById('summaryShipping').textContent = `€${shippingCost.toFixed(2)}`;
    document.getElementById('summaryTotal').textContent = `€${total.toFixed(2)}`;
    
    // Resumen de envío
    const shippingSummary = document.getElementById('shippingSummary');
    shippingSummary.innerHTML = `
        <p><strong>${document.getElementById('shippingName').value}</strong></p>
        <p>${document.getElementById('shippingAddress').value}</p>
        <p>${document.getElementById('shippingCity').value}, ${document.getElementById('shippingZip').value}</p>
        <p>${document.getElementById('shippingPhone').value}</p>
        <p>${document.getElementById('shippingEmail').value}</p>
    `;
    
    // Resumen de pago
    const paymentSummary = document.getElementById('paymentSummary');
    const selectedMethod = document.querySelector('.payment-method.active');
    const methodName = selectedMethod.querySelector('span').textContent;
    
    paymentSummary.innerHTML = `<p><i class="${selectedMethod.querySelector('i').className}"></i> ${methodName}</p>`;
}

function confirmOrder() {
    // Simular procesamiento de pedido
    const confirmBtn = document.getElementById('confirmOrderBtn');
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    confirmBtn.disabled = true;
    
    setTimeout(() => {
        // Limpiar carrito
        cart = [];
        updateCartUI();
        
        // Cerrar modal
        closeCheckoutModal();
        
        // Mostrar mensaje de éxito
        showToast('¡Pedido confirmado! Recibirás un email de confirmación', 'success');
        
        // Restablecer botón
        confirmBtn.innerHTML = '<i class="fas fa-check"></i> Confirmar y Pagar';
        confirmBtn.disabled = false;
        
        // Generar número de pedido
        const orderNumber = '#' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        setTimeout(() => {
            showToast(`Número de pedido: ${orderNumber}`, 'success');
        }, 2000);
    }, 2000);
}

// Event listeners de checkout
if (closeCheckout) {
    closeCheckout.addEventListener('click', closeCheckoutModal);
}

// Click fuera del modal
if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            closeCheckoutModal();
        }
    });
}

// Confirmar pedido
const confirmOrderBtn = document.getElementById('confirmOrderBtn');
if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener('click', confirmOrder);
}

// Métodos de pago
document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', function() {
        // Remover active de todos
        document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
        // Agregar active al seleccionado
        this.classList.add('active');
        
        // Mostrar formulario correspondiente
        const selectedMethod = this.dataset.method;
        document.querySelectorAll('.payment-form').forEach(form => form.classList.remove('active'));
        document.getElementById(`${selectedMethod}Form`).classList.add('active');
    });
});

// Formatear número de tarjeta
const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
}

// Formatear fecha de expiración
const cardExpiryInput = document.getElementById('cardExpiry');
if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
}

// Funciones globales para los botones de paso (llamadas desde HTML)
window.nextStep = nextStep;
window.prevStep = prevStep;

// ========================================
// OAuth Social Login
// ========================================

function handleSocialLogin(provider) {
    // Simular proceso de OAuth
    showToast(`Conectando con ${provider}...`, 'info');
    
    setTimeout(() => {
        // Simular login exitoso
        const userData = {
            name: provider === 'Google' ? 'Usuario de Google' : 'Usuario de Facebook',
            email: `usuario@${provider.toLowerCase()}.com`,
            avatar: null,
            loginMethod: provider
        };
        
        currentUser = userData;
        isLoggedIn = true;
        
        updateUserUI();
        closeUserModal();
        
        showToast(`¡Bienvenido! Has iniciado sesión con ${provider}`, 'success');
    }, 1500);
}

// Agregar event listeners a los botones de redes sociales
document.addEventListener('DOMContentLoaded', () => {
    // Botones de login
    const googleLoginBtn = document.querySelector('.social-buttons .social-btn:nth-child(1)');
    const facebookLoginBtn = document.querySelector('.social-buttons .social-btn:nth-child(2)');
    
    // Botones de registro (en el tab de registro)
    const socialButtonsContainers = document.querySelectorAll('.social-buttons');
    
    socialButtonsContainers.forEach(container => {
        const buttons = container.querySelectorAll('.social-btn');
        buttons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = index === 0 ? 'Google' : 'Facebook';
                handleSocialLogin(provider);
            });
        });
    });
});