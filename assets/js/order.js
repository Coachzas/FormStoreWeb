function buildOrderPayload() {
  const name = document.getElementById('customer-name').value.trim();
  const phone = document.getElementById('customer-phone').value.trim();

  const items = [];
  let totalAmount = 0;

  for (const id in cart) {
    if (cart[id] > 0 && menuData[id]) {
      const item = menuData[id];
      const subtotal = cart[id] * item.price;
      items.push({
        itemId: id,
        name: item.name,
        quantity: cart[id],
        price: item.price,
        subtotal
      });
      totalAmount += subtotal;
    }
  }

  riceBoxOrders.forEach(box => {
    const subtotal = box.price * box.quantity;
    items.push({
      itemId: box.id,
      name: `${box.name} ${box.details}`,
      quantity: box.quantity,
      price: box.price,
      subtotal
    });
    totalAmount += subtotal;
  });

  drinkOrders.forEach(drink => {
    const subtotal = drink.price * drink.quantity;
    items.push({
      itemId: drink.id,
      name: `${drink.name} ${drink.details || '(ปกติ)'}`,
      quantity: drink.quantity,
      price: drink.price,
      subtotal
    });
    totalAmount += subtotal;
  });

  return {
    store: 'ร้านเฟรนฟรายตังค์ตังค์',
    customerName: name,
    customerPhone: phone,
    items,
    totalAmount,
    timestamp: new Date().toISOString()
  };
}

async function confirmAndSendOrder() {
  const payload = buildOrderPayload();

  if (!payload.customerName || !payload.customerPhone || payload.items.length === 0) {
    alert('กรุณากรอกข้อมูลและเลือกสินค้าก่อนยืนยันคำสั่งซื้อ');
    return;
  }

  try {
    const webhookUrl = 'https://collar-comrade-backrest.ngrok-free.dev/webhook/Form-fries-order';
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert('ส่งออเดอร์สำเร็จ! รายการถูกส่งให้แม่ค้าเรียบร้อยแล้วครับ 🎉');
      toggleCheckoutModal();
      cart = {};
      riceBoxOrders = [];
      drinkOrders = [];
      document.querySelectorAll('[id^="qty-"]').forEach(el => el.innerText = '0');
      document.getElementById('customer-name').value = '';
      document.getElementById('customer-phone').value = '';
      calculateTotal();
    } else {
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
    }
  } catch (error) {
    console.error(error);
    alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ n8n ได้');
  }
}
