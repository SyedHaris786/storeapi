const express = require('express');

const router = express.Router();

const {allProducts,search,orders} = require('../controllers/usercontroller')

router.route('/user/products/:page').get(allProducts)
router.route('/user/products/search/:keyword').get(search)
router.route('/user/orders').post(orders)


module.exports = router