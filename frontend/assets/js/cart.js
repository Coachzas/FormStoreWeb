let cart = {};
let riceBoxOrders = [];
let drinkOrders = [];

function updateQty(itemId, change) {
  if (!cart[itemId]) cart[itemId] = 0;
  cart[itemId] += change;
  if (cart[itemId] < 0) cart[itemId] = 0;

  const qtyEl = document.getElementById(`qty-${itemId}`);
  if (qtyEl) qtyEl.innerText = cart[itemId];
  calculateTotal();
}

function updateRiceBoxQty(index, change) {
  riceBoxOrders[index].quantity += change;
  if (riceBoxOrders[index].quantity <= 0) {
    riceBoxOrders.splice(index, 1);
  }
  calculateTotal();
}

function updateDrinkOrderQty(index, change) {
  drinkOrders[index].quantity += change;
  if (drinkOrders[index].quantity <= 0) {
    drinkOrders.splice(index, 1);
  }
  calculateTotal();
}

function updateDrinkQtyDisplay(itemId) {
  const quantity = drinkOrders
    .filter(drink => drink.itemId === itemId)
    .reduce((sum, drink) => sum + drink.quantity, 0);

  const qtyEl = document.getElementById(`qty-${itemId}`);
  if (qtyEl) qtyEl.innerText = quantity;
}

function calculateTotal() {
  let total = 0;
  let totalQty = 0;

  for (const id in cart) {
    if (menuData[id]) {
      total += cart[id] * menuData[id].price;
      totalQty += cart[id];
    }
  }

  riceBoxOrders.forEach(box => {
    total += box.price * box.quantity;
    totalQty += box.quantity;
  });

  drinkOrders.forEach(drink => {
    total += drink.price * drink.quantity;
    totalQty += drink.quantity;
  });

  const totalPriceEl = document.getElementById('total-price');
  if (totalPriceEl) totalPriceEl.innerText = `${total} บาท`;

  const modalTotalPriceEl = document.getElementById('modal-total-price');
  if (modalTotalPriceEl) modalTotalPriceEl.innerText = `${total} บาท`;

  const modalTotalQtyEl = document.getElementById('modal-total-qty');
  if (modalTotalQtyEl) modalTotalQtyEl.innerText = `${totalQty} ชิ้น`;

  updateCartModalList();
  updateRiceCartSummary();
  updateDrinkCartSummary();
  return total;
}
