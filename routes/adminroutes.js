const express = require("express");
const res = require("express/lib/response");

const router = express.Router();


const {products,addProduct,updateProduct,removeProduct} = require('../controllers/admincontroller')


router.route('/admin/products/:page').get(products)
router.route('/admin/products').post(addProduct)
router.route('/admin/products').put(updateProduct).delete(removeProduct)


module.exports = router