const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const asyncCatch = require('../utils/asyncCatch');
const AppError = require('../utils/appError');

// -------- AUTHENTICATION -------- //
const { promisify } = require("util");

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

  // verify token (async)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next( new AppError( "User belonging to this token no longer exists",401)
    );

  req.user = currentUser;
  next();
});

// -------- AUTHORIZATION -------- //
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // لازم protect يشتغل قبلها — عشان req.user يبقى موجود
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};
