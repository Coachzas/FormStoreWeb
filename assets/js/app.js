const modalIds = ['image-lightbox', 'rice-customizer-modal', 'drink-customizer-modal', 'cart-modal', 'checkout-modal'];
let selectedDrinkId = null;
let currentActiveBannerSrc = 'images/เฟรนฟรายทอด.jpg';

function updateBodyScrollLock() {
  const hasOpenModal = modalIds.some(id => !document.getElementById(id).classList.contains('hidden'));
  document.body.style.overflow = hasOpenModal ? 'hidden' : '';
}

function renderDynamicItems() {
  const fruitContainer = document.getElementById('fruit-drink-container');
  fruitContainer.innerHTML = fruitDrinks.map(f => `
    <div class="bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
      <div>
        <h4 class="font-semibold text-xs text-white">${f.name}</h4>
        <span class="text-[10px] text-red-400 font-bold">${f.price} บาท</span>
      </div>
      <div class="flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800">
        <button onclick="updateDrinkMenuQty('${f.id}', -1)" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">-</button>
        <span id="qty-${f.id}" class="w-5 text-center font-semibold text-xs">0</span>
        <button onclick="openDrinkCustomizer('${f.id}')" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">+</button>
      </div>
    </div>
  `).join('');

  const teaContainer = document.getElementById('tea-drink-container');
  teaContainer.innerHTML = teaDrinks.map(t => `
    <div class="bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
      <div>
        <h4 class="font-semibold text-xs text-white">${t.name}</h4>
        <span class="text-[10px] text-red-400 font-bold">${t.price} บาท</span>
      </div>
      <div class="flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800">
        <button onclick="updateDrinkMenuQty('${t.id}', -1)" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">-</button>
        <span id="qty-${t.id}" class="w-5 text-center font-semibold text-xs">0</span>
        <button onclick="openDrinkCustomizer('${t.id}')" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">+</button>
      </div>
    </div>
  `).join('');

  const milkContainer = document.getElementById('milk-drink-container');
  milkContainer.innerHTML = milkDrinks.map(m => `
    <div class="bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
      <div>
        <h4 class="font-semibold text-xs text-white">${m.name}</h4>
        <span class="text-[10px] text-red-400 font-bold">${m.price} บาท</span>
      </div>
      <div class="flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800">
        <button onclick="updateDrinkMenuQty('${m.id}', -1)" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">-</button>
        <span id="qty-${m.id}" class="w-5 text-center font-semibold text-xs">0</span>
        <button onclick="openDrinkCustomizer('${m.id}')" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">+</button>
      </div>
    </div>
  `).join('');

  const smoothieContainer = document.getElementById('smoothie-drink-container');
  if (smoothieContainer) {
    smoothieContainer.innerHTML = smoothieYogurtDrinks.map(s => `
      <div class="bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
        <div>
          <h4 class="font-semibold text-xs text-white">${s.name}</h4>
          <span class="text-[10px] text-red-400 font-bold">${s.price} บาท</span>
        </div>
        <div class="flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800">
          <button onclick="updateDrinkMenuQty('${s.id}', -1)" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">-</button>
          <span id="qty-${s.id}" class="w-5 text-center font-semibold text-xs">0</span>
          <button onclick="openDrinkCustomizer('${s.id}')" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">+</button>
        </div>
      </div>
    `).join('');
  }

  const sodaContainer = document.getElementById('soda-drink-container');
  if (sodaContainer) {
    sodaContainer.innerHTML = sodaDrinks.map(s => `
      <div class="bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
        <div>
          <h4 class="font-semibold text-xs text-white">${s.name}</h4>
          <span class="text-[10px] text-red-400 font-bold">${s.price} บาท</span>
        </div>
        <div class="flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800">
          <button onclick="updateDrinkMenuQty('${s.id}', -1)" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">-</button>
          <span id="qty-${s.id}" class="w-5 text-center font-semibold text-xs">0</span>
          <button onclick="openDrinkCustomizer('${s.id}')" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">+</button>
        </div>
      </div>
    `).join('');
  }

  const coffeeContainer = document.getElementById('coffee-drink-container');
  if (coffeeContainer) {
    coffeeContainer.innerHTML = coffeeDrinks.map(s => `
      <div class="bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
        <div>
          <h4 class="font-semibold text-xs text-white">${s.name}</h4>
          <span class="text-[10px] text-red-400 font-bold">${s.price} บาท</span>
        </div>
        <div class="flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800">
          <button onclick="updateDrinkMenuQty('${s.id}', -1)" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">-</button>
          <span id="qty-${s.id}" class="w-5 text-center font-semibold text-xs">0</span>
          <button onclick="openDrinkCustomizer('${s.id}')" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">+</button>
        </div>
      </div>
    `).join('');
  }

  const powderContainer = document.getElementById('powder-list-container');
  powderContainer.innerHTML = powders.map(p => `
    <div class="flex items-center justify-between bg-neutral-950 px-2.5 py-2 rounded-xl border border-neutral-800">
      <div class="truncate pr-1">
        <span class="text-xs font-medium text-white truncate block">${p.name}</span>
        <span class="text-[9px] text-red-400">+5</span>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <button onclick="updateQty('${p.id}', -1)" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">-</button>
        <span id="qty-${p.id}" class="w-4 text-center font-semibold text-xs">0</span>
        <button onclick="updateQty('${p.id}', 1)" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">+</button>
      </div>
    </div>
  `).join('');

  const dipContainer = document.getElementById('dip-list-container');
  dipContainer.innerHTML = dips.map(d => `
    <div class="flex items-center justify-between bg-neutral-950 px-2.5 py-2 rounded-xl border border-neutral-800">
      <div class="truncate pr-1">
        <span class="text-xs font-medium text-white truncate block">${d.name}</span>
        <span class="text-[9px] text-red-400">+10</span>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <button onclick="updateQty('${d.id}', -1)" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">-</button>
        <span id="qty-${d.id}" class="w-4 text-center font-semibold text-xs">0</span>
        <button onclick="updateQty('${d.id}', 1)" class="w-6 h-6 rounded-lg bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-red-600 text-xs">+</button>
      </div>
    </div>
  `).join('');

  const meatContainer = document.getElementById('rice-modal-meat-container');
  meatContainer.innerHTML = riceMeats.map((m) => `
    <label class="flex items-center justify-between bg-neutral-950 px-3 py-2.5 rounded-xl border border-neutral-800 cursor-pointer hover:border-red-600 transition-all">
      <div class="flex items-center gap-2">
        <input type="radio" name="rice_meat" value="${m.name}" onclick="toggleRiceRadio(this)" class="accent-red-600">
        <span class="text-xs font-medium text-white">${m.name}</span>
      </div>
      <span class="text-[10px] text-neutral-400">65 ฿</span>
    </label>
  `).join('');

  const sauceContainer = document.getElementById('rice-modal-sauce-container');
  sauceContainer.innerHTML = riceSauces.map((s) => `
    <label class="flex items-center gap-2 bg-neutral-950 px-3 py-2 rounded-xl border border-neutral-800 cursor-pointer hover:border-red-600 transition-all">
      <input type="radio" name="rice_sauce" value="${s.name}" onclick="toggleRiceRadio(this)" class="accent-red-600">
      <span class="text-xs font-medium text-white truncate">${s.name}</span>
    </label>
  `).join('');
}

window.addEventListener('DOMContentLoaded', renderDynamicItems);

function openDrinkCustomizer(itemId) {
  const item = menuData[itemId];
  if (!item) return;

  selectedDrinkId = itemId;
  document.getElementById('customizer-drink-name').innerText = item.name;
  document.getElementById('customizer-drink-price').innerText = `ราคาเริ่มต้น ${item.price} บาท/แก้ว`;
  document.getElementById('customizer-drink-quantity').value = '1';
  ['boba', 'oreo', 'cornflakes', 'wipcream'].forEach(id => {
    document.getElementById(`customizer-topping-${id}`).checked = false;
  });
  updateDrinkCustomizerPrice();
  document.getElementById('drink-customizer-modal').classList.remove('hidden');
  updateBodyScrollLock();
}

function closeDrinkCustomizer() {
  selectedDrinkId = null;
  document.getElementById('drink-customizer-modal').classList.add('hidden');
  updateBodyScrollLock();
}

function addCustomDrink() {
  if (!selectedDrinkId || !menuData[selectedDrinkId]) return;

  const quantity = Math.max(1, parseInt(document.getElementById('customizer-drink-quantity').value, 10) || 1);
  const toppingOptions = [
    { id: 'boba', name: 'มุก', price: 5 },
    { id: 'oreo', name: 'โอริโอ้', price: 5 },
    { id: 'cornflakes', name: 'คอนเฟลค', price: 5 },
    { id: 'wipcream', name: 'วิปครีม', price: 15 }
  ];

  const toppings = toppingOptions.filter(topping =>
    document.getElementById(`customizer-topping-${topping.id}`).checked
  );

  const toppingPrice = toppings.reduce((sum, topping) => sum + topping.price, 0);
  const drink = menuData[selectedDrinkId];
  const detailsText = toppings.length > 0 ? `เพิ่ม${toppings.map(topping => topping.name).join(', ')}` : '(ปกติ)';
  const detailsKey = toppings.map(topping => topping.id).sort().join('|');
  const existingOrderIndex = drinkOrders.findIndex(order =>
    order.itemId === selectedDrinkId && order.detailsKey === detailsKey
  );

  if (existingOrderIndex >= 0) {
    drinkOrders[existingOrderIndex].quantity += quantity;
  } else {
    drinkOrders.push({
      id: 'drink_' + Date.now() + '_' + Math.random(),
      itemId: selectedDrinkId,
      name: drink.name,
      details: detailsText,
      detailsKey,
      price: drink.price + toppingPrice,
      quantity
    });
  }

  updateDrinkQtyDisplay(selectedDrinkId);
  closeDrinkCustomizer();
  calculateTotal();
}

function updateDrinkCustomizerPrice() {
  if (!selectedDrinkId || !menuData[selectedDrinkId]) return;

  const quantity = Math.max(1, parseInt(document.getElementById('customizer-drink-quantity').value, 10) || 1);
  const toppingPrice = [
    { id: 'boba', price: 5 },
    { id: 'oreo', price: 5 },
    { id: 'cornflakes', price: 5 },
    { id: 'wipcream', price: 15 }
  ].reduce((total, topping) => total + (
    document.getElementById(`customizer-topping-${topping.id}`).checked ? topping.price : 0
  ), 0);

  document.getElementById('customizer-drink-total').innerText = `${(menuData[selectedDrinkId].price + toppingPrice) * quantity} บาท`;
}

function updateDrinkMenuQty(itemId, change) {
  if (change < 0) {
    const orderIndex = [...drinkOrders].map((drink, index) => ({ drink, index }))
      .reverse()
      .find(({ drink }) => drink.itemId === itemId)?.index;

    if (orderIndex === undefined) return;
    drinkOrders[orderIndex].quantity += change;
    if (drinkOrders[orderIndex].quantity <= 0) {
      drinkOrders.splice(orderIndex, 1);
    }
  }

  updateDrinkQtyDisplay(itemId);
  calculateTotal();
}

function updateDrinkCustomizerQuantity(change) {
  const input = document.getElementById('customizer-drink-quantity');
  input.value = Math.max(1, (parseInt(input.value, 10) || 1) + change);
  updateDrinkCustomizerPrice();
}

function openRiceCustomizer() {
  document.querySelectorAll('input[name="rice_meat"], input[name="rice_sauce"]').forEach(input => {
    input.checked = false;
    input.dataset.selected = 'false';
  });
  document.getElementById('rice-addon-egg').checked = false;
  document.getElementById('rice-addon-extra-sauce').checked = false;
  document.getElementById('rice-customizer-quantity').value = '1';
  updateRiceCustomizerPrice();
  document.getElementById('rice-customizer-modal').classList.remove('hidden');
  updateBodyScrollLock();
}

function closeRiceCustomizer() {
  document.getElementById('rice-customizer-modal').classList.add('hidden');
  updateBodyScrollLock();
}

function updateRiceCustomizerPrice() {
  const quantity = Math.max(1, parseInt(document.getElementById('rice-customizer-quantity').value, 10) || 1);
  const addonPrice = (document.getElementById('rice-addon-egg').checked ? 10 : 0)
    + (document.getElementById('rice-addon-extra-sauce').checked ? 10 : 0);
  document.getElementById('rice-customizer-total').innerText = `${(65 + addonPrice) * quantity} บาท`;
}

function updateRiceCustomizerQuantity(change) {
  const input = document.getElementById('rice-customizer-quantity');
  input.value = Math.max(1, (parseInt(input.value, 10) || 1) + change);
  updateRiceCustomizerPrice();
}

function toggleRiceRadio(input) {
  const group = document.querySelectorAll(`input[name="${input.name}"]`);
  const shouldUncheck = input.dataset.selected === 'true';

  if (shouldUncheck) {
    setTimeout(() => {
      input.checked = false;
      input.dataset.selected = 'false';
      updateRiceCustomizerPrice();
    }, 0);
    return;
  }

  group.forEach(radio => radio.dataset.selected = 'false');
  input.dataset.selected = 'true';
  updateRiceCustomizerPrice();
}

function addCustomRiceBox() {
  const selectedMeat = document.querySelector('input[name="rice_meat"]:checked');
  const selectedSauce = document.querySelector('input[name="rice_sauce"]:checked');
  const addEgg = document.getElementById('rice-addon-egg').checked;
  const addExtraSauce = document.getElementById('rice-addon-extra-sauce').checked;
  const quantity = Math.max(1, parseInt(document.getElementById('rice-customizer-quantity').value, 10) || 1);

  if (!selectedMeat || !selectedSauce) {
    alert('กรุณาเลือกเนื้อสัตว์และซอสอย่างละ 1 อย่างครับ!');
    return;
  }

  let price = 65;
  const addonsText = [];
  if (addEgg) {
    price += 10;
    addonsText.push('เพิ่มไข่ดาว');
  }
  if (addExtraSauce) {
    price += 10;
    addonsText.push('เพิ่มซอส x2');
  }

  const boxName = `ข้าวกล่อง: ${selectedMeat.value} + ${selectedSauce.value}`;
  const detailsText = addonsText.length > 0 ? `(${addonsText.join(', ')})` : '(ปกติ)';
  const detailsKey = `${selectedMeat.value}|${selectedSauce.value}|${addEgg ? 'egg' : 'no-egg'}|${addExtraSauce ? 'extra-sauce' : 'normal'}`;
  const existingOrderIndex = riceBoxOrders.findIndex(order =>
    order.name === boxName && order.detailsKey === detailsKey
  );

  if (existingOrderIndex >= 0) {
    riceBoxOrders[existingOrderIndex].quantity += quantity;
  } else {
    riceBoxOrders.push({
      id: 'rice_box_' + Date.now(),
      name: boxName,
      details: detailsText,
      detailsKey,
      price,
      quantity
    });
  }

  document.querySelectorAll('input[name="rice_meat"]').forEach(input => input.checked = false);
  document.querySelectorAll('input[name="rice_sauce"]').forEach(input => input.checked = false);
  closeRiceCustomizer();
  calculateTotal();
}

function switchTab(tabName) {
  document.querySelectorAll('.menu-section').forEach(sec => sec.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('bg-red-600', 'text-white', 'tab-active');
    btn.classList.add('bg-neutral-900', 'text-neutral-300');
  });

  document.querySelectorAll('.category-banner').forEach(img => img.classList.add('hidden'));

  document.getElementById(`tab-${tabName}`).classList.remove('hidden');
  const activeImg = document.getElementById(`banner-${tabName}`);
  activeImg.classList.remove('hidden');

  currentActiveBannerSrc = activeImg.src;

  const activeBtn = document.getElementById(`tab-btn-${tabName}`);
  activeBtn.classList.remove('bg-neutral-900', 'text-neutral-300');
  activeBtn.classList.add('bg-red-600', 'text-white', 'tab-active');

  const bannerText = document.getElementById('banner-text');
  if (tabName === 'fries') bannerText.innerText = '🔥 เมนูเฟรนฟราย & ท็อปปิ้งสุดฟิน';
  else if (tabName === 'rice') bannerText.innerText = '🍱 เมนูข้าวกล่องร้อนๆ อร่อยคุ้ม';
  else if (tabName === 'drink') bannerText.innerText = '🧋 เครื่องดื่มเย็นชื่นใจ แก้วต่อแก้ว';
}

function openLightbox(imgSrc) {
  document.getElementById('lightbox-img').src = imgSrc;
  document.getElementById('image-lightbox').classList.remove('hidden');
  updateBodyScrollLock();
}

function closeLightbox() {
  document.getElementById('image-lightbox').classList.add('hidden');
  updateBodyScrollLock();
}

function highlightCustomerInfo() {
  const section = document.getElementById('customer-info-section');
  section.scrollIntoView({ behavior: 'smooth', block: 'center' });
  section.classList.remove('customer-info-attention');
  void section.offsetWidth;
  section.classList.add('customer-info-attention');
  setTimeout(() => section.classList.remove('customer-info-attention'), 2200);
}

function openCheckoutModal() {
  const name = document.getElementById('customer-name').value.trim();
  const phone = document.getElementById('customer-phone').value.trim();

  if (!name || !phone) {
    alert('กรุณากรอกชื่อและเบอร์โทรศัพท์ให้ครบถ้วนก่อนสั่งซื้อครับ!');
    highlightCustomerInfo();
    return;
  }

  let totalAmount = 0;
  let hasItems = false;
  let hasCategory = false;
  const checkoutList = document.getElementById('checkout-items-list');
  checkoutList.innerHTML = '';

  function appendCheckoutCategoryHeader(title) {
    const header = document.createElement('div');
    header.className = hasCategory
      ? 'flex items-center gap-2 pt-3 mt-2 border-t border-neutral-800 text-[11px] font-bold text-amber-400'
      : 'flex items-center gap-2 text-[11px] font-bold text-amber-400';
    header.innerText = title;
    checkoutList.appendChild(header);
    hasCategory = true;
  }

  const hasCartItems = Object.keys(cart).some(id => cart[id] > 0 && menuData[id]);
  if (hasCartItems) appendCheckoutCategoryHeader('🍟 เฟรนฟราย & ท็อปปิ้ง');

  for (const id in cart) {
    if (cart[id] > 0 && menuData[id]) {
      hasItems = true;
      const item = menuData[id];
      const subTotal = cart[id] * item.price;
      totalAmount += subTotal;

      const row = document.createElement('div');
      row.className = 'flex justify-between items-center pt-2 first:pt-0 text-neutral-300';
      row.innerHTML = `
        <span>${item.name} x ${cart[id]}</span>
        <span class="font-semibold text-white">${subTotal} บาท</span>
      `;
      checkoutList.appendChild(row);
    }
  }

  if (riceBoxOrders.length > 0) appendCheckoutCategoryHeader('🍱 ข้าวกล่อง');
  riceBoxOrders.forEach(box => {
    hasItems = true;
    const subTotal = box.price * box.quantity;
    totalAmount += subTotal;

    const row = document.createElement('div');
    row.className = 'flex justify-between items-center pt-2 first:pt-0 text-neutral-300';
    row.innerHTML = `
      <div>
        <p class="text-white">${box.name} x ${box.quantity}</p>
        <p class="text-[10px] text-neutral-400">${box.details}</p>
      </div>
      <span class="font-semibold text-white">${subTotal} บาท</span>
    `;
    checkoutList.appendChild(row);
  });

  if (drinkOrders.length > 0) appendCheckoutCategoryHeader('🧋 เครื่องดื่ม');
  drinkOrders.forEach(drink => {
    hasItems = true;
    const subTotal = drink.price * drink.quantity;
    totalAmount += subTotal;

    const row = document.createElement('div');
    row.className = 'flex justify-between items-center pt-2 first:pt-0 text-neutral-300';
    row.innerHTML = `
      <div>
        <p class="text-white">${drink.name} x ${drink.quantity}</p>
        <p class="text-[10px] text-neutral-400">${drink.details || '(ปกติ)'}</p>
      </div>
      <span class="font-semibold text-white">${subTotal} บาท</span>
    `;
    checkoutList.appendChild(row);
  });

  if (!hasItems) {
    alert('กรุณาเลือกสินค้าอย่างน้อย 1 รายการครับ!');
    return;
  }

  document.getElementById('summary-name').innerText = name;
  document.getElementById('summary-phone').innerText = phone;
  document.getElementById('checkout-total-price').innerText = `${totalAmount} บาท`;

  toggleCheckoutModal();
}

function updateCartModalList() {
  const listContainer = document.getElementById('cart-items-list');
  listContainer.innerHTML = '';

  let hasItems = false;
  let hasCategory = false;

  function appendCategoryHeader(title) {
    const header = document.createElement('div');
    header.className = hasCategory
      ? 'flex items-center gap-2 pt-4 mt-3 border-t border-neutral-800 text-xs font-bold text-amber-400'
      : 'flex items-center gap-2 text-xs font-bold text-amber-400';
    header.innerText = title;
    listContainer.appendChild(header);
    hasCategory = true;
  }

  const hasCartItems = Object.keys(cart).some(id => cart[id] > 0 && menuData[id]);
  if (hasCartItems) appendCategoryHeader('🍟 เฟรนฟราย & ท็อปปิ้ง');

  for (const id in cart) {
    if (cart[id] > 0 && menuData[id]) {
      hasItems = true;
      const item = menuData[id];
      const subTotal = cart[id] * item.price;

      const row = document.createElement('div');
      row.className = 'flex items-center justify-between pt-3 first:pt-0';
      row.innerHTML = `
        <div>
          <h4 class="text-sm font-semibold text-white">${item.name}</h4>
          <p class="text-xs text-neutral-400">${item.price} บาท × ${cart[id]}</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm font-bold text-red-400">${subTotal} บาท</span>
          <div class="flex items-center gap-1 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800">
            <button onclick="updateQty('${id}', -1)" class="w-6 h-6 rounded bg-neutral-800 text-xs text-white font-bold hover:bg-red-600">-</button>
            <span class="w-5 text-center text-xs font-semibold">${cart[id]}</span>
            <button onclick="updateQty('${id}', 1)" class="w-6 h-6 rounded bg-neutral-800 text-xs text-white font-bold hover:bg-red-600">+</button>
          </div>
        </div>
      `;
      listContainer.appendChild(row);
    }
  }

  if (riceBoxOrders.length > 0) appendCategoryHeader('🍱 ข้าวกล่อง');
  riceBoxOrders.forEach((box, idx) => {
    hasItems = true;
    const subTotal = box.price * box.quantity;
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between pt-3 first:pt-0';
    row.innerHTML = `
      <div>
        <h4 class="text-sm font-semibold text-white">${box.name}</h4>
        <p class="text-[10px] text-neutral-400">${box.details} | ${box.price} ฿</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm font-bold text-red-400">${subTotal} บาท</span>
        <div class="flex items-center gap-1 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800">
          <button onclick="updateRiceBoxQty(${idx}, -1)" class="w-6 h-6 rounded bg-neutral-800 text-xs text-white font-bold hover:bg-red-600">-</button>
          <span class="w-5 text-center text-xs font-semibold">${box.quantity}</span>
          <button onclick="updateRiceBoxQty(${idx}, 1)" class="w-6 h-6 rounded bg-neutral-800 text-xs text-white font-bold hover:bg-red-600">+</button>
        </div>
      </div>
    `;
    listContainer.appendChild(row);
  });

  if (drinkOrders.length > 0) appendCategoryHeader('🧋 เครื่องดื่ม');
  drinkOrders.forEach((drink, idx) => {
    hasItems = true;
    const subTotal = drink.price * drink.quantity;
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between pt-3 first:pt-0';
    row.innerHTML = `
      <div>
        <h4 class="text-sm font-semibold text-white">${drink.name}</h4>
        <p class="text-[10px] text-neutral-400">${drink.details || '(ปกติ)'} | แก้วละ ${drink.price} ฿</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm font-bold text-red-400">${subTotal} บาท</span>
        <div class="flex items-center gap-1 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800">
          <button onclick="updateDrinkOrderQty(${idx}, -1)" class="w-6 h-6 rounded bg-neutral-800 text-xs text-white font-bold hover:bg-red-600">-</button>
          <span class="w-5 text-center text-xs font-semibold">${drink.quantity}</span>
          <button onclick="updateDrinkOrderQty(${idx}, 1)" class="w-6 h-6 rounded bg-neutral-800 text-xs text-white font-bold hover:bg-red-600">+</button>
        </div>
      </div>
    `;
    listContainer.appendChild(row);
  });

  if (!hasItems) {
    listContainer.innerHTML = `
      <div class="text-center py-8 text-neutral-500 text-sm">
        🛒 ยังไม่มีสินค้าในตะกร้าของคุณ
      </div>
    `;
  }
}

function updateRiceCartSummary() {
  const container = document.getElementById('rice-cart-summary-list');
  if (riceBoxOrders.length === 0) {
    container.innerHTML = `<p class="text-xs text-neutral-500 text-center py-4">ยังไม่มีข้าวกล่องในรายการ</p>`;
    return;
  }

  container.innerHTML = riceBoxOrders.map((box, idx) => `
    <div class="flex items-center justify-between pt-2 first:pt-0">
      <div>
        <h4 class="text-xs font-semibold text-white">${box.name}</h4>
        <p class="text-[10px] text-neutral-400">${box.details} | ${box.price} ฿</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-red-400">${box.price * box.quantity} ฿</span>
        <div class="flex items-center gap-1 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800">
          <button onclick="updateRiceBoxQty(${idx}, -1)" class="w-5 h-5 rounded bg-neutral-800 text-[10px] text-white font-bold hover:bg-red-600">-</button>
          <span class="w-4 text-center text-xs font-semibold">${box.quantity}</span>
          <button onclick="updateRiceBoxQty(${idx}, 1)" class="w-5 h-5 rounded bg-neutral-800 text-[10px] text-white font-bold hover:bg-red-600">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function updateDrinkCartSummary() {
  const container = document.getElementById('drink-cart-summary-list');
  if (drinkOrders.length === 0) {
    container.innerHTML = `<p class="text-xs text-neutral-500 text-center py-4">ยังไม่มีเครื่องดื่มในรายการ</p>`;
    return;
  }

  container.innerHTML = drinkOrders.map((drink, idx) => `
    <div class="flex items-center justify-between pt-2 first:pt-0">
      <div>
        <h4 class="text-xs font-semibold text-white">${drink.name}</h4>
        <p class="text-[10px] text-neutral-400">${drink.details || '(ปกติ)'} | แก้วละ ${drink.price} ฿</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-red-400">${drink.price * drink.quantity} ฿</span>
        <div class="flex items-center gap-1 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800">
          <button onclick="updateDrinkOrderQty(${idx}, -1)" class="w-5 h-5 rounded bg-neutral-800 text-[10px] text-white font-bold hover:bg-red-600">-</button>
          <span class="w-4 text-center text-xs font-semibold">${drink.quantity}</span>
          <button onclick="updateDrinkOrderQty(${idx}, 1)" class="w-5 h-5 rounded bg-neutral-800 text-[10px] text-white font-bold hover:bg-red-600">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleCartModal() {
  document.getElementById('cart-modal').classList.toggle('hidden');
  updateBodyScrollLock();
}

function toggleCheckoutModal() {
  document.getElementById('checkout-modal').classList.toggle('hidden');
  updateBodyScrollLock();
}

window.addEventListener('DOMContentLoaded', () => {
  renderDynamicItems();
  calculateTotal();
});
