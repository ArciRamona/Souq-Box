# 🛒 SoukBoxIT E-Commerce Platform

Welcome to **SoukBoxIT**, a full-featured e-commerce web app with secure user authentication, product management, Stripe payment integration, order tracking, cart synchronization, and admin tools.

---

## 📦 Features Overview

### ✅ Customer Features

- 🔐 Login/Register with JWT authentication
- 👤 Profile management (upload avatar, update password)
- 🛒 Cart with localStorage + user sync
- 🚚 Shipping and tax calculation
- 💳 Stripe Payment + Cash on Delivery
- 📜 Order invoice download
- 🗂️ View past orders and order details
- 🧾 Order success state with cart clearing

### 🔧 Admin Features

- 🔍 View all orders
- ✅ Update order status
- 🗑️ Dev route to delete test orders

---

## ⚙️ Project Structure

```
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   └── middlewares
├── frontend
│   ├── components
│   │   ├── auth, cart, layout, order, product, user
│   ├── redux
│   ├── App.js, index.js
│   └── assets, helpers
```

---

## 🔒 Authentication

- JWT stored in cookies (and optionally header)
- Middleware: `isAuthenticatedUser`
  ```js
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
  ```
- Token passed via RTK Query `prepareHeaders`

---

## 💳 Stripe Integration

### `POST /api/v1/payment/checkout_session`

- Creates a Stripe session with:
  - `client_reference_id`: User ID
  - `metadata`: Shipping & tax details
  - `success_url`: Includes `?order_success=true`

### `POST /api/v1/webhook`

- Listens to `checkout.session.completed`
- Extracts metadata and creates `Order` in MongoDB

---

## DEBUGGING

## 🧹 Cart Clearing Logic

### ✅ In frontend `MyOrders.jsx`

```js
const [searchParams] = useSearchParams();
const ordersSuccess = searchParams.get("order_success") === "true";

useEffect(() => {
  if (ordersSuccess) {
    dispatch(clearCart());
    localStorage.removeItem("cartItems");
    localStorage.removeItem(`cartItems_${user?._id}`);
    navigate("/me/orders", { replace: true });
  }
}, [...]);
```

✅ Works if `success_url` contains `order_success=true`

---

## 🧪 Dev Utility: Clear Fake Orders

### Backend route added:

```js
router.delete("/admin/dev/clear-fake-orders", async (req, res) => {
  const result = await Order.deleteMany({
    user: "<user-id>",
    "paymentInfo.status": "Not Paid",
  });
  res.status(200).json({ success: true, deleted: result.deletedCount });
});
```

### Run via CURL:

```bash
curl -X DELETE http://localhost:3004/api/v1/admin/dev/clear-fake-orders \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

## 🔄 Common Issues & Fixes

### ❌ `Resource not found. Invalid: _id`

- Caused by bad endpoint: `url: "/orders/me."` ← extra period!

### ❌ Cart not clearing

- Ensure success URL includes param: `?order_success=true`
- Add check in `useEffect`

### ❌ MyOrders not showing

- Double check token in `Authorization` header
- Console logs: `req.user?._id`

---

## 🧠 Tips for Maintenance

- Use `console.log()` in backend routes to trace auth, IDs
- Use RTK Query's `prepareHeaders` to send token
- Use `useSearchParams()` for payment flow logic
- Use `localStorage.removeItem()` carefully per user

---

## 📌 Author

**Gladys Doroin** — Full Stack Developer, Designer & Project Builder

---

> 🎉 "It took 4 days of debugging... but now it works beautifully."

# 🐞 Debug Log: "Orders Not Showing After Payment"

## ❗ Problem Summary

After successfully completing payment and being redirected to `/orders/me`, the page displayed:

- "No orders found"
- Or a 400 error: "Resource not found. Invalid:\_id"

Despite the user being logged in, orders were not fetched or displayed correctly.

---

## 🔍 Root Causes Identified

1. **Incorrect API Endpoint in `orderApi.js`**

   ```js
   url: "/api/v1/orders/me."; // ❌ extra period
   ```

   - This misrouted the call and was interpreted as `/orders/:id`.

2. **Token Not Sent Properly in Headers**

   - Token was available in Redux but not attached to outgoing requests correctly.

3. **Backend `isAuthenticatedUser` Only Read Cookies**

   - The middleware wasn't checking `Authorization` headers.

4. **No Console Logs from Backend**

   - Developer added `console.log("📥 User ID from req.user:", req.user?._id)` but it never triggered due to failed routing.

5. **RTK Query Misconfiguration**
   - `prepareHeaders` was not applied, so token wasn’t attached.

---

## ✅ Fixes Implemented

### ✅ 1. Fixed `orderApi.js` Endpoint

```js
getMyOrders: builder.query({
  query: () => ({
    url: "/orders/me", // ✅ Corrected endpoint
  }),
}),
```

### ✅ 2. Ensure Authorization Header is Sent

```js
prepareHeaders: (headers, { getState }) => {
  const token = getState().auth.token;
  if (token) headers.set("authorization", `Bearer ${token}`);
  return headers;
},
```

### ✅ 3. Updated Backend Middleware

In `isAuthenticatedUser`:

```js
const token =
  req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
```

### ✅ 4. Verified with Console Logs

```js
console.log("📥 User ID from req.user:", req.user?._id, typeof req.user?._id);
```

---

## 💡 Lessons Learned

- Double-check **endpoint URLs** — even a `.` can break things
- Confirm **token handling** on both client and server
- Use `console.log()` strategically in the backend
- RTK Query **doesn’t attach headers automatically** — `prepareHeaders` is critical
- Test protected routes with correct headers AND cookies if needed

---

## 🛠️ Future Improvements

- Add better toast error messages for failed requests
- Show status codes in toast for easier debugging
- Auto-log users out on token expiration

---

## 🧰 Backed Up

Branch: `fix/orders-working-version`

---

## 🚀 Final Result

## 🧼 Dev Cleanup: Fake Orders Not Clearing After Payment

❗ Problem Summary

After placing test orders (e.g., with Cash on Delivery or unpaid Stripe sessions), old unpaid “Not Paid” orders were piling up in the system. Even though the cart cleared, the /orders/me page kept showing many fake/duplicate unpaid orders.

🐛 Root Causes
• clearCart() removed cart items from Redux + localStorage — ✅ worked fine.
• However, previously placed unpaid orders were stored in MongoDB and not removed.
• This led to a growing list of test orders being fetched from the /orders/me API.

✅ Quick Dev Solution: Clear Test Orders (Manually or via Admin Route)

🧪 You can clear test orders via:

✅ 1. Mongo Shell (One-time):

await Order.deleteMany({
user: "67697619ec0d7206c2038949",
"paymentInfo.status": "Not Paid"
});

✅ 2. Add an Admin-Only Cleanup Route

In your Express Router file, typically routes/orderRoutes.js:

import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";
import Order from "../models/order.js";

const router = express.Router();

// 🧼 Dev Route: Clear Fake Orders
router.delete(
"/admin/dev/clear-fake-orders",
isAuthenticatedUser,
authorizeRoles("admin"), // 🔐 Ensure only admins can use this
async (req, res) => {
try {
const result = await Order.deleteMany({
user: "67697619ec0d7206c2038949", // Replace with actual test user ID
"paymentInfo.status": "Not Paid"
});

      res.status(200).json({ success: true, deleted: result.deletedCount });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }

}
);

📡 How to Trigger It from Terminal (using cURL):

curl -X DELETE http://localhost:3004/api/v1/admin/dev/clear-fake-orders \
 -H "Authorization: Bearer <your-admin-JWT-token>"

Result (example):

{"success":true,"deleted":34}

✅ Notes & Best Practices
• Only use this in development — never in production.
• Consider putting this route inside a devRoutes.js or devController.js.
• You can replace the hardcoded user ID with req.user.\_id if you want it dynamic.
• Optional: add this action to an admin-only button in the dashboard UI.

💡 Final Tips
• This solution helps you keep your test data clean ✅
• Your cart clearing logic is working ✅
• But it’s important to also clean backend artifacts like unpaid test orders manually or via admin tools
