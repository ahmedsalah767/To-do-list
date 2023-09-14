const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path')

const userRouter = require('./Routes/userRoutes');
const taskRouter = require('./Routes/taskRoutes');
const viewRouter = require('./Routes/viewRoutes');
const categoryRouter = require('./Routes/categoryRoutes');
const app = express();
const errorController = require('./Controllers/errorController');


app.use(express.json({limit: '10kb'}))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.use(express.urlencoded({extended:true, limit: '10kb'}))

//redirect middleware 

app.use('/', viewRouter)
app.use('/api/auth', userRouter )
app.use('/api/tasks', taskRouter )
app.use('/api/categories', categoryRouter )







app.use(errorController)

module.exports = app