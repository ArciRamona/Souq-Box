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

# Souk-Box-IT + Google Advanced Data Analytics Combination

⸻

🗓️ 10-Week Study Plan (10–12 hrs/week)

Each week integrates course topics + real project application.

⸻

✅ Week 1: Foundations of Data Analytics
• Google Course: Roles, tools, data lifecycle, data types.
• Project Work: Write a README about your data goals (sales, customer behavior).
• Outcome: Clarity on how data flows in your app.

⸻

✅ Week 2: Ask Questions to Make Data-Driven Decisions
• Google Course: Business tasks → data questions → metrics.
• Project Work: Create business questions:
• “What products have the highest return rate?”
• “What hours/days have peak sales?”
• Outcome: Data questions to guide your analysis and dashboards.

⸻

✅ Week 3: Prepare Data for Exploration
• Google Course: Data formats, cleaning basics.
• Project Work: Export dummy sales/orders data from MongoDB → CSV.
• Use pandas to clean missing values, normalize dates, etc.
• Outcome: Clean base dataset from your store.

⸻

✅ Week 4: Process Data (Data Wrangling)
• Google Course: Using spreadsheets + SQL basics.
• Project Work: Clean your order data with pandas:
• Remove duplicates
• Parse dates
• Merge user/order/product data
• Outcome: Final merged dataset ready for analysis.

⸻

✅ Week 5: Analyze Data to Answer Questions
• Google Course: Aggregation, groupby, descriptive stats.
• Project Work:
• Top 5 most sold products
• Average order value per customer
• Outcome: Exploratory analysis for your dashboard.

⸻

✅ Week 6: Share Data via Visualizations
• Google Course: Charts, dashboards, storytelling.
• Project Work:
• Use Recharts or Chart.js to create:
• Sales by day
• Top categories
• Customer order frequency
• Outcome: Admin dashboard for insights.

⸻

✅ Week 7: Data-Driven Decision-Making
• Google Course: Case studies, data strategy.
• Project Work: Identify business decisions:
• Restock strategies
• Discount triggers
• Product bundling
• Outcome: Data-driven improvements.

⸻

✅ Week 8–9: Capstone Project
• Combine:
• Clean data
• SQL or pandas queries
• Visualizations
• Deliverables:
• Presentation slide (Google Slides/Notion)
• Dashboard in your app

⸻

✅ Week 10: Resume + Portfolio Week
• Create:
• 📄 Resume with “Google Data Analytics Certificate” + project
• 💼 Portfolio GitHub + deployed dashboard
• 📦 Final project repo (organized folders)

⸻

🛠 Tools You’ll Be Using

Google Cert Your Project
Google Sheets MongoDB, JSON exports
BigQuery (option) Pandas + Jupyter Notebook
Tableau (intro) Recharts/Chart.js in React
SQL (BigQuery-style) Aggregation in Mongo/SQL engine
R (intro) Skip, unless you want bonus depth

⸻

Would you like me to turn this into a printable Notion/GitHub roadmap, or split each week into daily study tasks for better tracking?

Google Data Analytics + E-Commerce Project Roadmap

✨ Goal

Combine the Google Data Analytics Professional Certificate with a real-world E-Commerce + MERN + Data Science project.

⸻

📅 10-Week Study Plan (10–12 hrs/week)

Each week includes certificate lessons + project application.

Week 1: Foundations of Data Analytics
• Certificate: Understand data roles, tools, types.
• Project: Write project scope in README: goals, KPIs, user stories.
• Output: Project charter.

Week 2: Ask Data-Driven Questions
• Certificate: How to turn business tasks into analytical questions.
• Project: Write 5 key questions (e.g. What are top-selling items by category?).
• Output: Project research questions in Notion or README.

Week 3: Prepare Data
• Certificate: Collecting + understanding raw data.
• Project: Export order data from MongoDB, clean using Pandas.
• Output: Cleaned orders.csv, users.csv, products.csv.

Week 4: Process Data
• Certificate: Wrangling data, data types, integrity.
• Project: Use Pandas to normalize formats, merge datasets.
• Output: Final merged_df.csv ready for analysis.

Week 5: Analyze Data
• Certificate: Descriptive stats, groupby, aggregations.
• Project:
• Top products
• Average customer value
• Monthly sales trend
• Output: Jupyter Notebook or SQL queries.

Week 6: Share with Visualizations
• Certificate: Data storytelling, charts.
• Project: Use Recharts/Chart.js to visualize trends on admin dashboard.
• Output: Embedded charts in your MERN admin panel.

Week 7: Data-Informed Decisions
• Certificate: Data strategy, business decision case studies.
• Project: Apply insights:
• Restock alerts
• Auto-discounts
• Category focus
• Output: Feature suggestions based on insights.

Week 8: Capstone - Part 1
• Prepare:
• Problem + question
• Clean dataset
• Basic insights
• Output: Jupyter notebook + initial visual dashboard draft.

Week 9: Capstone - Part 2
• Refine:
• Add visualizations
• Summarize findings
• Output: Notion/GitHub report + portfolio PDF.

Week 10: Resume + Portfolio Week
• Add to GitHub:
• data/, notebooks/, insights.md, README.md
• Deploy dashboard (Vercel/Netlify)
• Update resume with:
• Google Certificate
• E-Commerce Dashboard Project
• Output: Finalized resume + portfolio link

⸻

📈 Tools Summary

Google Certificate Your Project
Google Sheets MongoDB exports
BigQuery SQL Pandas + Jupyter Notebook
Tableau (optional) Recharts / Chart.js
R (intro only) Skipped unless desired

⸻

🔧 Repo Folder Suggestions

/project-root
/data # Cleaned CSV/JSON data
/notebooks # Exploratory analysis in Python
/dashboards # React components using Recharts
/public # Images, logos, icons
README.md # Project overview, goals, results
insights.md # Visual findings and recommendations

⸻

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
