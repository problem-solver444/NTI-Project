const User = require("../Models/userModel.js");
const asyncCatch = require("../utils/asyncCatch.js");
const jwt = require("jsonwebtoken");
const appError = require("../utils/appError.js");

exports.getAllUsers = asyncCatch(async (req, res, next) => {
    const users = await User.find({isDeleted: false});
    
    if (!users || users.length === 0) {
        return next(new appError("No users found", 404));
    }
    
    res.status(200).json({
        success: true,
        users,
    });
});

exports.getUserById = asyncCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
        return next(new appError("User not Found", 404));
    }
    
    res.status(200).json({
        success: true,
        data: user,
    });
});

exports.createUser = asyncCatch(async (req, res, next) => {
    const user = await User.create(req.body);

    const token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    res.status(201).json({
        success: true,
        data: user,
        token
    });
});

exports.updateUser = asyncCatch(async (req, res, next) => {
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        return next(new appError("User not found", 404));
    }

    res.status(200).json({
        success: true,
        data: user,
    });
});

exports.deleteUser = asyncCatch(async (req, res, next) => {
    const id = req.params.id;

    const deletedUser = await User.findById(id);
          deletedUser.isDeleted = true;
          await deletedUser.save();
    if (!deletedUser) {
        return next(new appError("User not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        removed: deletedUser,
    });
});