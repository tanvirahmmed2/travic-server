const express = require('express')
const { getBlog, newBlog, removeBlog } = require('../controller/blog.controller')
const upload = require('../config/multer')
const { isLogin, isAdmin } = require('../middleware/Authenticator')

const blogRouter= express.Router()

blogRouter.get('/', getBlog)
blogRouter.post('/new',isLogin, isAdmin, upload.single('image'), newBlog)
blogRouter.delete('/remove',isLogin, isAdmin, removeBlog)




module.exports= blogRouter