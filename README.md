# 🛒 Node.js API — Users, Products & Admin Features

RESTful API built with **Node.js + Express + MongoDB (Mongoose)**  
Supports JWT Authentication, Role-based Authorization, Global Error Handling, Soft Delete & Restore, Yup Validation, Reusable Utilities, and Clean Controllers/Routes.

## 📁 Project Structure

├── controllers/
│   ├── authControllers.js        # Handles user authentication (login, register, getMe)
│   ├── userControllers.js        # CRUD operations for users
│   ├── productControllers.js     # CRUD operations for products
│   └── adminController.js        # Admin-specific operations (view deleted, restore, etc.)

├── middleware/
│   ├── auth.js                   # Authentication & authorization middlewares
│   └── validation.js             # Middleware for Yup validation schemas

├── models/
│   ├── userModel.js              # User schema & model
│   └── productModel.js           # Product schema & model

├── routes/
│   ├── authRoutes.js             # Routes for auth (register, login, me)
│   ├── userRoutes.js             # Routes for user CRUD
│   ├── productRoutes.js          # Routes for product CRUD
│   └── adminRoutes.js            # Admin-only routes

├── validation/
│   ├── registerValidation.js     # Yup schema for registration
│   ├── loginValidation.js        # Yup schema for login
│   └── productValidation.js      # Yup schema for product creation & update

├── utils/
│   ├── asyncCatch.js             # Async wrapper for controllers
│   └── appError.js               # Custom Error class

├── app.js                        # Main Express app setup
└── server.js                     # Server start and DB connection


## 🔐 Authentication & Authorization

- **JWT Authentication**: Login returns a JWT token.
- **Protected Routes**: Require `Authorization: Bearer <token>` header.
- **Middleware**:
  - `protect` → verifies token and attaches `req.user`
  - `restrictTo(...roles)` → allows only specific roles (e.g., `"admin"`)

## 👤 Users

- Users can register, login, update their profile.
- Soft delete is implemented via `isDeleted` field.
- Admins can view deleted users and restore them.

Endpoints:

POST   /api/v1/auth/register         → Register user (with validation)
POST   /api/v1/auth/login            → Login user (with validation)
GET    /api/v1/auth/me               → Get logged-in user
GET    /api/v1/users                  → Get all users
GET    /api/v1/users/:id              → Get user by ID
POST   /api/v1/users                  → Create new user
PATCH  /api/v1/users/:id              → Update user
DELETE /api/v1/users/:id              → Soft delete user

## 🛍️ Products

- All product routes are protected.
- Soft delete implemented via `isDeleted`.
- Admins can see deleted products and restore them.

Endpoints:

GET    /api/v1/products               → Get all products
GET    /api/v1/products/:id           → Get product by ID
POST   /api/v1/products               → Create product (with validation)
PATCH  /api/v1/products/:id           → Update product (with validation)
DELETE /api/v1/products/:id           → Soft delete product

- On creation, `createdBy` is set to `req.user._id`.

## 🛡️ Admin Routes

- Restricted to users with role `"admin"`.
- Can view deleted users/products and restore them.
- Can disable accounts permanently if extended.

Endpoints:

GET    /api/v1/admin/deleted-users         → Get all soft-deleted users
GET    /api/v1/admin/deleted-products      → Get all soft-deleted products
PATCH  /api/v1/admin/restore-user/:id      → Restore a deleted user
PATCH  /api/v1/admin/restore-product/:id   → Restore a deleted product

## ✅ Validation (Yup)

- **Register** → validates name, email, age, password
- **Login** → validates email & password
- **Products** → validates title, name, price, description, category

Options used:
- `abortEarly: false` → collects all validation errors at once
- `stripUnknown: true` → removes unknown fields from request body

## 🧰 Utilities

- **asyncCatch** → Wraps controllers to handle errors without try/catch
- **appError** → Custom error class with message and `statusCode`

## 🔒 Security Notes

- Passwords are hashed before saving
- JWT tokens expire
- Role-based access control
- Soft delete prevents permanent data loss

## ▶️ Run Project

npm install
npm start

Environment variables:

JWT_SECRET=your_secret
JWT_EXPIRES_IN=90d
MONGO_URI=mongodb://...
NODE_ENV=development

## 🎯 Summary

- Clean controllers and routes structure
- JWT authentication & role-based authorization
- Soft delete + restore functionality
- Input validation with Yup
- Global error handling
- Consistent API responses
- Ready for further features like uploads, refresh tokens, pagination, search, etc.
