const express = require('express');
const {getAllReviewProducts,getProductsByStatus, UpdateProduct, rejectReview, getProductDetails} = require('../controllers/productReviewController');
const {isAuthenticatedUser, authrizeRoles} = require('../middleware/auth');

const router = express.Router();

router.route('/reviewProducts').get(isAuthenticatedUser,authrizeRoles("admin"),getAllReviewProducts);
router.route('/reviewProducts/:status').get(isAuthenticatedUser,authrizeRoles("admin"),getProductsByStatus);
router.route('/reviewProduct/:id').get(isAuthenticatedUser,authrizeRoles("admin"),getProductDetails);
router.route('/reviewProduct/:id/reject').put(isAuthenticatedUser,authrizeRoles("admin"),rejectReview);
router.route('/reviewProduct/:id/accept').put(isAuthenticatedUser,authrizeRoles("admin"),UpdateProduct);

module.exports = router;