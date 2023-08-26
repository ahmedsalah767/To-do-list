const express= require('express');

const router = express.Router()
const authController = require('./../Controllers/authController')
const taskController = require('./../Controllers/taskController')
router
.route('/')
.post(authController.protect, taskController.create)
.get(authController.protect, taskController.get)


router.route('/:id')
.delete(authController.protect, taskController.delete)
.put(authController.protect, taskController.update)
.get(authController.protect, taskController.getone)





module.exports = router