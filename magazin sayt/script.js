// Boshlang'ich 20 ta mahsulot bazasi
let products = [
    { id: 1, name: "Smart Krovat", price: 5000000, stock: 7, categories: ["uy", "jixozlar"], img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400" },
    { id: 2, name: "Muzlatgich LG", price: 8000000, stock: 3, categories: ["elektronika", "jixozlar"], img: "https://images.unsplash.com/photo-1571175432267-efb92b4c2b9b?w=400" },
    { id: 3, name: "Tesla Model S", price: 900000000, stock: 2, categories: ["mashina"], img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400" },
    { id: 4, name: "iPhone 15 Pro", price: 15000000, stock: 5, categories: ["smartfon", "elektronika"], img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400" },
    { id: 5, name: "Robot Changyutgich", price: 3000000, stock: 4, categories: ["elektronika", "uy"], img: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?w=400" },
    { id: 6, name: "Samsung Galaxy S24", price: 13000000, stock: 6, categories: ["smartfon"], img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400" },
    { id: 7, name: "Kofe Mashina", price: 2500000, stock: 8, categories: ["elektronika", "jixozlar"], img: "https://images.unsplash.com/photo-1517256064527-09c53b2d0c6b?w=400" },
    { id: 8, name: "BMW M4 Grand", price: 1200000000, stock: 1, categories: ["mashina"], img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400" },
    { id: 9, name: "Yumshoq Divan", price: 4500000, stock: 3, categories: ["uy", "jixozlar"], img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
    { id: 10, name: "MacBook Pro M3", price: 24000000, stock: 4, categories: ["elektronika"], img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400" },
    { id: 11, name: "Xiaomi 14 Ultra", price: 11000000, stock: 10, categories: ["smartfon"], img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400" },
    { id: 12, name: "Oshxona Stoli", price: 1800000, stock: 5, categories: ["uy", "jixozlar"], img: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=400" },
    { id: 13, name: "BYD Song Plus", price: 350000000, stock: 3, categories: ["mashina"], img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400" },
    { id: 14, name: "Smart TV 65", price: 7000000, stock: 4, categories: ["elektronika"], img: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400" },
    { id: 15, name: "Mikroto'lqinli pech", price: 1200000, stock: 6, categories: ["jixozlar"], img: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400" },
    { id: 16, name: "Pixel 8 Pro", price: 10500000, stock: 2, categories: ["smartfon"], img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400" },
    { id: 17, name: "Konditsioner", price: 4000000, stock: 5, categories: ["elektronika", "uy"], img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400" },
    { id: 18, name: "Audi e-tron", price: 850000000, stock: 2, categories: ["mashina"], img: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400" },
    { id: 19, name: "Chiroyli Lyustra", price: 1500000, stock: 8, categories: ["uy", "jixozlar"], img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400" },
    { id: 20, name: "Smart Soat", price: 2000000, stock: 12, categories: ["smartfon", "elektronika"], img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" }
];

let cart = [];
let ordersCount = 0;
let currentCategory = 'all';
let adminPass = "qwer1052";

// Sayt yuklanganda ishga tushadigan qism
window.onload = function() {
    renderProducts();
};

// Mahsulotlarni ekranga chiqarish
function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    const filtered = products.filter(p => currentCategory === 'all' || p.categories.includes(currentCategory));

    filtered.forEach(p => {
        const isOut = p.stock === 0;
        const card = document.createElement('div');
        card.className = `product-card ${isOut ? 'out-of-stock' : ''}`;
        
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <div class="product-price">${p.price.toLocaleString()} so'm</div>
            <div class="product-stock">Omborda: ${p.stock} ta qoldi</div>
            <button class="add-to-cart-btn" onclick="addToCart(${p.id})">${isOut ? 'Tugagan' : 'Savatchaga olish'}</button>
        `;
        container.appendChild(card);
    });

    // Admin panel ichidagi o'chirish ro'yxatini ham yangilash
    renderAdminProducts();
}

// Savatchaga qo'shish (Ombordan bittaga kamayadi)
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if(product && product.stock > 0) {
        product.stock--; // 7 tadan 6 taga kamayadi
        
        // Savatchaga qo'shish yoki sonini oshirish
        const cartItem = cart.find(item => item.id === id);
        if(cartItem) {
            cartItem.qty++;
        } else {
            cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
        }
        
        updateCartCount();
        renderProducts();
    }
}

// Savat hisoblagichini yangilash
function updateCartCount() {
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    document.getElementById('cart-count').innerText = totalQty;
}

// Savatchani ochish / yopish
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('open');
    if(modal.classList.contains('open')) {
        renderCartItems();
    }
}

// Savat ichidagi narsalarni chiqarish
function renderCartItems() {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div>
                <strong>${item.name}</strong> (${item.qty} ta) <br>
                <span>${(item.price * item.qty).toLocaleString()} so'm</span>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">O'chirish</button>
        `;
        list.appendChild(div);
    });

    document.getElementById('cart-total-price').innerText = `Jami: ${total.toLocaleString()} so'm`;
}

// Savatdan keraksizini olib tashlash (Qayta omborga qo'shiladi)
function removeFromCart(id) {
    const cartIndex = cart.findIndex(item => item.id === id);
    if(cartIndex > -1) {
        const product = products.find(p => p.id === id);
        product.stock += cart.cartIndex ? cart[cartIndex].qty : 1; // omborga qaytarish
        
        if(cart[cartIndex].qty > 1) {
            cart[cartIndex].qty--;
            product.stock = product.stock - (cart[cartIndex].qty); // to'g'rilash
        } else {
            cart.splice(cartIndex, 1);
        }
    }
    // Qayta hisoblashlar
    // Eslatma: Osonroq bo'lishi uchun to'liq qaytarish:
    const item = cart.find(i => i.id === id);
    const p = products.find(pr => pr.id === id);
    p.stock += item.qty;
    cart = cart.filter(i => i.id !== id);

    updateCartCount();
    renderProducts();
    renderCartItems();
}

// Kategoriya bo'yicha saralash
function filterCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderProducts();
}

// Qidiruv tizimi
function searchProducts() {
    const text = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    
    products.forEach((p, index) => {
        const card = cards[index];
        if(card) {
            if(p.name.toLowerCase().includes(text)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    });
}

// Buyurtma berish tugmasi bosilganda
function submitOrder(e) {
    e.preventDefault();
    if(cart.length === 0) {
        alert("Savatchangiz bo'sh!");
        return;
    }
    
    alert("Buyurtma tez orada yetkaziladi!");
    ordersCount++; // admin panel uchun
    document.getElementById('orders-count-dash').innerText = ordersCount;
    
    // Savat va formani tozalash (Yangilash)
    cart = [];
    updateCartCount();
    document.getElementById('order-form').reset();
    toggleCart();
}

// ADMIN PANEL KODLARI
function toggleAdminModal() {
    document.getElementById('admin-modal').classList.toggle('open');
}

function loginAdmin() {
    const user = document.getElementById('admin-username').value;
    const pass = document.getElementById('admin-password').value;

    if(user === "shoh" && pass === adminPass) {
        document.getElementById('admin-login-sec').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
    } else {
        alert("Login yoki parol xato!");
    }
}

function changeAdminPassword() {
    const newP = prompt("Yangi parolni kiriting:");
    if(newP) {
        adminPass = newP;
        alert("Parol muvaffaqiyatli almashtirildi!");
    }
}

function renderAdminProducts() {
    const list = document.getElementById('admin-products-list');
    if(!list) return;
    list.innerHTML = '';
    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'admin-p-item';
        div.innerHTML = `
            <span>${p.name}</span>
            <button onclick="deleteProduct(${p.id})" style="background:red; color:white; border:none; padding:2px 5px; cursor:pointer;">X</button>
        `;
        list.appendChild(div);
    });
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    renderProducts();
}

function addNewProduct() {
    const name = document.getElementById('new-p-name').value;
    const img = document.getElementById('new-p-img').value || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400";
    const price = parseInt(document.getElementById('new-p-price').value);
    const stock = parseInt(document.getElementById('new-p-stock').value);
    
    // Kategoriyalarni yig'ish
    const select = document.getElementById('new-p-cats');
    const selectedCats = [...select.options].filter(option => option.selected).map(option => option.value);

    if(!name || !price || !stock || selectedCats.length === 0) {
        alert("Barcha maydonlarni to'ldiring va kamida bitta kategoriya tanlang!");
        return;
    }

    const newProd = {
        id: Date.now(),
        name: name,
        price: price,
        stock: stock,
        categories: selectedCats,
        img: img
    };

    products.push(newProd);
    renderProducts();
    
    // Formani tozalash
    document.getElementById('new-p-name').value = '';
    document.getElementById('new-p-price').value = '';
    document.getElementById('new-p-stock').value = '';
    alert("Yangi mahsulot omborga qo'shildi!");
}