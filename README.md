# 🛒 ShopSphere

A full-stack E-Commerce web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). ShopSphere allows users to browse products, manage a shopping cart, place orders, and view order history, while administrators can manage products and orders through a dedicated dashboard.

---

## 🚀 Features

### User Features

* User Registration & Login
* JWT Authentication
* Browse Products
* Search Products
* View Product Details
* Add Products to Cart
* Remove Products from Cart
* Place Orders
* View Order History

### Admin Features

* Add New Products
* Edit Existing Products
* Delete Products
* Manage Product Inventory
* View All Orders
* Update Order Status

---

## 🏗️ Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MongoDB
* Mongoose

---

## 📂 Project Structure

```text
ShopSphere/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── services/
    │   ├── context/
    │   ├── App.jsx
    │   └── main.jsx
    │
    ├── package.json
    └── vite.config.js
```

---

## 📊 Database Collections

### Users

Stores user information and roles.

### Products

Stores product details such as:

* Name
* Description
* Price
* Category
* Stock
* Image URL

### Cart

Stores products added to a user's cart.

### Orders

Stores placed orders and order status.

---

## 🔐 Authentication & Authorization

* Passwords are securely hashed using bcryptjs.
* JWT tokens are used for authentication.
* Protected routes ensure only authorized users can access restricted features.
* Role-based access control for admin operations.

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Rahul-g-7/shopsphere.git
cd shopsphere
```

### Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run Backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 📌 API Endpoints

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

### Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Cart

```text
GET    /api/cart
POST   /api/cart
DELETE /api/cart/:productId
```

### Orders

```text
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id/status
```

---

## 🎯 DBMS Concepts Demonstrated

* CRUD Operations
* Collections & Documents
* Authentication
* Authorization
* Data Relationships
* MongoDB References
* Aggregation Queries
* Indexing
* Search Functionality

---

## 💡 Future Enhancements

* Product Reviews & Ratings
* Payment Gateway Integration
* Wishlist Functionality
* Product Image Upload
* Sales Analytics Dashboard
* Email Notifications
* Order Tracking

---

## 👨‍💻 Author

**Rahul G**

GitHub: https://github.com/Rahul-g-7

---

## 📜 License

This project is developed for educational and learning purposes.
