const { promisify } = require('util');
const Task = require('./../Models/taskModel')
const User = require('./../Models/userModel')
const Category = require('./../Models/categoryModel')
const catchAsync = require("../Utils/catchAsync")
const jwt = require('jsonwebtoken')

exports.login = async(req,res,next) =>{

res.status(200).render('login',{
    title: 'Login'
})


}


exports.signup = async(req,res,next) =>{

    res.status(200).render('signup',{
        title: 'Signup'
    })
    
    
    }



    exports.getTasks = catchAsync( async(req,res,next) => {
    
        const getTasks = await Task.find({user: req.user.id, completed: false })
        
        res.status(200)
        .render('tasks',{
          title: 'all tasks',
          getTasks
        })
        })

    exports.isLoggedin = async(req,res,next) =>{
         // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      return next(res.redirect('/login'))
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(res.redirect('/login'))
    }
  
    /* 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new appError('User recently changed password! Please log in again.', 401)
      );
    }
    */

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();

    }


    exports.notLoggedin = async(req,res,next) =>{
        // 1) Getting token and check of it's there
   let token;
   if (
     req.headers.authorization &&
     req.headers.authorization.startsWith('Bearer')
   ) {
     token = req.headers.authorization.split(' ')[1];
   } else if (req.cookies.jwt) {
     token = req.cookies.jwt;
   }
 
   if (!token) {
     return next()
   }
 
   // 2) Verification token
   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
 
   // 3) Check if user still exists
   const currentUser = await User.findById(decoded.id);
   if (!currentUser) {
     return next()
   }
 
   /* 4) Check if user changed password after the token was issued
   if (currentUser.changedPasswordAfter(decoded.iat)) {
     return next(
       new appError('User recently changed password! Please log in again.', 401)
     );
   }
   */

   // GRANT ACCESS TO PROTECTED ROUTE
   
   next(res.redirect('/'));

   }



  exports.getCategories = catchAsync(async(req,res,next) => {
    const categories = await Category.find({user: req.user.id }).populate({path: 'tasks'})
    res.status(200)
    .render('categories', {
        categories
    })
 
    })
    

    exports.getCategory =  catchAsync(async(req,res,next) => {
      const categories = await Category.findById(req.params.id).populate({path: 'tasks'})
  
      res.status(200)
      .render('categories', {
          categories
      })
      
      })
  
  

      exports.getone = catchAsync( async(req,res,next) => {
    
        const getTask = await Task.findById(req.params.id)
        if (getTask.user != req.user.id){
            return next(new appError('not aithrized', 403))
        }
       
      res.status(200)
      .render('tasks', {
          getTask
      })})