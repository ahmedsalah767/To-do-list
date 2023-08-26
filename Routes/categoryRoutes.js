const express= require('express');
const categoryController = require('./../Controllers/categoryController')
const authController = require('./../Controllers/authController')
const router = express.Router()

router.route('/')
.get(authController.protect,categoryController.getCategories)
.post(authController.protect,categoryController.createCategory)

router.route('/:id')
.get(authController.protect,categoryController.getCategory)
.patch(authController.protect,categoryController.updateCategory)
.delete(authController.protect,categoryController.deleteCategory)



module.exports = router