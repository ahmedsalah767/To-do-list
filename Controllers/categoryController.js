const appError = require('../Utils/globalErrorHandler')
const User = require('./../Models/userModel')
const catchAsync = require('../Utils/catchAsync')
const Task = require('./../Models/taskModel')
const Category = require('./../Models/categoryModel')



exports.getCategories = catchAsync(async(req,res,next) => {
const categories = await Category.find({user: req.user.id }).populate({path: 'tasks'})

res.status(200).json({
    categories
})

})




exports.createCategory = catchAsync(async(req,res,next) => {
    const category = await Category.create({
        user: req.user.id,
        name: req.body.name
    })
    res.status(200).json({
        category
    })
    })


exports.getCategory =  catchAsync(async(req,res,next) => {
    const category = await Category.findById(req.params.id).populate({path: 'tasks'})

    res.status(200).json({
        category
    })
    
    })




    exports.updateCategory = catchAsync(async(req,res,next) => {
        const category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        })
    
        res.status(200).json({
            category
        })
    })


    exports.deleteCategory = catchAsync(async(req,res,next) => {
        const category = await Category.findByIdAndDelete(req.params.id)
    
        res.status(200).json({
            category
        })
    })



 