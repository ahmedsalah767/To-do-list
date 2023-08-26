const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name:{
        type:String,
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'     
    }
   
},
{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
    })



    CategorySchema.index({ name:1, user:1 }, {unique:true})

// Virtual populate
CategorySchema.virtual('tasks', {
    ref: 'Task',
    foreignField: 'category',
    localField: '_id',
  });

 /* WE WANT BOTH USER AND NAME TO BE UNIQUE AT THE SAME TIME

  CategorySchema.pre('save', function(next){

        if(unique(this.name)){

        }
        else{
            next()
        }
  })
  */
const Category = mongoose.model('Category', CategorySchema)


module.exports = Category