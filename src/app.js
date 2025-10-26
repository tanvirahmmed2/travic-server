const express= require('express')
const cors= require('cors')
const cookieParser= require('cookie-parser')
const userRouter = require('./router/user.router')
const tourRouter = require('./router/tour.router')
const messageRouter = require('./router/message.router')


const app= express()


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(cookieParser())




app.use('/api/user', userRouter)
app.use('/api/message', messageRouter)
app.use('/api/tour', tourRouter)




module.exports = app