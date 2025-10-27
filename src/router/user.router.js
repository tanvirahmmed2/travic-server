const express= require('express')
const { getUser, registerUser, loginUser, savePackage, protectedUser } = require('../controller/user.controller')
const { isLogin } = require('../middleware/Authenticator')
const userRouter= express.Router()


userRouter.get('/', getUser)
userRouter.get('/protected', isLogin, protectedUser)
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/save',isLogin , savePackage)





module.exports= userRouter