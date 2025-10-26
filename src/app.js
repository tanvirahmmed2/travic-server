const express= require('express')
const userRouter = require('./router/user.router')


const app= express()





app.use('/api/user', userRouter)




module.exports = app