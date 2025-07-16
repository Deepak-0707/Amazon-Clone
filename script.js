const products = [
  { id: 1, name: "Wireless Earbuds", price: 1499, image: "images/earbuds.jpg", description: "High-quality wireless earbuds with noise cancellation." },
  { id: 2, name: "Smart Watch", price: 2899, image: "images/watch.jpg", description: "Smart watch with fitness tracking and notifications." },
  { id: 3, name: "Bluetooth Speaker", price: 999, image: "images/speaker.jpg", description: "Portable Bluetooth speaker with powerful bass." }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");
const cartSidebar = document.getElementById("cart-sidebar");
const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");
const searchBar = document.getElementById("searchBar");
const modal = document.getElementById("product-modal");
const modalContent = document.getElementById("modal-content");

function renderProducts(filter = "") {
  productList.innerHTML = "";
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );
  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    card.addEventListener("click", (e) => {
      if (!e.target.closest("button")) {
        showProductModal(product);
      }
    });
    productList.appendChild(card);
  });
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCart();
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.innerHTML = `
      ${item.name} - ₹${item.price}
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
  });
  cartCount.textContent = cart.length;
  totalDisplay.textContent = total;
}

document.querySelector(".cart").addEventListener("click", () => {
  cartSidebar.style.display =
    cartSidebar.style.display === "block" ? "none" : "block";
});

searchBar.addEventListener("input", e => {
  renderProducts(e.target.value);
});

function showProductModal(product) {
  modalContent.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" alt="${product.name}" style="width: 100%; max-height: 200px; object-fit: contain;">
    <p><strong>Price:</strong> ₹${product.price}</p>
    <p><strong>Description:</strong> ${product.description}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

renderProducts();
updateCart();
