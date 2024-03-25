const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const ProductReview = require('../models/productReviewModel');
const User = require('../models/userModel');

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  
    const products = await Product.find({ review: 'No' });
    res
      .status(200)
      .json({ success: true, products });
  });

  exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
      success: true,
      product,
    });
  });

  exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const { productName, price,image, productDescription, department, id } = req.body;
    console.log(req.body);
    console.log(req.user._id);
  
    const reviewProduct = await ProductReview.create({
      productName: productName,
      price: price,
      image: image,
      productDescription: productDescription,
      department: department,
      id: id,
      review: "pending",
      updatedFields: req.body, 
      submittedBy: req.user._id,
    });

    await User.findByIdAndUpdate(req.user._id, { $inc: { totalReq: 1 } });
  
    res.status(200).json({
      success: true,
      reviewProduct
    });
  });