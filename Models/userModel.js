const mongoose = require('mongoose')
const crypto = require('crypto')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const { default: isEmail } = require('validator/lib/isEmail')
const Task = require('./taskModel')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please tell us you rname']
     },
     email: {
        type:  String,
        required: [true, 'enter your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'not valid email']
     },
     photo: String,
     password:{
         type: String,
         required: [true, 'you should provide a password'],
         minlength: [8, 'should be at least 8'],
         select: false
     },
     passwordConfirm:{
         type: String,
         select: false,
         required: [true, 'you should provide a password confirm'],
         validate:{
             validator: function(el){
                 return el === this.password
             },
             message: 'not the same',
             
         }},
     passwordChangesAt: Date,
     passwordResetToken: String,
     passwordResetexpires: Date,
     active:{
         type: Boolean,
         default: true,
         select: false,
     },
    tasks:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Task'
     }],
    
     
 
 },
 {
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
    })


    UserSchema.pre('save', async function(next) {
      
        // Hash the password with cost of 12
        this.password = await bcrypt.hash(this.password, 12);
      
        // Delete passwordConfirm field
        this.passwordConfirm = undefined;
        next();
      });



UserSchema.methods.correctPassword = async function(
    candidatePassword,
        userPassword
      ) {
        return await bcrypt.compare(candidatePassword, userPassword);
      };
      




     











const User = mongoose.model('User', UserSchema)


module.exports = User