# 🛒 Node.js API — Authentication, Authorization, Users & Products

This project is a RESTful API built with **Node.js, Express, and MongoDB (Mongoose)**.

It provides:

- JWT authentication
- Role-based authorization
- Global error handling
- Soft delete support
- Reusable utilities
- Clear route and controller structure

---

## 📁 Project Structure

```
controllers/
 ├─ authControllers.js
 ├─ productControllers.js
 └─ userControllers.js

middleware/
 └─ auth.js

models/
 ├─ userModel.js
 └─ productModel.js

routes/
 ├─ authRoutes.js
 ├─ userRoutes.js
 └─ productRoutes.js

utils/
 ├─ asyncCatch.js
 └─ appError.js

app.js / server.js
```

---

## 🔐 Authentication & Authorization

### JWT Authentication

After login, the API returns a **JWT token**.  
Protected routes require the header:

```
Authorization: Bearer <token>
```

Middleware:

- `protect` — validates the token and attaches the user to the request
- `restrictTo("admin")` — allows only admin users to access specific routes

---

## ⚙️ Global Error Handling

All errors pass through the central error handler:

```
errorHandler.js
```

Response format example:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400
}
```

---

## 🧰 Utilities

### asyncCatch

Handles async controller errors without manual try/catch:

```js
module.exports = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
```

### appError

Creates custom errors with a status code:

```js
throw new appError('Not found', 404);
```

---

## 👤 User Model

- Password fields are hidden from responses (`select: false`)
- Passwords are hashed before saving
- Soft delete is implemented using the field `isDeleted`

---

## 📌 Auth Endpoints

### Register

```
POST /api/v1/auth/register
```

Request body:

```json
{
  "name": "Ahmed",
  "email": "ahmed@test.com",
  "age": 22,
  "password": "123456"
}
```

Response:

```json
{
  "success": true,
  "message": "Account created successfully. Please login."
}
```

---

### Login

```
POST /api/v1/auth/login
```

Request body:

```json
{
  "email": "ahmed@test.com",
  "password": "123456"
}
```

Response:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1...",
  "data": { ...user }
}
```

---

### Get Logged User

```
GET /api/v1/auth/me
Authorization: Bearer <token>
```

---

### Admin Test

```
GET /api/v1/auth/admin-test
Authorization: Bearer <token>
```

Accessible only for admin roles.

---

## 👥 Users Endpoints

```
GET    /api/v1/users
GET    /api/v1/users/:id
POST   /api/v1/users
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id   (soft delete)
```

Soft delete sets:

```
isDeleted = true
```

---

## 🛍️ Product Endpoints

All product routes require authentication.

```
GET    /api/v1/products
GET    /api/v1/products/:id
POST   /api/v1/products
PATCH  /api/v1/products/:id
DELETE /api/v1/products/:id   (soft delete)
```

When creating a product:

- `createdBy = req.user._id`

---

## 🔒 Security Notes

- Passwords are never stored as plain text
- Tokens have expiration
- Protected routes require authentication
- Role-based access limits sensitive actions

---

## ▶️ Run the Project

Install dependencies:

```
npm install
```

Start the server:

```
npm start
```

Environment variables:

```
JWT_SECRET=your_secret
JWT_EXPIRES_IN=90d
MONGO_URI=mongodb://...
NODE_ENV=development
```

---

## 🎯 Summary

The API applies structured and maintainable practices:

- Clear separation of logic in controllers
- Reusable middleware
- JWT authentication with roles
- Soft delete instead of hard delete
- Centralized error handling
- Consistent API responses

It can be extended with features such as file uploads, refresh tokens, pagination, and search.

---

### Extra

If needed, I can prepare:

- a Postman collection
- step-by-step documentation
- code review and improvements
