const express= require('express');
const router = express.Router()
const viewController = require('../Controllers/viewController')
const authController = require('./../Controllers/authController')

router.route('/login')
.get(viewController.notLoggedin,viewController.login )

router.route('/signup')
.get(viewController.notLoggedin, viewController.signup )

router.route('/categories')
.get(viewController.isLoggedin,viewController.getCategories)


router.route('/')
.get(viewController.isLoggedin,viewController.getTasks)




module.exports = router