const express= require('express');
const router = express.Router()
const authController = require('./../Controllers/authController')



router
.route('/signup')
.post(authController.signup)
.get(authController.signup)

router
.route('/login')
.post(authController.login)
.get(authController.login)

router
.route('/logout')
.get(authController.logout)

/*
router
.route('/login')
.post(authController.login)
*/




module.exports = router