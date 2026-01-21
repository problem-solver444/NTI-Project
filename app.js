require("dotenv").config(); 
const connectDB = require("./config/database");
const express = require("express");
const app = express();
connectDB();

// Middleware
app.use(express.json());
const errorHandler = require("./middleware/errorHandler");


// Routers
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const adminRouter = require("./routes/adminRouter");

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/admin", adminRouter);


const authRouter = require("./routes/authRouter");
app.use("/api/auth", authRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).send("404 - Route Not Found");
});

// Global Error Handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
