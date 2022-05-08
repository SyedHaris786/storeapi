const express = require('express');

const router = express.Router();

const {login, register,dashboard} = require('../Controllers/login')

//Registeration Route
router.route('/register').post(register);

// Login Route 
router.route('/login').post(login)

module.exports = router


