const AppError = require('../utils/appError');
const asyncCatch = require('../utils/asyncCatch.js');
const userModel = require('../Models/userModel.js');
const productModel = require('../Models/productModel.js');

exports.getDeltedUsers = asyncCatch(async (req, res, next) => {
  const deletedUsers = await userModel.find({ isDeleted: true });
  if(deletedUsers.length === 0){
    return next(new AppError('No deleted users found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Deleted Users Retrieved Successfully',
    data: deletedUsers
  });
});

exports.getDeltedProducts = asyncCatch(async (req, res, next) => {
  const deletedProducts = await productModel.find({ isDeleted: true });
  res.status(200).json({
    success: true,
    message: 'Deleted Products Retrieved Successfully',
    data: deletedProducts
  });
  if (deletedProducts.length === 0) {
    next(new AppError('No deleted products found', 404));
  }
});

exports.restoreDeletedUser = asyncCatch(async (req, res, next) => {
  const userId = req.params.id;

  const user = await userModel.findOneAndUpdate({ _id: userId, isDeleted: true }, { isDeleted: false }, { new: true });

  if (!user) {
    return next(new AppError('User not found or not deleted', 404));
  }

  res.status(200).json({
    success: true,
    message: 'User restored successfully',
    data: user
  });
});

exports.restoreDeletedProduct = asyncCatch(async (req, res, next) => {
  const productId = req.params.id;
  const product = await productModel.findOneAndUpdate({ _id: productId, isDeleted: true }, 
    { isDeleted: false }, { new: true });
  if (!product) {
    return next(new AppError('Product not found or not deleted', 404));
  }
  res.status(200).json({
    success: true,
    message: 'Product restored successfully',
    data: product
  });
});

