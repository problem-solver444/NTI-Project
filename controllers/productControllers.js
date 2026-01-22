const Product = require('../Models/productModel');
const appError = require('../utils/appError');
const asyncCatch = require('../utils/asyncCatch');

exports.getAllProducts = asyncCatch(async (req, res, next) => {
  const products = await Product.find({ isDeleted: false });
  res.status(200).json({
    success: true,
    products
  });
});

exports.getProductById = asyncCatch(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findOne({ _id: id, isDeleted: false });

  if (!product) {
    return next(new appError('Product not Found', 404));
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

exports.createProduct = asyncCatch(async (req, res, next) => {
  const product = await Product.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({
    success: true,
    data: product
  });
});

exports.updateProduct = asyncCatch(async (req, res, next) => {
  const id = req.params.id;

  let product = await Product.findOne({ _id: id, isDeleted: false });

  if (!product) {
    return next(new appError('Product not Found', 404));
  }

  product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: product
  });
});

exports.deleteProduct = asyncCatch(async (req, res, next) => {
  const id = req.params.id;

  const product = await Product.findOne({ _id: id, isDeleted: false });

  if (!product) {
    return next(new appError('Product not Found', 404));
  }

  product.isDeleted = true;
  await product.save();

  res.status(200).json({
    success: true,
    message: 'Product Deleted Successfully'
  });
});
