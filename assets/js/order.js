function buildOrderPayload() {
  const name = document.getElementById('customer-name').value.trim();
  const phone = document.getElementById('customer-phone').value.trim();

  const items = [];
  let totalAmount = 0;

  for (const id in cart) {
    if (cart[id] > 0 && menuData[id]) {
      const item = menuData[id];
      const lineTotal = cart[id] * item.price;
      items.push({
        productId: id,
        productName: item.name,
        quantity: cart[id],
        unitPrice: item.price,
        lineTotal
      });
      totalAmount += lineTotal;
    }
  }

  riceBoxOrders.forEach(box => {
    const lineTotal = box.price * box.quantity;
    items.push({
      productId: box.id,
      productName: `${box.name} ${box.details}`,
      quantity: box.quantity,
      unitPrice: box.price,
      lineTotal
    });
    totalAmount += lineTotal;
  });

  drinkOrders.forEach(drink => {
    const lineTotal = drink.price * drink.quantity;
    items.push({
      productId: drink.id,
      productName: `${drink.name} ${drink.details || '(ปกติ)'}`,
      quantity: drink.quantity,
      unitPrice: drink.price,
      lineTotal
    });
    totalAmount += lineTotal;
  });

  return {
    storeId: 'store_fries_tangtang',
    storeName: 'ร้านเฟรนฟรายตังค์ตังค์',
    customer: {
      name,
      phone
    },
    items,
    totalAmount,
    orderStatus: 'pending',
    createdAt: new Date().toISOString()
  };
}

async function confirmAndSendOrder() {
  const payload = buildOrderPayload();

  if (!payload.customer.name || !payload.customer.phone || payload.items.length === 0) {
    alert('กรุณากรอกข้อมูลและเลือกสินค้าก่อนยืนยันคำสั่งซื้อ');
    return;
  }

  try {
    const backendUrl = 'http://localhost:4000/api/guest-checkout';
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok) {
      alert(`ส่งออเดอร์สำเร็จ! รหัสออเดอร์: ${result.orderId || 'N/A'} 🎉`);
      toggleCheckoutModal();
      cart = {};
      riceBoxOrders = [];
      drinkOrders = [];
      document.querySelectorAll('[id^="qty-"]').forEach(el => el.innerText = '0');
      document.getElementById('customer-name').value = '';
      document.getElementById('customer-phone').value = '';
      calculateTotal();
    } else {
      alert(result.error || 'เกิดข้อผิดพลาดในการส่งข้อมูล');
    }
  } catch (error) {
    console.error(error);
    alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ backend ได้ กรุณาเปิด server ก่อน');
  }
}