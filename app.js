const express = require('express');
const userRouter = require('./Routes/userRoutes');
const taskRouter = require('./Routes/taskRoutes');
const categoryRouter = require('./Routes/categoryRoutes');
const app = express();
const errorController = require('./Controllers/errorController');


app.use(express.json({limit: '10kb'}))



app.use('/api/auth', userRouter )
app.use('/api/tasks', taskRouter )
app.use('/api/categories', categoryRouter )







app.use(errorController)

module.exports = app