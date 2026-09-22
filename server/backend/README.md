# Guest Checkout Backend Plan

This project is currently a frontend storefront. The next phase is to turn the order form into a real Guest Checkout flow.

## Payload contract

Frontend must send this exact object shape:

```json
{
  "storeId": "store_fries_tangtang",
  "storeName": "ร้านเฟรนฟรายตังค์ตังค์",
  "customer": {
    "name": "สมชาย",
    "phone": "0812345678"
  },
  "items": [
    {
      "productId": "fries_small",
      "productName": "เฟรนฟรายเส้นเล็ก",
      "quantity": 2,
      "unitPrice": 50,
      "lineTotal": 100
    },
    {
      "productId": "drink_thai_tea",
      "productName": "ชาไทย",
      "quantity": 1,
      "unitPrice": 35,
      "lineTotal": 35
    }
  ],
  "totalAmount": 135,
  "orderStatus": "pending",
  "createdAt": "2026-09-22T12:00:00.000Z"
}
```

## Database mapping

- customers: stores guest buyer name + phone
- orders: stores order metadata and total amount
- order_items: stores each ordered product line
- stores: keeps a static shop identity

## Recommended backend flow

1. Validate payload
2. Check store exists
3. Insert or reuse customer by phone
4. Create order record
5. Insert order items in a transaction
6. Return order ID to frontend
7. Forward to n8n webhook for notifications

## Example files

- server/backend/guestCheckoutEndpoint.js
- server/db/schema.sql
- server/backend/.env.example

## PostgreSQL notes

Use the database URL in environment variables:

```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/formstore
PORT=4000
```
