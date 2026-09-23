const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.post('/api/guest-checkout', async (req, res) => {
  try {
    const payload = req.body;

    const requiredFields = ['storeId', 'storeName', 'customer', 'items', 'totalAmount'];
    for (const field of requiredFields) {
      if (!payload[field]) {
        return res.status(400).json({ error: `Missing field: ${field}` });
      }
    }

    if (!payload.customer.name || !payload.customer.phone) {
      return res.status(400).json({ error: 'Customer name and phone are required' });
    }

    if (!Array.isArray(payload.items) || payload.items.length === 0) {
      return res.status(400).json({ error: 'At least one item is required' });
    }

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const storeCheck = await client.query(
        'SELECT store_id FROM stores WHERE store_id = $1',
        [payload.storeId]
      );

      if (storeCheck.rowCount === 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: 'Store not found' });
      }

      const customerResult = await client.query(
        `INSERT INTO customers (name, phone)
         VALUES ($1, $2)
         ON CONFLICT (phone) DO UPDATE SET name = EXCLUDED.name
         RETURNING id, name, phone`,
        [payload.customer.name.trim(), payload.customer.phone.trim()]
      );

      const customer = customerResult.rows[0];
      const orderId = `ORD-${Date.now()}`;

      const orderResult = await client.query(
        `INSERT INTO orders (order_id, store_id, customer_id, total_amount, order_status)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, order_id`,
        [orderId, payload.storeId, customer.id, payload.totalAmount, payload.orderStatus || 'pending']
      );

      const order = orderResult.rows[0];

      for (const item of payload.items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, line_total)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            order.id,
            item.productId,
            item.productName,
            item.quantity,
            item.unitPrice,
            item.lineTotal,
          ]
        );
      }

      await client.query('COMMIT');

      return res.status(201).json({
        success: true,
        orderId: order.order_id,
        customer: {
          id: customer.id,
          name: customer.name,
          phone: customer.phone,
        },
        totalAmount: payload.totalAmount,
        message: 'Guest checkout saved successfully',
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Guest checkout failed:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Guest Checkout API running on port ${port}`);
});
