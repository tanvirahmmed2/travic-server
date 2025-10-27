const express= require('express')
const { getUser, registerUser, loginUser } = require('../controller/user.controller')
const userRouter= express.Router()


userRouter.get('/', getUser)
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)





module.exports= userRouter