const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const crypto = require('crypto');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;
    console.log(password);
  
    const user = await User.create({
      email,
      password,
      role
    });
  
    sendToken(user, 201, res);
  });


  exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHandler('Please Enter Email & Password, 400'));
    }
  
    const user = await User.findOne({ email }).select('+password');
  
    if (!user) {
      return next(new ErrorHandler('Invalid Email or Password', 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler('Invalid Email or Password', 401));
    }
  
    sendToken(user, 200, res);
  });

  // get all users (admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.find(req.params.id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });
  
  // Get Single user (admin)
  exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`user does not exist with id: ${req.params.id} `)
      );
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  });

  exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });

  exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      succcess: true,
      message: 'Logged Out',
    });
  });

  exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });
  