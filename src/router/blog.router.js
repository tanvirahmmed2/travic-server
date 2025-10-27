const express = require('express')
const { getBlog, newBlog, removeBlog } = require('../controller/blog.controller')
const upload = require('../config/multer')

const blogRouter= express.Router()

blogRouter.get('/', getBlog)
blogRouter.post('/new', upload.single('image'), newBlog)
blogRouter.delete('/remove', removeBlog)




module.exports= blogRouter