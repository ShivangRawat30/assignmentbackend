const ProductReview = require('../models/productReviewModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const User = require('../models/userModel');
const catchAsyncErrors = require('../middleware/catchAsyncError');

exports.getAllReviewProducts = catchAsyncErrors(async(req,res) => {
    const products = await ProductReview.find();
    res
      .status(200)
      .json({ success: true, products });
})

exports.getProductsByStatus = catchAsyncErrors(async (req, res) => {
  const { status } = req.params; 
  
  if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }
  
  const products = await ProductReview.find({ status });
  
  res.status(200).json({ success: true, products });
});

exports.UpdateProduct = catchAsyncErrors(async (req, res) => {
  let product = await ProductReview.findById(req.params.id);
  
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  let changeId = product.id;
  let usr = product.submittedBy;

  product = await Product.findOneAndUpdate({id: changeId}, {
    productName:product.productName,
    price:product.price,
    image:product.image,
    productDescription:product.productDescription,
    department:product.department,
  },{
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  review = await ProductReview.findByIdAndUpdate(req.params.id, {status: "Approved"}, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  await User.findByIdAndUpdate(req.user._id, { $inc: { ApprovedReq: 1 } });
  res.status(200).json({
    success: true,
    product,
  });

  
})

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await ProductReview.findById(req.params.id);
  console.log(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

exports.rejectReview = catchAsyncErrors(async (req, res, next) => {
  let product = ProductReview.findById(req.params.id);
  let usr = product.submittedBy;
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  product = await ProductReview.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  await User.findByIdAndUpdate(usr, { $inc: { RejectedReq: 1 } });
  res.status(200).json({
    success: true,
    product,
  });
});

