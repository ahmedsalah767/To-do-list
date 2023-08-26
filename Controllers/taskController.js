const appError = require('../Utils/globalErrorHandler')
const User = require('./../Models/userModel')
const catchAsync = require('../Utils/catchAsync')
const Task = require('./../Models/taskModel')
const Category = require('./../Models/categoryModel')

exports.create = catchAsync( async(req,res,next) => {
    const newTask = await Task.create({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        user: req.user.id,
    })
   

    const a = await Category.findOne({name: req.body.category, user: req.user.id})
    let b = JSON.stringify(a)
    const c = JSON.parse(b);
   // if(!c){
   //     console.log('null')
   // }
   // if(c.name != req.body.category ){

    if(!c){
    const category =  await Category.create({
        name: req.body.category,
        user: req.user.id
        
    })
    newTask.category = category.id
    
}
    else{
 newTask.category = c.id
}
 ////else we have to make append to the category model
    newTask.save()

    res.status(201).json({
        newTask,
        
    })
    
})


exports.get = catchAsync( async(req,res,next) => {
    
const getTasks = await Task.find({user: req.user.id, completed: false })

res.status(200).json({
    getTasks
})
})


/*
   const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
      class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;




*/


exports.update = catchAsync( async(req,res,next) => {
    
    const getTask = await Task.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
    }, {user: req.user.id} )
    
    res.status(200).json({
        getTask
    })
})
    


exports.delete = catchAsync( async(req,res,next) => {
    
    const getTask = await Task.findByIdAndDelete(req.params.id, {user: req.user.id})
    if (getTask.user != req.user.id){
        return next(new appError('not aithrized', 403))
    }
    res.status(200).json({
        getTask
    })
})


exports.getone = catchAsync( async(req,res,next) => {
    
    const getTask = await Task.findById(req.params.id)
    if (getTask.user != req.user.id){
        return next(new appError('not aithrized', 403))
    }
    res.status(200).json({
        getTask
    })})