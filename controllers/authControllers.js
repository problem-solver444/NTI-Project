const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");

const User = require("../Models/userModel");
const asyncCatch = require("../utils/asyncCatch");
const AppError = require("../utils/appError");


// ======================
// 1️⃣ Helper — إنشاء التوكن
// ======================
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });


// ======================
// 2️⃣ REGISTER
// ======================
exports.register = asyncCatch(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    password: req.body.password,
  });

  user.password = undefined;

  res.status(201).json({
    success: true,
    message: "Account created successfully. Please login."
  });
});


// ======================
// 3️⃣ LOGIN
// ======================
exports.login = asyncCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Please provide email & password", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  // استخدم الدالة الجديدة
  const isPasswordValid = await user.comparePassword(password);
  
  if (!isPasswordValid) {
    return next(new AppError("Invalid credentials", 401));
  }

  const token = signToken(user._id);
  user.password = undefined;

  res.status(200).json({
    success: true,
    token,
    data: user,
  });
});

// ======================
// 4️⃣ PROTECT (Authentication)
// ======================
exports.protect = asyncCatch(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return next(
      new AppError("You are not logged in — please login first", 401)
    );

  // verify token asynchronously
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser)
    return next(
      new AppError("User belonging to this token no longer exists", 401)
    );

  req.user = currentUser;

  next();
});


// ======================
// 5️⃣ GET LOGGED USER DATA
// ======================
exports.getMe = asyncCatch(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});
