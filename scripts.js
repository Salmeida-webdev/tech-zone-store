// ===== ELEMENTOS =====
const openCartBtn = document.getElementById("openCartBtn");
const heroCartBtn = document.getElementById("heroCartBtn");
const finalCartBtn = document.getElementById("finalCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutBtn = document.getElementById("closeCheckoutBtn");
const checkoutForm = document.getElementById("checkoutForm");

// ===== ESTADO =====
let cart = [];

// ===== FORMATADOR =====
function formatMoney(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// ===== ABRIR/FECHAR =====
function openCart() {
  cartDrawer.classList.add("active");
  overlay.classList.add("active");
}

function closeCart() {
  cartDrawer.classList.remove("active");
  overlay.classList.remove("active");
}

function openCheckout() {
  if (cart.length === 0) {
    alert("Adicione um produto primeiro.");
    return;
  }

  checkoutModal.classList.add("active");
  overlay.classList.add("active");
}

function closeCheckout() {
  checkoutModal.classList.remove("active");
  overlay.classList.remove("active");
}

// ===== PEGAR PRODUTO =====
function getProduct(button) {
  const card = button.closest(".product-card");

  return {
    id: card.dataset.id,
    name: card.dataset.name,
    price: Number(card.dataset.price),
    image: card.dataset.image,
    quantity: 1,
  };
}

// ===== ADICIONAR =====
function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push(product);
  }

  updateCart();
  openCart();
}

// ===== REMOVER =====
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

// ===== QUANTIDADE =====
function increase(id) {
  const item = cart.find((p) => p.id === id);
  if (item) item.quantity++;
  updateCart();
}

function decrease(id) {
  const item = cart.find((p) => p.id === id);

  if (!item) return;

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    removeItem(id);
  }

  updateCart();
}

// ===== ATUALIZAR =====
function updateCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Seu carrinho está vazio</p>";
  }

  let total = 0;
  let count = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    count += item.quantity;

    const div = document.createElement("div");

    div.innerHTML = `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h4>${item.name}</h4>
          <p>${formatMoney(item.price)}</p>

          <div>
            <button onclick="decrease('${item.id}')">-</button>
            <span>${item.quantity}</span>
            <button onclick="increase('${item.id}')">+</button>
          </div>

          <button onclick="removeItem('${item.id}')">Remover</button>
        </div>
      </div>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = formatMoney(total);
  cartCount.textContent = count;
}

// ===== EVENTOS =====

// BOTÕES DO SITE
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    addToCart(getProduct(btn));
  });
});

document.querySelectorAll(".buy-now").forEach((btn) => {
  btn.addEventListener("click", () => {
    addToCart(getProduct(btn));
    openCheckout();
  });
});

// CARRINHO
openCartBtn.onclick = openCart;
heroCartBtn.onclick = openCart;
finalCartBtn.onclick = openCart;
closeCartBtn.onclick = closeCart;

// CHECKOUT
checkoutBtn.onclick = openCheckout;
closeCheckoutBtn.onclick = closeCheckout;

// OVERLAY
overlay.onclick = () => {
  closeCart();
  closeCheckout();
};

// FORM
checkoutForm.onsubmit = (e) => {
  e.preventDefault();

  alert("Compra finalizada (simulação)");

  cart = [];
  updateCart();

  closeCheckout();
  closeCart();
};

// INIT
updateCart();
