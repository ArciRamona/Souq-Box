# 🛍️ SouqBox - Full-Stack E-Commerce Platform

Welcome to **SouqBox**, a full-featured MERN (MongoDB, Express.js, React.js, Node.js) based e-commerce platform built with scalability, performance, and design in mind. This project integrates modern frontend UX, backend API architecture, secure authentication, and future-ready data science hooks for predictive insights.

---

## 🚀 Features

### 🛒 Customer Features

- User authentication & authorization (JWT + Redux Persist)
- Product browsing with dynamic routing
- Cart management with quantity controls
- Checkout process with shipping and payment method
- Stripe payment integration (Credit Card & Checkout)
- Order summary, invoice generation & download (PDF)
- Submit & view product reviews (Only after purchase)
- Responsive design for mobile & desktop

### 🧑‍💼 Admin Features

- Admin dashboard with layout
- Manage products (Add/Edit/Delete)
- View all users and orders
- Sales tracking cards (revenue/orders)
- Protected admin routes

### ⚙️ Tech Stack

| Layer            | Tech Stack                         |
| ---------------- | ---------------------------------- |
| Frontend         | React, Redux Toolkit, React Router |
| Backend          | Node.js, Express.js                |
| Database         | MongoDB (Mongoose)                 |
| Authentication   | JWT, Redux Persist, Cookies        |
| Styling          | Bootstrap, Custom CSS              |
| Payments         | Stripe                             |
| State Mgmt       | Redux Toolkit + RTK Query          |
| Charts (Planned) | Recharts / Chart.js                |
| DevOps Ready     | Vercel / Render deployment ready   |

---

## 📦 Folder Structure

```
📦 souqboxit-ecommerce
├── frontend/
│   ├── components/
│   ├── redux/
│   ├── pages/
│   ├── App.js
│   └── index.js
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── server.js
│   └── utils/
├── .env
├── README.md
└── package.json
```

---

## 💻 Installation

### Clone Repo

```bash
git clone https://github.com/yourusername/soukboxit-ecommerce.git
cd soukboxit-ecommerce
```

### Setup Environment Variables

Create `.env` in `/backend` with:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_key
```

### Install Dependencies

```bash
# Backend
yarn install or npm install
cd frontend
# Frontend
yarn install or npm install
```

### Run Dev Server

```bash
# In root folder
npm run dev
```

---

## 🔒 Authentication

- Login & registration for users
- JWT-based authentication
- Role-based access control for Admin
- Redux Persist for login persistence

---

## 📊 Future Data Science Features (Planned)

- Sales Forecasting with Time Series Models
- Customer Segmentation (RFM)
- Product Recommendation Engine (Collaborative Filtering)
- Dashboard insights with dynamic charts

---

## 📄 License

MIT License

---

## ✨ Credits

Built with ❤️ by Gladys Ando Doroin

> "Tech meets creativity — for smarter online shopping."

---

## 📬 Contact

- Email: gbav.business@gmail.com
- Portfolio: https://gladys-doroin-portfolio.vercel.app/
- LinkedIn: https://www.linkedin.com/in/gladys-ando-b73257251/
<<<<<<< HEAD
=======

>>>>>>> 13031434f1ea8ff442aa5ed0cf1def2138277518
