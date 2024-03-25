const express = require('express');
const {getAllProducts,getProductDetails, updateProduct} = require('../controllers/productController');
const {isAuthenticatedUser, authrizeRoles} = require('../middleware/auth');

const router = express.Router();

router.route('/products').get(isAuthenticatedUser,authrizeRoles("user"),getAllProducts);
router.route('/product/:id').get(isAuthenticatedUser,authrizeRoles("user"),getProductDetails);
router.route('/product/:id').put(isAuthenticatedUser,authrizeRoles("user"),updateProduct);

module.exports = router;