🛍️ SouqBox - Full-Stack E-Commerce Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white" alt="React Badge" />
  <img src="https://img.shields.io/badge/Node.js-18.x-green?logo=node.js&logoColor=white" alt="Node.js Badge" />
  <img src="https://img.shields.io/badge/Express.js-4.x-black?logo=express&logoColor=white" alt="Express Badge" />
  <img src="https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb&logoColor=white" alt="MongoDB Badge" />
  <img src="https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux&logoColor=white" alt="Redux Badge" />
  <img src="https://img.shields.io/badge/Stripe-API-blueviolet?logo=stripe&logoColor=white" alt="Stripe Badge" />
</p>

⸻

🚀 Project Overview

SouqBox is a full-featured MERN (MongoDB, Express.js, React.js, Node.js) based E-Commerce platform, integrating modern frontend UX, backend API architecture, Stripe payments, secure authentication, and future-ready data science hooks.

⸻

🛒 Customer Features
• 🔐 Secure Login/Register (JWT + Redux Persist)
• 🛍️ Product browsing and dynamic search
• 🛒 Cart management with quantity control
• 🚚 Shipping address and tax handling
• 💳 Stripe Payment Gateway + Cash on Delivery (COD)
• 📜 Downloadable Order Invoices (PDF)
• 📝 Submit and View Product Reviews (after purchase)
• 📋 Order history with details
• 📱 Fully Responsive (Mobile & Desktop)

⸻

🧑‍💼 Admin Features
• 📊 Admin Dashboard
• 📦 Product Management (Create/Edit/Delete)
• 👥 User Management (View/Edit Roles)
• 🛒 Order Management (View/Update Status)
• 💰 Sales & Orders Cards
• 🔒 Protected Admin Routes

⸻

⚙️ Tech Stack

Layer Technology
Frontend React.js, Redux Toolkit, RTK Query
Backend Node.js, Express.js
Database MongoDB (Mongoose ORM)
Authentication JWT, Redux Persist, Cookies
Payments Stripe API
Charts (Planned) Recharts / Chart.js
Deployment Vercel (Frontend) + Render (Backend)

⸻

📦 Folder Structure

📦 SouqBoxIT
├── frontend/
│ ├── components/
│ │ ├── auth/
│ │ ├── cart/
│ │ ├── layout/
│ │ ├── order/
│ │ ├── product/
│ │ └── user/
│ ├── redux/
│ ├── App.js
│ ├── index.js
│ └── assets/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── utils/
├── .env
├── README.md
├── package.json

⸻

🛡️ Authentication
• JWT stored securely in cookies
• Middleware isAuthenticatedUser verifies tokens
• Admin-only protected routes
• Redux Persist ensures user sessions

const token =
req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

⸻

💳 Stripe Payment Integration
• Real-time Checkout session
• Webhook (/api/v1/webhook) to capture Stripe payment success
• Orders automatically created in MongoDB after successful payment

⸻

📈 Planned Future Enhancements (Post Google Advanced Data Analytics Certificate)
• 📈 Sales forecasting (Time Series models)
• 🎯 Customer segmentation (RFM Analysis)
• 🤖 Product Recommendation Engine
• 📊 Admin Dashboard Insights (Recharts / Chart.js)
• 🛒 Business Decision Triggers (Auto-restock, Promotions)

⸻

🛠 Setup & Installation

1. Clone Repository

git clone https://github.com/ArciRamona/Souq-Box.git
cd soukboxit-ecommerce

2. Install Dependencies

# Backend

npm install

# Frontend

cd frontend
npm install

3. Create Environment Variables

Create a .env file inside /backend:

PORT=3004
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

4. Start Dev Servers

# From root folder

npm run dev

⸻

📊 Google Data Analytics + Project Roadmap

Week Certificate Focus Project Application
1 Data Roles, Lifecycle Define KPIs, Project Scope
2 Data-Driven Questions Key Business Questions
3 Prepare Raw Data Export MongoDB -> CSV
4 Process Data Pandas Cleaning
5 Analyze Data Top Products, Sales Trends
6 Visualization Recharts in Admin Dashboard
7 Data Strategy Business Improvement Ideas
8–9 Capstone Build Dashboard + Insights
10 Resume + GitHub Portfolio Launch Project

⸻

📜 License

This project is licensed under the MIT License.

⸻

✨ Author

Built with ❤️ by Gladys Ando Doroin

“Tech meets creativity — for smarter online shopping.”

    •	✉️ Email: gbav.business@gmail.com
    •	🌐 Portfolio: gladys-doroin-portfolio.vercel.app
    •	💼 LinkedIn: www.linkedin.com/in/gladys-ando-b73257251

⸻

✅ This README is now professional, GitHub-optimized, and job-application-ready!

⸻

Would you like me next to also generate:
• 📜 a short professional GitHub project description
• 🔖 best project tags/topics (React, Node, MongoDB, Ecommerce, Fullstack)
for your GitHub repository page? (Highly recommended before publishing!) 🚀
Just say “Yes, give me repo description!” 📦✨
