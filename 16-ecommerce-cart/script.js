// Array of product objects - our "database" of products
const products = [
  { id: 1, name: "Wireless Mouse", price: 499 },
  { id: 2, name: "Keyboard", price: 899 },
  { id: 3, name: "Headphones", price: 1299 },
  { id: 4, name: "USB Cable", price: 199 },
  { id: 5, name: "Laptop Stand", price: 749 },
  { id: 6, name: "Webcam", price: 1599 }
];

// Cart starts empty - array of objects like { ...product, quantity: 1 }
let cart = [];

const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");

// Render all products as cards
function renderProducts() {
  productList.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <p class="name">${product.name}</p>
      <p class="price">₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productList.appendChild(card);
  });
}

// Add a product to the cart (or increase quantity if already there)
function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

// Increase quantity of an item already in cart
function increaseQty(productId) {
  const item = cart.find(item => item.id === productId);
  item.quantity++;
  renderCart();
}

// Decrease quantity, remove item entirely if it hits 0
function decreaseQty(productId) {
  const item = cart.find(item => item.id === productId);
  item.quantity--;

  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    renderCart();
  }
}

// Remove an item completely from the cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
}

// Render the cart items and total
function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
    cartTotal.textContent = "0";
    return;
  }

  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <div class="cart-item-info">
        <p class="name">${item.name}</p>
        <p class="price-line">₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</p>
      </div>
      <div class="qty-controls">
        <button onclick="decreaseQty(${item.id})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQty(${item.id})">+</button>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
    `;

    cartList.appendChild(cartItem);
  });

  // Calculate total using reduce - sums price*quantity for every item
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = total;
}

// Initialize on page load
window.onload = function() {
  renderProducts();
  renderCart();
};